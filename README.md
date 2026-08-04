# CareerOps X

**Local-first, privacy-preserving, multi-agent job search & application platform.**

CareerOps X is an autonomous decision-support and drafting cockpit. It structurally prevents LLM hallucination, focuses on high-quality matching, and never sends your data out without your permission.

## Features

- **Deterministic Triage (Zero-Token):** Automatically filters up to 80% of jobs using hard requirements before doing LLM processing.
- **Evidence-Bound Content:** An Evidence Validator verifies that every claim in the generated resume corresponds precisely to your source CV. No fabricated numbers, no fake roles, and no seniority escalation.
- **Tier 1 ATS Acquisition:** Automatically fetches and maps ATS data from platforms like Greenhouse, Lever, Ashby, and Workday deterministically via their native APIs. No scraping rot.
- **Typst Resume Engine:** Uses Typst under the hood to generate ATS-friendly, correctly linear-extracted PDF resumes.
- **Privacy-First:** `LLM_PROVIDER=ollama` ensures offline functionality. `careerops privacy audit` audits network activity. Pre-commit hooks guarantee you never leak secrets or your `data/` directory.

## 60-Second Quickstart

1. **Install:**

   ```bash
   pnpm install
   pnpm turbo run build
   ```

2. **Initialize:** (Populate your config in `data/profile/cv.md` and settings)

   ```bash
   node apps/cli/dist/index.js init
   node apps/cli/dist/index.js doctor
   ```

3. **Discover ATS systems:**

   ```bash
   node apps/cli/dist/index.js discover stripe.com
   ```

4. **Tailor a resume based on an ATS job ID:**
   ```bash
   node apps/cli/dist/index.js tailor <jobId>
   ```

## Architecture

Built on Turborepo, TypeScript, Drizzle ORM (SQLite), Vercel AI SDK, and Commander. The core modules strictly validate outputs deterministically before saving locally.

See [ARCHITECTURE.md](docs/ARCHITECTURE.md) and [LEGAL.md](docs/LEGAL.md) for deeper integrations on constraints.
