import { DisbursementTranche } from '../types';
import { MOCK_DISBURSEMENTS } from '../data/mockData';

export const paymentService = {
  async getPayments(): Promise<DisbursementTranche[]> {
    await new Promise((res) => setTimeout(res, 80));
    return [...MOCK_DISBURSEMENTS];
  },

  async verifyDbtSeeding(aadhaarEnding: string): Promise<{ seeded: boolean; bank: string; status: string }> {
    await new Promise((res) => setTimeout(res, 200));
    return {
      seeded: true,
      bank: 'State Bank of India',
      status: 'Active on NPCI Aadhaar Payment Bridge (APB)'
    };
  }
};
