---
name: industry-playbooks
description: Pre-built audience recipes for specific verticals — real estate, automotive, insurance, home services, financial services, and more. Pick your industry and get a tailored audience in minutes.
---

# Industry Playbooks

Guided audience-building templates tailored to specific industry verticals. Each playbook knows which data points matter most for that industry, asks the right questions, and builds an optimized audience with the most relevant fields.

## Workflow

### 1. Select an industry

Use `AskUserQuestion` to present available playbooks. Only show playbooks that match the user's available data (check with `get_schema` first):

- **Real Estate** — Target homeowners, recent movers, or properties by type/value/age. Great for agents, brokerages, and property services.
- **Automotive** — Reach consumers near dealerships, target by demographics and geography. Combine consumer data with dealership locations.
- **Insurance** — Homeowners, specific age/income segments, property values. Build prospect lists for home, auto, or life insurance campaigns.
- **Home Services** — Target by property age, type, value, and homeowner status. Ideal for HVAC, roofing, plumbing, landscaping.
- **Financial Services** — Income-based targeting, age segments for retirement/wealth planning, homeowner equity prospects.
- **Healthcare / Wellness** — Age and demographic targeting for health-related services, geographic radius targeting.
- **Moving Services** — Recent movers by origin/destination, mover type, timing. Perfect for moving companies and related services.
- **Retail / E-commerce** — Consumer demographic and geographic targeting for store locations or direct mail campaigns.

### 2. Run the selected playbook

Each playbook follows the same structure but with industry-specific defaults, questions, and output fields.

---

### Real Estate Playbook

**Best data sources**: Consumer + Property + Mover

**Ask the user:**
- What's your focus? (Sellers: target long-tenure homeowners; Buyers: target renters or recent movers; Investors: target multi-family properties)
- Geographic focus? (State, city, zip, or radius around an area)
- Property value range? (Helps match listings to prospects)
- Any age or income preferences?

**Default output fields**: Name, address, phone, email, homeowner status, property type, property value, year built, length of residence, age, income

**Sample queries:**
- Likely sellers: Homeowners in [area] with property owned 10+ years, property value $200K-$500K
- Likely buyers: Renters aged 25-45 with income $75K+ in [area]
- Recent movers into area: Movers with destination in [zip/city] in last 6 months

**Visualization**: Property value distribution + geographic heat map + homeowner tenure chart

---

### Automotive Playbook

**Best data sources**: Consumer + Dealership

**Ask the user:**
- What's the goal? (Service marketing, new vehicle sales, conquest campaigns)
- Which makes/brands? (Match to dealership inventory)
- Geographic radius around dealership(s)?
- Any demographic targeting? (Age, income, family status)

**Default output fields**: Name, address, phone, email, age, income, gender, presence of children, distance to nearest dealer

**Sample queries:**
- Service conquest: Consumers within 15-mile radius of [dealer], age 25-65, income $50K+
- New car buyers: Consumers near [make] dealerships, age 30-55, income $75K+, homeowners

**Visualization**: Consumer density around dealership locations + age/income distribution + coverage rates

---

### Insurance Playbook

**Best data sources**: Consumer + Property

**Ask the user:**
- Insurance type? (Home, auto, life, umbrella)
- Geographic focus?
- Property value or income thresholds?
- Age range for the target segment?

**Default output fields**: Name, address, phone, email, age, income, homeowner status, property type, property value, marital status, presence of children

**Sample queries:**
- Home insurance: Homeowners in [state] with property value $150K-$750K, age 30-65
- Life insurance: Consumers aged 25-55 with income $60K+, presence of children
- High-value umbrella: Homeowners with property value $500K+, income $150K+

**Visualization**: Property value tiers + age distribution + income brackets + coverage funnel

---

### Home Services Playbook

**Best data sources**: Consumer + Property

**Ask the user:**
- What service? (HVAC, roofing, plumbing, landscaping, remodeling, solar)
- Geographic service area?
- Property age preference? (Older homes = more service needs)
- Homeowner income range? (Ability to pay)

**Default output fields**: Name, address, phone, email, homeowner status, property type, property value, year built, square footage, lot size, age, income

**Sample queries:**
- Roofing leads: Homeowners with property built before 1995, value $150K+, in [area]
- HVAC prospects: Homeowners with property built before 2000, square footage 1500+, in [area]
- Remodeling: Homeowners with property 20+ years old, income $75K+, property value $200K-$400K

**Visualization**: Property age distribution + value ranges + geographic density + homeowner income profile

---

### Financial Services Playbook

**Best data sources**: Consumer + Property

**Ask the user:**
- What product? (Wealth management, retirement planning, lending, credit cards)
- Income threshold?
- Age range?
- Geographic focus?
- Homeowner preference? (Equity = asset indicator)

**Default output fields**: Name, address, phone, email, age, income, homeowner status, property value, marital status, presence of children

**Sample queries:**
- Wealth management: Consumers aged 45-70, income $150K+, homeowners with property value $400K+
- Retirement planning: Consumers aged 55-70, income $75K+, homeowners
- First-time mortgage: Renters aged 25-40, income $60K+, in [area]

**Visualization**: Income distribution + age segments + homeowner equity profile + geographic opportunity

---

### Moving Services Playbook

**Best data sources**: Mover + Consumer

**Ask the user:**
- Inbound or outbound movers? (Or both)
- Geographic focus? (Destination state/city for inbound; origin for outbound)
- Time window? (Last 30 days, 90 days, 6 months?)
- Mover type? (Individual, family)

**Default output fields**: Name, address, phone, email, origin address, destination address, move date, mover type

**Sample queries:**
- Inbound movers: People who moved to [state/city] in the last 90 days
- Outbound movers: People leaving [state/city] in the last 90 days
- Family movers: Family-type movers into [area] in last 6 months

**Visualization**: Monthly mover volume trend + top origin/destination states + mover type breakdown

---

### 3. Execute the playbook

For whichever playbook is selected:

1. Load the full schema for relevant databases
2. Ask the playbook-specific questions using `AskUserQuestion`
3. Build the SQL query using the playbook's default fields and the user's answers
4. Run a COUNT estimate first via `execute_sql_query`
5. Check contact coverage (phone/email rates)
6. If the count looks good, build the audience with `run_audience_query`
7. Create the industry-specific visualization dashboard (.jsx)
8. Present results with the visualization and a conversational summary
9. Offer next steps: refine, generate report, compare to another segment, size the broader market

### 4. Cross-sell other skills

After the audience is built, mention relevant next steps:
- "Want a polished report to share with your team?" → `audience-report`
- "Curious how this compares to a different geography?" → `audience-compare`
- "Want to see the total market size before narrowing down?" → `market-sizing`
