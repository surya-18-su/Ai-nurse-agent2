# CareerOps X Architecture

## Overview

CareerOps X is a local-first, privacy-preserving, multi-agent job search and application platform.

## Key Principles

- **Privacy & Local-first**: All PII and applications live under `data/` and never leave the local machine.
- **Evidence-Bound Generation**: AI outputs must be bounded to verifiable facts parsed from a candidate's Evidence Store.
- **Tiered Job Acquisition**:
  1. High-reliability Tier 1 official JSON APIs.
  2. Opt-in web automation and human-guided scraping for Tier 2/3.
- **Two-Pass Match Engine**: Uses deterministic triage and a scalable pipeline for job fit matching.

## Architecture

- **Monorepo**: Turborepo + pnpm workspaces.
- **Core Runtime**: Node 22 (no python defaults).
- **Storage**: SQLite via Drizzle ORM.
- **Packages Layout**:
  - `apps/cli`: CLI interface built with Commander & Ink.
  - `apps/web`: Next.js 15 UI.
  - `packages/shared`: Configuration, Zod types, Result objects.
  - `packages/db`: SQLite database and repository classes.
  - `packages/llm`, `packages/sources`, `packages/evidence`, `packages/pdf`, `packages/core`.

## State and Data Models

Refer to the `packages/db/src/schema.ts` for entities such as `jobs`, `applications`, `evidence`, etc.
