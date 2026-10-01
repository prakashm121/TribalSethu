import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  UserCheck, 
  ArrowRight, 
  Lock, 
  CheckCircle2, 
  Sparkles,
  Smartphone,
  School,
  Building
} from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { setRole } = useAppStore();

  const [aadhaarNumber, setAadhaarNumber] = useState('9812 4410 4912');
  const [mobileNumber, setMobileNumber] = useState('9437188204');
  const [consentGranted, setConsentGranted] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentGranted) return;
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      setRole('student');
      navigate('/student/dashboard');
    }, 1200);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl border border-[#E2DDD2] p-6 sm:p-8 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#123C32] text-[#E8B84A] flex items-center justify-center mx-auto shadow-md">
            <UserCheck className="w-7 h-7" />
          </div>
          <h1 className="font-heading font-black text-2xl text-[#123C32]">
            One-Time Student Registration
          </h1>
          <p className="text-xs text-[#576562]">
            Create your permanent Scheduled Tribe Scholarship Profile using Aadhaar e-KYC.
          </p>
        </div>

        {/* Benefits Strip */}
        <div className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#E2DDD2] text-xs text-[#17221F] space-y-1.5">
          <div className="font-bold text-[#123C32] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#C86B43]" />
            <span>Automatic Profile Generation:</span>
          </div>
          <p className="text-[11px] text-[#576562]">
            Once registered, your APAAR ID, academic record, DigiLocker credentials, and Aadhaar-seeded bank account link automatically.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#17221F] mb-1">
              Aadhaar Number (12 Digits)
            </label>
            <input
              type="text"
              required
              value={aadhaarNumber}
              onChange={(e) => setAadhaarNumber(e.target.value)}
              placeholder="XXXX XXXX XXXX"
              className="w-full p-2.5 rounded-xl border border-[#E2DDD2] bg-[#F7F5EF] font-mono text-sm tracking-wider focus:border-[#123C32] focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#17221F] mb-1">
              Aadhaar-Linked Mobile Number
            </label>
            <input
              type="text"
              required
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="+91 9XXXXXXXXX"
              className="w-full p-2.5 rounded-xl border border-[#E2DDD2] bg-[#F7F5EF] text-sm focus:border-[#123C32] focus:outline-hidden"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#576562] space-y-2">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={consentGranted}
                onChange={(e) => setConsentGranted(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-[#123C32] cursor-pointer"
              />
              <span className="text-[11px] leading-relaxed">
                I hereby grant consent to the Ministry of Tribal Affairs to authenticate my identity via UIDAI Aadhaar e-KYC and fetch my educational/community records from DigiLocker API Setu for scholarship administration.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={!consentGranted || isVerifying}
            className="w-full py-3 bg-[#123C32] hover:bg-[#0A241E] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {isVerifying ? (
              <span>Authenticating e-KYC with UIDAI...</span>
            ) : (
              <>
                <span>Complete Registration & Open Portal</span>
                <ArrowRight className="w-4 h-4 text-[#E8B84A]" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-[#576562]">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-[#123C32] hover:underline">
            Login directly
          </Link>
        </div>
      </div>
    </div>
  );
};
