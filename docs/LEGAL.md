# Legal & Terms of Service Boundaries

## The AI Job Application Problem

Automated scraping architectures are an explicit legal liability. High-profile job portals (LinkedIn, Indeed) enforce anti-scraping and auto-application terms actively.

## Guardrails

1. **No direct scraping of Tier 3 platforms.** CareerOps utilizes Tier 1 APIs (JSON ATS APIs provided natively by platforms).
2. **No User-Agent Spoofing or Proxy Botting.** Requests are rate limited explicitly through bounded asynchronous generators.
3. **Explicit Auto-fill Check.** `careerops apply --fill` will load Playwright and fill inputs but **will halt** at the final submission review step. Submit requires interactive or explicit confirmation flag.
