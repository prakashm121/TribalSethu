import { 
  ScholarshipScheme, 
  StudentProfile, 
  Application, 
  DocumentItem, 
  DeficiencyItem, 
  DisbursementTranche,
  VerificationItem,
  InstitutionRecord,
  OutreachTarget,
  NotificationItem,
  AuditLogItem 
} from '../types';

export const SCHOLARSHIP_SCHEMES: ScholarshipScheme[] = [
  {
    id: 'scheme-1',
    code: 'PRE_MATRIC',
    name: 'Pre-Matric Scholarship Scheme for ST Students',
    shortName: 'Pre-Matric ST',
    category: 'School',
    ministry: 'Ministry of Tribal Affairs (MoTA)',
    description: 'Centrally sponsored financial assistance for Scheduled Tribe students studying in classes IX and X in recognized government and aided schools to minimize dropouts.',
    annualAwardMax: 7000,
    incomeLimitAnnual: 250000,
    eligibleCourses: ['Class IX', 'Class X'],
    documentsRequired: ['Aadhaar', 'ST Certificate', 'Income Certificate', 'School Enrollment Slip', 'Bank Details'],
    keyBenefits: ['Books & stationery grant ₹1,000/yr', 'Day scholar maintenance ₹2,250/yr', 'Hosteller allowance ₹5,250/yr', 'Direct DBT to student/guardian'],
    deadlineDate: '2026-11-30',
    status: 'Open',
    academicYear: '2026-27',
    targetBeneficiaries: 'ST day scholars & hostellers in secondary grades'
  },
  {
    id: 'scheme-2',
    code: 'POST_MATRIC',
    name: 'Post-Matric Scholarship Scheme for ST Students',
    shortName: 'Post-Matric ST',
    category: 'Higher Education',
    ministry: 'Ministry of Tribal Affairs (MoTA)',
    description: 'Flagship financial support covering compulsory non-refundable fees and monthly maintenance allowances for ST students pursuing post-secondary courses across India.',
    annualAwardMax: 48000,
    incomeLimitAnnual: 250000,
    eligibleCourses: ['Intermediate / +2', 'Graduation / BA / B.Sc / B.Com', 'Post Graduation', 'ITI / Diploma', 'Professional Degrees'],
    documentsRequired: ['Aadhaar', 'ST Certificate', 'Income Certificate', 'Domicile', 'Previous Year Marksheet', 'College Fee Receipt', 'Bank Details'],
    keyBenefits: ['100% non-refundable tuition reimbursement', 'Maintenance allowance up to ₹1,200/month', 'Special disability study escort allowance', 'No application fee'],
    deadlineDate: '2026-12-15',
    status: 'Open',
    academicYear: '2026-27',
    targetBeneficiaries: 'Over 2.2 million post-matric ST scholars annually'
  },
  {
    id: 'scheme-3',
    code: 'TOP_CLASS',
    name: 'National Fellowship & Scholarship for Higher Education: Top Class Education for ST Students',
    shortName: 'Top Class ST',
    category: 'Excellence',
    ministry: 'Ministry of Tribal Affairs (MoTA)',
    description: 'Merit-cum-means scholarship for meritorious ST students admitted into 265 notified premier institutions including IITs, NITs, IIMs, AIIMS, NLUs, and premier Central Universities.',
    annualAwardMax: 200000,
    incomeLimitAnnual: 600000,
    eligibleCourses: ['B.Tech / B.E.', 'MBBS', 'MBA', 'Integrated M.Sc', 'LLB / LLM', 'Postgraduate Design / Architecture'],
    documentsRequired: ['Aadhaar', 'ST Tribe Certificate', 'Parental Income Certificate', 'JEE/NEET/Entrance Rank Card', 'Institute Admission Letter', 'Fee Structure Slip'],
    keyBenefits: ['Full tuition fee waiver up to ₹2.0 Lakhs/yr', 'Living expense allowance ₹3,000/month', 'Books & stationery allowance ₹5,000/yr', 'One-time computer purchase grant ₹45,000'],
    deadlineDate: '2026-10-31',
    status: 'Closing Soon',
    academicYear: '2026-27',
    targetBeneficiaries: 'Meritorious ST students at premier national institutes'
  },
  {
    id: 'scheme-4',
    code: 'NFST_FELLOWSHIP',
    name: 'National Fellowship for Scheduled Tribe Students (NFST)',
    shortName: 'NFST Fellowship',
    category: 'Research',
    ministry: 'Ministry of Tribal Affairs (MoTA)',
    description: 'Generous central fellowship for 750 ST scholars annually pursuing regular and full-time M.Phil and Ph.D. degrees in Sciences, Humanities, Engineering and Social Sciences.',
    annualAwardMax: 420000,
    incomeLimitAnnual: null, // No income cap for NFST
    eligibleCourses: ['Ph.D. Full Time', 'M.Phil + Ph.D. Integrated', 'Postdoctoral ST Fellowship'],
    documentsRequired: ['Aadhaar', 'ST Certificate', 'UGC/CSIR NET/GATE score (if any)', 'University Ph.D. Registration Order', 'Research Proposal Summary', 'Guide Consent'],
    keyBenefits: ['JRF stipend ₹37,000/month for 2 years', 'SRF stipend ₹42,000/month for 3 years', 'Contingency grant ₹20,500/year', 'HRA as per central university norms'],
    deadlineDate: '2026-11-15',
    status: 'Open',
    academicYear: '2026-27',
    targetBeneficiaries: '750 dedicated ST doctoral researchers annually'
  },
  {
    id: 'scheme-5',
    code: 'NOS_OVERSEAS',
    name: 'National Overseas Scholarship for ST Candidates (NOS)',
    shortName: 'National Overseas (NOS)',
    category: 'International',
    ministry: 'Ministry of Tribal Affairs (MoTA)',
    description: 'Prestigious full scholarship enabling 20 high-achieving ST candidates annually to pursue Master’s level courses, Ph.D., and Post-Doctoral research in accredited overseas universities.',
    annualAwardMax: 2800000,
    incomeLimitAnnual: 600000,
    eligibleCourses: ['Master of Science (Abroad)', 'Ph.D. (Overseas)', 'Postdoctoral Overseas Research'],
    documentsRequired: ['Valid Passport', 'ST Certificate', 'Unconditional Offer Letter from Top 500 QS/THE University', 'GRE/IELTS/TOEFL score', 'Income Certificate', 'Academic Transcripts'],
    keyBenefits: ['100% tuition fees directly paid to overseas varsity', 'Annual maintenance allowance £9,900 (UK) / $15,400 (USA)', 'Economy airfare to and from country of study', 'Contingency and health insurance coverage'],
    deadlineDate: '2026-10-15',
    status: 'Closing Soon',
    academicYear: '2026-27',
    targetBeneficiaries: '20 top ST candidates studying at QS top 500 universities'
  }
];

