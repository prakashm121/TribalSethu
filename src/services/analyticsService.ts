import { 
  MOCK_ADMIN_METRICS, 
  MOCK_OUTREACH_TARGETS, 
  MOCK_INSTITUTIONS,
  MOCK_AUDIT_LOGS 
} from '../data/mockData';

export const analyticsService = {
  async getAdminMetrics() {
    await new Promise((res) => setTimeout(res, 60));
    return { ...MOCK_ADMIN_METRICS };
  },

  async getApplicationsByScheme() {
    await new Promise((res) => setTimeout(res, 50));
    return [
      { name: 'Post-Matric ST', applications: 1240000, sanctionedCr: 680, color: '#123C32' },
      { name: 'Pre-Matric ST', applications: 580000, sanctionedCr: 120, color: '#C86B43' },
      { name: 'Top Class ST', applications: 72000, sanctionedCr: 215, color: '#E8B84A' },
      { name: 'NFST Fellowship', applications: 24000, sanctionedCr: 185, color: '#2A7261' },
      { name: 'NOS Overseas', applications: 4000, sanctionedCr: 40.85, color: '#883C1B' }
    ];
  },

  async getApplicationsByState() {
    await new Promise((res) => setTimeout(res, 50));
    return [
      { state: 'Odisha', count: 342000, verified: 310000, gap: 32000 },
      { state: 'Jharkhand', count: 312000, verified: 285000, gap: 27000 },
      { state: 'Chhattisgarh', count: 289000, verified: 260000, gap: 29000 },
      { state: 'Madhya Pradesh', count: 278000, verified: 245000, gap: 33000 },
      { state: 'Assam & NE', count: 210000, verified: 192000, gap: 18000 },
      { state: 'Maharashtra', count: 184000, verified: 168000, gap: 16000 },
      { state: 'Rajasthan', count: 165000, verified: 152000, gap: 13000 },
      { state: 'Gujarat', count: 140000, verified: 128000, gap: 12000 }
    ];
  },

  async getMonthlyDisbursementsTrend() {
    await new Promise((res) => setTimeout(res, 50));
    return [
      { month: 'Apr 26', amountCr: 85, beneficiariesK: 120 },
      { month: 'May 26', amountCr: 140, beneficiariesK: 210 },
      { month: 'Jun 26', amountCr: 195, beneficiariesK: 320 },
      { month: 'Jul 26', amountCr: 260, beneficiariesK: 440 },
      { month: 'Aug 26', amountCr: 310, beneficiariesK: 530 },
      { month: 'Sep 26', amountCr: 250, beneficiariesK: 300 }
    ];
  },

  async getDeficiencyCategories() {
    await new Promise((res) => setTimeout(res, 50));
    return [
      { category: 'Expired Income Cert.', count: 4812, percentage: 34 },
      { category: 'Aadhaar Name Mismatch', count: 3210, percentage: 23 },
      { category: 'Bank IFSC / Inactive APB', count: 2690, percentage: 19 },
      { category: 'Bonafide / Roll Missing', count: 2150, percentage: 15 },
      { category: 'Caste e-Pramaan Pending', count: 1346, percentage: 9 }
    ];
  },

  async getOutreachTargets() {
    await new Promise((res) => setTimeout(res, 50));
    return [...MOCK_OUTREACH_TARGETS];
  },

  async getInstitutions() {
    await new Promise((res) => setTimeout(res, 50));
    return [...MOCK_INSTITUTIONS];
  },

  async getAuditLogs() {
    await new Promise((res) => setTimeout(res, 50));
    return [...MOCK_AUDIT_LOGS];
  }
};
