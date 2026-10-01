import { StudentProfile } from '../types';
import { MOCK_STUDENT } from '../data/mockData';

export interface AuthSession {
  token: string;
  role: 'student' | 'admin';
  user: {
    id: string;
    name: string;
    email: string;
    roleTitle: string;
  };
}

export const authService = {
  async loginWithOtp(mobileOrAadhaar: string, otp: string): Promise<AuthSession> {
    await new Promise((res) => setTimeout(res, 300));
    return {
      token: 'demo_jwt_token_st_98124',
      role: 'student',
      user: {
        id: MOCK_STUDENT.id,
        name: MOCK_STUDENT.fullName,
        email: MOCK_STUDENT.email,
        roleTitle: 'ST Scholar'
      }
    };
  },

  async loginAsAdmin(username: string, _pass: string): Promise<AuthSession> {
    await new Promise((res) => setTimeout(res, 300));
    return {
      token: 'demo_admin_jwt_mota_001',
      role: 'admin',
      user: {
        id: 'ADMIN-MOTA-001',
        name: 'Dr. R. Murmu',
        email: 'director.st@mota.gov.in',
        roleTitle: 'Director, Ministry of Tribal Affairs'
      }
    };
  },

  async logout(): Promise<void> {
    await new Promise((res) => setTimeout(res, 100));
  }
};