export const MOCK_STUDENT: StudentProfile = {
  id: 'ST-2024-OR-8821',
  fullName: 'Asha Tirkey',
  aadhaarNumberMasked: '•••• •••• 4912',
  apaarId: 'APAAR-9812-4410-0921',
  email: 'asha.tirkey@student.nitrkl.ac.in',
  mobile: '+91 94371 88204',
  dob: '2004-06-14',
  gender: 'Female',
  tribeName: 'Oraon (Kurukh)',
  pvtgStatus: false,
  domicileState: 'Odisha',
  district: 'Sundargarh',
  pinCode: '770038',
  currentInstitution: 'National Institute of Technology (NIT), Rourkela',
  currentCourse: 'B.Tech in Computer Science & Engineering',
  currentYear: '3rd Year (6th Semester)',
  annualFamilyIncome: 185000,
  incomeCertificateNo: 'INC/OD/SNG/2024/7741',
  bankName: 'State Bank of India',
  accountNumberMasked: '••••••••8392',
  ifscCode: 'SBIN0002109 (NIT Campus Branch)',
  dbtSeeded: true,
  avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
  profileCompletionPercentage: 82
};

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: 'TS-2026-004821',
    schemeCode: 'TOP_CLASS',
    schemeName: 'Top Class Education for ST Students',
    academicYear: '2026-27',
    institutionName: 'National Institute of Technology, Rourkela',
    courseName: 'B.Tech - Computer Science & Engineering (3rd Year)',
    currentStage: 'DEFICIENCY',
    status: 'Deficiency',
    sanctionedAmount: 58000,
    disbursedAmount: 0,
    lastUpdated: 'Today at 09:40 AM',
    nextAction: 'Re-upload valid Financial Year 2026-27 Income Certificate or pull via DigiLocker',
    deficiencyCount: 1,
    submissionDate: '2026-08-18',
    timeline: [
      {
        id: 't-1',
        stage: 'SUBMITTED',
        title: 'Application Submitted Online',
        date: '18 Aug 2026, 11:20 AM',
        status: 'completed',
        remarks: 'Digital submission verified via Aadhaar OTP e-Sign.'
      },
      {
        id: 't-2',
        stage: 'INSTITUTE_VERIFICATION',
        title: 'Institute Verification (NIT Rourkela)',
        date: '25 Aug 2026, 04:15 PM',
        status: 'completed',
        remarks: 'AISHE record matched with Dean of Student Affairs registry.',
        verifiedBy: 'Prof. S. K. Mahapatra (Nodal Officer)'
      },
      {
        id: 't-3',
        stage: 'STATE_VERIFICATION',
        title: 'State Tribal Welfare Department Verification',
        date: '08 Sep 2026, 02:30 PM',
        status: 'completed',
        remarks: 'ST Caste Certificate authenticated via Odisha e-District Portal.',
        verifiedBy: 'Shri B. Nayak, DWO Sundargarh'
      },
      {
        id: 't-4',
        stage: 'CENTRAL_APPROVAL',
        title: 'Ministry of Tribal Affairs Central Scrutiny',
        date: '28 Sep 2026, 10:10 AM',
        status: 'action_required',
        remarks: 'Attention: Attached Family Income Certificate expired on 31 Mar 2026. Submit renewal.'
      },
      {
        id: 't-5',
        stage: 'SANCTIONED',
        title: 'Sanction Order Generation',
        date: 'Awaiting Deficiency Clearance',
        status: 'pending'
      },
      {
        id: 't-6',
        stage: 'DBT_CREDITED',
        title: 'DBT Credited to Aadhaar Seeded Account',
        date: 'Scheduled within 7 days of approval',
        status: 'pending'
      }
    ],
    attachedDocuments: ['doc-1', 'doc-2', 'doc-3', 'doc-4', 'doc-6', 'doc-8']
  },
  {
    id: 'TS-2025-018239',
    schemeCode: 'POST_MATRIC',
    schemeName: 'Post-Matric Scholarship Scheme for ST Students',
    academicYear: '2025-26',
    institutionName: 'National Institute of Technology, Rourkela',
    courseName: 'B.Tech - Computer Science & Engineering (2nd Year)',
    currentStage: 'DBT_CREDITED',
    status: 'Disbursed',
    sanctionedAmount: 48000,
    disbursedAmount: 48000,
    lastUpdated: '11 Oct 2025',
    nextAction: 'None - Successfully disbursed via PFMS-DBT',
    deficiencyCount: 0,
    submissionDate: '2025-07-22',
    timeline: [
      { id: 't2-1', stage: 'SUBMITTED', title: 'Application Submitted', date: '22 Jul 2025', status: 'completed' },
      { id: 't2-2', stage: 'INSTITUTE_VERIFICATION', title: 'Institute Verified', date: '04 Aug 2025', status: 'completed' },
      { id: 't2-3', stage: 'STATE_VERIFICATION', title: 'State Tribal Welfare Approved', date: '20 Aug 2025', status: 'completed' },
      { id: 't2-4', stage: 'CENTRAL_APPROVAL', title: 'Central Clearance', date: '05 Sep 2025', status: 'completed' },
      { id: 't2-5', stage: 'SANCTIONED', title: 'Sanction Order: MOTA/ST/2025/8812', date: '15 Sep 2025', status: 'completed' },
      { id: 't2-6', stage: 'DBT_CREDITED', title: 'DBT Credited ₹48,000 (PFMS UTR: MOTA2510119283)', date: '11 Oct 2025', status: 'completed' }
    ],
    attachedDocuments: ['doc-1', 'doc-2', 'doc-4', 'doc-5', 'doc-8']
  },
  {
    id: 'TS-2023-009121',
    schemeCode: 'PRE_MATRIC',
    schemeName: 'Pre-Matric Scholarship Scheme for ST Students',
    academicYear: '2022-23',
    institutionName: 'Eklavya Model Residential School (EMRS), Sundargarh',
    courseName: 'Class X Secondary Board',
    currentStage: 'DBT_CREDITED',
    status: 'Disbursed',
    sanctionedAmount: 7000,
    disbursedAmount: 7000,
    lastUpdated: '24 Apr 2023',
    nextAction: 'Completed Archive',
    deficiencyCount: 0,
    submissionDate: '2022-09-10',
    timeline: [
      { id: 't3-1', stage: 'SUBMITTED', title: 'Application Submitted', date: '10 Sep 2022', status: 'completed' },
      { id: 't3-2', stage: 'INSTITUTE_VERIFICATION', title: 'School Verification Complete', date: '18 Sep 2022', status: 'completed' },
      { id: 't3-3', stage: 'STATE_VERIFICATION', title: 'District Welfare Approval', date: '05 Oct 2022', status: 'completed' },
      { id: 't3-4', stage: 'DBT_CREDITED', title: 'DBT Credited ₹7,000', date: '24 Apr 2023', status: 'completed' }
    ],
    attachedDocuments: ['doc-1', 'doc-2']
  }
];

