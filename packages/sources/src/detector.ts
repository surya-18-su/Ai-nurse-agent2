import { Result, ok } from '@careerops/shared';
import { SourceError } from './contract.js';

export class ATSDetector {
  async detect(
    domain: string
  ): Promise<
    Result<
      { sourceId: string; tier: number; token: string; domain: string },
      SourceError
    >
  > {
    const token = domain.replace('.com', '');
    if (domain.includes('greenhouse'))
      return ok({ sourceId: 'greenhouse', tier: 1, token, domain });
    if (domain.includes('lever'))
      return ok({ sourceId: 'lever', tier: 1, token, domain });
    if (domain.includes('ashby'))
      return ok({ sourceId: 'ashby', tier: 1, token, domain });
    if (domain.includes('smartrecruiters'))
      return ok({ sourceId: 'smartrecruiters', tier: 1, token, domain });
    if (domain.includes('workday'))
      return ok({ sourceId: 'workday', tier: 1, token, domain });

    return ok({ sourceId: 'unknown', tier: 2, token: 'none', domain });
  }
}
