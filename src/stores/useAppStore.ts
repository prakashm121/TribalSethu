import { create } from 'zustand';
import { 
  UserRole, 
  StudentProfile, 
  Application, 
  DocumentItem, 
  DeficiencyItem, 
  DisbursementTranche,
  NotificationItem,
  VerificationItem,
  ScholarshipCode
} from '../types';
import { 
  MOCK_STUDENT, 
  MOCK_APPLICATIONS, 
  MOCK_DOCUMENTS, 
  MOCK_DEFICIENCIES, 
  MOCK_DISBURSEMENTS,
  MOCK_NOTIFICATIONS,
  MOCK_VERIFICATIONS_QUEUE
} from '../data/mockData';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'jago';
  text: string;
  timestamp: string;
  quickActions?: { label: string; action: string }[];
}

interface AppState {
  // Global & Session
  role: UserRole;
  language: string;
  setRole: (role: UserRole) => void;
  setLanguage: (lang: string) => void;

  // Student State
  student: StudentProfile;
  applications: Application[];
  documents: DocumentItem[];
  deficiencies: DeficiencyItem[];
  disbursements: DisbursementTranche[];
  notifications: NotificationItem[];
  
  // Admin Verification Queue
  verifications: VerificationItem[];

  // Modals & Chatbot UI
  isDigiLockerModalOpen: boolean;
  isJagoOpen: boolean;
  chatMessages: ChatMessage[];

  // Actions
  openDigiLockerModal: () => void;
  closeDigiLockerModal: () => void;
  toggleJago: () => void;
  setJagoOpen: (open: boolean) => void;
  addChatMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  
  // Operations
  resolveDeficiency: (deficiencyId: string, method: 'digilocker' | 'upload') => void;
  fetchDigiLockerDocuments: (docTypes: string[]) => void;
  submitNewApplication: (newApp: Partial<Application>) => string;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  updateVerificationStatus: (id: string, status: 'Verified' | 'Mismatch' | 'Manual Review', notes?: string) => void;
  updateStudentProfile: (updates: Partial<StudentProfile>) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  role: 'student', // Default to student view for richest demo experience
  language: 'en',
  setRole: (role) => set({ role }),
  setLanguage: (language) => set({ language }),

  student: MOCK_STUDENT,
  applications: MOCK_APPLICATIONS,
  documents: MOCK_DOCUMENTS,
  deficiencies: MOCK_DEFICIENCIES,
  disbursements: MOCK_DISBURSEMENTS,
  notifications: MOCK_NOTIFICATIONS,
  verifications: MOCK_VERIFICATIONS_QUEUE,

  isDigiLockerModalOpen: false,
  isJagoOpen: false,

  chatMessages: [
    {
      id: 'msg-init-1',
      sender: 'jago',
      text: 'Johar Asha! 🙏 I am JAGO, your AI Tribal Scholarship Guide. I can help track your Top Class application, explain documents needed, or check your next DBT payment.',
      timestamp: 'Just now',
      quickActions: [
        { label: 'Check my application status', action: 'status' },
        { label: 'Why is my application pending?', action: 'deficiency' },
        { label: 'When will I get next payment?', action: 'payment' },
        { label: 'What documents are required?', action: 'documents' }
      ]
    }
  ],

  openDigiLockerModal: () => set({ isDigiLockerModalOpen: true }),
  closeDigiLockerModal: () => set({ isDigiLockerModalOpen: false }),
  toggleJago: () => set((state) => ({ isJagoOpen: !state.isJagoOpen })),
  setJagoOpen: (open) => set({ isJagoOpen: open }),

  addChatMessage: (msg) => {
    const newMsg: ChatMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    set((state) => ({
      chatMessages: [...state.chatMessages, newMsg]
    }));
  },

  resolveDeficiency: (deficiencyId: string, _method: 'digilocker' | 'upload') => {
    set((state) => {
      // 1. Update deficiency status to Resolved
      const updatedDeficiencies = state.deficiencies.map((d) =>
        d.id === deficiencyId ? { ...d, status: 'Resolved' as const } : d
      );

      // 2. Update the Income Certificate document in wallet to Verified
      const updatedDocs = state.documents.map((doc) =>
        doc.type === 'INCOME_CERTIFICATE'
          ? {
              ...doc,
              status: 'Verified' as const,
              issueDate: '2026-06-15',
              expiryDate: '2027-03-31',
              source: 'DigiLocker' as const,
              remarks: 'Renewed and authenticated via Odisha e-District repository.'
            }
          : doc
      );

      // 3. Update the Top Class application from DEFICIENCY to CENTRAL_APPROVAL / SANCTIONED
      const updatedApps = state.applications.map((app) => {
        if (app.id === 'TS-2026-004821') {
          return {
            ...app,
            currentStage: 'CENTRAL_APPROVAL' as const,
            status: 'Under Review' as const,
            deficiencyCount: 0,
            nextAction: 'Under final sanction clearance by MoTA Central Scrutiny',
            lastUpdated: 'Just now',
            timeline: app.timeline.map((t) =>
              t.stage === 'CENTRAL_APPROVAL'
                ? {
                    ...t,
                    status: 'completed' as const,
                    remarks: 'Deficiency resolved: Valid 2026-27 Income Certificate authenticated.'
                  }
                : t.stage === 'SANCTIONED'
                ? { ...t, status: 'in_progress' as const, remarks: 'Sanction order queued.' }
                : t
            )
          };
        }
        return app;
      });

      // 4. Add celebration notification
      const newNotif: NotificationItem = {
        id: `notif-${Date.now()}`,
        title: 'Deficiency Cleared Successfully 🎉',
        message: 'Your Income Certificate renewal was verified via DigiLocker. Application TS-2026-004821 moved to Sanction stage!',
        type: 'success',
        timestamp: 'Just now',
        read: false,
        actionUrl: '/student/applications/TS-2026-004821',
        actionLabel: 'View Application'
      };

      return {
        deficiencies: updatedDeficiencies,
        documents: updatedDocs,
        applications: updatedApps,
        notifications: [newNotif, ...state.notifications]
      };
    });
  },