export const MOCK_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-1',
    type: 'AADHAAR',
    title: 'Aadhaar Identity Card',
    issuer: 'Unique Identification Authority of India (UIDAI)',
    docNumber: 'XXXXXXXX4912',
    issueDate: '2016-04-12',
    expiryDate: null,
    status: 'Verified',
    source: 'UIDAI',
    fileSize: '1.2 MB',
    remarks: 'Aadhaar e-KYC authenticated with biometrics on file.'
  },
  {
    id: 'doc-2',
    type: 'ST_CERTIFICATE',
    title: 'Scheduled Tribe Community Certificate',
    issuer: 'Tahasildar, Hemgir, Dist. Sundargarh (Govt. of Odisha)',
    docNumber: 'E-ST/2021/48902',
    issueDate: '2021-08-19',
    expiryDate: null,
    status: 'Verified',
    source: 'DigiLocker',
    fileSize: '840 KB',
    remarks: 'Verified electronically against State e-District Repository. Oraon Tribe.'
  },
  {
    id: 'doc-3',
    type: 'INCOME_CERTIFICATE',
    title: 'Annual Family Income Certificate',
    issuer: 'Revenue Officer, Sundargarh Collectorate',
    docNumber: 'INC/OD/SNG/2024/7741',
    issueDate: '2024-05-10',
    expiryDate: '2026-03-31',
    status: 'Needs Attention',
    source: 'Direct Upload',
    fileSize: '620 KB',
    remarks: 'Certificate expired on 31 Mar 2026. Required updated income certificate for FY 2026-27.'
  },
  {
    id: 'doc-4',
    type: 'DOMICILE_CERTIFICATE',
    title: 'Permanent Resident / Domicile Certificate',
    issuer: 'Government of Odisha e-Pramaan',
    docNumber: 'DOM/OD/2021/33891',
    issueDate: '2021-09-02',
    expiryDate: null,
    status: 'Verified',
    source: 'DigiLocker',
    fileSize: '750 KB',
    remarks: 'Odisha State domicile verified.'
  },
  {
    id: 'doc-5',
    type: 'MARKSHEET_PREV',
    title: 'Class XII CBSE Senior Secondary Certificate',
    issuer: 'Central Board of Secondary Education (CBSE)',
    docNumber: 'CBSE/2022/94129',
    issueDate: '2022-07-22',
    expiryDate: null,
    status: 'Verified',
    source: 'DigiLocker',
    fileSize: '950 KB',
    remarks: '91.4% Aggregate score authenticated from CBSE digital repository.'
  },
  {
    id: 'doc-6',
    type: 'DEGREE_CERTIFICATE',
    title: 'B.Tech Grade Card & Bonafide Certificate',
    issuer: 'Academic Registrar, NIT Rourkela',
    docNumber: 'NITR/ACAD/2026/0912',
    issueDate: '2026-01-15',
    expiryDate: '2026-12-31',
    status: 'Verified',
    source: 'Direct Upload',
    fileSize: '1.4 MB',
    remarks: 'Current CGPA: 8.64 / 10.00. Bonafide verified with AISHE code U-0361.'
  },
  {
    id: 'doc-7',
    type: 'DISABILITY_CERTIFICATE',
    title: 'Unique Disability ID (UDID) Card',
    issuer: 'Department of Empowerment of Persons with Disabilities',
    docNumber: 'NOT_APPLICABLE',
    issueDate: '2026-01-01',
    expiryDate: null,
    status: 'Verified',
    source: 'Direct Upload',
    fileSize: '0 KB',
    remarks: 'Applicant declared Non-PwD category. Exemption confirmed.'
  },
  {
    id: 'doc-8',
    type: 'BANK_PASSBOOK',
    title: 'Bank Account & DBT Seeding Proof',
    issuer: 'State Bank of India (NIT Campus Branch)',
    docNumber: 'SBIN0002109-8392',
    issueDate: '2022-08-01',
    expiryDate: null,
    status: 'Verified',
    source: 'DigiLocker',
    fileSize: '1.1 MB',
    remarks: 'NPCI Aadhaar Payment Bridge (APB) active. DBT enabled.'
  }
];

