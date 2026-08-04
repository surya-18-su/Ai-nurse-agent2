import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export class DiskCache {
  private cacheDir: string;

  constructor(cacheDir: string) {
    this.cacheDir = cacheDir;
    if (!fs.existsSync(this.cacheDir)) {
      fs.mkdirSync(this.cacheDir, { recursive: true });
    }
  }

  private getHash(key: string): string {
    return crypto.createHash('sha256').update(key).digest('hex');
  }

  async get<T>(key: string): Promise<T | null> {
    const filePath = path.join(this.cacheDir, `${this.getHash(key)}.json`);
    if (fs.existsSync(filePath)) {
      try {
        const data = await fs.promises.readFile(filePath, 'utf-8');
        return JSON.parse(data) as T;
      } catch {
        return null;
      }
    }
    return null;
  }

  async set<T>(key: string, value: T): Promise<void> {
    const filePath = path.join(this.cacheDir, `${this.getHash(key)}.json`);
    await fs.promises.writeFile(filePath, JSON.stringify(value), 'utf-8');
  }
}
