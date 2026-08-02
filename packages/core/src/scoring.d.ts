import { Result } from '@careerops/shared';
import { LlmRouter } from '@careerops/llm';
import { ScoreCard } from './scorecard.js';
import { JobPostingBasic } from './triage.js';
export interface Pass1Result {
  verdict: 'advance' | 'reject';
  confidence: number;
  oneLineReason: string;
}
export declare class MatchEngine {
  private llm;
  constructor(llm: LlmRouter);
  pass1(job: JobPostingBasic): Promise<Result<Pass1Result>>;
  pass2(job: JobPostingBasic, cvText: string): Promise<Result<ScoreCard>>;
}
//# sourceMappingURL=scoring.d.ts.map
