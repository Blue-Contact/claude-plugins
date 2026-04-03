---
name: getting-started
description: Interactive guided tour of Blue Contact's data capabilities — discovers your available data and walks you through real examples with live visualizations
---

# Blue Contact — Getting Started

Welcome the user to Blue Contact and give them an interactive, hands-on tour of what they can do. This skill dynamically discovers the user's available data and walks through capabilities with live examples and rich visualizations.

## Visualization Strategy

A core part of the getting started experience is showing users that Blue Contact + Claude is more than a query tool — it's a full data intelligence platform. After every meaningful query, **create a React (.jsx) visualization** to bring the data to life.

**How to create visualizations:**
- Write a self-contained React component (.jsx file) using Recharts for charts and Tailwind for layout
- Save the file and present it to the user — it will render as an interactive artifact
- Available chart libraries: `recharts` (BarChart, PieChart, LineChart, AreaChart, etc.), `d3`, `plotly`
- Use Tailwind utility classes for styling (no custom CSS needed)
- Each visualization should be a single .jsx file with a default export
- Include the data inline in the component (extracted from the query results)

**Chart selection guidance:**
- Geographic distributions → horizontal bar chart (top 10-15 states) or a colored US map
- Age/income distributions → vertical bar chart or histogram
- Category breakdowns (property type, industry, mover type) → donut/pie chart or horizontal bars
- Time series (mover volume by month) → line chart or area chart
- Coverage rates (phone %, email %) → gauge-style display or stacked bar
- Comparisons (origin vs destination, owner vs renter) → grouped bar chart or side-by-side
- Multi-metric dashboards → combine 2-4 charts in a responsive grid layout