  fetchDigiLockerDocuments: (_docTypes: string[]) => {
    set((state) => {
      // Simulate verifying and refreshing all DigiLocker linked docs
      const updatedDocs = state.documents.map((doc) => ({
        ...doc,
        status: 'Verified' as const,
        remarks: `${doc.remarks} (Re-authenticated via DigiLocker on ${new Date().toLocaleDateString()})`
      }));

      const newNotif: NotificationItem = {
        id: `notif-${Date.now()}`,
        title: 'DigiLocker Sync Complete',
        message: 'All eligible tribal documents refreshed and authenticated from DigiLocker repository.',
        type: 'success',
        timestamp: 'Just now',
        read: false,
        actionUrl: '/student/documents',
        actionLabel: 'Check Wallet'
      };

      return {
        documents: updatedDocs,
        notifications: [newNotif, ...state.notifications],
        isDigiLockerModalOpen: false
      };
    });
  },

  submitNewApplication: (newAppData: Partial<Application>) => {
    const id = `TS-2026-00${Math.floor(1000 + Math.random() * 9000)}`;
    const newApp: Application = {
      id,
      schemeCode: (newAppData.schemeCode || 'POST_MATRIC') as ScholarshipCode,
      schemeName: newAppData.schemeName || 'Post-Matric Scholarship Scheme for ST Students',
      academicYear: '2026-27',
      institutionName: newAppData.institutionName || 'National Institute of Technology, Rourkela',
      courseName: newAppData.courseName || 'B.Tech Computer Science (Year 3)',
      currentStage: 'SUBMITTED',
      status: 'Submitted',
      sanctionedAmount: newAppData.sanctionedAmount || 48000,
      disbursedAmount: 0,
      lastUpdated: 'Just now',
      nextAction: 'Pending verification by Institute Nodal Officer',
      deficiencyCount: 0,
      submissionDate: new Date().toISOString().split('T')[0],
      attachedDocuments: ['doc-1', 'doc-2', 'doc-3', 'doc-4', 'doc-5'],
      timeline: [
        {
          id: `t-sub-${Date.now()}`,
          stage: 'SUBMITTED',
          title: 'Application Submitted Online',
          date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          status: 'completed',
          remarks: 'Pre-filled from Unified Student Profile. Digital signatures verified.'
        },
        {
          id: `t-inst-${Date.now()}`,
          stage: 'INSTITUTE_VERIFICATION',
          title: 'Institute Verification (Dean Student Affairs)',
          date: 'Pending',
          status: 'in_progress',
          remarks: 'Queued in Institute Nodal Officer verification console.'
        },
        {
          id: `t-state-${Date.now()}`,
          stage: 'STATE_VERIFICATION',
          title: 'State Tribal Welfare Approval',
          date: 'Scheduled',
          status: 'pending'
        },
        {
          id: `t-cent-${Date.now()}`,
          stage: 'CENTRAL_APPROVAL',
          title: 'Ministry Scrutiny',
          date: 'Scheduled',
          status: 'pending'
        },
        {
          id: `t-sanc-${Date.now()}`,
          stage: 'SANCTIONED',
          title: 'Sanction Order Generation',
          date: 'Scheduled',
          status: 'pending'
        },
        {
          id: `t-dbt-${Date.now()}`,
          stage: 'DBT_CREDITED',
          title: 'Direct Benefit Transfer (DBT)',
          date: 'Scheduled',
          status: 'pending'
        }
      ]
    };

    set((state) => ({
      applications: [newApp, ...state.applications],
      notifications: [
        {
          id: `notif-${Date.now()}`,
          title: 'Application Submitted Successfully 🎉',
          message: `Application ${id} for ${newApp.schemeName} has been submitted to your institution.`,
          type: 'success',
          timestamp: 'Just now',
          read: false,
          actionUrl: `/student/applications/${id}`,
          actionLabel: 'Track Progress'
        },
        ...state.notifications
      ]
    }));

    return id;
  },

  markNotificationRead: (id: string) => {
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    }));
  },

  markAllNotificationsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true }))
    }));
  },

  updateVerificationStatus: (id: string, status: 'Verified' | 'Mismatch' | 'Manual Review', notes?: string) => {
    set((state) => ({
      verifications: state.verifications.map((v) =>
        v.id === id
          ? {
              ...v,
              status,
              notes: notes || v.notes,
              matchScore: status === 'Verified' ? 100 : v.matchScore
            }
          : v
      )
    }));
  },

  updateStudentProfile: (updates) => {
    set((state) => ({
      student: { ...state.student, ...updates }
    }));
  }
}));
