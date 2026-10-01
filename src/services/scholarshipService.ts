import { SCHOLARSHIP_SCHEMES } from '../data/mockData';
import { ScholarshipScheme, Application } from '../types';

export const scholarshipService = {
  async getScholarshipSchemes(): Promise<ScholarshipScheme[]> {
    // Simulated network delay
    await new Promise((res) => setTimeout(res, 80));
    return [...SCHOLARSHIP_SCHEMES];
  },

  async getSchemeByCode(code: string): Promise<ScholarshipScheme | undefined> {
    await new Promise((res) => setTimeout(res, 50));
    return SCHOLARSHIP_SCHEMES.find((s) => s.code === code);
  },

  checkEligibility(params: {
    educationLevel: string;
    isSt: boolean;
    isPvtg: boolean;
    annualIncome: number;
    studyLocation: string;
  }) {
    const results = SCHOLARSHIP_SCHEMES.map((scheme) => {
      if (!params.isSt) {
        return {
          scheme,
          status: 'Not Applicable' as const,
          reason: 'This scheme is exclusively reserved for candidates belonging to Scheduled Tribe (ST) communities.'
        };
      }

      if (scheme.incomeLimitAnnual !== null && params.annualIncome > scheme.incomeLimitAnnual) {
        return {
          scheme,
          status: 'Not Applicable' as const,
          reason: `Annual family income ₹${params.annualIncome.toLocaleString('en-IN')} exceeds the scheme ceiling of ₹${scheme.incomeLimitAnnual.toLocaleString('en-IN')}.`
        };
      }

      if (scheme.code === 'PRE_MATRIC') {
        if (params.educationLevel === 'School') {
          return {
            scheme,
            status: 'Eligible' as const,
            reason: 'You meet the grade level (Classes IX-X) and family income criterion.'
          };
        }
        return {
          scheme,
          status: 'Not Applicable' as const,
          reason: 'Pre-Matric is strictly for secondary school students (Classes IX and X).'
        };
      }

      if (scheme.code === 'POST_MATRIC') {
        if (['Undergraduate', 'Postgraduate', 'School'].includes(params.educationLevel)) {
          return {
            scheme,
            status: 'Eligible' as const,
            reason: 'You qualify for 100% non-refundable tuition reimbursement and monthly maintenance.'
          };
        }
        return {
          scheme,
          status: 'Potentially Eligible' as const,
          reason: 'Check specific course accreditation in AISHE portal.'
        };
      }

      if (scheme.code === 'TOP_CLASS') {
        if (['Undergraduate', 'Postgraduate'].includes(params.educationLevel)) {
          return {
            scheme,
            status: 'Eligible' as const,
            reason: 'Eligible for premier institutes (IITs, NITs, IIMs, Central Varsities) up to ₹2.0 Lakhs/yr fee waiver.'
          };
        }
        return {
          scheme,
          status: 'Check Required' as const,
          reason: 'Applicable only upon admission to one of the 265 notified premier national institutions.'
        };
      }

      if (scheme.code === 'NFST_FELLOWSHIP') {
        if (params.educationLevel === 'Research / PhD') {
          return {
            scheme,
            status: 'Eligible' as const,
            reason: 'Full monthly stipend ₹37,000/mo (JRF) to ₹42,000/mo (SRF) + contingency.'
          };
        }
        return {
          scheme,
          status: 'Not Applicable' as const,
          reason: 'Exclusively for regular and full-time M.Phil / Ph.D. scholars.'
        };
      }

      if (scheme.code === 'NOS_OVERSEAS') {
        if (params.studyLocation === 'Overseas / Abroad' || params.educationLevel === 'Planning to study abroad') {
          return {
            scheme,
            status: 'Eligible' as const,
            reason: 'Full overseas tuition coverage and annual foreign living allowance (£9,900 UK / $15,400 USA).'
          };
        }
        return {
          scheme,
          status: 'Potentially Eligible' as const,
          reason: 'Requires an unconditional admission offer from a Top 500 QS/THE world-ranked university.'
        };
      }

      return {
        scheme,
        status: 'Potentially Eligible' as const,
        reason: 'Basic criteria satisfied. Submit application for institute verification.'
      };
    });

    return results;
  }
};
