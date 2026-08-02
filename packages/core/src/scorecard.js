import { z } from 'zod';
export const DimensionSchema = z.object({
  score: z.number().min(0).max(100),
  confidence: z.enum(['high', 'medium', 'low']),
  evidence: z.array(z.string()), // quoted spans from the JD
  rationale: z.string().max(400),
});
export const ScoreCardSchema = z.object({
  jobId: z.string(),
  overall: z.number().int().min(0).max(100),
  grade: z.enum(['A', 'B', 'C', 'D', 'F']),
  dimensions: z.object({
    skillMatch: DimensionSchema,
    experienceFit: DimensionSchema,
    workModelFit: DimensionSchema,
    compensationFit: DimensionSchema,
    companySignal: DimensionSchema,
    trustSignal: DimensionSchema,
  }),
  gapAnalysis: z.object({
    matchedRequirements: z.array(
      z.object({ requirement: z.string(), evidenceIds: z.array(z.string()) })
    ),
    partialMatches: z.array(
      z.object({
        requirement: z.string(),
        evidenceIds: z.array(z.string()),
        gap: z.string(),
      })
    ),
    missingRequirements: z.array(
      z.object({
        requirement: z.string(),
        severity: z.enum(['blocker', 'significant', 'minor']),
        mitigations: z.array(z.string()),
      })
    ),
    atsKeywords: z.array(
      z.object({
        term: z.string(),
        presentInCv: z.boolean(),
        truthfullyAddable: z.boolean(),
        suggestedPlacement: z.string().nullable(),
      })
    ),
  }),
  applyRecommendation: z.enum(['strong_apply', 'apply', 'stretch', 'skip']),
  reasoning: z.string().max(1200),
  meta: z.object({
    model: z.string(),
    promptVersion: z.string(),
    tokensIn: z.number(),
    tokensOut: z.number(),
    costUsd: z.number(),
    latencyMs: z.number(),
    evaluatedAt: z.string().datetime(),
  }),
});
//# sourceMappingURL=scorecard.js.map
