import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle, 
  FolderLock, 
  FileText,
  School,
  GraduationCap,
  BookOpen,
  Globe2,
  DollarSign,
  MapPin,
  RefreshCw
} from 'lucide-react';
import { scholarshipService } from '../../services/scholarshipService';
import { StatusBadge } from '../../components/common/StatusBadge';
import { useAppStore } from '../../stores/useAppStore';

export const EligibilityWizardPage: React.FC = () => {
  const navigate = useNavigate();
  const { setRole } = useAppStore();
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    educationLevel: 'Undergraduate',
    isSt: true,
    isPvtg: false,
    annualIncome: 185000,
    studyLocation: 'Premier Institute (IIT/NIT/Central Univ)',
    marksPercentage: 85,
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const results = scholarshipService.checkEligibility({
    educationLevel: formData.educationLevel,
    isSt: formData.isSt,
    isPvtg: formData.isPvtg,
    annualIncome: formData.annualIncome,
    studyLocation: formData.studyLocation
  });

  const educationOptions = [
    { id: 'School', title: 'Secondary School', desc: 'Classes IX or X', icon: School },
    { id: 'Undergraduate', title: 'Undergraduate (UG)', desc: 'B.Tech, MBBS, B.Sc, BA, B.Com, Law', icon: GraduationCap },
    { id: 'Postgraduate', title: 'Postgraduate (PG)', desc: 'M.Tech, MBA, M.Sc, MA, MD', icon: BookOpen },
    { id: 'Research / PhD', title: 'Research / PhD', desc: 'Full-time M.Phil or Doctoral Fellow', icon: Sparkles },
    { id: 'Planning to study abroad', title: 'Study Abroad (NOS)', desc: 'Master’s or PhD at Top 500 QS Varsities', icon: Globe2 }
  ];

  const locationOptions = [
    'Premier Institute (IIT/NIT/Central Univ)',
    'State Government / Aided University',
    'Private Recognized College (AISHE Accredited)',
    'Government School (UDISE+)',
    'Overseas / Abroad'
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10">
      {/* Header */}
      <div className="text-center mb-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#123C32]/10 text-[#123C32] text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[#C86B43]" />
          <span>Interactive Scheme Recommendation Engine</span>
        </div>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-[#123C32]">
          Smart Eligibility Wizard
        </h1>
        <p className="text-xs sm:text-sm text-[#576562] max-w-xl mx-auto">
          Answer 4 quick questions to immediately find which of the five Ministry of Tribal Affairs scholarships you can claim.
        </p>
      </div>

      {/* Progress Bar & Steps Indicator */}
      <div className="bg-white rounded-2xl border border-[#E2DDD2] p-4 sm:p-6 mb-8 shadow-xs">
        <div className="flex items-center justify-between text-xs font-bold text-[#576562] mb-3">
          <span>Step {currentStep} of {totalSteps}</span>
          <span className="text-[#123C32]">
            {currentStep === 1 && 'Current Education Stage'}
            {currentStep === 2 && 'Social & Tribal Category'}
            {currentStep === 3 && 'Financial & Institution Profile'}
            {currentStep === 4 && 'Your Scholarship Match'}
          </span>
        </div>
        <div className="w-full h-2 bg-[#F7F5EF] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#123C32] to-[#C86B43] transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Wizard Card Body */}
      <div className="bg-white rounded-3xl border border-[#E2DDD2] p-6 sm:p-10 shadow-lg min-h-[420px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {/* STEP 1: What are you currently studying? */}
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#123C32]">
                  What are you currently studying?
                </h3>
                <p className="text-xs sm:text-sm text-[#576562] mt-1">
                  Select your current enrolled course or proposed level of education.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {educationOptions.map((opt) => {
                  const isSelected = formData.educationLevel === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setFormData({ ...formData, educationLevel: opt.id })}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                        isSelected
                          ? 'border-[#123C32] bg-[#123C32]/5 shadow-sm'
                          : 'border-[#E2DDD2] hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className={`p-2 rounded-xl shrink-0 ${isSelected ? 'bg-[#123C32] text-[#E8B84A]' : 'bg-gray-100 text-gray-600'}`}>
                        <opt.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-sm text-[#17221F]">{opt.title}</h4>
                        <p className="text-xs text-[#576562] mt-0.5">{opt.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 2: ST & PVTG Status */}
          {currentStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#123C32]">
                  Tribal Community & Vulnerability Status
                </h3>
                <p className="text-xs sm:text-sm text-[#576562] mt-1">
                  These schemes are tailored for Scheduled Tribe (ST) scholars of India.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl border border-[#E2DDD2] bg-[#FAF8F3] space-y-3">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <span className="font-bold text-sm text-[#17221F] block">
                        Do you belong to a recognized Scheduled Tribe (ST)?
                      </span>
                      <span className="text-xs text-[#576562]">
                        Must have a valid caste certificate issued by an authorized state revenue official.
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.isSt}
                      onChange={(e) => setFormData({ ...formData, isSt: e.target.checked })}
                      className="w-5 h-5 accent-[#123C32] rounded cursor-pointer"
                    />
                  </label>
                </div>

                <div className="p-4 rounded-2xl border border-[#E2DDD2] bg-white space-y-3">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <span className="font-bold text-sm text-[#17221F] block">
                        Are you from a Particularly Vulnerable Tribal Group (PVTG)?
                      </span>
                      <span className="text-xs text-[#576562]">
                        Special 100% saturation priority under Pradhan Mantri PVTG Development Mission.
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.isPvtg}
                      onChange={(e) => setFormData({ ...formData, isPvtg: e.target.checked })}
                      className="w-5 h-5 accent-[#123C32] rounded cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Income and Study Location */}
          {currentStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#123C32]">
                  Income & Institution Details
                </h3>
                <p className="text-xs sm:text-sm text-[#576562] mt-1">
                  Helps verify income thresholds (₹2.5L for Post-Matric, ₹6.0L for Top Class, No cap for NFST).
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold mb-2">
                    <span className="text-[#17221F]">Annual Family Income (INR):</span>
                    <span className="text-[#123C32] font-mono text-sm bg-[#123C32]/10 px-2 py-0.5 rounded">
                      ₹{formData.annualIncome.toLocaleString('en-IN')} / year
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="1000000"
                    step="25000"
                    value={formData.annualIncome}
                    onChange={(e) => setFormData({ ...formData, annualIncome: Number(e.target.value) })}
                    className="w-full accent-[#123C32] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-[#82918D] mt-1">
                    <span>₹50,000</span>
                    <span>₹2,50,000 (Ceiling for Post-Matric)</span>
                    <span>₹6,00,000 (Top Class)</span>
                    <span>₹10,00,000+</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#17221F] mb-1.5">
                    Type of Institution:
                  </label>
                  <select
                    value={formData.studyLocation}
                    onChange={(e) => setFormData({ ...formData, studyLocation: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#E2DDD2] bg-white text-xs sm:text-sm font-medium text-[#17221F] focus:border-[#123C32] focus:outline-hidden"
                  >
                    {locationOptions.map((loc, i) => (
                      <option key={i} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Scholarship Match Results */}
          {currentStep === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-black text-xl sm:text-2xl text-[#123C32]">
                      Your Scholarship Match
                    </h3>
                    <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      Evaluated
                    </span>
                  </div>
                  <p className="text-xs text-[#576562] mt-0.5">
                    Results based on {formData.educationLevel}, ₹{formData.annualIncome.toLocaleString('en-IN')}/yr family income.
                  </p>
                </div>

                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-xs font-bold text-[#C86B43] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Re-check
                </button>
              </div>

              {/* Match Cards */}
              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {results.map((res, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-2xl border transition-all ${
                      res.status === 'Eligible'
                        ? 'bg-emerald-50/40 border-emerald-300'
                        : res.status === 'Potentially Eligible' || res.status === 'Check Required'
                        ? 'bg-amber-50/40 border-amber-300'
                        : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div>
                        <h4 className="font-heading font-bold text-sm sm:text-base text-[#123C32]">
                          {res.scheme.name}
                        </h4>
                        <span className="text-[11px] text-[#576562]">
                          Award: <strong>Up to ₹{res.scheme.annualAwardMax.toLocaleString('en-IN')}/yr</strong>
                        </span>
                      </div>
                      <StatusBadge status={res.status} size="sm" />
                    </div>

                    <p className="text-xs text-[#576562] mb-3">
                      {res.reason}
                    </p>

                    <div className="text-[11px] text-[#17221F] bg-white/80 p-2 rounded-lg border border-gray-200 flex flex-wrap items-center gap-1.5">
                      <span className="font-bold text-[#123C32]">Required:</span>
                      {res.scheme.documentsRequired.map((doc, dIdx) => (
                        <span key={dIdx} className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded text-[10px]">
                          {doc}
                        </span>
                      ))}
                    </div>

                    {res.status === 'Eligible' && (
                      <div className="mt-3 flex justify-end">
                        <button
                          onClick={() => {
                            setRole('student');
                            navigate('/student/apply');
                          }}
                          className="px-4 py-1.5 bg-[#123C32] hover:bg-[#0A241E] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
                        >
                          <span>Start Application</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#E8B84A]" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wizard Controls */}
        <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              onClick={handlePrev}
              className="px-4 py-2 border border-[#E2DDD2] hover:bg-gray-50 text-xs font-bold text-gray-700 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : <div />}

          {currentStep < totalSteps ? (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-[#123C32] hover:bg-[#0A241E] text-white text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4 text-[#E8B84A]" />
            </button>
          ) : (
            <button
              onClick={() => {
                setRole('student');
                navigate('/student/apply');
              }}
              className="px-6 py-2.5 bg-[#C86B43] hover:bg-[#B25A33] text-white text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2 shadow-md transition-colors cursor-pointer"
            >
              <span>Proceed to 1-Click Application</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
