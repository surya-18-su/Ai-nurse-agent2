import { Result } from '@careerops/shared';
export interface JobPostingBasic {
  title: string;
  companyName: string;
  location: string;
  description: string;
}
export interface UserPreferences {
  locations: string[];
  excludedCompanies: string[];
}
export type TriageResult =
  | {
      verdict: 'advance';
    }
  | {
      verdict: 'reject';
      reason: string;
    };
export declare class TriageEngine {
  private preferences;
  constructor(preferences: UserPreferences);
  evaluate(job: JobPostingBasic): Result<TriageResult>;
}
//# sourceMappingURL=triage.d.ts.map
