import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  User, 
  GraduationCap, 
  ShieldCheck, 
  FolderLock, 
  CreditCard, 
  FileCheck, 
  AlertCircle,
  HelpCircle,
  Clock,
  Printer
} from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';
import { SCHOLARSHIP_SCHEMES } from '../../data/mockData';
import { StatusBadge } from '../../components/common/StatusBadge';

export const ApplyWizardPage: React.FC = () => {
  const navigate = useNavigate();
  const { student, documents, submitNewApplication } = useAppStore();

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;

  // Selected scheme
  const [selectedSchemeCode, setSelectedSchemeCode] = useState<'PRE_MATRIC' | 'POST_MATRIC' | 'TOP_CLASS' | 'NFST_FELLOWSHIP' | 'NOS_OVERSEAS'>('TOP_CLASS');

  // Form state initialized with student profile (12 fields pre-filled!)
  const [formData, setFormData] = useState({
    fullName: student.fullName,
    aadhaarNumberMasked: student.aadhaarNumberMasked,
    apaarId: student.apaarId,
    email: student.email,
    mobile: student.mobile,
    dob: student.dob,
    gender: student.gender,
    tribeName: student.tribeName,
    domicileState: student.domicileState,
    district: student.district,
    institutionName: student.currentInstitution,
    courseName: student.currentCourse,
    currentYear: student.currentYear,
    annualFamilyIncome: student.annualFamilyIncome,
    incomeCertNo: student.incomeCertificateNo,
    bankName: student.bankName,
    accountMasked: student.accountNumberMasked,
    ifscCode: student.ifscCode,
    selectedDocuments: ['doc-1', 'doc-2', 'doc-4', 'doc-5', 'doc-6', 'doc-8'],
    declarationAccepted: true
  });

  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const selectedScheme = SCHOLARSHIP_SCHEMES.find((s) => s.code === selectedSchemeCode) || SCHOLARSHIP_SCHEMES[2];

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 6) {
      // Submit application
      const newId = submitNewApplication({
        schemeCode: selectedScheme.code,
        schemeName: selectedScheme.name,
        institutionName: formData.institutionName,
        courseName: `${formData.courseName} (${formData.currentYear})`,
        sanctionedAmount: selectedScheme.annualAwardMax
      });
      setSubmittedId(newId);
      setCurrentStep(7);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1 && currentStep < 7) {
      setCurrentStep(currentStep - 1);
    }
  };

  const stepLabels = [
    'Personal Info',
    'Education',
    'Eligibility',
    'Documents',
    'Bank / DBT',
    'Review',
    'Confirmation'
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#123C32]">
            Apply for Scholarship
          </h1>
          <p className="text-xs sm:text-sm text-[#576562]">
            Unified application workflow with zero repeated manual documentation.
          </p>
        </div>

        {currentStep < 7 && (
          <div className="text-xs font-bold text-[#123C32] bg-[#FAF8F3] px-3.5 py-1.5 rounded-xl border border-[#E2DDD2] self-start sm:self-auto">
            Step {currentStep} of {totalSteps}: {stepLabels[currentStep - 1]}
          </div>
        )}
      </div>

      {/* Prefill Notice Banner */}
      {currentStep < 7 && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">
              ✓ 12 fields automatically filled from your verified Student Profile
            </span>
          </div>
          <span className="text-[10px] text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-full hidden sm:inline">
            Aadhaar & DigiLocker Synced
          </span>
        </div>
      )}

      {/* Step Stepper Indicator */}
      {currentStep < 7 && (
        <div className="bg-white p-4 rounded-2xl border border-[#E2DDD2] shadow-xs">
          <div className="grid grid-cols-6 gap-1 text-center">
            {stepLabels.slice(0, 6).map((lbl, idx) => {
              const stepNum = idx + 1;
              const isActive = currentStep === stepNum;
              const isPast = currentStep > stepNum;
              return (
                <div key={idx} className="space-y-1">
                  <div
                    className={`h-1.5 rounded-full transition-colors ${
                      isPast ? 'bg-emerald-600' : isActive ? 'bg-[#123C32]' : 'bg-gray-200'
                    }`}
                  />
                  <span className={`text-[10px] block truncate font-semibold ${
                    isActive ? 'text-[#123C32]' : isPast ? 'text-emerald-700' : 'text-gray-400'
                  }`}>
                    {lbl}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Wizard Form Container */}
      <div className="bg-white rounded-3xl border border-[#E2DDD2] p-6 sm:p-8 shadow-md">
        <AnimatePresence mode="wait">
          {/* STEP 1: Personal Info */}
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-5"
            >
              <div className="border-b border-gray-100 pb-3">
                <h3 className="font-heading font-bold text-lg text-[#123C32]">
                  Step 1: Personal Information
                </h3>
                <p className="text-xs text-[#576562]">
                  Authenticated from UIDAI e-KYC. All information is pre-verified.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-[#17221F] block mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#E2DDD2] bg-[#F7F5EF] font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#17221F] block mb-1">Aadhaar (Masked)</label>
                  <input
                    type="text"
                    disabled
                    value={formData.aadhaarNumberMasked}
                    className="w-full p-2.5 rounded-xl border border-[#E2DDD2] bg-gray-100 font-mono text-gray-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#17221F] block mb-1">APAAR / ABC ID</label>
                  <input
                    type="text"
                    disabled
                    value={formData.apaarId}
                    className="w-full p-2.5 rounded-xl border border-[#E2DDD2] bg-gray-100 font-mono text-gray-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#17221F] block mb-1">Tribe Community</label>
                  <input
                    type="text"
                    value={formData.tribeName}
                    onChange={(e) => setFormData({ ...formData, tribeName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#E2DDD2] bg-[#F7F5EF] font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#17221F] block mb-1">Domicile State</label>
                  <input
                    type="text"
                    value={formData.domicileState}
                    onChange={(e) => setFormData({ ...formData, domicileState: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#E2DDD2] bg-[#F7F5EF] font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#17221F] block mb-1">Home District</label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#E2DDD2] bg-[#F7F5EF] font-medium"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Education */}
          {currentStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-5"
            >
              <div className="border-b border-gray-100 pb-3">
                <h3 className="font-heading font-bold text-lg text-[#123C32]">
                  Step 2: Academic & Institutional Enrolment
                </h3>
                <p className="text-xs text-[#576562]">
                  Matched with AISHE code U-0361 (National Institute of Technology Rourkela).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="font-bold text-[#17221F] block mb-1">Enrolled Institution (AISHE Accredited)</label>
                  <input
                    type="text"
                    value={formData.institutionName}
                    onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#E2DDD2] bg-[#F7F5EF] font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#17221F] block mb-1">Course / Specialization</label>
                  <input
                    type="text"
                    value={formData.courseName}
                    onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#E2DDD2] bg-[#F7F5EF] font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#17221F] block mb-1">Current Academic Year</label>
                  <input
                    type="text"
                    value={formData.currentYear}
                    onChange={(e) => setFormData({ ...formData, currentYear: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#E2DDD2] bg-[#F7F5EF] font-medium"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Eligibility & Scheme Selection */}
          {currentStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-5"
            >
              <div className="border-b border-gray-100 pb-3">
                <h3 className="font-heading font-bold text-lg text-[#123C32]">
                  Step 3: Scholarship Scheme Selection
                </h3>
                <p className="text-xs text-[#576562]">
                  Choose which Ministry scheme to apply for. Your profile qualifies for Top Class and Post-Matric!
                </p>
              </div>

              <div className="space-y-3">
                {SCHOLARSHIP_SCHEMES.map((scheme) => {
                  const isSelected = selectedSchemeCode === scheme.code;
                  return (
                    <div
                      key={scheme.code}
                      onClick={() => setSelectedSchemeCode(scheme.code)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-4 ${
                        isSelected
                          ? 'border-[#123C32] bg-[#123C32]/5 shadow-xs'
                          : 'border-[#E2DDD2] hover:border-gray-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-bold text-sm text-[#17221F]">{scheme.name}</span>
                          <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded font-medium">{scheme.category}</span>
                        </div>
                        <p className="text-xs text-[#576562] mt-0.5">
                          Annual grant: <strong>Up to ₹{scheme.annualAwardMax.toLocaleString('en-IN')}</strong> • Income limit: {scheme.incomeLimitAnnual ? `₹${scheme.incomeLimitAnnual.toLocaleString('en-IN')}` : 'No cap'}
                        </p>
                      </div>
                      <input
                        type="radio"
                        checked={isSelected}
                        onChange={() => {}}
                        className="w-4 h-4 accent-[#123C32]"
                      />
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 4: Documents from Wallet */}
          {currentStep === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-5"
            >
              <div className="border-b border-gray-100 pb-3">
                <h3 className="font-heading font-bold text-lg text-[#123C32]">
                  Step 4: Attach Verified Wallet Credentials
                </h3>
                <p className="text-xs text-[#576562]">
                  No need to scan or upload again. Select from your digital wallet:
                </p>
              </div>

              <div className="space-y-2.5">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3.5 rounded-xl border border-[#E2DDD2] bg-[#F7F5EF]/60 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={formData.selectedDocuments.includes(doc.id)}
                        onChange={() => {}}
                        className="w-4 h-4 accent-[#123C32] rounded"
                      />
                      <div>
                        <div className="font-bold text-[#17221F]">{doc.title}</div>
                        <div className="text-[11px] text-[#576562]">{doc.issuer} • {doc.docNumber}</div>
                      </div>
                    </div>
                    <StatusBadge status={doc.status} size="sm" />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 5: Bank & DBT Seeding */}
          {currentStep === 5 && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-5"
            >
              <div className="border-b border-gray-100 pb-3">
                <h3 className="font-heading font-bold text-lg text-[#123C32]">
                  Step 5: Bank Account & DBT Confirmation
                </h3>
                <p className="text-xs text-[#576562]">
                  Scholarship money will be directly transferred via PFMS to this account.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-950">Aadhaar Payment Bridge (APB) Status:</span>
                  <span className="bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded-full text-[10px]">
                    Active & Seeded ✓
                  </span>
                </div>
                <p className="text-emerald-800 text-[11px]">
                  Verified with NPCI mapper for Aadhaar ending ••••4912. Direct Benefit Transfer enabled.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-[#17221F] block mb-1">Bank Name</label>
                  <input
                    type="text"
                    disabled
                    value={formData.bankName}
                    className="w-full p-2.5 rounded-xl border border-[#E2DDD2] bg-gray-100 text-gray-700 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#17221F] block mb-1">Account Number (Masked)</label>
                  <input
                    type="text"
                    disabled
                    value={formData.accountMasked}
                    className="w-full p-2.5 rounded-xl border border-[#E2DDD2] bg-gray-100 font-mono text-gray-700"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-[#17221F] block mb-1">IFSC Code & Branch</label>
                  <input
                    type="text"
                    disabled
                    value={formData.ifscCode}
                    className="w-full p-2.5 rounded-xl border border-[#E2DDD2] bg-gray-100 text-gray-700"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 6: Review & Self Declaration */}
          {currentStep === 6 && (
            <motion.div
              key="step-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-5"
            >
              <div className="border-b border-gray-100 pb-3">
                <h3 className="font-heading font-bold text-lg text-[#123C32]">
                  Step 6: Final Review & Aadhaar e-Sign
                </h3>
                <p className="text-xs text-[#576562]">
                  Please review all verified sections before sending to your Institute Nodal Officer.
                </p>
              </div>

              {/* Review sections */}
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E2DDD2] flex items-center justify-between">
                  <div>
                    <span className="text-[#82918D] block text-[10px]">Chosen Scheme</span>
                    <strong className="text-[#123C32] text-sm">{selectedScheme.name}</strong>
                  </div>
                  <button onClick={() => setCurrentStep(3)} className="text-[#C86B43] font-bold underline cursor-pointer">
                    Edit
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E2DDD2] flex items-center justify-between">
                  <div>
                    <span className="text-[#82918D] block text-[10px]">Applicant & Community</span>
                    <strong className="text-[#17221F]">{formData.fullName} ({formData.tribeName} Tribe)</strong>
                  </div>
                  <button onClick={() => setCurrentStep(1)} className="text-[#C86B43] font-bold underline cursor-pointer">
                    Edit
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E2DDD2] flex items-center justify-between">
                  <div>
                    <span className="text-[#82918D] block text-[10px]">Institution & Course</span>
                    <strong className="text-[#17221F]">{formData.institutionName} • {formData.courseName}</strong>
                  </div>
                  <button onClick={() => setCurrentStep(2)} className="text-[#C86B43] font-bold underline cursor-pointer">
                    Edit
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E2DDD2] flex items-center justify-between">
                  <div>
                    <span className="text-[#82918D] block text-[10px]">Disbursement Target</span>
                    <strong className="text-[#17221F]">{formData.bankName} (Ending {formData.accountMasked.slice(-4)})</strong>
                  </div>
                  <button onClick={() => setCurrentStep(5)} className="text-[#C86B43] font-bold underline cursor-pointer">
                    Edit
                  </button>
                </div>
              </div>

              {/* Self Declaration Checkbox */}
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#576562]">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.declarationAccepted}
                    onChange={(e) => setFormData({ ...formData, declarationAccepted: e.target.checked })}
                    className="mt-0.5 w-4 h-4 accent-[#123C32] cursor-pointer"
                  />
                  <span className="text-[11px] leading-relaxed">
                    I solemnly declare that the facts stated above are true to the best of my knowledge. I am not availing any duplicate maintenance scholarship from another central or state source for academic year 2026-27.
                  </span>
                </label>
              </div>
            </motion.div>
          )}

          {/* STEP 7: Application Submitted Success */}
          {currentStep === 7 && (
            <motion.div
              key="step-7"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 text-center space-y-5"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#123C32]">
                  Application submitted successfully 🎉
                </h2>
                <p className="text-xs sm:text-sm text-[#576562] mt-1">
                  Your scholarship dossier has been routed to NIT Rourkela Nodal Verification desk.
                </p>
              </div>

              <div className="bg-[#FAF8F3] p-5 rounded-2xl border border-[#E2DDD2] max-w-md mx-auto space-y-2">
                <span className="text-xs text-[#82918D]">Unique Tracking Application ID:</span>
                <div className="font-mono text-xl sm:text-2xl font-black text-[#123C32] tracking-wider">
                  {submittedId || 'TS-2026-004821'}
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold">
                  Timestamp: {new Date().toLocaleDateString('en-GB')} • DigiLocker e-Sign Attached
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                <Link
                  to={`/student/applications/${submittedId || 'TS-2026-004821'}`}
                  className="px-6 py-2.5 bg-[#123C32] hover:bg-[#0A241E] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-colors"
                >
                  Track Application Timeline
                </Link>
                <Link
                  to="/student/dashboard"
                  className="px-6 py-2.5 bg-white border border-[#123C32] text-[#123C32] text-xs sm:text-sm font-bold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Return to Dashboard
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wizard Footer Controls */}
        {currentStep < 7 && (
          <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="px-4 py-2 border border-[#E2DDD2] hover:bg-gray-50 text-xs font-bold text-gray-700 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : <div />}

            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 bg-[#123C32] hover:bg-[#0A241E] text-white text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <span>{currentStep === 6 ? 'Submit Application' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4 text-[#E8B84A]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
