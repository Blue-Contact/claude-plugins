---
name: audience-pull
description: Build a targeted data audience from Blue Contact
argument-hint: "description of target audience"
allowed-tools:
  - blue-contact:get_schema
  - blue-contact:get_query_instructions
  - blue-contact:validate_sql
  - blue-contact:run_audience_query
  - blue-contact:execute_sql_query
  - blue-contact:create_audience
  - blue-contact:save_message
---

# /blue-contact:audience-pull

The user wants to build a targeted audience. Follow the audience-building workflow:

1. Parse the user's description of their target audience
2. Call `get_query_instructions` and `get_schema` (no params for summary, then with `database` param for full schema) if not already loaded
3. Clarify any ambiguities (geography, demographics, data type, output fields)
4. Run a COUNT estimate first via `execute_sql_query`
5. Check contact coverage (phone/email append rates) via `execute_sql_query`
6. Execute the audience query atomically with `run_audience_query` (pass `sql`, `reasoning`, `user_prompt`, and `audience_title`)
7. Present a summary report with record count, coverage rates, and key breakdowns
