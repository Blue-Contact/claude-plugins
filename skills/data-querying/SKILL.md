---
name: data-querying
description: Domain knowledge for querying Blue Contact's consumer, B2B, mover, property, and dealership databases
---

# Blue Contact Data Querying

You have access to Blue Contact's data platform via MCP. When a user asks about consumer data, demographics, businesses, movers, property records, or dealership information, use these tools and patterns.

## Available Tools

- `get_schema` — Returns database schema. Call with no parameters for a lightweight summary of databases and table counts. Call with a specific `database` parameter for the full column-level schema (types, valid options, prompt guidance). Schema is cached for 5 minutes per database.
- `get_query_instructions` — Returns SQL guidelines, safety rules, normalization requirements, and field type handling rules. Call once per session before writing queries.
- `validate_sql` — Validates a SQL query against safety filters before execution. Returns `{valid, normalized_sql, query_type, rejected_keywords, message}`. Query type is either "count" or "data_extraction".
- `run_audience_query` — **Primary tool for audience work.** Atomically creates/updates an audience, saves conversation history, creates a billing-tracked run, and executes the query. Required parameters: `sql`, `reasoning` (array of strings), `user_prompt`. Optional: `audience_id` (omit to create new audience), `audience_title`, `per_page` (default 10).
- `execute_sql_query` — Executes a raw ad-hoc SQL query against Athena. Use for exploratory queries that don't need audience persistence. Supports pagination via `per_page`, `execution_id`, and `next_token`.
- `create_audience` — Creates a new named audience shell. Only needed when you want to create the audience before the query is finalized. For most flows, `run_audience_query` handles creation atomically.
- `get_audience` — Retrieves full audience state including conversation history, latest SQL, reasoning, and latest run status. Parameters: `audience_id` (required), `message_limit` (1-50, default 20).
- `list_audiences` — Lists all audiences for the user. Parameters: `status` (draft/active/archived, optional), `limit` (1-100, default 25).
- `save_message` — Persists a message to an audience's conversation history. Parameters: `audience_id` (required), `role` (user/assistant), `content`, and optionally `sql` and `reasoning` (array). Creates version snapshots when SQL differs from previous version.

## Query Patterns

### Always do first
1. Call `get_query_instructions` if you haven't already in this session — it contains critical SQL rules
2. Call `get_schema` (no params) to see available databases, then `get_schema(database: "database_name")` to get the full column-level schema for relevant databases
3. Use `validate_sql` before executing any query

### Key conventions
- Blue Contact uses AWS Athena (Presto/Trino SQL dialect)
- Two catalogs: `AwsDataCatalog` (consumer/B2B/mover/property) and `lsc_data_catalog` (dealership)
- Tables are fully qualified as `catalog.database.table_name` in queries
- Multi-table joins across catalogs are supported
- All queries must be SELECT-only — no DDL, DML, or semicolons allowed
- Maximum 100,000 rows per query
- Boolean fields: use `true`/`false` (no quotes)
- Categorical fields: use exact option values from the schema — never invent values
- State codes: use two-letter abbreviations (e.g., Minnesota → MN)
- Always validate SQL with `validate_sql` before running
- For audience creation, use `run_audience_query` — it persists results and tracks the query atomically

### Common query types
- **Consumer demographics**: age, income, gender, ethnicity, homeowner status, presence of children
- **Geographic targeting**: state, city, zip, county, DMA, SCF
- **B2B lookups**: company name, SIC/NAICS codes, employee count, revenue
- **Mover data**: origin/destination, move date, mover type (individual/family)
- **Property records**: property type, value, square footage, lot size, year built
- **Dealership data**: dealer name, location, make/brand, inventory type
- **Contact coverage**: phone, email, and address append rates for any audience segment
