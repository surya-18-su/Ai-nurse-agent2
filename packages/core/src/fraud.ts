export interface FraudSignal {
  reason: string;
  weight: number;
}

export function evaluateTrust(jobDetails: {
  ageDays: number;
  description: string;
  hasNamedCompany: boolean;
  domainAgeDays?: number;
}): FraudSignal[] {
  const signals: FraudSignal[] = [];

  if (
    jobDetails.ageDays > 45 &&
    jobDetails.description.toLowerCase().includes('actively hiring')
  ) {
    signals.push({
      reason: 'Posting is old but claims to be actively hiring.',
      weight: 30,
    });
  }

  if (!jobDetails.hasNamedCompany) {
    signals.push({ reason: 'No named company/ATS domain found.', weight: 50 });
  }

  if (
    jobDetails.description
      .toLowerCase()
      .includes('always accepting applications')
  ) {
    signals.push({ reason: 'Evergreen language detected.', weight: 40 });
  }

  if (jobDetails.domainAgeDays !== undefined && jobDetails.domainAgeDays < 90) {
    signals.push({
      reason: 'Company domain registered less than 90 days ago.',
      weight: 60,
    });
  }

  return signals;
}
