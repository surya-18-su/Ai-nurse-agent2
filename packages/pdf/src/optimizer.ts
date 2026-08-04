import { Evidence } from '@careerops/evidence';
import { Result, ok, err } from '@careerops/shared';

export interface OptimizeOptions {
  maxPages: number;
  experienceYears: number;
  matchedRequirements: { requirement: string; evidenceIds: string[] }[];
  atsKeywords: {
    term: string;
    presentInCv: boolean;
    truthfullyAddable: boolean;
  }[];
}

export class ContentOptimizer {
  constructor(private store: Map<string, Evidence>) {}

  optimize(opts: OptimizeOptions): Result<Evidence[]> {
    try {
      const targetBullets = opts.maxPages === 1 ? 15 : 30;

      const selected = new Set<string>();

      for (const req of opts.matchedRequirements) {
        for (const evId of req.evidenceIds) {
          if (this.store.has(evId) && selected.size < targetBullets) {
            selected.add(evId);
          }
        }
      }

      for (const [id, evidence] of this.store.entries()) {
        if (selected.size >= targetBullets) break;
        if (!selected.has(id) && evidence.verified) {
          selected.add(id);
        }
      }

      const optimizedEvidence = Array.from(selected)
        .map((id) => this.store.get(id))
        .filter((ev): ev is Evidence => ev !== undefined);

      return ok(optimizedEvidence);
    } catch (error) {
      return err(error instanceof Error ? error : new Error(String(error)));
    }
  }
}
