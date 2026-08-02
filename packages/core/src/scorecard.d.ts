import { z } from 'zod';
export declare const DimensionSchema: z.ZodObject<
  {
    score: z.ZodNumber;
    confidence: z.ZodEnum<['high', 'medium', 'low']>;
    evidence: z.ZodArray<z.ZodString, 'many'>;
    rationale: z.ZodString;
  },
  'strip',
  z.ZodTypeAny,
  {
    confidence: 'high' | 'medium' | 'low';
    score: number;
    evidence: string[];
    rationale: string;
  },
  {
    confidence: 'high' | 'medium' | 'low';
    score: number;
    evidence: string[];
    rationale: string;
  }
>;
export declare const ScoreCardSchema: z.ZodObject<
  {
    jobId: z.ZodString;
    overall: z.ZodNumber;
    grade: z.ZodEnum<['A', 'B', 'C', 'D', 'F']>;
    dimensions: z.ZodObject<
      {
        skillMatch: z.ZodObject<
          {
            score: z.ZodNumber;
            confidence: z.ZodEnum<['high', 'medium', 'low']>;
            evidence: z.ZodArray<z.ZodString, 'many'>;
            rationale: z.ZodString;
          },
          'strip',
          z.ZodTypeAny,
          {
            confidence: 'high' | 'medium' | 'low';
            score: number;
            evidence: string[];
            rationale: string;
          },
          {
            confidence: 'high' | 'medium' | 'low';
            score: number;
            evidence: string[];
            rationale: string;
          }
        >;
        experienceFit: z.ZodObject<
          {
            score: z.ZodNumber;
            confidence: z.ZodEnum<['high', 'medium', 'low']>;
            evidence: z.ZodArray<z.ZodString, 'many'>;
            rationale: z.ZodString;
          },
          'strip',
          z.ZodTypeAny,
          {
            confidence: 'high' | 'medium' | 'low';
            score: number;
            evidence: string[];
            rationale: string;
          },
          {
            confidence: 'high' | 'medium' | 'low';
            score: number;
            evidence: string[];
            rationale: string;
          }
        >;
        workModelFit: z.ZodObject<
          {
            score: z.ZodNumber;
            confidence: z.ZodEnum<['high', 'medium', 'low']>;
            evidence: z.ZodArray<z.ZodString, 'many'>;
            rationale: z.ZodString;
          },
          'strip',
          z.ZodTypeAny,
          {
            confidence: 'high' | 'medium' | 'low';
            score: number;
            evidence: string[];
            rationale: string;
          },
          {
            confidence: 'high' | 'medium' | 'low';
            score: number;
            evidence: string[];
            rationale: string;
          }
        >;
        compensationFit: z.ZodObject<
          {
            score: z.ZodNumber;
            confidence: z.ZodEnum<['high', 'medium', 'low']>;
            evidence: z.ZodArray<z.ZodString, 'many'>;
            rationale: z.ZodString;
          },
          'strip',
          z.ZodTypeAny,
          {
            confidence: 'high' | 'medium' | 'low';
            score: number;
            evidence: string[];
            rationale: string;
          },
          {
            confidence: 'high' | 'medium' | 'low';
            score: number;
            evidence: string[];
            rationale: string;
          }
        >;
        companySignal: z.ZodObject<
          {
            score: z.ZodNumber;
            confidence: z.ZodEnum<['high', 'medium', 'low']>;
            evidence: z.ZodArray<z.ZodString, 'many'>;
            rationale: z.ZodString;
          },
          'strip',
          z.ZodTypeAny,
          {
            confidence: 'high' | 'medium' | 'low';
            score: number;
            evidence: string[];
            rationale: string;
          },
          {
            confidence: 'high' | 'medium' | 'low';
            score: number;
            evidence: string[];
            rationale: string;
          }
        >;
        trustSignal: z.ZodObject<
          {
            score: z.ZodNumber;
            confidence: z.ZodEnum<['high', 'medium', 'low']>;
            evidence: z.ZodArray<z.ZodString, 'many'>;
            rationale: z.ZodString;
          },
          'strip',
          z.ZodTypeAny,
          {
            confidence: 'high' | 'medium' | 'low';
            score: number;
            evidence: string[];
            rationale: string;
          },
          {
            confidence: 'high' | 'medium' | 'low';
            score: number;
            evidence: string[];
            rationale: string;
          }
        >;
      },
      'strip',
      z.ZodTypeAny,
      {
        skillMatch: {
          confidence: 'high' | 'medium' | 'low';
          score: number;
          evidence: string[];
          rationale: string;
        };
        experienceFit: {
          confidence: 'high' | 'medium' | 'low';
          score: number;
          evidence: string[];
          rationale: string;
        };
        workModelFit: {
          confidence: 'high' | 'medium' | 'low';
          score: number;
          evidence: string[];
          rationale: string;
        };
        compensationFit: {
          confidence: 'high' | 'medium' | 'low';
          score: number;
          evidence: string[];
          rationale: string;
        };
        companySignal: {
          confidence: 'high' | 'medium' | 'low';
          score: number;
          evidence: string[];
          rationale: string;
        };
        trustSignal: {
          confidence: 'high' | 'medium' | 'low';
          score: number;
          evidence: string[];
          rationale: string;
        };
      },
      {
        skillMatch: {
          confidence: 'high' | 'medium' | 'low';
          score: number;
          evidence: string[];
          rationale: string;
        };
        experienceFit: {
          confidence: 'high' | 'medium' | 'low';
          score: number;
          evidence: string[];
          rationale: string;
        };
        workModelFit: {
          confidence: 'high' | 'medium' | 'low';
          score: number;
          evidence: string[];
          rationale: string;
        };
        compensationFit: {
          confidence: 'high' | 'medium' | 'low';
          score: number;
          evidence: string[];
          rationale: string;
        };
        companySignal: {
          confidence: 'high' | 'medium' | 'low';
          score: number;
          evidence: string[];
          rationale: string;
        };
        trustSignal: {
          confidence: 'high' | 'medium' | 'low';
          score: number;
          evidence: string[];
          rationale: string;
        };
      }
    >;
    gapAnalysis: z.ZodObject<
      {
        matchedRequirements: z.ZodArray<
          z.ZodObject<
            {
              requirement: z.ZodString;
              evidenceIds: z.ZodArray<z.ZodString, 'many'>;
            },
            'strip',
            z.ZodTypeAny,
            {
              requirement: string;
              evidenceIds: string[];
            },
            {
              requirement: string;
              evidenceIds: string[];
            }
          >,
          'many'
        >;
        partialMatches: z.ZodArray<
          z.ZodObject<
            {
              requirement: z.ZodString;
              evidenceIds: z.ZodArray<z.ZodString, 'many'>;
              gap: z.ZodString;
            },
            'strip',
            z.ZodTypeAny,
            {
              requirement: string;
              evidenceIds: string[];
              gap: string;
            },
            {
              requirement: string;
              evidenceIds: string[];
              gap: string;
            }
          >,
          'many'
        >;
        missingRequirements: z.ZodArray<
          z.ZodObject<
            {
              requirement: z.ZodString;
              severity: z.ZodEnum<['blocker', 'significant', 'minor']>;
              mitigations: z.ZodArray<z.ZodString, 'many'>;
            },
            'strip',
            z.ZodTypeAny,
            {
              requirement: string;
              severity: 'blocker' | 'significant' | 'minor';
              mitigations: string[];
            },
            {
              requirement: string;
              severity: 'blocker' | 'significant' | 'minor';
              mitigations: string[];
            }
          >,
          'many'
        >;
        atsKeywords: z.ZodArray<
          z.ZodObject<
            {
              term: z.ZodString;
              presentInCv: z.ZodBoolean;
              truthfullyAddable: z.ZodBoolean;
              suggestedPlacement: z.ZodNullable<z.ZodString>;
            },
            'strip',
            z.ZodTypeAny,
            {
              term: string;
              presentInCv: boolean;
              truthfullyAddable: boolean;
              suggestedPlacement: string | null;
            },
            {
              term: string;
              presentInCv: boolean;
              truthfullyAddable: boolean;
              suggestedPlacement: string | null;
            }
          >,
          'many'
        >;
      },
      'strip',
      z.ZodTypeAny,
      {
        matchedRequirements: {
          requirement: string;
          evidenceIds: string[];
        }[];
        partialMatches: {
          requirement: string;
          evidenceIds: string[];
          gap: string;
        }[];
        missingRequirements: {
          requirement: string;
          severity: 'blocker' | 'significant' | 'minor';
          mitigations: string[];
        }[];
        atsKeywords: {
          term: string;
          presentInCv: boolean;
          truthfullyAddable: boolean;
          suggestedPlacement: string | null;
        }[];
      },
      {
        matchedRequirements: {
          requirement: string;
          evidenceIds: string[];
        }[];
        partialMatches: {
          requirement: string;
          evidenceIds: string[];
          gap: string;
        }[];
        missingRequirements: {
          requirement: string;
          severity: 'blocker' | 'significant' | 'minor';
          mitigations: string[];
        }[];
        atsKeywords: {
          term: string;
          presentInCv: boolean;
          truthfullyAddable: boolean;
          suggestedPlacement: string | null;
        }[];
      }
    >;
    applyRecommendation: z.ZodEnum<
      ['strong_apply', 'apply', 'stretch', 'skip']
    >;
    reasoning: z.ZodString;
    meta: z.ZodObject<
      {
        model: z.ZodString;
        promptVersion: z.ZodString;
        tokensIn: z.ZodNumber;
        tokensOut: z.ZodNumber;
        costUsd: z.ZodNumber;
        latencyMs: z.ZodNumber;
        evaluatedAt: z.ZodString;
      },
      'strip',
      z.ZodTypeAny,
      {
        model: string;
        promptVersion: string;
        tokensIn: number;
        tokensOut: number;
        costUsd: number;
        latencyMs: number;
        evaluatedAt: string;
      },
      {
        model: string;
        promptVersion: string;
        tokensIn: number;
        tokensOut: number;
        costUsd: number;
        latencyMs: number;
        evaluatedAt: string;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    jobId: string;
    overall: number;
    grade: 'A' | 'B' | 'C' | 'D' | 'F';
    dimensions: {
      skillMatch: {
        confidence: 'high' | 'medium' | 'low';
        score: number;
        evidence: string[];
        rationale: string;
      };
      experienceFit: {
        confidence: 'high' | 'medium' | 'low';
        score: number;
        evidence: string[];
        rationale: string;
      };
      workModelFit: {
        confidence: 'high' | 'medium' | 'low';
        score: number;
        evidence: string[];
        rationale: string;
      };
      compensationFit: {
        confidence: 'high' | 'medium' | 'low';
        score: number;
        evidence: string[];
        rationale: string;
      };
      companySignal: {
        confidence: 'high' | 'medium' | 'low';
        score: number;
        evidence: string[];
        rationale: string;
      };
      trustSignal: {
        confidence: 'high' | 'medium' | 'low';
        score: number;
        evidence: string[];
        rationale: string;
      };
    };
    gapAnalysis: {
      matchedRequirements: {
        requirement: string;
        evidenceIds: string[];
      }[];
      partialMatches: {
        requirement: string;
        evidenceIds: string[];
        gap: string;
      }[];
      missingRequirements: {
        requirement: string;
        severity: 'blocker' | 'significant' | 'minor';
        mitigations: string[];
      }[];
      atsKeywords: {
        term: string;
        presentInCv: boolean;
        truthfullyAddable: boolean;
        suggestedPlacement: string | null;
      }[];
    };
    applyRecommendation: 'strong_apply' | 'apply' | 'stretch' | 'skip';
    reasoning: string;
    meta: {
      model: string;
      promptVersion: string;
      tokensIn: number;
      tokensOut: number;
      costUsd: number;
      latencyMs: number;
      evaluatedAt: string;
    };
  },
  {
    jobId: string;
    overall: number;
    grade: 'A' | 'B' | 'C' | 'D' | 'F';
    dimensions: {
      skillMatch: {
        confidence: 'high' | 'medium' | 'low';
        score: number;
        evidence: string[];
        rationale: string;
      };
      experienceFit: {
        confidence: 'high' | 'medium' | 'low';
        score: number;
        evidence: string[];
        rationale: string;
      };
      workModelFit: {
        confidence: 'high' | 'medium' | 'low';
        score: number;
        evidence: string[];
        rationale: string;
      };
      compensationFit: {
        confidence: 'high' | 'medium' | 'low';
        score: number;
        evidence: string[];
        rationale: string;
      };
      companySignal: {
        confidence: 'high' | 'medium' | 'low';
        score: number;
        evidence: string[];
        rationale: string;
      };
      trustSignal: {
        confidence: 'high' | 'medium' | 'low';
        score: number;
        evidence: string[];
        rationale: string;
      };
    };
    gapAnalysis: {
      matchedRequirements: {
        requirement: string;
        evidenceIds: string[];
      }[];
      partialMatches: {
        requirement: string;
        evidenceIds: string[];
        gap: string;
      }[];
      missingRequirements: {
        requirement: string;
        severity: 'blocker' | 'significant' | 'minor';
        mitigations: string[];
      }[];
      atsKeywords: {
        term: string;
        presentInCv: boolean;
        truthfullyAddable: boolean;
        suggestedPlacement: string | null;
      }[];
    };
    applyRecommendation: 'strong_apply' | 'apply' | 'stretch' | 'skip';
    reasoning: string;
    meta: {
      model: string;
      promptVersion: string;
      tokensIn: number;
      tokensOut: number;
      costUsd: number;
      latencyMs: number;
      evaluatedAt: string;
    };
  }
>;
export type ScoreCard = z.infer<typeof ScoreCardSchema>;
export type Dimension = z.infer<typeof DimensionSchema>;
//# sourceMappingURL=scorecard.d.ts.map
