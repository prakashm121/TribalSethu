import { DocumentItem } from '../types';
import { MOCK_DOCUMENTS } from '../data/mockData';

export const documentService = {
  async getDocuments(): Promise<DocumentItem[]> {
    await new Promise((res) => setTimeout(res, 80));
    return [...MOCK_DOCUMENTS];
  },

  async fetchDigiLockerPointers(): Promise<{
    availableCount: number;
    documents: {
      type: string;
      title: string;
      issuer: string;
      docNumber: string;
      verifiedDate: string;
    }[];
  }> {
    await new Promise((res) => setTimeout(res, 400));
    return {
      availableCount: 4,
      documents: [
        {
          type: 'ST_CERTIFICATE',
          title: 'Scheduled Tribe Community Certificate',
          issuer: 'Revenue & Disaster Management Dept, Govt of Odisha',
          docNumber: 'E-ST/2021/48902',
          verifiedDate: '19 Aug 2021'
        },
        {
          type: 'INCOME_CERTIFICATE',
          title: 'Income Certificate (FY 2026-27 Renewal)',
          issuer: 'Office of the Tahasildar, Hemgir',
          docNumber: 'INC/OD/SNG/2026/0991',
          verifiedDate: '15 Jun 2026'
        },
        {
          type: 'DOMICILE_CERTIFICATE',
          title: 'Permanent Resident Certificate',
          issuer: 'Government of Odisha e-Pramaan',
          docNumber: 'DOM/OD/2021/33891',
          verifiedDate: '02 Sep 2021'
        },
        {
          type: 'MARKSHEET_PREV',
          title: 'Class XII CBSE Senior Secondary Certificate',
          issuer: 'Central Board of Secondary Education',
          docNumber: 'CBSE/2022/94129',
          verifiedDate: '22 Jul 2022'
        }
      ]
    };
  },

  async verifyDocument(docId: string): Promise<{ success: boolean; message: string }> {
    await new Promise((res) => setTimeout(res, 200));
    return {
      success: true,
      message: `Document ${docId} verified with state digital repository.`
    };
  }
};
