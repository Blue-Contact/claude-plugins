---
name: audience-report
description: Generate polished PPTX or PDF reports from Blue Contact audiences — demographics, coverage, visualizations, and insights ready for stakeholder sharing
argument-hint: "audience ID or 'latest'"
allowed-tools:
  - blue-contact:get_schema
  - blue-contact:get_query_instructions
  - blue-contact:validate_sql
  - blue-contact:execute_sql_query
  - blue-contact:get_audience
  - blue-contact:list_audiences
  - blue-contact:save_message
---

# Audience Report Generator

Generate a polished, stakeholder-ready report from a Blue Contact audience. The report includes audience overview, demographic breakdowns, geographic distribution, contact coverage analysis, and key insights — all with professional visualizations.

## Brand Configuration

Before generating any visual output, read `brand/BRAND.md` for the official Blue Contact brand guide, then load color tokens from `brand/brand.json`. All visual artifacts must use these brand colors — never hardcode color values.

## Workflow

### 1. Identify the audience

- If the user provides an audience ID, use `get_audience` to load it
- If the user says "latest" or doesn't specify, call `list_audiences` and pick the most recent active audience
- If no audiences exist, let the user know and offer to build one first (suggest the `audience-pull` skill)
- Extract the audience's SQL query, title, and reasoning from the audience state

### 2. Ask about report preferences

Use `AskUserQuestion` to clarify:
- **Format**: PPTX presentation or PDF one-pager? (default: PPTX)
- **Depth**: Executive summary (3-5 slides / 1 page) or detailed deep-dive (8-12 slides / 2-3 pages)?
- **Branding**: Should we include the user's company name or logo? (ask for company name if so)
- **Focus areas**: Which breakdowns matter most? (geography, demographics, contact coverage, all of the above)

### 3. Gather the data

Run a series of analytical queries against the same filters used in the audience's SQL. Adapt the queries based on what columns are available (check the schema first):

**Core metrics (always include):**
- Total record count
- Phone coverage rate (count with phone / total)
- Email coverage rate (count with email / total)
- Address completeness rate

**Geographic breakdown:**
- Top 10-15 states by record count
- If the audience is state-specific, break down by city or zip instead

**Demographic breakdowns (if consumer data):**
- Age distribution (group into buckets: 18-24, 25-34, 35-44, 45-54, 55-64, 65+)
- Income brackets
- Homeowner vs renter split
- Gender distribution
- Presence of children

**Firmographic breakdowns (if B2B data):**
- Top industries (SIC/NAICS)
- Employee count distribution
- Revenue tiers

**Mover breakdowns (if mover data):**
- Move date distribution (by month/quarter)
- Origin vs destination states
- Mover type

**Property breakdowns (if property data):**
- Property type mix
- Value distribution
- Year built ranges

### 4. Build the report

**For PPTX**: Use the `pptx` skill to create a professional presentation:

- **Slide 1 — Title**: Audience name, date generated, total records as hero number
- **Slide 2 — Executive Summary**: Key stats at a glance (total records, phone %, email %, top state, dominant age group). Use big stat callouts.
- **Slide 3 — Geographic Distribution**: Horizontal bar chart of top states (or cities/zips if localized)
- **Slide 4 — Demographic Profile**: Age + income distribution charts, homeowner/renter pie
- **Slide 5 — Contact Coverage**: Phone and email coverage as visual gauges/progress bars, with raw numbers
- **Slide 6+ (detailed only)** — Additional breakdowns: gender, children, industry, property type, etc.
- **Final Slide — Methodology**: The SQL filters used, data source note, date of pull

**For PDF**: Use the `pdf` skill to create a clean one-pager or multi-page report with the same data points.

### 5. Generate visualizations

Create React (.jsx) visualization artifacts alongside the report for interactive viewing:
- Use Recharts with Blue Contact brand colors from `brand.json` (contactBlue primary)
- Build a comprehensive dashboard that mirrors the report content
- Present the .jsx file so the user can interact with the charts

### 6. Deliver and log

- Save the report file and present it to the user
- Present the visualization artifact
- Log the report generation to the audience's conversation history using `save_message`
- Offer next steps: "Want to refine the audience and regenerate?", "Need this in a different format?", "Ready to pull the full list for campaign execution?"

## Report Design Principles

- Clean, professional, minimal — no clutter
- Use Blue Contact brand colors from `brand/brand.json` — contactBlue (#006AFF) for primary elements
- Large, readable stat callouts for key numbers
- Charts should be simple and self-explanatory
- Always include a data source attribution: "Data provided by Blue Contact"
- Format all numbers with commas; use K/M for large aggregates
- Include the date of the data pull on every report
