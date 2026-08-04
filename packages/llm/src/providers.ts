import { LlmRouter, PromptOptions, GenerationResult } from './router.js';
import { Result, ok, err } from '@careerops/shared';
import { generateObject, generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOllama } from 'ollama-ai-provider';
import { z } from 'zod';
import { DiskCache } from './cache.js';

export class DefaultLlmRouter implements LlmRouter {
  private openai = createOpenAI(
    process.env['OPENAI_API_KEY']
      ? { apiKey: process.env['OPENAI_API_KEY'] }
      : {}
  );
  private anthropic = createAnthropic(
    process.env['ANTHROPIC_API_KEY']
      ? { apiKey: process.env['ANTHROPIC_API_KEY'] }
      : {}
  );
  private google = createGoogleGenerativeAI(
    process.env['GOOGLE_API_KEY']
      ? { apiKey: process.env['GOOGLE_API_KEY'] }
      : {}
  );
  private ollama = createOllama();

  private cache = new DiskCache('.cache/llm');

  private getModel(modelName: string) {
    if (modelName.startsWith('gpt-')) return this.openai(modelName);
    if (modelName.startsWith('claude-')) return this.anthropic(modelName);
    if (modelName.startsWith('gemini-')) return this.google(modelName);
    return this.ollama(modelName);
  }

  async generateObject<T>(
    schema: unknown,
    prompt: string,
    options: PromptOptions
  ): Promise<Result<GenerationResult<T>>> {
    try {
      const cacheKey = JSON.stringify({
        type: 'object',
        prompt,
        options,
        schemaHash: JSON.stringify(schema),
      });
      const cached = await this.cache.get<GenerationResult<T>>(cacheKey);
      if (cached) return ok(cached);

      const start = Date.now();
      const model = this.getModel(options.model);
      const { object, usage } = await generateObject({
        model,
        schema: schema as z.ZodType<unknown>,
        prompt,
        temperature: options.temperature ?? 0.1,
        ...(options.maxTokens !== undefined && {
          maxTokens: options.maxTokens,
        }),
      });
      const latencyMs = Date.now() - start;

      const costUsd = 0;

      const result = {
        data: object as T,
        meta: {
          model: options.model,
          promptVersion: 'v1',
          tokensIn: usage.promptTokens,
          tokensOut: usage.completionTokens,
          costUsd,
          latencyMs,
        },
      };
      await this.cache.set(cacheKey, result);
      return ok(result);
    } catch (error) {
      return err(error instanceof Error ? error : new Error(String(error)));
    }
  }

  async generateText(
    prompt: string,
    options: PromptOptions
  ): Promise<Result<GenerationResult<string>>> {
    try {
      const cacheKey = JSON.stringify({ type: 'text', prompt, options });
      const cached = await this.cache.get<GenerationResult<string>>(cacheKey);
      if (cached) return ok(cached);

      const start = Date.now();
      const model = this.getModel(options.model);
      const { text, usage } = await generateText({
        model,
        prompt,
        temperature: options.temperature ?? 0.4,
        ...(options.maxTokens !== undefined && {
          maxTokens: options.maxTokens,
        }),
      });
      const latencyMs = Date.now() - start;

      const result = {
        data: text,
        meta: {
          model: options.model,
          promptVersion: 'v1',
          tokensIn: usage.promptTokens,
          tokensOut: usage.completionTokens,
          costUsd: 0,
          latencyMs,
        },
      };
      await this.cache.set(cacheKey, result);
      return ok(result);
    } catch (error) {
      return err(error instanceof Error ? error : new Error(String(error)));
    }
  }
}