export const MOCK_DEFICIENCIES: DeficiencyItem[] = [
  {
    id: 'def-1',
    applicationId: 'TS-2026-004821',
    schemeName: 'Top Class Education for ST Students',
    documentType: 'INCOME_CERTIFICATE',
    title: 'Income Certificate Needs Attention',
    reason: 'The income certificate submitted with your application (issued May 2024) expired on 31 March 2026. Central guidelines mandate a valid income certificate for Financial Year 2026-27.',
    deadline: '2026-10-14 (14 days left)',
    status: 'Open',
    raisedBy: 'Ministry of Tribal Affairs Central Scrutiny Cell',
    raisedDate: '2026-09-28',
    actionRequired: 'Fetch fresh 2026-27 Income Certificate from DigiLocker or upload official Tehsildar certificate.'
  }
];

export const MOCK_DISBURSEMENTS: DisbursementTranche[] = [
  {
    id: 'dbt-1',
    amount: 16000,
    status: 'Credited',
    disbursementDate: '12 Aug 2026',
    utrNumber: 'MOTA26081290312',
    bankName: 'State Bank of India',
    accountEnding: '8392',
    schemeName: 'Top Class Education (Tranche 1)',
    trancheNumber: 1,
    totalTranches: 4
  },
  {
    id: 'dbt-2',
    amount: 16000,
    status: 'Credited',
    disbursementDate: '14 Sep 2026',
    utrNumber: 'MOTA26091481109',
    bankName: 'State Bank of India',
    accountEnding: '8392',
    schemeName: 'Top Class Education (Tranche 2)',
    trancheNumber: 2,
    totalTranches: 4
  },
  {
    id: 'dbt-3',
    amount: 16000,
    status: 'Credited',
    disbursementDate: 'Today (30 Sep 2026)',
    utrNumber: 'MOTA26093077651',
    bankName: 'State Bank of India',
    accountEnding: '8392',
    schemeName: 'Top Class Education (Tranche 3)',
    trancheNumber: 3,
    totalTranches: 4
  },
  {
    id: 'dbt-4',
    amount: 24000,
    status: 'Processing',
    expectedDate: '15 Oct 2026',
    bankName: 'State Bank of India',
    accountEnding: '8392',
    schemeName: 'Top Class Education (Final Tranche + Living Grant)',
    trancheNumber: 4,
    totalTranches: 4
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Income Certificate Action Required',
    message: 'Ministry central scrutiny has flagged your Income Certificate as expired. Please resolve before 14 Oct 2026 to release tranche 4.',
    type: 'warning',
    timestamp: '2 hours ago',
    read: false,
    actionUrl: '/student/verification',
    actionLabel: 'Resolve Now'
  },
  {
    id: 'notif-2',
    title: 'DBT Payment Credited ₹16,000',
    message: 'Your scholarship installment of ₹16,000 has been credited to your SBI account ••••8392 via PFMS.',
    type: 'payment',
    timestamp: '5 hours ago',
    read: false,
    actionUrl: '/student/payments',
    actionLabel: 'View Receipt'
  },
  {
    id: 'notif-3',
    title: 'Institute Verification Completed',
    message: 'NIT Rourkela Dean of Student Affairs verified your enrollment details with 100% AISHE alignment.',
    type: 'success',
    timestamp: '3 days ago',
    read: true,
    actionUrl: '/student/applications/TS-2026-004821',
    actionLabel: 'View Timeline'
  },
  {
    id: 'notif-4',
    title: 'DigiLocker Document Sync Successful',
    message: '4 documents including your ST Tribe Certificate from Odisha e-District were synced to your wallet.',
    type: 'info',
    timestamp: '1 week ago',
    read: true,
    actionUrl: '/student/documents',
    actionLabel: 'View Wallet'
  }
];

