import { ok, err } from '@careerops/shared';
import { generateObject, generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOllama } from 'ollama-ai-provider';
export class DefaultLlmRouter {
  openai = createOpenAI(
    process.env.OPENAI_API_KEY ? { apiKey: process.env.OPENAI_API_KEY } : {}
  );
  anthropic = createAnthropic(
    process.env.ANTHROPIC_API_KEY
      ? { apiKey: process.env.ANTHROPIC_API_KEY }
      : {}
  );
  google = createGoogleGenerativeAI(
    process.env.GOOGLE_API_KEY ? { apiKey: process.env.GOOGLE_API_KEY } : {}
  );
  ollama = createOllama();
  getModel(modelName) {
    if (modelName.startsWith('gpt-')) return this.openai(modelName);
    if (modelName.startsWith('claude-')) return this.anthropic(modelName);
    if (modelName.startsWith('gemini-')) return this.google(modelName);
    return this.ollama(modelName);
  }
  async generateObject(schema, prompt, options) {
    try {
      const start = Date.now();
      const model = this.getModel(options.model);
      const { object, usage } = await generateObject({
        model,
        schema: schema,
        prompt,
        temperature: options.temperature ?? 0.1,
        ...(options.maxTokens !== undefined && {
          maxTokens: options.maxTokens,
        }),
      });
      const latencyMs = Date.now() - start;
      const costUsd = 0;
      return ok({
        data: object,
        meta: {
          model: options.model,
          promptVersion: 'v1',
          tokensIn: usage.promptTokens,
          tokensOut: usage.completionTokens,
          costUsd,
          latencyMs,
        },
      });
    } catch (error) {
      return err(error instanceof Error ? error : new Error(String(error)));
    }
  }
  async generateText(prompt, options) {
    try {
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
      return ok({
        data: text,
        meta: {
          model: options.model,
          promptVersion: 'v1',
          tokensIn: usage.promptTokens,
          tokensOut: usage.completionTokens,
          costUsd: 0,
          latencyMs,
        },
      });
    } catch (error) {
      return err(error instanceof Error ? error : new Error(String(error)));
    }
  }
}
//# sourceMappingURL=providers.js.map
