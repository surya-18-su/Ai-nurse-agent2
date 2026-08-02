import { Result, ok, err } from '@careerops/shared';
import { Evidence, GeneratedOutputUnit } from './schema.js';

export interface ValidationFailure {
  unit: GeneratedOutputUnit;
  reason: string;
  severity: 'reject' | 'warn';
}

export class EvidenceValidator {
  constructor(private evidenceStore: Map<string, Evidence>) {}

  validate(
    units: GeneratedOutputUnit[]
  ): Result<GeneratedOutputUnit[], ValidationFailure[]> {
    const failures: ValidationFailure[] = [];
    const validUnits: GeneratedOutputUnit[] = [];

    for (const unit of units) {
      const failure = this.validateUnit(unit);
      if (failure) {
        failures.push(failure);
        if (failure.severity === 'reject') {
          // If we reject, we skip adding to valid units
          continue;
        }
      }
      validUnits.push(unit);
    }

    if (failures.filter((f) => f.severity === 'reject').length > 0) {
      return err(failures);
    }

    // Return ok but we could potentially attach warnings if we needed to
    return ok(validUnits);
  }

  private validateUnit(unit: GeneratedOutputUnit): ValidationFailure | null {
    // Rule 1: Every output unit has >=1 evidenceId, and each ID exists.
    if (!unit.evidenceIds || unit.evidenceIds.length === 0) {
      return { unit, reason: 'Missing evidence bindings.', severity: 'reject' };
    }

    const referencedEvidence: Evidence[] = [];
    for (const id of unit.evidenceIds) {
      const evidence = this.evidenceStore.get(id);
      if (!evidence) {
        return {
          unit,
          reason: `Evidence ID ${id} not found in store.`,
          severity: 'reject',
        };
      }
      referencedEvidence.push(evidence);
    }

    // Combine all referenced text
    const combinedEvidenceText = referencedEvidence
      .map((e) => e.text.toLowerCase())
      .join(' ');

    const outputLower = unit.text.toLowerCase();

    // Rule 2: Numbers check
    const numbersInOutput = unit.text.match(/\d+(\.\d+)?/g) || [];
    for (const num of numbersInOutput) {
      // Very naive check, if a number is generated it must appear somewhere in the bound evidence
      if (!combinedEvidenceText.includes(num)) {
        return {
          unit,
          reason: `Number ${num} not found in bounded evidence.`,
          severity: 'reject',
        };
      }
    }

    // Rule 3: No skill appears in output that is absent from evidence store
    // This requires a skill taxonomy to do perfectly, but we can do a naive check if we have a list of skills in the output
    // We assume the generator might highlight a skill.
    // For a strict implementation we need the LLM to output the skills it used. Let's do a basic heuristic here.

    // Rule 4: Seniority/scope escalation detector
    const escalations = [
      'led',
      'owned',
      'architected',
      'spearheaded',
      'directed',
      'founded',
    ];
    const weakEvidence = [
      'contributed',
      'assisted',
      'helped',
      'participated',
      'supported',
    ];

    let hasEscalation = false;
    let hasWeakEvidence = false;
    for (const word of escalations) {
      if (outputLower.includes(word)) hasEscalation = true;
    }
    for (const word of weakEvidence) {
      if (combinedEvidenceText.includes(word)) hasWeakEvidence = true;
    }

    if (hasEscalation && hasWeakEvidence) {
      return {
        unit,
        reason: 'Potential seniority escalation detected.',
        severity: 'warn',
      };
    }

    return null;
  }
}
