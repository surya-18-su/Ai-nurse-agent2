import pdfParse from 'pdf-parse';
import { Result, ok, err } from '@careerops/shared';

export interface VerifyResult {
  passed: boolean;
  failures: string[];
}

export class ATSVerifier {
  async verify(
    pdfBuffer: Uint8Array,
    requiredKeywords: string[]
  ): Promise<Result<VerifyResult>> {
    try {
      const data = await pdfParse(Buffer.from(pdfBuffer));
      const extractedText = data.text.toLowerCase();

      const failures: string[] = [];

      if (extractedText.length < 50) {
        failures.push(
          'Failed to extract meaningful text. The PDF might be an image.'
        );
      }

      if (pdfBuffer.length > 1024 * 1024) {
        failures.push('PDF file size exceeds 1MB limit.');
      }

      for (const keyword of requiredKeywords) {
        if (!extractedText.includes(keyword.toLowerCase())) {
          failures.push(
            `Missing required ATS keyword in parsed text: ${keyword}`
          );
        }
      }

      if (failures.length > 0) {
        return ok({ passed: false, failures });
      }

      return ok({ passed: true, failures: [] });
    } catch (error) {
      return err(
        error instanceof Error ? error : new Error('PDF parsing failed')
      );
    }
  }
}
