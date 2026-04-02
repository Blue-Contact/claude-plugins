# Blue Contact Plugin for Claude Code & Cowork

Query consumer, B2B, mover, property, and dealership data through natural language. Build targeted audiences, generate reports, and analyze demographics — all without writing SQL.

## What's included

- **MCP Connection** to Blue Contact's data platform (`query.bluecontact.com/mcp`)
- **Skills** for data querying, audience building, and guided setup
- **Slash command** `/blue-contact:audience-pull` for quick audience builds
- **Sub-agent** `data-analyst` for complex multi-step analysis

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

### Example 1: Consumer audience pull
> "Build me an audience of homeowners in Austin, TX aged 30-45 with household income over $100k. I need name, address, phone, and email."

### Example 2: Mover analysis
> "How many people moved from Puerto Rico to the US mainland in the last 12 months? Break it down by destination state."

### Example 3: Dealership lookup
> "Find all Toyota dealerships in Florida with their contact information."

### Example 4: B2B targeting
> "I need tech companies in the Bay Area with 50-200 employees and revenue over $10M."

### Example 5: Contact coverage check
> "What's the phone and email coverage rate for renters aged 18-25 in Charlotte, NC?"

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
