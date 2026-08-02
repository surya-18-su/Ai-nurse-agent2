import { LlmRouter, PromptOptions, GenerationResult } from './router.js';
import { Result } from '@careerops/shared';
export declare class DefaultLlmRouter implements LlmRouter {
  private openai;
  private anthropic;
  private google;
  private ollama;
  private getModel;
  generateObject<T>(
    schema: unknown,
    prompt: string,
    options: PromptOptions
  ): Promise<Result<GenerationResult<T>>>;
  generateText(
    prompt: string,
    options: PromptOptions
  ): Promise<Result<GenerationResult<string>>>;
}
//# sourceMappingURL=providers.d.ts.map
