import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { MatchEngine } from '../packages/core/src/scoring.js';
import { DefaultLlmRouter } from '../packages/llm/src/providers.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export async function runEvals() {
  console.log('Running evaluations...');
  const goldenSetPath = path.resolve(__dirname, 'golden-set.json');
  const data = JSON.parse(fs.readFileSync(goldenSetPath, 'utf8'));
  const router = new DefaultLlmRouter();
  const engine = new MatchEngine(router);
  let passed = 0;
  for (const item of data) {
    const result = await engine.pass2(item.job, item.cv);
    if (!result.success) {
      console.error('Eval failed to process:', result.error);
      continue;
    }
    const scorecard = result.data;
    if (scorecard.grade === item.expectedGrade) {
      passed++;
    } else {
      console.log(
        `Mismatch: Expected ${item.expectedGrade}, got ${scorecard.grade}`
      );
    }
  }
  console.log(`Evals complete. Passed ${passed}/${data.length}`);
}
//# sourceMappingURL=harness.js.map
