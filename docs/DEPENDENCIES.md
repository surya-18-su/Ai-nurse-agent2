# External Dependencies Justification

| Dependency       | Justification                                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------ |
| `better-sqlite3` | High-performance, synchronous SQLite engine necessary for local-first storage without large engine binaries. |
| `drizzle-orm`    | Type-safe ORM built for TS without the heavy query-engine binary overhead of Prisma.                         |
| `pino`           | Fast, low-overhead structured logger with built-in redaction for privacy filtering.                          |
| `zod`            | Critical for runtime boundary validation and deriving strict TS schemas for LLM and application outputs.     |
| `commander`      | Standard robust parser for building the CLI surface.                                                         |
| `@clack/prompts` | Simple, beautiful CLI prompts for interactive flows in the CLI tool.                                         |
| `dotenv`         | Essential for loading `.env` configuration robustly.                                                         |
| `vitest`         | Fast testing framework native to ESM for unit and integration testing.                                       |
