import { describe, it, expect } from 'vitest';
import { evaluateTrust } from './fraud.js';

describe('GhostJobDetector', () => {
  it('flags extremely old active jobs', () => {
    const flags = evaluateTrust({
      ageDays: 60,
      description: 'we are actively hiring!',
      hasNamedCompany: true,
    });
    expect(
      flags.find((f) =>
        f.reason.includes('old but claims to be actively hiring')
      )
    ).toBeDefined();
  });

  it('flags un-named agency postings', () => {
    const flags = evaluateTrust({
      ageDays: 10,
      description: 'great job',
      hasNamedCompany: false,
    });
    expect(
      flags.find((f) => f.reason.includes('No named company'))
    ).toBeDefined();
  });

  it('flags evergreen postings', () => {
    const flags = evaluateTrust({
      ageDays: 5,
      description: 'always accepting applications for this role',
      hasNamedCompany: true,
    });
    expect(flags.find((f) => f.reason.includes('Evergreen'))).toBeDefined();
  });

  it('flags new domains', () => {
    const flags = evaluateTrust({
      ageDays: 5,
      description: 'standard job',
      hasNamedCompany: true,
      domainAgeDays: 10,
    });
    expect(
      flags.find((f) => f.reason.includes('less than 90 days'))
    ).toBeDefined();
  });
});
