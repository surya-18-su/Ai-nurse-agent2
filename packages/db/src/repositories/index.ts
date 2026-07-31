import { Result, ok, err } from '@careerops/shared';
import { db } from '../index.js';
import { companies, jobs } from '../schema.js';
import { eq } from 'drizzle-orm';

export class CompanyRepository {
  async getById(id: string): Promise<Result<typeof companies.$inferSelect>> {
    try {
      const result = db
        .select()
        .from(companies)
        .where(eq(companies.id, id))
        .get();
      if (!result) return err(new Error('Company not found'));
      return ok(result);
    } catch (e) {
      return err(e instanceof Error ? e : new Error(String(e)));
    }
  }
}

export class JobRepository {
  async getById(id: string): Promise<Result<typeof jobs.$inferSelect>> {
    try {
      const result = db.select().from(jobs).where(eq(jobs.id, id)).get();
      if (!result) return err(new Error('Job not found'));
      return ok(result);
    } catch (e) {
      return err(e instanceof Error ? e : new Error(String(e)));
    }
  }
}
