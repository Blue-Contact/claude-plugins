![Blue Contact](logo.svg)

# Blue Contact Plugin for Claude Code & Cowork

Query consumer, B2B, mover, property, and dealership data through natural language. Build targeted audiences, generate reports, visualize data, and analyze demographics — all without writing SQL.

## What's included

- **MCP Connection** to Blue Contact's data platform (`query.bluecontact.com/mcp`)
- **11 skills** covering onboarding, data querying, audience building, reporting, market sizing, industry playbooks, monitoring, and diagnostics
- **Slash commands** for quick access to common workflows
- **Sub-agent** `data-analyst` for complex multi-step analysis
- **Interactive visualizations** — React-based dashboards and charts built from your data in real time

## Skills

| Skill | Command | Description |
|-------|---------|-------------|
| Getting Started | `/blue-contact:getting-started` | Interactive guided tour — discovers your data and walks you through it with live visualizations |
| Setup | `/blue-contact:setup` | Connection and configuration troubleshooting |
| Data Querying | *Automatic* | Domain knowledge for querying all Blue Contact datasets — activates when you ask data questions |
| Audience Building | *Automatic* | Structured workflow for building targeted marketing audiences — activates when you describe an audience |
| Audience Pull | `/blue-contact:audience-pull` | Quick audience builds from a one-line description |
| Audience Report | `/blue-contact:audience-report` | Generate polished PPTX or PDF reports from an audience |
| Audience Compare | `/blue-contact:audience-compare` | Side-by-side comparison of two audiences with difference analysis |
| Market Sizing | `/blue-contact:market-sizing` | Size a target market with TAM analysis, breakdowns, and a market opportunity dashboard |
| Industry Playbooks | `/blue-contact:industry-playbooks` | Pre-built audience recipes for real estate, automotive, insurance, home services, and more |
| Audience Monitor | `/blue-contact:audience-monitor` | Scheduled monitoring for audience count changes, coverage trends, and alerts |
| Data Health Check | `/blue-contact:data-health` | Comprehensive data quality diagnostic with a visual report card |

## Installation

### Claude Code (official marketplace)

```shell
/plugin install blue-contact@claude-plugins-official
```

Or browse the `/plugin` Discover tab and search for "Blue Contact".

### Claude Code (self-hosted marketplace)

```shell
/plugin marketplace add bluecontact/claude-plugins
/plugin install blue-contact@bluecontact-plugins
```

### Claude Code (local/development)

```shell
claude --plugin-dir ./blue-contact
```

### Cowork

Browse and install via Cowork → Customize → Browse plugins.
Or upload the plugin ZIP directly: Cowork → Plugins → "+" → Upload.
Organization admins can also push the plugin via GitHub sync or manual upload.

## Examples

### Quick audience build
> "Build me an audience of homeowners in Austin, TX aged 30-45 with household income over $100k. I need name, address, phone, and email."

### Mover analysis
> "How many people moved from Puerto Rico to the US mainland in the last 12 months? Break it down by destination state."

### Dealership lookup
> "Find all Toyota dealerships in Florida with their contact information."

### B2B targeting
> "I need tech companies in the Bay Area with 50-200 employees and revenue over $10M."

### Market sizing
> "How big is the market of renters aged 25-35 with income over $75K in the top 10 US metros?"

### Industry playbook
> "I'm a roofing company in Dallas — help me find homeowners with older homes who might need roof replacement."

### Audience report
> "Generate a presentation from my latest audience so I can share it with the client."

### Data health check
> "Run a health check on my data — I want to see coverage rates, completeness, and geographic spread."

## Data available

| Dataset | Catalog | Key fields |
|---------|---------|------------|
| Consumer | AwsDataCatalog | Name, address, phone, email, age, income, homeowner status, ethnicity, children |
| B2B | AwsDataCatalog | Company name, address, SIC/NAICS, employees, revenue |
| Movers | AwsDataCatalog | Origin, destination, move date, mover type |
| Property | AwsDataCatalog | Address, property type, value, sqft, year built |
| Dealership | lsc_data_catalog | Dealer name, location, make/brand, inventory |

## Privacy & Data Use

Blue Contact data is licensed for marketing and analytics purposes. Users are responsible for compliance with applicable laws (CAN-SPAM, TCPA, state privacy laws). See Blue Contact's privacy policy at: https://bluecontact.com/privacy

## Support

- Email: support@bluecontact.com
- GitHub Issues: https://github.com/bluecontact/claude-plugins/issues
