import { Result } from '@careerops/shared';

export interface RawPosting {
  raw: unknown;
  sourceId: string;
}

export interface JobPosting {
  title: string;
  companyName: string;
  location: string;
  description: string;
  parseConfidence: number;
}

export type SourceError = Error;
export type ParseError = Error;

export interface SourceHandle {
  id: string;
  token?: string;
  domain?: string;
}

export interface PostingRef {
  id: string;
  url: string;
}

export interface ListOpts {
  limit?: number;
  since?: Date;
}

export interface JobSource {
  readonly id: string; // 'greenhouse'
  readonly tier: 1 | 2 | 3;
  readonly requiresAuth: boolean;
  readonly rateLimit: { rps: number; burst: number };

  detect?(domain: string): Promise<Result<SourceHandle | null, SourceError>>;
  list(handle: SourceHandle, opts: ListOpts): AsyncIterable<RawPosting>;
  fetchDetail?(ref: PostingRef): Promise<Result<RawPosting, SourceError>>;
  normalize(raw: RawPosting): Result<JobPosting, ParseError>; // MUST be deterministic
  healthcheck(): Promise<Result<void, SourceError>>;
}
