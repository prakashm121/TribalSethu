import { VerificationItem } from '../types';
import { MOCK_VERIFICATIONS_QUEUE } from '../data/mockData';

export const verificationService = {
  async getVerificationQueue(): Promise<VerificationItem[]> {
    await new Promise((res) => setTimeout(res, 80));
    return [...MOCK_VERIFICATIONS_QUEUE];
  },

  async reviewItem(id: string, action: 'APPROVE' | 'FLAG_MISMATCH' | 'REQUEST_DOCS', notes: string) {
    await new Promise((res) => setTimeout(res, 150));
    return {
      id,
      action,
      notes,
      timestamp: new Date().toISOString()
    };
  }
};
