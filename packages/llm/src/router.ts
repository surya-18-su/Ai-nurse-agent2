import { Result } from '@careerops/shared';

export interface PromptOptions {
  model: string;
  temperature?: number;
  maxTokens?: number;
}

export interface GenerationResult<T> {
  data: T;
  meta: {
    model: string;
    promptVersion: string;
    tokensIn: number;
    tokensOut: number;
    costUsd: number;
    latencyMs: number;
  };
}

export interface LlmRouter {
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
