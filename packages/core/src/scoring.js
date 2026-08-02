import { ok } from '@careerops/shared';
import { ScoreCardSchema } from './scorecard.js';
export class MatchEngine {
  llm;
  constructor(llm) {
    this.llm = llm;
  }
  async pass1(job) {
    // Uses a cheap model
    const prompt = `Evaluate if this job is worth full processing. \n\nJob: ${JSON.stringify(job)}`;
    // In real implementation we'd use a specific pass1 schema
    const schema = {
      type: 'object',
      properties: {
        verdict: { type: 'string', enum: ['advance', 'reject'] },
        confidence: { type: 'number' },
        oneLineReason: { type: 'string' },
      },
      required: ['verdict', 'confidence', 'oneLineReason'],
    };
    const result = await this.llm.generateObject(schema, prompt, {
      model: 'gpt-4o-mini',
    });
    if (!result.success) return result;
    return ok(result.data.data);
  }
  async pass2(job, cvText) {
    // Frontier model full evaluation
    const prompt = `Perform a deep evaluation against the candidate's CV.\n\nJob: ${JSON.stringify(job)}\n\nCV: ${cvText}`;
    // Here we'd pass the actual Zod schema mapped to JSON Schema, but for ai generateObject passing the zod schema directly is preferred
    const result = await this.llm.generateObject(ScoreCardSchema, prompt, {
      model: 'gpt-4o',
    });
    if (!result.success) return result;
    // Weighting logic (in code, not LLM)
    const scorecard = result.data.data;
    // Compute overall score in code
    const weights = {
      skillMatch: 0.3,
      experienceFit: 0.2,
      workModelFit: 0.15,
      compensationFit: 0.15,
      companySignal: 0.1,
      trustSignal: 0.1,
    };
    let overall = 0;
    overall += scorecard.dimensions.skillMatch.score * weights.skillMatch;
    overall += scorecard.dimensions.experienceFit.score * weights.experienceFit;
    overall += scorecard.dimensions.workModelFit.score * weights.workModelFit;
    overall +=
      scorecard.dimensions.compensationFit.score * weights.compensationFit;
    overall += scorecard.dimensions.companySignal.score * weights.companySignal;
    overall += scorecard.dimensions.trustSignal.score * weights.trustSignal;
    scorecard.overall = Math.round(overall);
    // Compute grade
    if (scorecard.overall >= 85) scorecard.grade = 'A';
    else if (scorecard.overall >= 70) scorecard.grade = 'B';
    else if (scorecard.overall >= 55) scorecard.grade = 'C';
    else if (scorecard.overall >= 40) scorecard.grade = 'D';
    else scorecard.grade = 'F';
    return ok(scorecard);
  }
}
//# sourceMappingURL=scoring.js.map
