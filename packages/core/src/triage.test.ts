import { describe, it, expect } from 'vitest';
import { TriageEngine, JobPostingBasic, UserPreferences } from './triage.js';

describe('TriageEngine', () => {
  it('filters out jobs with excluded companies', () => {
    const prefs: UserPreferences = {
      locations: [],
      excludedCompanies: ['BadCorp'],
    };
    const triage = new TriageEngine(prefs);
    const job: JobPostingBasic = {
      companyName: 'BadCorp',
      title: 'Eng',
      location: 'Remote',
      description: '',
    };

    const result = triage.evaluate(job);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.verdict).toBe('reject');
      expect(
        (result.data as { verdict: 'reject'; reason: string }).reason
      ).toContain('excluded list');
    }
  });

  it('filters out location if not preferred and no overlap', () => {
    const prefs: UserPreferences = {
      locations: ['Remote'],
      excludedCompanies: [],
    };
    const triage = new TriageEngine(prefs);
    const job: JobPostingBasic = {
      companyName: 'Corp',
      title: 'Eng',
      location: 'Onsite NY',
      description: '',
    };

    const result = triage.evaluate(job);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.verdict).toBe('reject');
      expect(
        (result.data as { verdict: 'reject'; reason: string }).reason
      ).toContain('not in preferred locations');
    }
  });

  it('advances valid jobs', () => {
    const prefs: UserPreferences = {
      locations: ['Remote'],
      excludedCompanies: [],
    };
    const triage = new TriageEngine(prefs);
    const job: JobPostingBasic = {
      companyName: 'GoodCorp',
      title: 'Eng',
      location: 'Remote',
      description: '',
    };

    const result = triage.evaluate(job);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.verdict).toBe('advance');
    }
  });
});
