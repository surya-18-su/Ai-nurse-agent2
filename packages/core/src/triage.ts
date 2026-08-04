import { Result, ok, err } from '@careerops/shared';

// For pass 0 deterministic triage we use a schema
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
  { verdict: 'advance' } | { verdict: 'reject'; reason: string };

export class TriageEngine {
  constructor(private preferences: UserPreferences) {}

  public evaluate(job: JobPostingBasic): Result<TriageResult> {
    try {
      if (this.preferences.excludedCompanies.includes(job.companyName)) {
        return ok({
          verdict: 'reject',
          reason: `Company ${job.companyName} is in excluded list.`,
        });
      }

      if (
        this.preferences.locations.length > 0 &&
        !this.preferences.locations.includes(job.location)
      ) {
        return ok({
          verdict: 'reject',
          reason: `Location ${job.location} not in preferred locations.`,
        });
      }

      // Add basic age/dedupe checks here in fuller implementation

      return ok({ verdict: 'advance' });
    } catch (error) {
      return err(error instanceof Error ? error : new Error(String(error)));
    }
  }
}
