export type UserRole = 'public' | 'student' | 'admin';

export type ScholarshipCode = 
  | 'PRE_MATRIC'
  | 'POST_MATRIC'
  | 'TOP_CLASS'
  | 'NFST_FELLOWSHIP'
  | 'NOS_OVERSEAS';

export interface ScholarshipScheme {
  id: string;
  code: ScholarshipCode;
  name: string;
  shortName: string;
  category: 'School' | 'Higher Education' | 'Excellence' | 'Research' | 'International';
  ministry: string;
  description: string;
  annualAwardMax: number;
  incomeLimitAnnual: number | null; // null means no income cap
  eligibleCourses: string[];
  documentsRequired: string[];
  keyBenefits: string[];
  deadlineDate: string;
  status: 'Open' | 'Closing Soon' | 'Closed';
  academicYear: string;
  targetBeneficiaries: string;
}

export type ApplicationStage = 
  | 'SUBMITTED'
  | 'INSTITUTE_VERIFICATION'
  | 'STATE_VERIFICATION'
  | 'CENTRAL_APPROVAL'
  | 'SANCTIONED'
  | 'DBT_CREDITED'
  | 'DEFICIENCY';

export type ApplicationStatus = 
  | 'Submitted'
  | 'Under Review'
  | 'Verification'
  | 'Deficiency'
  | 'Sanctioned'
  | 'Disbursed'
  | 'Rejected';

export interface TimelineEvent {
  id: string;
  stage: ApplicationStage;
  title: string;
  date: string;
  status: 'completed' | 'in_progress' | 'pending' | 'action_required';
  remarks?: string;
  verifiedBy?: string;
}

export interface Application {
  id: string; // e.g. "TS-2026-004821"
  schemeCode: ScholarshipCode;
  schemeName: string;
  academicYear: string;
  institutionName: string;
  courseName: string;
  currentStage: ApplicationStage;
  status: ApplicationStatus;
  sanctionedAmount: number;
  disbursedAmount: number;
  lastUpdated: string;
  nextAction: string;
  deficiencyCount: number;
  submissionDate: string;
  timeline: TimelineEvent[];
  attachedDocuments: string[]; // document IDs
}

export type DocumentType = 
  | 'AADHAAR'
  | 'ST_CERTIFICATE'
  | 'INCOME_CERTIFICATE'
  | 'DOMICILE_CERTIFICATE'
  | 'MARKSHEET_PREV'
  | 'DEGREE_CERTIFICATE'
  | 'DISABILITY_CERTIFICATE'
  | 'BANK_PASSBOOK'
  | 'ADMISSION_PROOF';

export type DocVerificationStatus = 'Verified' | 'Pending' | 'Expired' | 'Needs Attention';

export interface DocumentItem {
  id: string;
  type: DocumentType;
  title: string;
  issuer: string;
  docNumber: string;
  issueDate: string;
  expiryDate?: string | null;
  status: DocVerificationStatus;
  source: 'DigiLocker' | 'Direct Upload' | 'UIDAI' | 'State e-District';
  fileUrl?: string;
  fileSize?: string;
  remarks?: string;
}

export interface DeficiencyItem {
  id: string;
  applicationId: string;
  schemeName: string;
  documentType: DocumentType;
  title: string;
  reason: string;
  deadline: string;
  status: 'Open' | 'Resolved' | 'Escalated';
  raisedBy: string;
  raisedDate: string;
  actionRequired: string;
}

export interface DisbursementTranche {
  id: string;
  amount: number;
  status: 'Credited' | 'Processing' | 'Pending' | 'Failed';
  disbursementDate?: string;
  expectedDate?: string;
  utrNumber?: string;
  bankName: string;
  accountEnding: string;
  schemeName: string;
  trancheNumber: number;
  totalTranches: number;
}

export interface StudentProfile {
  id: string;
  fullName: string;
  aadhaarNumberMasked: string;
  apaarId: string;
  email: string;
  mobile: string;
  dob: string;
  gender: 'Female' | 'Male' | 'Other';
  tribeName: string;
  pvtgStatus: boolean; // Particularly Vulnerable Tribal Group
  domicileState: string;
  district: string;
  pinCode: string;
  currentInstitution: string;
  currentCourse: string;
  currentYear: string;
  annualFamilyIncome: number;
  incomeCertificateNo: string;
  bankName: string;
  accountNumberMasked: string;
  ifscCode: string;
  dbtSeeded: boolean;
  avatarUrl?: string;
  profileCompletionPercentage: number;
}

export interface VerificationItem {
  id: string;
  applicationId: string;
  applicantName: string;
  schemeName: string;
  institutionName: string;
  state: string;
  verificationSource: 'Aadhaar' | 'DigiLocker' | 'ST Certificate' | 'Income Certificate' | 'AISHE' | 'UDISE+' | 'NTA' | 'UDID';
  fieldVerified: string;
  matchScore: number; // 0 to 100
  status: 'Verified' | 'Mismatch' | 'Pending' | 'Manual Review';
  riskLevel: 'Low' | 'Medium' | 'High';
  dateReceived: string;
  notes?: string;
}

export interface InstitutionRecord {
  id: string;
  code: string;
  name: string;
  state: string;
  district: string;
  category: 'University' | 'NIT / IIT / IIM' | 'Degree College' | 'Polytechnic' | 'Higher Secondary';
  totalStEnrolled: number;
  applicationsSubmitted: number;
  verificationBacklog: number;
  nodalOfficerName: string;
  nodalOfficerPhone: string;
  status: 'Active' | 'Under-performing' | 'Flagged';
}

export interface OutreachTarget {
  id: string;
  state: string;
  district: string;
  institutionCount: number;
  estimatedEligibleSt: number;
  actualApplications: number;
  outreachGap: number;
  priorityLevel: 'Critical' | 'High' | 'Moderate';
  lastFieldCampDate?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'payment';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  targetId: string;
  details: string;
  ipAddress: string;
  integrityHash: string;
}