export const MOCK_VERIFICATIONS_QUEUE: VerificationItem[] = [
  {
    id: 'ver-1',
    applicationId: 'TS-2026-004821',
    applicantName: 'Asha Tirkey',
    schemeName: 'Top Class ST',
    institutionName: 'NIT Rourkela',
    state: 'Odisha',
    verificationSource: 'Income Certificate',
    fieldVerified: 'Annual Family Income (FY 2026-27)',
    matchScore: 68,
    status: 'Manual Review',
    riskLevel: 'Medium',
    dateReceived: '28 Sep 2026',
    notes: 'Income certificate validity expired on 31 Mar 2026. Student notified for renewal.'
  },
  {
    id: 'ver-2',
    applicationId: 'TS-2026-005118',
    applicantName: 'Birsa Munda',
    schemeName: 'NFST Fellowship',
    institutionName: 'Ranchi University',
    state: 'Jharkhand',
    verificationSource: 'ST Certificate',
    fieldVerified: 'Tribe Authenticity (Munda)',
    matchScore: 100,
    status: 'Verified',
    riskLevel: 'Low',
    dateReceived: '29 Sep 2026',
    notes: 'Authenticated via Jharkhand JharSewa digital signature.'
  },
  {
    id: 'ver-3',
    applicationId: 'TS-2026-005144',
    applicantName: 'Lalitha Marandi',
    schemeName: 'Post-Matric ST',
    institutionName: 'Govt Autonomous College, Rourkela',
    state: 'Odisha',
    verificationSource: 'AISHE',
    fieldVerified: 'Course & Fee Structure',
    matchScore: 100,
    status: 'Verified',
    riskLevel: 'Low',
    dateReceived: '30 Sep 2026',
    notes: 'Direct match with AISHE code C-39182.'
  },
  {
    id: 'ver-4',
    applicationId: 'TS-2026-005201',
    applicantName: 'Karan Meena',
    schemeName: 'NOS Overseas',
    institutionName: 'University of Edinburgh (UK)',
    state: 'Rajasthan',
    verificationSource: 'DigiLocker',
    fieldVerified: 'Passport & Offer Letter',
    matchScore: 92,
    status: 'Pending',
    riskLevel: 'Low',
    dateReceived: '30 Sep 2026',
    notes: 'Overseas varsity admission verified against QS Top 100 directory.'
  },
  {
    id: 'ver-5',
    applicationId: 'TS-2026-005289',
    applicantName: 'Sneha Hembram',
    schemeName: 'Post-Matric ST',
    institutionName: 'St. Xavier’s College, Ranchi',
    state: 'Jharkhand',
    verificationSource: 'Aadhaar',
    fieldVerified: 'Name Spelling in Marksheet vs UIDAI',
    matchScore: 78,
    status: 'Manual Review',
    riskLevel: 'Medium',
    dateReceived: '27 Sep 2026',
    notes: 'Minor spelling variation: "Sneha Hembrom" vs "Sneha Hembram". Not rejected; manual clearance recommended.'
  }
];

