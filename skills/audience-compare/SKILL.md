---
name: audience-compare
description: Compare two Blue Contact audiences side-by-side — demographic differences, geographic skew, coverage gaps, and overlap analysis with visual dashboards
argument-hint: "audience A vs audience B (IDs or descriptions)"
allowed-tools:
  - blue-contact:get_schema
  - blue-contact:get_query_instructions
  - blue-contact:validate_sql
  - blue-contact:execute_sql_query
  - blue-contact:get_audience
  - blue-contact:list_audiences
  - blue-contact:save_message
---

# Audience Comparison

Compare two audiences to understand how they differ — demographics, geography, coverage, size — and present the findings as an interactive side-by-side dashboard.

## Workflow

### 1. Identify the two audiences

The user might provide:
- Two audience IDs → use `get_audience` for each
- One audience ID and a new description → load the existing one, build a query for the new one
- Two descriptions → build queries for both
- "Compare my last two audiences" → use `list_audiences` to find the two most recent

Extract the SQL query and filters for each audience. Label them clearly (e.g., "Audience A: Texas Homeowners 35-54" vs "Audience B: Florida Homeowners 35-54").

### 2. Run parallel analysis

For each audience, run the same set of analytical queries so the results are directly comparable. Use `execute_sql_query` for all exploratory queries.

**Size & Coverage:**
```
Total record count
Phone coverage %
Email coverage %
Address completeness %
```

**Geographic breakdown:**
```
Top 10 states by record count (or cities/zips if both are state-specific)
```

**Demographic breakdown (if consumer):**
```
Age distribution (same buckets for both)
Income bracket distribution
Homeowner vs renter %
Gender split
```

**Firmographic breakdown (if B2B):**
```
Top industries
Employee count distribution
Revenue tier distribution
```

### 3. Compute comparison metrics

After gathering data for both audiences, compute:
- **Size ratio**: How much larger/smaller is A vs B?
- **Coverage delta**: Difference in phone/email rates
- **Geographic concentration**: Which states index higher in A vs B?
- **Demographic skew**: Where do the age/income/homeowner distributions diverge?
- **Index scores**: For each dimension, compute an index (A rate / B rate × 100) to show relative over/under-representation

### 4. Build the comparison dashboard

Create a React (.jsx) visualization that shows both audiences side by side:

**Layout:**
- **Header**: Audience A name vs Audience B name, with total counts as hero stats
- **Size & Coverage panel**: Grouped bar chart or stat cards comparing totals, phone %, email %
- **Geographic comparison**: Side-by-side horizontal bar charts (or a diverging bar chart with A on left, B on right)
- **Demographic comparison**: Grouped bar charts for age and income, with both audiences overlaid
- **Key differences callout**: Highlight the 3-5 dimensions where the audiences diverge most, with index scores

**Design:**
- Use two distinct colors for A vs B (e.g., Blue Contact blue #2563EB for A, a complementary teal or orange for B)
- Include clear legends
- Format numbers consistently
- Add a "Key Differences" summary section at the bottom

### 5. Narrate the findings

After presenting the dashboard, provide a conversational summary:
- Which audience is larger and by how much
- Where they differ most (geography, age, income, coverage)
- Which has better contact coverage
- Any surprising findings or patterns
- Recommendations: "If you need phone reachability, Audience A has 12% better coverage" or "Audience B skews younger — better for digital campaigns"

### 6. Suggest next steps

- "Want to merge these into a combined audience?"
- "Should we create a third audience that captures the overlap?"
- "Want to drill deeper into a specific difference?"
- "Ready to generate a report for either audience?" (→ `audience-report` skill)
