# 1. Monorepo and Tooling Selection

Date: 2025-07-31

## Status

Accepted

## Context

We need a monorepo setup to split our backend domain packages (e.g. database schema, llm logic, evidence parsing) and application frontends (cli, web) cleanly, with reliable builds.

## Decision

We have chosen **Turborepo** with **pnpm workspaces** due to:

- Native speed and caching mechanisms.
- Simple integration for Next.js and typical Node.js command-line apps.
- `pnpm` offers strict resolution making dependency hoist-leaks less likely to occur compared to npm/yarn.

## Consequences

Developers must use `pnpm` specifically instead of `npm`.