export const MOCK_ADMIN_METRICS = {
  registeredStudents: 2840000,
  totalApplications: 1920000,
  disbursedCrores: 1240.85,
  verifiedPercentage: 87.4,
  pendingActions: 14208,
  institutionsRegistered: 48920,
  pvtgBeneficiaries: 184500,
  dbtSuccessRate: 99.1
};

export const MOCK_OUTREACH_TARGETS: OutreachTarget[] = [
  {
    id: 'out-1',
    state: 'Odisha',
    district: 'Mayurbhanj',
    institutionCount: 412,
    estimatedEligibleSt: 16800,
    actualApplications: 11379,
    outreachGap: 5421,
    priorityLevel: 'Critical',
    lastFieldCampDate: '15 Aug 2026'
  },
  {
    id: 'out-2',
    state: 'Jharkhand',
    district: 'West Singhbhum',
    institutionCount: 368,
    estimatedEligibleSt: 14200,
    actualApplications: 10097,
    outreachGap: 4103,
    priorityLevel: 'Critical',
    lastFieldCampDate: '20 Jul 2026'
  },
  {
    id: 'out-3',
    state: 'Chhattisgarh',
    district: 'Bastar & Dantewada',
    institutionCount: 310,
    estimatedEligibleSt: 12500,
    actualApplications: 8688,
    outreachGap: 3812,
    priorityLevel: 'High',
    lastFieldCampDate: '02 Sep 2026'
  },
  {
    id: 'out-4',
    state: 'Madhya Pradesh',
    district: 'Jhabua & Alirajpur',
    institutionCount: 284,
    estimatedEligibleSt: 11000,
    actualApplications: 8068,
    outreachGap: 2932,
    priorityLevel: 'High',
    lastFieldCampDate: '10 Aug 2026'
  },
  {
    id: 'out-5',
    state: 'Assam',
    district: 'Karbi Anglong',
    institutionCount: 195,
    estimatedEligibleSt: 7400,
    actualApplications: 5247,
    outreachGap: 2153,
    priorityLevel: 'Moderate',
    lastFieldCampDate: '18 Jun 2026'
  }
];