**Visualization best practices:**
- Use a clean, modern color palette — Blue Contact brand blue (#2563EB) as primary, with complementary colors
- Always include clear titles, axis labels, and data labels where they help readability
- Add a subtle "Blue Contact" label or data source note at the bottom
- Format numbers with commas and appropriate units (K, M for large numbers)
- Make charts responsive — they should look good at any width
- For the first visualization in the session, make it a "wow" moment — a polished multi-chart dashboard that shows the breadth of the data

## Phase 1: Discover & Orient

1. **Verify connectivity.** Call `get_schema` with no parameters to get the lightweight database summary. If the connection fails, switch to the `setup` skill to troubleshoot.

2. **Map available data.** From the schema summary, identify which databases and tables the user has access to. Group them into capability areas:
   - **Consumer data** — demographics, contact info, lifestyle attributes
   - **B2B data** — business records, SIC/NAICS, firmographics
   - **Mover data** — recent movers with origin/destination
   - **Property data** — real estate records, valuations, characteristics
   - **Dealership data** — dealer locations, makes, inventory (lsc_data_catalog)

3. **Present a personalized overview.** Based on what databases are available, show the user a brief, friendly summary of their data landscape. Include approximate table counts and the types of questions each dataset can answer. Frame it as "Here's what you have access to."

## Phase 2: Interactive Menu

Present the user with a menu of things they can explore. Only include options that match their available data. Use `AskUserQuestion` to let them choose. Suggested options (include only those relevant to the user's available databases):

- **Explore your data** — "Let me show you what fields are available and how the data is structured"
- **See who's in your data** — "I'll run a quick demographic snapshot of your consumer records"
- **Find businesses** — "Let's look at what B2B data you have and search for companies"
- **Track movers** — "I'll show you recent mover volume and what data points are captured"
- **Browse properties** — "Let's explore property records — types, values, and characteristics"
- **Look up dealerships** — "Search dealer inventory by make, location, or type"
- **Build your first audience** — "I'll walk you through creating a targeted list step by step"

## Phase 3: Guided Exploration

For whichever topic the user picks, run a live, narrated walkthrough. The goal is to teach by doing — run real queries, show real results, and explain what's happening along the way.

### General pattern for each topic:

1. **Load the full schema** for the relevant database using `get_schema(database: "...")` if not already loaded.
2. **Narrate what's available.** Summarize the key columns, highlight interesting fields, and mention what option values exist for categorical fields. Keep it conversational — don't just dump a column list.
3. **Run sample queries.** Pick something interesting and concrete. Run 2-3 queries to gather enough data for a compelling visualization. Use `execute_sql_query` for exploratory queries. Examples:
   - Consumer: Count by state, age distribution, income breakdown, contact coverage rates
   - B2B: Top industries by company count, employee size distribution
   - Movers: Monthly volume trends, top origin/destination states
   - Property: Property type mix, median value by type, age of housing stock
   - Dealerships: Makes available, geographic coverage, dealer count by state
4. **Build a visualization.** Take the query results and create a React (.jsx) chart or dashboard. This is the "wow" moment — make it polished and informative. Save the .jsx file and present it to the user.
5. **Narrate the results.** Walk the user through what the visualization shows. Point out interesting patterns, notable numbers, and actionable insights. Keep it conversational.
6. **Suggest a follow-up.** Offer 2-3 natural next steps the user could try: "Want to filter this by state?", "Shall we check email coverage for this group?", "Ready to build an audience from this?"

### Topic-specific guidance:

#### Explore your data
- Call `get_schema` for each relevant database
- Walk through the table structure and highlight the most useful columns
- Explain the difference between the catalogs (AwsDataCatalog vs lsc_data_catalog)
- Show an example of how filters work with a simple count query
- **Visualization:** Create a data landscape overview — a dashboard-style .jsx showing total record counts per database/table as a bar chart, with key stats (total records, databases, tables) as big stat cards at the top

#### Demographic snapshot (consumer)
- Run a multi-dimension summary: state distribution, age ranges, income brackets, homeowner mix
- Check phone and email coverage rates
- Frame it as "Here's a bird's eye view of your consumer universe"
- **Visualization:** Build a multi-panel demographic dashboard .jsx with:
  - Top states as a horizontal bar chart
  - Age distribution as a vertical bar chart / histogram
  - Income brackets as a bar chart
  - Homeowner vs renter as a donut chart
  - Phone/email coverage as progress bars or gauges
  - Total universe count as a big hero number at the top

#### B2B exploration
- Show industry breakdown (SIC or NAICS)
- Employee count and revenue distributions
- Geographic spread
- Contact availability
- **Visualization:** B2B landscape dashboard .jsx with:
  - Top industries as a horizontal bar chart
  - Company size distribution (employee count buckets) as a bar chart
  - Revenue tiers as a bar chart
  - Geographic heatmap or top-states bar chart

#### Mover data
- Show recent volume by month or quarter
- Origin vs destination analysis
- Mover type breakdown (individual, family, etc.)
- Key fields available for targeting
- **Visualization:** Mover trends dashboard .jsx with:
  - Monthly/quarterly volume as a line or area chart (this is the "hero" chart)
  - Top origin states vs top destination states as paired horizontal bars
  - Mover type breakdown as a donut chart

#### Property records
- Property type distribution
- Value ranges and medians
- Geographic coverage
- Year built distribution
- **Visualization:** Property insights dashboard .jsx with:
  - Property type mix as a donut chart
  - Value distribution as a histogram / bar chart with buckets
  - Year built timeline as a bar chart showing housing stock age
  - Top states by property count as horizontal bars

#### Dealership lookup
- Available makes/brands
- Geographic coverage by state
- Dealer count summaries
- How to search for specific dealers or makes
- **Visualization:** Dealership overview .jsx with:
  - Top makes/brands by dealer count as a horizontal bar chart
  - Geographic coverage as a state bar chart
  - Total dealer count and make count as stat cards

#### Build your first audience
- Walk the user through the full audience-building workflow step by step
- Help them pick a target (geography + demographics or firmographics)
- Run a count estimate first
- Check contact coverage
- Use `run_audience_query` to create the audience
- Explain the results and what they can do next (download CSV, refine, segment)
- **Visualization:** After the audience is built, create an audience profile dashboard .jsx showing:
  - Total audience size as a hero stat
  - Geographic breakdown of the audience as a bar chart
  - Key demographic splits (age, income, etc.) relevant to the filters used
  - Contact coverage (phone %, email %) as progress bars with the actual numbers
  - A "what you can do next" section with action suggestions

## Phase 4: What's Next

After the user has explored a topic, always circle back with:

1. **Offer to explore another topic** from the menu
2. **Mention key workflows** they can use going forward:
   - `/blue-contact:audience-pull [description]` — quick audience builds from a one-line description
   - `/blue-contact:audience-report` — generate a polished PPTX or PDF from any audience
   - `/blue-contact:audience-compare` — compare two audiences side-by-side
   - `/blue-contact:market-sizing` — size a target market with TAM analysis and opportunity dashboards
   - `/blue-contact:industry-playbooks` — pre-built recipes for real estate, automotive, insurance, home services, and more
   - `/blue-contact:audience-monitor` — set up recurring checks to track how your audiences change over time
   - `/blue-contact:data-health` — run a diagnostic on your data quality, coverage, and completeness
   - Ask Claude to analyze or query your data conversationally at any time
   - Ask Claude to visualize any query results — charts, dashboards, comparisons, trend lines
3. **Mention the data-analyst agent** — for complex multi-step analysis, Claude can use a specialized sub-agent
4. **Highlight the visualization angle** — remind users that any time they query data, they can ask Claude to chart it, compare segments visually, or build a dashboard. This is a key differentiator: "You're not just pulling lists — you can explore and visualize your data interactively."

## Style Guidelines

- Be warm, conversational, and encouraging — this is onboarding, not a technical manual
- Use plain language. Avoid jargon unless you're explaining it
- Run real queries and show real numbers — this isn't a slideshow, it's hands-on
- **Always visualize.** After every meaningful set of query results, build a chart or dashboard. The pattern is: query → visualize → narrate. Never just show raw table results when a chart would tell the story better
- Make the first visualization in the session especially polished — this is the user's first impression of what the platform can do
- Keep individual responses focused — don't overwhelm with everything at once
- Let the user drive the pace. After each step, pause for their input
- If a query returns no results or an error, handle it gracefully and try a different angle
- Celebrate small wins: "Nice — you've got 2.3M consumer records with 68% phone coverage. That's a strong starting point."
- When presenting visualizations, briefly explain what the chart shows and highlight 1-2 key takeaways, then let the user explore
