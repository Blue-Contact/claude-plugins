---
name: market-sizing
description: Size a target market using Blue Contact data — total addressable market, geographic breakdown, reachability analysis, and opportunity dashboard
argument-hint: "description of your target market"
allowed-tools:
  - blue-contact:get_schema
  - blue-contact:get_query_instructions
  - blue-contact:validate_sql
  - blue-contact:execute_sql_query
  - blue-contact:run_audience_query
  - blue-contact:create_audience
  - blue-contact:save_message
---

# Market Sizing / TAM Calculator

Help users size a target market using Blue Contact's data. Transform a market description into a quantified opportunity with geographic breakdowns, reachability analysis, and a polished market dashboard.

## Brand Configuration

Before generating any visual output, read `brand/BRAND.md` for the official Blue Contact brand guide, then load color tokens from `brand/brand.json`. All visual artifacts must use these brand colors — never hardcode color values.

## Workflow

### 1. Understand the market definition

Parse the user's description of their target market. If details are missing, use `AskUserQuestion` to clarify:

- **Who**: Consumer or business? What demographics/firmographics define the target?
- **Where**: National, regional, or specific states/markets?
- **What makes them a prospect**: Homeowners? Specific income range? Industry vertical? Recent movers?
- **What's the product/service**: This helps frame the analysis (e.g., home improvement → homeowners + property age; auto insurance → vehicle owners in specific age/income ranges)

### 2. Load schema and build the query

- Call `get_query_instructions` and `get_schema` (two-step: summary then full) if not loaded
- Map the user's market definition to available columns and filter values
- Identify which tables and catalogs are needed

### 3. Size the total addressable market (TAM)

Run a series of COUNT queries to build a layered market size view:

**Total universe** — Count all records in the relevant table(s) with no filters
```sql
SELECT COUNT(*) AS total_universe FROM catalog.database.table
```

**Target market (TAM)** — Apply all the user's demographic/firmographic/geographic filters
```sql
SELECT COUNT(*) AS tam FROM catalog.database.table WHERE [all filters]
```

**Reachable market** — TAM filtered to records with phone OR email
```sql
SELECT
  COUNT(*) AS reachable,
  COUNT(phone) AS with_phone,
  COUNT(email) AS with_email,
  ROUND(COUNT(phone) * 100.0 / COUNT(*), 1) AS phone_pct,
  ROUND(COUNT(email) * 100.0 / COUNT(*), 1) AS email_pct
FROM catalog.database.table WHERE [all filters]
```

### 4. Break down the opportunity

Run additional queries to segment the TAM:

**Geographic breakdown:**
- By state (top 15), sorted by count
- If state-specific, by city or zip (top 20)
- Calculate each state's share of the total TAM

**Demographic/firmographic breakdown:**
- By age range (consumer) or employee count (B2B)
- By income bracket (consumer) or revenue tier (B2B)
- By homeowner status (consumer) or industry (B2B)

**Contact channel analysis:**
- Phone-only reachable count
- Email-only reachable count
- Both phone + email count
- Neither (unreachable) count

### 5. Build the market opportunity dashboard

Create a React (.jsx) visualization — this should be the centerpiece deliverable:

**Layout:**
- **Hero section**: Three big stat cards — Total Universe, Target Market (TAM), Reachable Market — with percentages showing the funnel
- **Market funnel**: A visual funnel or waterfall chart showing Universe → TAM → Reachable → Phone Reachable → Email Reachable
- **Geographic opportunity**: Horizontal bar chart of top states, with record counts and % of TAM
- **Segment breakdown**: Bar charts for the most relevant demographic/firmographic dimensions
- **Channel reachability**: Stacked bar or donut showing phone-only, email-only, both, neither
- **Footer**: Data source attribution, date, and filter summary

**Design:**
- Blue Contact brand colors from `brand/brand.json` as primary (contactBlue #006AFF)
- Use a gradient or funnel metaphor to show the narrowing from universe to reachable
- Large, bold stat callouts for TAM and reachable numbers
- Include % penetration for each segment (segment count / TAM × 100)

### 6. Present the findings

Narrate the market size in business terms:
- "Your target market is X records nationally — that's Y% of the total consumer universe"
- "The top 5 states account for Z% of your TAM — [state list]"
- "You can reach A% by phone and B% by email, giving you C reachable prospects"
- Highlight where the opportunity is densest and where coverage is strongest

### 7. Offer next steps

- "Want to save this as an audience for campaign execution?" (→ `run_audience_query`)
- "Should I generate a report to share with your team?" (→ `audience-report` skill)
- "Want to see how this compares to a different market definition?" (→ `audience-compare` skill)
- "Shall we narrow this down to a specific state or metro area?"
- "Ready to break this into campaign-sized segments?"

## Framing Notes

- Always present numbers in context — raw counts are less meaningful without percentages and comparisons
- Use the funnel metaphor: Universe → TAM → Reachable. This tells a story
- If the TAM is very large (500K+), suggest segmentation strategies
- If the TAM is very small (<1K), suggest broadening criteria and show what loosening each filter would add
- If coverage is low (<30% phone or email), flag it proactively and suggest alternative channels
