import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, 
  FolderLock, 
  CreditCard, 
  AlertTriangle, 
  PlusCircle, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';
import { StatusBadge } from '../../components/common/StatusBadge';

export const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { 
    student, 
    applications, 
    documents, 
    deficiencies, 
    openDigiLockerModal, 
    toggleJago 
  } = useAppStore();

  const openDeficiencies = deficiencies.filter((d) => d.status === 'Open');
  const activeApplications = applications.filter((a) => a.status !== 'Disbursed' && a.status !== 'Rejected');
  const totalSanctioned = applications.reduce((sum, a) => sum + (a.sanctionedAmount || 0), 0);
  const verifiedDocsCount = documents.filter((d) => d.status === 'Verified').length;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-[#E2DDD2] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#123C32]">
              Good morning, {student.fullName.split(' ')[0]} 👋
            </h1>
            <span className="text-xs bg-[#FAF0EB] text-[#C86B43] font-bold px-2 py-0.5 rounded-full border border-[#C86B43]/20">
              {student.tribeName}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#576562] mt-1">
            Here's what's happening with your tribal scholarships today.
          </p>
        </div>

        {/* Profile Completion Widget */}
        <div className="flex items-center gap-3 bg-[#FAF8F3] p-3 rounded-xl border border-[#E2DDD2]">
          <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center border-2 border-emerald-400">
            {student.profileCompletionPercentage}%
          </div>
          <div>
            <div className="text-xs font-bold text-[#17221F]">Unified Profile</div>
            <div className="text-[11px] text-[#576562]">82% complete • DigiLocker linked</div>
          </div>
          <Link
            to="/student/profile"
            className="text-xs font-bold text-[#123C32] hover:underline ml-2"
          >
            Edit
          </Link>
        </div>
      </div>

      {/* Attention / Deficiency Alert Banner if open */}
      {openDeficiencies.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 sm:p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-700 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-full">
                  Action Required (14 Days Left)
                </span>
                <span className="text-xs font-bold text-amber-950">Top Class Scholarship</span>
              </div>
              <p className="text-xs text-amber-950 font-medium mt-1 leading-snug">
                {openDeficiencies[0].title}: {openDeficiencies[0].reason}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={openDigiLockerModal}
              className="px-4 py-2 bg-[#002D62] hover:bg-[#001c3d] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#E8B84A]" />
              <span>Fetch from DigiLocker</span>
            </button>
            <Link
              to="/student/verification"
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              Resolve in Center
            </Link>
          </div>
        </motion.div>
      )}

      {/* Top KPI Cards (4 Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Active Applications */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E2DDD2] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#576562]">Active Applications</span>
            <div className="w-8 h-8 rounded-lg bg-[#123C32]/10 text-[#123C32] flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-black text-2xl sm:text-3xl text-[#123C32]">
            {String(activeApplications.length).padStart(2, '0')}
          </div>
          <div className="text-[11px] text-[#576562] mt-1 flex items-center gap-1">
            <span>Across 5 Central Schemes</span>
          </div>
        </div>

        {/* Card 2: Documents */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E2DDD2] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#576562]">Documents</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center">
              <FolderLock className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-black text-2xl sm:text-3xl text-[#17221F]">
            14
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{verifiedDocsCount} verified in wallet</span>
          </div>
        </div>

        {/* Card 3: Amount Sanctioned */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E2DDD2] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#576562]">Amount Sanctioned</span>
            <div className="w-8 h-8 rounded-lg bg-[#C86B43]/10 text-[#C86B43] flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-black text-2xl sm:text-3xl text-[#C86B43]">
            ₹{totalSanctioned.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-[#576562] mt-1">
            <span>Direct to SBI Account ••••8392</span>
          </div>
        </div>

        {/* Card 4: Action Required */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E2DDD2] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#576562]">Action Required</span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              openDeficiencies.length > 0 ? 'bg-amber-100 text-amber-800 animate-pulse' : 'bg-emerald-50 text-emerald-700'
            }`}>
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className={`font-heading font-black text-2xl sm:text-3xl ${
            openDeficiencies.length > 0 ? 'text-amber-800' : 'text-emerald-700'
          }`}>
            {String(openDeficiencies.length).padStart(2, '0')}
          </div>
          <div className="text-[11px] text-[#576562] mt-1">
            {openDeficiencies.length > 0 ? (
              <Link to="/student/verification" className="text-amber-700 font-bold hover:underline">
                Resolve deficiency →
              </Link>
            ) : (
              <span>All verifications clear</span>
            )}
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS ROW */}
      <div className="bg-white p-5 rounded-2xl border border-[#E2DDD2] shadow-xs">
        <h3 className="font-heading font-bold text-sm text-[#123C32] uppercase tracking-wider mb-3">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            to="/student/apply"
            className="p-3 rounded-xl bg-[#123C32]/5 hover:bg-[#123C32]/10 border border-[#123C32]/20 flex items-center gap-3 transition-colors group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-[#123C32] text-white flex items-center justify-center shrink-0">
              <PlusCircle className="w-5 h-5 text-[#E8B84A]" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#123C32] group-hover:underline">Apply Scheme</div>
              <div className="text-[10px] text-[#576562]">1-Click prefilled form</div>
            </div>
          </Link>

          <button
            onClick={openDigiLockerModal}
            className="p-3 rounded-xl bg-[#002D62]/5 hover:bg-[#002D62]/10 border border-[#002D62]/20 flex items-center gap-3 transition-colors text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-[#002D62] text-white flex items-center justify-center shrink-0">
              <FolderLock className="w-5 h-5 text-[#E8B84A]" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#002D62] group-hover:underline">Upload Document</div>
              <div className="text-[10px] text-[#576562]">DigiLocker or PDF</div>
            </div>
          </button>

          <Link
            to="/student/payments"
            className="p-3 rounded-xl bg-[#C86B43]/5 hover:bg-[#C86B43]/10 border border-[#C86B43]/20 flex items-center gap-3 transition-colors group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-[#C86B43] text-white flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#C86B43] group-hover:underline">Track Payment</div>
              <div className="text-[10px] text-[#576562]">PFMS DBT milestones</div>
            </div>
          </Link>

          <button
            onClick={toggleJago}
            className="p-3 rounded-xl bg-[#FAF0EB] hover:bg-[#f6dfd3] border border-[#C86B43]/30 flex items-center gap-3 transition-colors text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-[#C86B43] text-[#E8B84A] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#C86B43] group-hover:underline">Ask JAGO</div>
              <div className="text-[10px] text-[#576562]">24/7 AI scholarship guide</div>
            </div>
          </button>
        </div>
      </div>

      {/* ACTIVE APPLICATIONS TIMELINE & CARDS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-black text-xl text-[#123C32]">
              My Scholarship Applications
            </h2>
            <p className="text-xs text-[#576562]">
              Track stage-by-stage progression from institution verification to DBT credit.
            </p>
          </div>
          <Link
            to="/student/applications"
            className="text-xs font-bold text-[#123C32] hover:text-[#C86B43] flex items-center gap-1"
          >
            <span>View All Applications</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-2xl border border-[#E2DDD2] p-5 sm:p-6 shadow-xs space-y-4"
            >
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-heading font-bold text-base text-[#123C32]">
                      {app.schemeName}
                    </h3>
                    <StatusBadge status={app.status} size="sm" />
                  </div>
                  <div className="text-xs text-[#576562] mt-0.5 flex flex-wrap items-center gap-2">
                    <span>App ID: <strong className="font-mono text-[#17221F]">{app.id}</strong></span>
                    <span>•</span>
                    <span>Academic Year: <strong>{app.academicYear}</strong></span>
                    <span>•</span>
                    <span>{app.institutionName}</span>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-xs text-[#576562]">Sanctioned Amount</div>
                  <div className="font-heading font-black text-lg text-[#123C32]">
                    ₹{app.sanctionedAmount.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Visual Application Timeline (6-Stage Stepper) */}
              <div className="py-2">
                <div className="text-[11px] font-bold text-[#576562] mb-3">Verification Pipeline:</div>
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs">
                  {/* Step 1: Submitted */}
                  <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200">
                    <div className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center mx-auto mb-1">
                      ✓
                    </div>
                    <span className="font-bold text-emerald-900 block text-[11px]">Submitted</span>
                    <span className="text-[10px] text-emerald-700">Digital Sign</span>
                  </div>

                  {/* Step 2: Institute */}
                  <div className={`p-2 rounded-xl border ${
                    app.timeline.some((t) => t.stage === 'INSTITUTE_VERIFICATION' && t.status === 'completed')
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-gray-50 border-gray-200 text-gray-400'
                  }`}>
                    <div className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center mx-auto mb-1">
                      ✓
                    </div>
                    <span className="font-bold block text-[11px]">Institute</span>
                    <span className="text-[10px] text-gray-500">AISHE Match</span>
                  </div>

                  {/* Step 3: State */}
                  <div className={`p-2 rounded-xl border ${
                    app.timeline.some((t) => t.stage === 'STATE_VERIFICATION' && t.status === 'completed')
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-gray-50 border-gray-200 text-gray-400'
                  }`}>
                    <div className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center mx-auto mb-1">
                      ✓
                    </div>
                    <span className="font-bold block text-[11px]">State Welfare</span>
                    <span className="text-[10px] text-gray-500">Odisha DWO</span>
                  </div>

                  {/* Step 4: Central */}
                  <div className={`p-2 rounded-xl border ${
                    app.currentStage === 'DEFICIENCY'
                      ? 'bg-amber-100 border-amber-300 text-amber-950 font-bold animate-pulse'
                      : app.timeline.some((t) => t.stage === 'CENTRAL_APPROVAL' && t.status === 'completed')
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-gray-50 border-gray-200 text-gray-400'
                  }`}>
                    <div className={`w-5 h-5 rounded-full font-bold text-[10px] flex items-center justify-center mx-auto mb-1 ${
                      app.currentStage === 'DEFICIENCY' ? 'bg-amber-600 text-white' : 'bg-gray-300 text-gray-700'
                    }`}>
                      {app.currentStage === 'DEFICIENCY' ? '!' : '●'}
                    </div>
                    <span className="font-bold block text-[11px]">Central MoTA</span>
                    <span className="text-[10px]">
                      {app.currentStage === 'DEFICIENCY' ? 'Action Needed' : 'Scrutiny'}
                    </span>
                  </div>

                  {/* Step 5: Sanctioned */}
                  <div className={`p-2 rounded-xl border ${
                    app.status === 'Sanctioned' || app.status === 'Disbursed'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-gray-50 border-gray-200 text-gray-400'
                  }`}>
                    <div className="w-5 h-5 rounded-full bg-gray-200 text-gray-600 font-bold text-[10px] flex items-center justify-center mx-auto mb-1">
                      ○
                    </div>
                    <span className="font-bold block text-[11px]">Sanctioned</span>
                    <span className="text-[10px] text-gray-400">Order Ready</span>
                  </div>

                  {/* Step 6: DBT Credited */}
                  <div className={`p-2 rounded-xl border ${
                    app.status === 'Disbursed'
                      ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
                      : 'bg-gray-50 border-gray-200 text-gray-400'
                  }`}>
                    <div className={`w-5 h-5 rounded-full font-bold text-[10px] flex items-center justify-center mx-auto mb-1 ${
                      app.status === 'Disbursed' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {app.status === 'Disbursed' ? '✓' : '○'}
                    </div>
                    <span className="font-bold block text-[11px]">DBT Credited</span>
                    <span className="text-[10px] text-gray-400">Direct to Bank</span>
                  </div>
                </div>
              </div>

              {/* Next Action & Bottom Controls */}
              <div className="p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E2DDD2] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-[#82918D] block text-[11px]">Next Action Required:</span>
                  <span className="font-semibold text-[#17221F]">{app.nextAction}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    to={`/student/applications/${app.id}`}
                    className="px-3.5 py-1.5 bg-white border border-[#123C32] text-[#123C32] hover:bg-[#123C32]/5 rounded-lg font-bold transition-colors cursor-pointer"
                  >
                    View Timeline & Slip
                  </Link>
                  {app.currentStage === 'DEFICIENCY' && (
                    <Link
                      to="/student/verification"
                      className="px-3.5 py-1.5 bg-[#C86B43] hover:bg-[#b25a33] text-white rounded-lg font-bold transition-colors shadow-2xs"
                    >
                      Resolve Deficiency
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
