# FakerDB v2: agentic data generation (draft)

Status: design draft. Nothing here is implemented yet. The public early access page is in [`landing/`](../landing).

## Why v1 hits a wall

v1 generates a whole dataset in a single model call. `generateMultitableData` (`src/services/sqlGenerationService.ts`) already sorts the tables by dependency, but then asks for every `CREATE TABLE` and every `INSERT` in one prompt, capped at 8,192 output tokens (`src/lib/geminiClient.ts`). That design breaks in predictable ways as soon as a schema gets realistic:

- **Dangling foreign keys.** By the time the model writes child rows, the parent IDs it wrote earlier are far back in its own output. It invents IDs that don't exist.
- **Truncation.** Large row counts don't fit in one response, so the script stops mid-statement.
- **Ignored constraints.** Unique columns collide, check constraints are skipped, and cross-row rules (an order total equal to the sum of its line items, a ship date after the order date) are never verified.
- **No feedback.** Nothing checks the output, so the user discovers the errors when the script fails to import.

## The v2 idea

Replace the single prompt with an agent that works in four passes and checks its own work. The model writes values; code owns everything that must be exact.

### 1. Plan
- Parse the schema (diagram or pasted DDL) into a table graph: columns, types, keys, uniques, checks.
- Resolve the foreign-key graph, detect cycles, and decide the insert order. Cycles are broken with nullable foreign keys filled in a second pass.
- Infer extra rules from column names and types (`created_at` before `updated_at`, totals that add up, a country consistent with phone and postcode), and show them to the user before generating.
- Split each table into batches.

### 2. Generate
- Parent tables first, one batch at a time.
- Primary keys, sequences and foreign-key values come from code, never from the model. A child batch receives the list of real parent IDs to draw from.
- The model only writes the realistic values: names, addresses, text, amounts, dates.

### 3. Validate
- Check every batch against the schema with code: types and lengths, `NOT NULL`, primary keys, uniques, foreign keys, check constraints.
- Check the inferred cross-row rules from the plan.
- Optionally load the result into a throwaway database of the target dialect, so the script is proven to import.

### 4. Repair
- Send only the failing rows back to the model, with the exact violation.
- Re-validate, with a retry limit. Rows that still fail are reported, never silently dropped.

### Output
The same exports as v1 (SQL script, CSV bundle), ordered to import with every constraint enabled, plus a run log of what was planned, generated, checked and repaired.

## What changes for users
- No API key: generation runs server-side and is paid with credits.
- Datasets up to 100,000 rows, built in batches instead of one response.
- A visible run log, so users can see what was checked.

## Open questions
- Where the agent runs (long runs need a job queue and progress streaming to the UI).
- How the run log is stored and shown in the app.
- Batch size per table, and how much of each previous batch the model sees.
- Pricing: how credits map to rows and table width.
