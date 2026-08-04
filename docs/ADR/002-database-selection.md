# 2. Local-First Database Selection

Date: 2025-07-31

## Status

Accepted

## Context

The architecture demands a local-first system that stores data privately. Using a traditional server-based database like PostgreSQL or MySQL violates this. At the same time, we require strong typing, robust migrations, and zero external downloads during run-time that would block a completely offline configuration.

## Decision

We have chosen **SQLite** via **better-sqlite3**, interacting via the **Drizzle ORM**.
Prisma was evaluated but rejected due to its requirement of downloading external binaries for the query engine.

## Consequences

- We get a single `.db` file locally.
- We must compile native addons (`better-sqlite3`).
- Drizzle allows us to store the migration `.sql` files directly in version control.
