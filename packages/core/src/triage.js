import { ok, err } from '@careerops/shared';
export class TriageEngine {
  preferences;
  constructor(preferences) {
    this.preferences = preferences;
  }
  evaluate(job) {
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
//# sourceMappingURL=triage.js.map
