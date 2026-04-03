---
name: audience-monitor
description: Set up scheduled monitoring for Blue Contact audiences — track count changes, coverage trends, and get alerts when your data shifts
---

# Audience Monitoring

Set up recurring checks on Blue Contact audiences to track how they change over time. Useful for monitoring mover volume, tracking audience growth/decline, and catching coverage shifts.

## Workflow

### 1. Choose what to monitor

Use `AskUserQuestion` to understand what the user wants to track:

- **An existing audience** — Monitor an audience they've already built (get the ID from `list_audiences`)
- **A custom query** — Monitor a specific count or metric (e.g., "How many movers into Texas each week?")
- **Data coverage** — Track phone/email append rates for a segment over time

### 2. Define the monitoring parameters

Ask the user:
- **Frequency**: Daily, weekly, or monthly? (Use `AskUserQuestion`)
- **What to track**: Record count, contact coverage rates, geographic distribution, or all of the above?
- **Alert conditions** (optional): Should Claude notify them if the count changes by more than X%? If coverage drops below a threshold?

### 3. Build the monitoring query

Based on the user's selection, construct the SQL query that will run on each check:

**For audience monitoring:**
```sql
-- Get the audience's SQL from get_audience, then wrap it in a COUNT
SELECT COUNT(*) AS audience_size FROM (
  [original audience SQL]
)
```

**For coverage monitoring:**
```sql
SELECT
  COUNT(*) AS total,
  COUNT(phone) AS with_phone,
  COUNT(email) AS with_email,
  ROUND(COUNT(phone) * 100.0 / COUNT(*), 1) AS phone_pct,
  ROUND(COUNT(email) * 100.0 / COUNT(*), 1) AS email_pct
FROM catalog.database.table
WHERE [filters]
```

**For mover volume tracking:**
```sql
SELECT
  COUNT(*) AS mover_count
FROM catalog.database.movers_table
WHERE [geographic filters]
  AND move_date >= DATE_ADD('day', -7, CURRENT_DATE)  -- last 7 days for weekly
```

### 4. Create the scheduled task

Use the `create_scheduled_task` tool to set up the recurring check. The task prompt should:

1. Run the monitoring query using `execute_sql_query`
2. Compare results to previous runs (store in the task's conversation history via `save_message`)
3. Summarize findings
4. Flag any significant changes (>10% shift in count, >5% shift in coverage)

**Example cron expressions:**
- Daily at 8am: `0 8 * * *`
- Weekly on Monday at 9am: `0 9 * * 1`
- Monthly on the 1st at 8am: `0 8 1 * *`

**Task prompt template:**
```
You are monitoring a Blue Contact audience. Run the following query and report the results:

[SQL query]

After running the query:
1. Report the current metrics (count, coverage rates if applicable)
2. Compare to the previous check if available
3. Note any significant changes (>10% count change, >5% coverage change)
4. Save the results to audience [ID] conversation history using save_message

Audience: [name]
Previous count: [if known]
Alert threshold: [if set]
```

### 5. Confirm setup

After creating the scheduled task, confirm with the user:
- What's being monitored and how often
- When the first check will run
- How they'll be notified of results
- How to modify or cancel the monitor (update or disable the scheduled task)

### 6. Optional: Historical dashboard

If the user wants to see trends over time after several monitoring runs:
- Gather historical data points from the audience's conversation history (`get_audience` with message history)
- Build a React (.jsx) trend visualization showing count/coverage over time as a line chart
- Highlight any significant changes or inflection points

## Monitor Types

### Audience Size Monitor
Tracks total record count for a saved audience. Good for detecting data refreshes, seasonal shifts, or filter drift.

### Mover Volume Tracker
Tracks new mover volume for a geography. Particularly valuable because mover data changes constantly — weekly monitoring catches trends early.

### Coverage Watchdog
Monitors phone and email append rates for a segment. Alerts if coverage drops, which could indicate data quality issues or changes in append sources.

### Market Pulse
Monitors multiple metrics for a broad market definition — combines count, coverage, and top-state distribution into a weekly snapshot.

## Notes

- Monitoring uses `execute_sql_query` (not `run_audience_query`) to avoid creating new audience runs for each check
- Each monitoring run is lightweight — just a COUNT or summary query
- Historical data accumulates in the audience's conversation history via `save_message`
- The scheduled task runs in its own session, so results are delivered as notifications
