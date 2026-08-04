import { NodeCompiler } from '@myriaddreamin/typst-ts-node-compiler';
import { Result, ok, err } from '@careerops/shared';

export interface RenderResult {
  pdfBuffer: Uint8Array;
  manifest: {
    evidenceIds: string[];
    template: string;
  };
}

export class TypstRenderer {
  private compiler: NodeCompiler;

  constructor() {
    this.compiler = NodeCompiler.create();
  }

  async render(
    markdownContent: string,
    template: string,
    evidenceIds: string[]
  ): Promise<Result<RenderResult>> {
    try {
      const typstSource = `
#set page(paper: "us-letter", margin: 1in)
#set text(font: "Linux Libertine", size: 11pt)

= Resume

${markdownContent}
      `;

      const pdfBuffer = this.compiler.pdf({ mainFileContent: typstSource });

      if (!pdfBuffer) {
        return err(new Error('PDF Buffer is undefined or null'));
      }

      return ok({
        pdfBuffer,
        manifest: {
          evidenceIds,
          template,
        },
      });
    } catch (error) {
      return err(error instanceof Error ? error : new Error(String(error)));
    }
  }
}
