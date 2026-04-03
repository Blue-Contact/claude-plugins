---
name: data-health
description: Run a comprehensive health check on your Blue Contact data — record counts, field completeness, contact coverage, geographic spread, and quality diagnostics with a visual report card
allowed-tools:
  - blue-contact:get_schema
  - blue-contact:get_query_instructions
  - blue-contact:validate_sql
  - blue-contact:execute_sql_query
---

# Data Health Check

Run a comprehensive diagnostic on the user's Blue Contact data. Analyze record counts, field completeness, contact coverage rates, geographic distribution, and data quality — then present everything as a visual "report card" dashboard.

## Workflow

### 1. Discover available data

- Call `get_schema` (no params) to get the database/table summary
- Identify all available databases and tables
- Call `get_schema(database: "...")` for each relevant database to get full column details
- Build a list of tables to analyze

### 2. Run the health check queries

For each major table, run a series of diagnostic queries using `execute_sql_query`. Adapt based on what columns exist in the schema.

**Record counts:**
```sql
SELECT COUNT(*) AS total_records FROM catalog.database.table
```
Run this for every table to establish the data landscape.

**Field completeness (per table):**
For key columns, check what percentage of records have non-null values:
```sql
SELECT
  COUNT(*) AS total,
  COUNT(first_name) AS has_first_name,
  COUNT(last_name) AS has_last_name,
  COUNT(address) AS has_address,
  COUNT(city) AS has_city,
  COUNT(state) AS has_state,
  COUNT(zip) AS has_zip,
  COUNT(phone) AS has_phone,
  COUNT(email) AS has_email,
  ROUND(COUNT(phone) * 100.0 / COUNT(*), 1) AS phone_pct,
  ROUND(COUNT(email) * 100.0 / COUNT(*), 1) AS email_pct
FROM catalog.database.table
```
Adapt column names to match what's actually in the schema.

**Geographic coverage:**
```sql
SELECT state, COUNT(*) AS record_count
FROM catalog.database.table
WHERE state IS NOT NULL
GROUP BY state
ORDER BY record_count DESC
```
Check how many states have data and where the concentration is.

**Contact channel coverage:**
```sql
SELECT
  COUNT(*) AS total,
  SUM(CASE WHEN phone IS NOT NULL AND email IS NOT NULL THEN 1 ELSE 0 END) AS both_channels,
  SUM(CASE WHEN phone IS NOT NULL AND email IS NULL THEN 1 ELSE 0 END) AS phone_only,
  SUM(CASE WHEN phone IS NULL AND email IS NOT NULL THEN 1 ELSE 0 END) AS email_only,
  SUM(CASE WHEN phone IS NULL AND email IS NULL THEN 1 ELSE 0 END) AS neither
FROM catalog.database.table
```

**Demographic field quality (if consumer):**
```sql
SELECT
  COUNT(*) AS total,
  COUNT(age) AS has_age,
  COUNT(income) AS has_income,
  COUNT(gender) AS has_gender,
  COUNT(homeowner_status) AS has_homeowner
FROM catalog.database.consumer_table
```

### 3. Score the data

Assign a simple health score to each dimension:

**Scoring rubric:**
- **Record Volume**: Excellent (1M+), Good (100K-1M), Fair (10K-100K), Low (<10K)
- **Phone Coverage**: Excellent (70%+), Good (50-70%), Fair (30-50%), Low (<30%)
- **Email Coverage**: Excellent (50%+), Good (30-50%), Fair (15-30%), Low (<15%)
- **Address Completeness**: Excellent (95%+), Good (85-95%), Fair (70-85%), Low (<70%)
- **Geographic Spread**: Excellent (45+ states), Good (30-45), Fair (15-30), Low (<15)
- **Demographic Completeness**: Excellent (80%+ fields populated), Good (60-80%), Fair (40-60%), Low (<40%)

Compute an overall health grade: A (all excellent/good), B (mostly good), C (mixed), D (mostly fair/low).

### 4. Build the health check dashboard

Create a React (.jsx) visualization — the "data report card":

**Layout:**
- **Header**: "Blue Contact Data Health Check" with overall grade (A/B/C/D) as a large badge and date
- **Summary stat cards**: Total records across all tables, overall phone coverage %, overall email coverage %, number of states covered
- **Table inventory**: Bar chart showing record count per database/table
- **Coverage breakdown**: For each major table, show a horizontal stacked bar (phone-only, email-only, both, neither) with percentages
- **Geographic heatmap**: Bar chart of top 15 states by record count, with a "states covered: X/50" indicator
- **Field completeness grid**: A heatmap-style grid where rows are tables and columns are key fields, colored green (>80%), yellow (50-80%), red (<50%) based on fill rate
- **Demographic quality** (if consumer): Progress bars for age, income, gender, homeowner fill rates
- **Score card**: Visual representation of each dimension's score (icons or colored indicators)

**Design:**
- Use traffic-light colors for health indicators (green = excellent, yellow-green = good, yellow = fair, red = low)
- Blue Contact brand blue (#2563EB) for structural elements
- Clean grid layout — think "annual physical results" not "data warehouse audit"
- Include actionable notes next to low scores (e.g., "Email coverage is 22% — consider phone as primary outreach channel")

### 5. Present findings

Walk through the results conversationally:

- Start with the headline: overall grade and total data volume
- Highlight strengths: "Your consumer data has excellent phone coverage at 72% — well above average"
- Flag concerns: "Email coverage for B2B records is only 18% — phone may be a better channel for business outreach"
- Point out geographic strengths and gaps
- Note which tables/datasets are richest and which are thinner

### 6. Recommend next steps

Based on the health check findings:

- **Strong coverage?** → "Your data is campaign-ready. Want to build an audience?" (→ `audience-pull` or `industry-playbooks`)
- **Geographic gaps?** → "Your data is concentrated in [states]. Keep this in mind when targeting — coverage outside these areas will be thinner."
- **Low email coverage?** → "Phone is your best outreach channel for this data. Email campaigns will have limited reach."
- **Thin demographic data?** → "Demographic targeting may produce smaller audiences since not all records have age/income populated."
- **Want ongoing monitoring?** → "I can set up periodic health checks to track these metrics over time." (→ `audience-monitor`)

## Notes

- This skill uses `execute_sql_query` for all queries (no audience creation needed)
- Adapt all queries to match actual column names from the schema — never assume column names
- If a table has too many columns to check all at once, focus on the most important: name, address, phone, email, and the top 3-5 demographic/firmographic fields
- The health check should complete in under 2 minutes for most accounts (8-12 queries total)
- Run queries in parallel where possible to minimize wait time