export const MOCK_INSTITUTIONS: InstitutionRecord[] = [
  {
    id: 'inst-1',
    code: 'AISHE-U-0361',
    name: 'National Institute of Technology, Rourkela',
    state: 'Odisha',
    district: 'Sundargarh',
    category: 'NIT / IIT / IIM',
    totalStEnrolled: 642,
    applicationsSubmitted: 618,
    verificationBacklog: 4,
    nodalOfficerName: 'Prof. S. K. Mahapatra',
    nodalOfficerPhone: '+91 94370 12844',
    status: 'Active'
  },
  {
    id: 'inst-2',
    code: 'AISHE-U-0204',
    name: 'Ranchi University, Ranchi',
    state: 'Jharkhand',
    district: 'Ranchi',
    category: 'University',
    totalStEnrolled: 3840,
    applicationsSubmitted: 3210,
    verificationBacklog: 82,
    nodalOfficerName: 'Dr. Anita Soren',
    nodalOfficerPhone: '+91 98351 44021',
    status: 'Active'
  },
  {
    id: 'inst-3',
    code: 'AISHE-C-19402',
    name: 'Govt. Degree College, Baripada',
    state: 'Odisha',
    district: 'Mayurbhanj',
    category: 'Degree College',
    totalStEnrolled: 1420,
    applicationsSubmitted: 980,
    verificationBacklog: 145,
    nodalOfficerName: 'Shri D. C. Majhi',
    nodalOfficerPhone: '+91 94372 90118',
    status: 'Under-performing'
  },
  {
    id: 'inst-4',
    code: 'AISHE-U-0129',
    name: 'Guru Ghasidas Vishwavidyalaya, Bilaspur',
    state: 'Chhattisgarh',
    district: 'Bilaspur',
    category: 'University',
    totalStEnrolled: 1890,
    applicationsSubmitted: 1780,
    verificationBacklog: 18,
    nodalOfficerName: 'Dr. Pratima Tigga',
    nodalOfficerPhone: '+91 97520 88319',
    status: 'Active'
  }
];

