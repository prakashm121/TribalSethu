import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  FolderLock, 
  Zap, 
  Search, 
  CreditCard, 
  Bot, 
  Clock, 
  Building2, 
  ChevronRight, 
  ExternalLink,
  Award,
  Globe2,
  FileText,
  UserCheck,
  ChevronDown
} from 'lucide-react';
import { SCHOLARSHIP_SCHEMES, MOCK_STUDENT } from '../../data/mockData';
import { StatusBadge } from '../../components/common/StatusBadge';
import { TribalPattern } from '../../components/common/TribalPattern';
import { useAppStore } from '../../stores/useAppStore';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { setRole, toggleJago } = useAppStore();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const stats = [
    { value: '5', label: 'Scholarship Schemes', desc: 'Pre-Matric to Overseas' },
    { value: '1', label: 'Unified Profile', desc: 'No repetitive typing' },
    { value: '1', label: 'Document Wallet', desc: 'DigiLocker integrated' },
    { value: '0', label: 'Repeated Forms', desc: 'Single digital identity' },
  ];

  const features = [
    {
      num: '01',
      title: 'One-Time Registration',
      desc: 'Create your verified ST profile once with Aadhaar & APAAR ID. Your academic and community records auto-sync forever.',
      icon: UserCheck,
      color: 'bg-[#123C32]/10 text-[#123C32]'
    },
    {
      num: '02',
      title: 'Digital Document Wallet',
      desc: 'Seamlessly fetch caste, income, and educational credentials directly from DigiLocker & State e-District vaults.',
      icon: FolderLock,
      color: 'bg-[#C86B43]/10 text-[#C86B43]'
    },
    {
      num: '03',
      title: 'Smart Eligibility',
      desc: 'Dynamic rule-engine instantly evaluates your tribe, degree, and annual family income to match you with eligible grants.',
      icon: Zap,
      color: 'bg-[#123C32]/10 text-[#123C32]'
    },
    {
      num: '04',
      title: 'Automated Verification',
      desc: 'Fast-track verification with AISHE, UDISE+, UIDAI, and state databases, eliminating months of bureaucratic back-and-forth.',
      icon: ShieldCheck,
      color: 'bg-[#C86B43]/10 text-[#C86B43]'
    },
    {
      num: '05',
      title: 'DBT Payment Tracking',
      desc: 'Direct Benefit Transfer into your Aadhaar-seeded bank account with real-time PFMS tranche timeline tracking.',
      icon: CreditCard,
      color: 'bg-[#123C32]/10 text-[#123C32]'
    },
    {
      num: '06',
      title: 'JAGO AI Assistant',
      desc: 'Multilingual conversational AI guide providing 24/7 personalized answers in Hindi, Odia, Telugu, Tamil, and English.',
      icon: Bot,
      color: 'bg-[#C86B43]/10 text-[#C86B43]'
    }
  ];

  const howItWorksSteps = [
    { step: '01', title: 'Create profile', desc: 'Verify your Aadhaar & APAAR ID once.' },
    { step: '02', title: 'Connect documents', desc: 'Pull certificates directly via DigiLocker.' },
    { step: '03', title: 'Find eligible schemes', desc: 'Instant matching for all 5 central schemes.' },
    { step: '04', title: 'Apply in 1-Click', desc: '12+ fields auto-prefilled from your profile.' },
    { step: '05', title: 'Track approval', desc: 'Transparent stage-by-stage verification.' },
    { step: '06', title: 'Receive DBT', desc: 'Funds credited directly to your bank account.' }
  ];

  const faqs = [
    {
      q: 'Do I need to submit separate physical documents for Pre-Matric and Post-Matric scholarships?',
      a: 'The unified profile and document wallet are designed to reduce duplicate submissions by reusing ST, income, and academic documents across the five Ministry schemes.'
    },
    {
      q: 'How does DigiLocker integration work on this portal?',
      a: 'The proposed DigiLocker integration will let students retrieve eligible state-issued ST certificates, income records, and academic documents without repeatedly scanning paper copies.'
    },
    {
      q: 'What happens if my document has an issue or an expired date?',
      a: 'The portal features a dedicated Deficiency Center. Rather than rejecting your application, the system highlights the exact deficiency (e.g. expired income certificate) with a resolution checklist and allows one-click renewal or upload within a fair deadline.'
    },
    {
      q: 'How do I know if my bank account is DBT and Aadhaar-seeded?',
      a: 'In the live service, bank-account and DBT readiness would be confirmed through authorized payment-system integrations. This demo displays sample payment status only.'
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 bg-gradient-to-b from-[#FAF8F2] via-[#F7F5EF] to-[#F1ECE0]">
        {/* Subtle decorative background circles */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-[#123C32]/5 to-[#C86B43]/5 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#E8B84A]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline and CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 space-y-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#123C32]/10 border border-[#123C32]/20 text-[#123C32] text-xs font-bold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#C86B43]" />
                <span>Ministry of Tribal Affairs • National DPI</span>
              </div>

              <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[#123C32] tracking-tight leading-[1.08]">
                One profile. <br />
                <span className="text-[#C86B43]">Every scholarship.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#576562] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Discover, apply for and track Tribal scholarships from one secure platform. No repeated forms, no lost documents, direct DBT to your bank.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  to="/eligibility"
                  className="w-full sm:w-auto px-7 py-3.5 bg-[#123C32] hover:bg-[#0A241E] text-white font-bold rounded-xl shadow-lg shadow-[#123C32]/20 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Check My Eligibility</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#E8B84A]" />
                </Link>

                <button
                  onClick={() => {
                    setRole('student');
                    navigate('/student/dashboard');
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-[#123C32]/5 text-[#123C32] border border-[#123C32]/30 font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Login to Dashboard</span>
                  <span className="text-xs bg-[#FAF0EB] text-[#C86B43] px-2 py-0.5 rounded-xl">Demo</span>
                </button>
              </div>

              {/* Trust badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-[#576562] max-sm:pr-14 max-sm:justify-start">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>DigiLocker Verified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Aadhaar DBT Enabled</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Zero Manual Form Filling</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Floating Interactive Dashboard Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                {/* Floating badge top right */}
                <div className="absolute -top-4 -right-4 z-20 bg-white/95 backdrop-blur-md border border-[#E2DDD2] p-3 rounded-2xl shadow-xl flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#17221F]">DBT Credited</div>
                    <div className="text-[11px] text-[#576562]">₹16,000 sent to SBI ••••8392</div>
                  </div>
                </div>

                {/* Floating badge bottom left */}
                <div className="absolute -bottom-5 -left-4 z-20 bg-white/95 backdrop-blur-md border border-[#E2DDD2] p-3 rounded-2xl shadow-xl flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF0EB] text-[#C86B43] flex items-center justify-center font-bold">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#17221F]">JAGO AI Guide</div>
                    <div className="text-[11px] text-[#C86B43]">1 Action Required (Income Renewal)</div>
                  </div>
                </div>

                {/* Main Mockup Window */}
                <div className="bg-white rounded-2xl border border-[#E2DDD2] shadow-2xl p-5 sm:p-6 overflow-hidden">
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#123C32] text-white flex items-center justify-center font-bold text-xs">
                        AT
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#123C32]">Asha Tirkey</div>
                        <div className="text-[10px] text-[#82918D]">NIT Rourkela • Oraon Tribe</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      <span>Profile 82%</span>
                    </div>
                  </div>

                  {/* Mock KPI Row */}
                  <div className="grid grid-cols-3 gap-2.5 mb-4">
                    <div className="p-2.5 rounded-xl bg-[#123C32]/5 border border-[#123C32]/10">
                      <div className="text-[10px] text-[#576562]">Applications</div>
                      <div className="text-lg font-black text-[#123C32]">03 Active</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#C86B43]/5 border border-[#C86B43]/10">
                      <div className="text-[10px] text-[#576562]">Sanctioned</div>
                      <div className="text-lg font-black text-[#C86B43]">₹58,000</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#E8B84A]/10 border border-[#E8B84A]/30">
                      <div className="text-[10px] text-[#576562]">Documents</div>
                      <div className="text-lg font-black text-[#96741F]">13 / 14</div>
                    </div>
                  </div>

                  {/* Application Card Inside Hero */}
                  <div className="p-3.5 rounded-2xl border border-[#E2DDD2] bg-[#F7F5EF]/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#123C32]">Top Class Education ST</span>
                      <StatusBadge status="Deficiency" size="sm" />
                    </div>
                    <div className="text-[11px] text-[#576562]">
                      Application ID: <strong className="font-mono text-[#17221F]">TS-2026-004821</strong>
                    </div>

                    {/* Timeline Preview */}
                    <div className="grid grid-cols-4 gap-1 text-center pt-1 text-[10px]">
                      <div className="p-1 rounded bg-emerald-100 text-emerald-800 font-bold">✓ Institute</div>
                      <div className="p-1 rounded bg-emerald-100 text-emerald-800 font-bold">✓ State</div>
                      <div className="p-1 rounded bg-amber-200 text-amber-900 font-bold animate-pulse">● Central</div>
                      <div className="p-1 rounded bg-gray-100 text-gray-400">○ DBT</div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-[#82918D]">DigiLocker Integration Active</span>
                    <button
                      onClick={() => {
                        setRole('student');
                        navigate('/student/dashboard');
                      }}
                      className="text-[#123C32] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore Live Demo</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATISTIC STRIP */}
      <section className="bg-[#123C32] text-white py-12 px-4 sm:px-8 border-y border-[#0A241E] shadow-inner">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/15">
            {stats.map((s, i) => (
              <div key={i} className={`${i > 0 ? 'pt-6 md:pt-0' : ''}`}>
                <div className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[#E8B84A] mb-1">
                  {s.value}
                </div>
                <div className="font-bold text-sm sm:text-base text-white tracking-wide">
                  {s.label}
                </div>
                <div className="text-xs text-white/70 mt-0.5">
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE CARDS: "Everything you need, in one place" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
          <span className="text-xs font-bold text-[#C86B43] bg-[#FAF0EB] px-3 py-1 rounded-full border border-[#C86B43]/20">
            Digital Public Infrastructure
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#123C32]">
            Everything you need, in one place
          </h2>
          <p className="text-sm sm:text-base text-[#576562]">
            Consolidating five legacy schemes into a single student-centric ecosystem designed for speed, dignity, and transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl border border-[#E2DDD2] p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${f.color}`}>
                    <f.icon className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs font-bold text-[#82918D]">{f.num}</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-[#123C32] mb-2">
                  {f.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#576562] leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS: 01 to 06 */}
      <section className="bg-[#FAF8F3] py-16 px-4 sm:px-8 border-y border-[#E2DDD2]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#123C32]">
              Simple 6-Step Journey
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#123C32]">
              How TribalSetu works
            </h2>
            <p className="text-xs sm:text-sm text-[#576562]">
              From first registration to money credited into your bank account.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {howItWorksSteps.map((step, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 border border-[#E2DDD2] text-center shadow-2xs relative">
                <div className="w-9 h-9 rounded-full bg-[#123C32] text-[#E8B84A] font-black text-xs flex items-center justify-center mx-auto mb-3 shadow-xs">
                  {step.step}
                </div>
                <h3 className="font-heading font-bold text-xs sm:text-sm text-[#17221F] mb-1">
                  {step.title}
                </h3>
                <p className="text-[11px] text-[#576562] leading-tight">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#123C32] hover:text-[#C86B43] transition-colors"
            >
              <span>Explore Detailed Verification & DBT Pipeline Guide</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SCHOLARSHIP SCHEMES DIRECTORY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#C86B43]">
              Five Centrally Sponsored Schemes
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#123C32] mt-1">
              Find your scholarship scheme
            </h2>
          </div>
          <Link
            to="/scholarships"
            className="text-xs sm:text-sm font-bold text-[#123C32] hover:text-[#C86B43] flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All Schemes & Detailed Guidelines</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SCHOLARSHIP_SCHEMES.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-white rounded-2xl border border-[#E2DDD2] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#123C32]/10 text-[#123C32]">
                    {scheme.category}
                  </span>
                  <StatusBadge status={scheme.status} size="sm" />
                </div>

                <h3 className="font-heading font-bold text-base text-[#17221F] mb-1.5 line-clamp-1">
                  {scheme.shortName}
                </h3>
                <p className="text-xs text-[#576562] mb-4 line-clamp-2 leading-relaxed">
                  {scheme.description}
                </p>

                <div className="space-y-2 text-xs text-[#17221F] bg-[#F7F5EF] p-4 rounded-xl mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[#576562]">Financial Benefit:</span>
                    <span className="font-bold text-[#123C32]">Up to ₹{scheme.annualAwardMax.toLocaleString('en-IN')}/yr</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#576562]">Family Income Cap:</span>
                    <span className="font-semibold">
                      {scheme.incomeLimitAnnual ? `₹${scheme.incomeLimitAnnual.toLocaleString('en-IN')}` : 'No Income Ceiling'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#576562]">Academic Cycle:</span>
                    <span className="font-medium text-[#82918D]">{scheme.academicYear}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Link
                  to="/eligibility"
                  className="flex-1 min-h-11 text-center py-2 bg-[#123C32] hover:bg-[#0A241E] text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Check Eligibility
                </Link>
                <Link
                  to="/scholarships"
                  className="flex-1 min-h-11 px-3 py-2 border border-[#123C32]/30 bg-white hover:bg-[#123C32]/5 text-[#123C32] text-xs font-bold rounded-xl transition-colors"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C86B43]">
            Common Inquiries
          </span>
          <h2 className="font-heading font-black text-3xl text-[#123C32]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#576562]">
            Answers to frequent student questions regarding the unified scholarship platform.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-[#E2DDD2] overflow-hidden shadow-2xs"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <span className="font-heading font-bold text-sm sm:text-base text-[#123C32]">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#C86B43] shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-[#576562] leading-relaxed border-t border-gray-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/faq"
            className="text-xs font-bold text-[#123C32] hover:underline"
          >
            Visit Complete FAQ Portal & Video Tutorials →
          </Link>
        </div>
      </section>

      {/* FINAL CALL TO ACTION STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="bg-gradient-to-r from-[#123C32] to-[#1C5648] text-white rounded-2xl p-8 sm:p-12 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
              Ready to claim your tribal scholarship?
            </h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Verify your student profile in 3 minutes. Zero paperwork, automated DigiLocker verification, and direct DBT disbursement.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              to="/eligibility"
              className="w-full sm:w-auto px-6 py-3 bg-[#E8B84A] hover:bg-[#d8a83a] text-[#123C32] font-black rounded-xl text-xs sm:text-sm shadow-md transition-all text-center"
            >
              Start Eligibility Wizard
            </Link>
            <button
              onClick={() => {
                setRole('student');
                navigate('/student/dashboard');
              }}
              className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs sm:text-sm border border-white/20 transition-all text-center cursor-pointer"
            >
              Launch Live Student Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
