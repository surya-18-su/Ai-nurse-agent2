import { db, sqlite } from './index.js';
import { companies, jobs } from './schema.js';

async function main() {
  console.log('Seeding database...');

  try {
    db.insert(companies)
      .values({
        id: 'comp_1',
        name: 'Stripe',
        domain: 'stripe.com',
        atsProvider: 'greenhouse',
      })
      .onConflictDoNothing()
      .run();

    db.insert(jobs)
      .values({
        id: 'job_1',
        companyId: 'comp_1',
        title: 'Software Engineer',
        status: 'wishlist',
      })
      .onConflictDoNothing()
      .run();

    console.log('Seeding complete.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    sqlite.close();
  }
}

main();
