import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { StudentLayout } from './layouts/StudentLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { ScholarshipsPage } from './pages/public/ScholarshipsPage';
import { EligibilityWizardPage } from './pages/public/EligibilityWizardPage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { FaqPage } from './pages/public/FaqPage';
import { HelpCenterPage } from './pages/public/HelpCenterPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';

// Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentApplicationsPage } from './pages/student/StudentApplicationsPage';
import { ApplicationDetailPage } from './pages/student/ApplicationDetailPage';
import { ApplyWizardPage } from './pages/student/ApplyWizardPage';
import { DocumentWalletPage } from './pages/student/DocumentWalletPage';
import { DeficiencyCenterPage } from './pages/student/DeficiencyCenterPage';
import { PaymentTrackingPage } from './pages/student/PaymentTrackingPage';
import { NotificationsPage } from './pages/student/NotificationsPage';
import { StudentProfilePage } from './pages/student/StudentProfilePage';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminApplicationsPage } from './pages/admin/AdminApplicationsPage';
import { AdminVerificationPage } from './pages/admin/AdminVerificationPage';
import { AdminDeficienciesPage } from './pages/admin/AdminDeficienciesPage';
import { AdminDisbursementsPage } from './pages/admin/AdminDisbursementsPage';
import { AdminInstitutionsPage } from './pages/admin/AdminInstitutionsPage';
import { AdminOutreachPage } from './pages/admin/AdminOutreachPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';
import { AdminAuditPage } from './pages/admin/AdminAuditPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/scholarships" element={<ScholarshipsPage />} />
            <Route path="/eligibility" element={<EligibilityWizardPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/help" element={<HelpCenterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Student Routes */}
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<Navigate to="/student/dashboard" replace />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="applications" element={<StudentApplicationsPage />} />
            <Route path="applications/:id" element={<ApplicationDetailPage />} />
            <Route path="apply" element={<ApplyWizardPage />} />
            <Route path="documents" element={<DocumentWalletPage />} />
            <Route path="verification" element={<DeficiencyCenterPage />} />
            <Route path="payments" element={<PaymentTrackingPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="profile" element={<StudentProfilePage />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="applications" element={<AdminApplicationsPage />} />
            <Route path="verification" element={<AdminVerificationPage />} />
            <Route path="deficiencies" element={<AdminDeficienciesPage />} />
            <Route path="disbursements" element={<AdminDisbursementsPage />} />
            <Route path="institutions" element={<AdminInstitutionsPage />} />
            <Route path="outreach" element={<AdminOutreachPage />} />
            <Route path="analytics" element={<AdminAnalyticsPage />} />
            <Route path="audit" element={<AdminAuditPage />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  );
}

export default App;
