import React from 'react';
import { Link } from 'react-router-dom';
import { 
  UserCheck, 
  FolderLock, 
  Zap, 
  CheckCircle2, 
  CreditCard, 
  ShieldCheck, 
  ArrowRight,
  Clock,
  Layers,
  Sparkles,
  Building
} from 'lucide-react';
import { TribalPattern } from '../../components/common/TribalPattern';

export const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'One-Time Identity & Tribal Registration',
      subtitle: 'Paperless e-KYC',
      description: 'The student registers once using Aadhaar e-KYC or APAAR ID. The system validates tribe credentials with state tribal repositories (e.g. Odisha e-District, Jharkhand JharSewa) and creates an immutable digital identity.',
      badge: 'Completed in < 2 mins'
    },
    {
      num: '02',
      title: 'Connect to Digital Document Wallet',
      subtitle: 'Zero Manual Uploads',
      description: 'The proposed integration lets students retrieve verified caste, domicile, income, and academic documents from DigiLocker for reuse across the five schemes.',
      badge: 'DigiLocker 2.0 Integration'
    },
    {
      num: '03',
      title: 'Smart Rules & Scheme Matching',
      subtitle: 'Instant Evaluation',
      description: 'Our dynamic rules engine checks your academic admission (AISHE/UDISE+), caste, and family income limit to show which schemes you qualify for: Pre-Matric, Post-Matric, Top Class, NFST Fellowship, or National Overseas.',
      badge: 'Zero Ambiguity'
    },
    {
      num: '04',
      title: '1-Click Prefilled Application',
      subtitle: 'No Repetitive Forms',
      description: 'Over 12 fields are pre-populated automatically from your profile and verified wallet credentials. You only review the summary and submit with Aadhaar OTP e-Sign.',
      badge: '90% Time Saved'
    },
    {
      num: '05',
      title: 'Automated 3-Tier Verification',
      subtitle: 'Full Transparency',
      description: 'Applications move systematically from Institute Nodal Officer (AISHE match) to State Tribal Welfare Department to Ministry Central Scrutiny. Any deficiency generates a proactive notification with 1-click renewal.',
      badge: 'Deficiency Center Protected'
    },
    {
      num: '06',
      title: 'Direct Benefit Transfer (DBT)',
      subtitle: 'Direct to Bank Account',
      description: 'Sanction orders trigger direct electronic fund transfers via PFMS into the student’s Aadhaar-seeded bank account. Live tranche milestones keep you updated at every step.',
      badge: '100% Leakage Proof'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12 space-y-12">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#123C32]/10 text-[#123C32] text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[#C86B43]" />
          <span>Architecture & Student Journey</span>
        </div>
        <h1 className="font-heading font-black text-3xl sm:text-5xl text-[#123C32]">
          How TribalSetu Works
        </h1>
        <p className="text-xs sm:text-base text-[#576562] max-w-2xl mx-auto">
          Transforming tribal scholarship disbursement through unified data architecture, eliminating friction for millions of Scheduled Tribe students.
        </p>
      </div>

      <TribalPattern variant="strip" color="#123C32" />

      {/* Step by step timeline list */}
      <div className="space-y-6">
        {steps.map((st, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl border border-[#E2DDD2] p-6 sm:p-8 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row items-start gap-6"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#123C32] text-[#E8B84A] font-black text-xl flex items-center justify-center shrink-0 shadow-sm">
              {st.num}
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-bold text-[#C86B43] uppercase tracking-wider block">
                    {st.subtitle}
                  </span>
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-[#123C32]">
                    {st.title}
                  </h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-[#F7F5EF] text-[#123C32] rounded-full border border-[#E2DDD2] self-start sm:self-auto">
                  {st.badge}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#576562] leading-relaxed pt-1">
                {st.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="bg-[#FAF8F3] p-8 rounded-3xl border border-[#E2DDD2] text-center space-y-4">
        <h3 className="font-heading font-black text-2xl text-[#123C32]">
          Experience the Unified Portal Now
        </h3>
        <p className="text-xs sm:text-sm text-[#576562] max-w-lg mx-auto">
          Check your eligibility in 60 seconds or test drive the live student dashboard with pre-populated demo data.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/eligibility"
            className="px-6 py-3 bg-[#123C32] hover:bg-[#0A241E] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-colors"
          >
            Run Eligibility Wizard
          </Link>
          <Link
            to="/student/dashboard"
            className="px-6 py-3 bg-white border border-[#123C32] text-[#123C32] text-xs sm:text-sm font-bold rounded-xl hover:bg-gray-50 transition-colors"
          >
            Open Student Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};
