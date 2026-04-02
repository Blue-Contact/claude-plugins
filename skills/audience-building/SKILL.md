---
name: audience-building
description: Workflow knowledge for building targeted marketing audiences with Blue Contact data
---

# Audience Building with Blue Contact

When a user wants to build a targeted audience, follow this structured workflow:

## Workflow

1. **Clarify the target.** Ask about:
   - Geographic scope (state, city, zip, DMA)
   - Demographic filters (age range, income, homeowner status, etc.)
   - Data type needed (consumer, B2B, mover, property, dealership)
   - Output fields desired (name, address, phone, email, etc.)
   - Volume expectations (how many records)

2. **Load query context.** Call `get_query_instructions` and `get_schema` (two-step: summary first, then full schema for relevant databases) if not already loaded this session.

3. **Check coverage first.** Before building the full audience, run a COUNT query via `execute_sql_query` to estimate volume:
   ```sql
   SELECT COUNT(*) FROM catalog.database.table WHERE [filters]
   ```

4. **Validate contact coverage.** If the user needs phone or email, check append rates via `execute_sql_query`:
   ```sql
   SELECT
     COUNT(*) AS total,
     COUNT(phone) AS with_phone,
     COUNT(email) AS with_email,
     ROUND(COUNT(phone) * 100.0 / COUNT(*), 1) AS phone_pct,
     ROUND(COUNT(email) * 100.0 / COUNT(*), 1) AS email_pct
   FROM catalog.database.table WHERE [filters]
   ```

5. **Build the audience atomically.** Use `run_audience_query` with:
   - `sql`: the final SELECT query
   - `reasoning`: array of bullet points explaining the query logic
   - `user_prompt`: the user's original request
   - `audience_title`: a descriptive name (optional — auto-generated from first message if omitted)

   This single call creates the audience, saves conversation history, creates a billing-tracked run, and executes the query.

   Note: Only use the separate `create_audience` → `save_message` → `run_audience_query(audience_id)` flow when you need to create the audience shell before the query is finalized (e.g., multi-turn refinement).

6. **Report results.** Summarize:
   - Total records
   - Contact coverage rates
   - Geographic distribution
   - Key demographic breakdown

## Best practices
- Start with count estimates before pulling full data
- Always include contact coverage analysis when the audience is for outreach
- Use `save_message` to log query context and results to the audience for future reference
- For very large audiences (100k+), suggest geographic or demographic sub-segmentation
- Remember the 100,000 row limit per query — segment if needed
