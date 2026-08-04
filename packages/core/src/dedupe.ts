export function generateCanonicalKey(
  company: string,
  title: string,
  locationBucket: string
): string {
  return `${company.toLowerCase().trim()}|${title.toLowerCase().trim()}|${locationBucket.toLowerCase().trim()}`;
}

export function jaccardSimilarity(text1: string, text2: string): number {
  const set1 = new Set(text1.toLowerCase().split(/\s+/));
  const set2 = new Set(text2.toLowerCase().split(/\s+/));

  let intersection = 0;
  for (const word of set1) {
    if (set2.has(word)) intersection++;
  }

  const union = set1.size + set2.size - intersection;
  return union === 0 ? 1 : intersection / union;
}

export function isDuplicate(
  job1Desc: string,
  job2Desc: string,
  threshold = 0.85
): boolean {
  const similarity = jaccardSimilarity(job1Desc, job2Desc);
  return similarity >= threshold;
}