export const MOCK_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'aud-1',
    timestamp: '2026-09-30 09:40:12',
    actor: 'Dr. R. Murmu (Director, MoTA)',
    role: 'Central Admin',
    action: 'DEFICIENCY_FLAGGED',
    targetId: 'TS-2026-004821',
    details: 'Flagged expired income certificate for re-submission before final sanction.',
    ipAddress: '10.14.88.22 (NIC RailTel VPN)',
    integrityHash: 'sha256-e9b28a1...f01c'
  },
  {
    id: 'aud-2',
    timestamp: '2026-09-30 08:15:44',
    actor: 'PFMS Automated Daemon',
    role: 'System',
    action: 'DBT_TRANCHE_DISBURSED',
    targetId: 'TS-2026-004821',
    details: 'Tranche 3 ₹16,000 credited to UIDAI APB Account Ending 8392.',
    ipAddress: '10.2.1.80 (PFMS Gateway)',
    integrityHash: 'sha256-4c718a9...b820'
  },
  {
    id: 'aud-3',
    timestamp: '2026-09-29 16:30:00',
    actor: 'Prof. S. K. Mahapatra',
    role: 'Institute Nodal Officer',
    action: 'INSTITUTE_VERIFIED',
    targetId: 'TS-2026-005144',
    details: 'Verified AISHE semester fee receipts and student attendance (>80%).',
    ipAddress: '14.139.212.18 (NIT Rourkela)',
    integrityHash: 'sha256-78ab31c...99a1'
  },
  {
    id: 'aud-4',
    timestamp: '2026-09-29 11:20:19',
    actor: 'Asha Tirkey',
    role: 'Student Applicant',
    action: 'DIGILOCKER_CONSENT_GRANTED',
    targetId: 'doc-2',
    details: 'Consent given to fetch ST Tribe Certificate from Odisha e-District.',
    ipAddress: '117.211.89.4 (Jio Fiber)',
    integrityHash: 'sha256-11f8e22...44d9'
  }
];
