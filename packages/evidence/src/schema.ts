import { z } from 'zod';

export const EvidenceSchema = z.object({
  id: z.string(),
  kind: z.enum([
    'role',
    'achievement',
    'skill',
    'education',
    'project',
    'certification',
    'metric',
  ]),
  text: z.string(),
  sourceFile: z.string(),
  sourceLine: z.number().int(),
  attributes: z.object({
    employer: z.string().optional(),
    start: z.string().optional(),
    end: z.string().optional(),
    skills: z.array(z.string()).optional(),
    metricValue: z.string().optional(),
  }),
  verified: z.boolean(),
});

export type Evidence = z.infer<typeof EvidenceSchema>;

export const GeneratedOutputUnitSchema = z.object({
  text: z.string(),
  evidenceIds: z.array(z.string()).min(1),
  transformation: z.enum(['verbatim', 'rephrase', 'aggregate', 'emphasis']),
});

export type GeneratedOutputUnit = z.infer<typeof GeneratedOutputUnitSchema>;
