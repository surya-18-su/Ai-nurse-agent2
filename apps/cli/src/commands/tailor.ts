import { Command } from 'commander';
import * as clack from '@clack/prompts';
import { TypstRenderer, ATSVerifier, ContentOptimizer } from '@careerops/pdf';
import { Evidence } from '@careerops/evidence';
import fs from 'node:fs/promises';
import path from 'node:path';

export const tailorCommand = new Command('tailor')
  .description('tailor a resume for a specific job ID')
  .argument('<jobId>', 'the ID of the job to tailor for')
  .option('--template <name>', 'Typst template to use', 'ats-clean')
  .option('--pages <count>', 'maximum pages', '1')
  .option('--json', 'output as JSON')
  .option('--dry-run', 'do not generate actual PDF files on disk')
  .action(
    async (
      jobId: string,
      options: {
        template: string;
        pages: string;
        json?: boolean;
        dryRun?: boolean;
      }
    ) => {
      if (!options.json) clack.intro(`Tailoring Resume for Job ${jobId}`);

      const mockStore = new Map<string, Evidence>();
      mockStore.set('ev1', {
        id: 'ev1',
        kind: 'role',
        text: 'Developed scalable web applications in React.',
        sourceFile: 'cv.md',
        sourceLine: 10,
        attributes: {},
        verified: true,
      });

      const optimizer = new ContentOptimizer(mockStore);

      const optimizeResult = optimizer.optimize({
        maxPages: parseInt(options.pages, 10),
        experienceYears: 5,
        matchedRequirements: [
          { requirement: 'React experience', evidenceIds: ['ev1'] },
        ],
        atsKeywords: [
          { term: 'React', presentInCv: true, truthfullyAddable: true },
        ],
      });

      if (!optimizeResult.success) {
        if (options.json)
          console.error(JSON.stringify({ error: optimizeResult.error }));
        else clack.log.error(`Optimization failed: ${optimizeResult.error}`);
        process.exit(1);
      }

      const selectedEvidence = optimizeResult.data;
      const markdownLines = selectedEvidence
        .map((ev: Evidence) => `- ${ev.text}`)
        .join('\n');

      if (options.dryRun) {
        if (options.json) {
          console.log(
            JSON.stringify({
              jobId,
              plan: 'render pdf',
              evidenceCount: selectedEvidence.length,
            })
          );
        } else {
          clack.log.info(
            `Dry-run: Would render PDF with ${selectedEvidence.length} bullet points.`
          );
          clack.outro('Done!');
        }
        return;
      }

      if (!options.json) clack.log.step('Rendering Typst PDF...');
      const renderer = new TypstRenderer();
      const renderResult = await renderer.render(
        markdownLines,
        options.template,
        selectedEvidence.map((e: Evidence) => e.id)
      );

      if (!renderResult.success) {
        if (options.json)
          console.error(JSON.stringify({ error: renderResult.error }));
        else clack.log.error(`Render failed: ${renderResult.error}`);
        process.exit(1);
      }

      if (!options.json) clack.log.step('Verifying ATS compliance...');
      const verifier = new ATSVerifier();
      const verifyResult = await verifier.verify(renderResult.data.pdfBuffer, [
        'React',
      ]);

      if (!verifyResult.success || !verifyResult.data.passed) {
        const failures = !verifyResult.success
          ? [String(verifyResult.error)]
          : verifyResult.data.failures;
        if (options.json)
          console.error(
            JSON.stringify({ error: 'Verification failed', failures })
          );
        else clack.log.error(`Verification failed:\n${failures.join('\n')}`);
        process.exit(1);
      }

      const outputDir = path.join(
        process.cwd(),
        'data',
        'applications',
        `job-${jobId}`
      );
      await fs.mkdir(outputDir, { recursive: true });
      await fs.writeFile(
        path.join(outputDir, 'resume.pdf'),
        renderResult.data.pdfBuffer
      );
      await fs.writeFile(
        path.join(outputDir, 'manifest.json'),
        JSON.stringify(renderResult.data.manifest, null, 2)
      );

      if (options.json) {
        console.log(JSON.stringify({ success: true, outputDir }));
      } else {
        clack.log.success(
          `Generated ATS-verified Resume and manifest at ${outputDir}`
        );
        clack.outro('Done!');
      }
    }
  );
