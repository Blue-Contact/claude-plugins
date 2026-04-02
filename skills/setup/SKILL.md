---
name: setup
description: Guide the user through connecting and configuring Blue Contact
---

# Blue Contact Setup

When a user first installs this plugin or encounters a connection issue, walk them through these steps:

1. **Verify the Blue Contact MCP connection is active.** The plugin connects to `https://query.bluecontact.com/mcp` using OAuth 2.1 Bearer token authentication. If the user sees authentication errors, ask them to check their Blue Contact credentials.

2. **Confirm available data catalogs.** Blue Contact exposes two Athena catalogs:
   - `AwsDataCatalog` — primary consumer, B2B, property, and mover data
   - `lsc_data_catalog` — dealership and automotive data

3. **Test connectivity.** Run a simple count query against a known table to verify the connection is live. Avoid `SELECT 1` as it may not pass the SQL validator.

4. **Explore the schema using the two-step pattern.**
   - First, call `get_schema` with no parameters to get a lightweight summary of available databases and table counts.
   - Then, call `get_schema` with a specific `database` parameter to get the full column-level schema for that database (including column types, valid options, and prompt guidance).

5. **Set expectations.** Let the user know:
   - Queries run against AWS Athena (Presto/Trino SQL dialect)
   - Results are returned directly in conversation
   - Complex audience pulls may take 10-30 seconds
   - The `get_query_instructions` tool provides SQL guidelines specific to the platform
   - All queries must be SELECT-only — no DDL, DML, or semicolons
