import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const companies = sqliteTable('companies', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  domain: text('domain').notNull(),
  atsProvider: text('ats_provider'),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text('updated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  deletedAt: text('deleted_at'),
});

export const jobs = sqliteTable('jobs', {
  id: text('id').primaryKey(),
  companyId: text('company_id')
    .notNull()
    .references(() => companies.id),
  title: text('title').notNull(),
  status: text('status').notNull(),
  grade: text('grade'),
  discoveredAt: text('discovered_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text('updated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  deletedAt: text('deleted_at'),
});

export const jobSources = sqliteTable('job_sources', {
  id: text('id').primaryKey(),
  jobId: text('job_id')
    .notNull()
    .references(() => jobs.id),
  canonicalKey: text('canonical_key').notNull(),
  sourceName: text('source_name').notNull(),
  url: text('url').notNull(),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const evaluations = sqliteTable('evaluations', {
  id: text('id').primaryKey(),
  jobId: text('job_id')
    .notNull()
    .references(() => jobs.id),
  overallScore: integer('overall_score').notNull(),
  grade: text('grade').notNull(),
  details: text('details').notNull(), // JSON
  evaluatedAt: text('evaluated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const applications = sqliteTable('applications', {
  id: text('id').primaryKey(),
  jobId: text('job_id')
    .notNull()
    .references(() => jobs.id),
  status: text('status').notNull(),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text('updated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const applicationEvents = sqliteTable('application_events', {
  id: text('id').primaryKey(),
  applicationId: text('application_id')
    .notNull()
    .references(() => applications.id),
  status: text('status').notNull(),
  note: text('note'),
  at: text('at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const documents = sqliteTable('documents', {
  id: text('id').primaryKey(),
  applicationId: text('application_id')
    .notNull()
    .references(() => applications.id),
  type: text('type').notNull(), // resume, cover_letter
  path: text('path').notNull(),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const evidence = sqliteTable('evidence', {
  id: text('id').primaryKey(),
  kind: text('kind').notNull(),
  text: text('text').notNull(),
  sourceFile: text('source_file').notNull(),
  sourceLine: integer('source_line').notNull(),
  attributes: text('attributes').notNull(), // JSON
  verified: integer('verified', { mode: 'boolean' }).notNull(),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const outreach = sqliteTable('outreach', {
  id: text('id').primaryKey(),
  jobId: text('job_id')
    .notNull()
    .references(() => jobs.id),
  contactName: text('contact_name'),
  channel: text('channel').notNull(),
  message: text('message').notNull(),
  status: text('status').notNull(),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const questionsBank = sqliteTable('questions_bank', {
  id: text('id').primaryKey(),
  questionHash: text('question_hash').notNull(),
  normalizedQuestion: text('normalized_question').notNull(),
  answer: text('answer').notNull(),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const llmCalls = sqliteTable('llm_calls', {
  id: text('id').primaryKey(),
  model: text('model').notNull(),
  tokensIn: integer('tokens_in').notNull(),
  tokensOut: integer('tokens_out').notNull(),
  costUsd: real('cost_usd').notNull(),
  latencyMs: integer('latency_ms').notNull(),
  promptVersion: text('prompt_version').notNull(),
  cacheHit: integer('cache_hit', { mode: 'boolean' }).notNull(),
  calledAt: text('called_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const sourcesHealth = sqliteTable('sources_health', {
  id: text('id').primaryKey(),
  sourceName: text('source_name').notNull(),
  status: text('status').notNull(),
  checkedAt: text('checked_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const settings = sqliteTable('settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull(), // JSON
  updatedAt: text('updated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const schemaMigrations = sqliteTable('schema_migrations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  version: text('version').notNull(),
  appliedAt: text('applied_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
