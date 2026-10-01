import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Smartphone, 
  Lock, 
  ArrowRight, 
  GraduationCap, 
  Building2, 
  Sparkles,
  KeyRound,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setRole } = useAppStore();

  const [identifier, setIdentifier] = useState('9437188204');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loginRole, setLoginRole] = useState<'student' | 'admin'>('student');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) return;
    setOtpSent(true);
    setOtp('4821'); // Mock auto-filled OTP for smooth demo
  };

  const handleVerifyLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(loginRole);
    if (loginRole === 'student') {
      navigate('/student/dashboard');
    } else {
      navigate('/admin/dashboard');
    }
  };

  const handleQuickDemo = (role: 'student' | 'admin') => {
    setRole(role);
    if (role === 'student') {
      navigate('/student/dashboard');
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl border border-[#E2DDD2] p-6 sm:p-8 shadow-xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#123C32] text-[#E8B84A] flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="font-heading font-black text-2xl text-[#123C32]">
            Scholar & Official Login
          </h1>
          <p className="text-xs text-[#576562]">
            Single Sign-On through Aadhaar OTP or Unified MoTA credentials.
          </p>
        </div>

        {/* Quick Demo Switcher Strip */}
        <div className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#E2DDD2] space-y-2">
          <div className="text-[11px] font-bold text-[#C86B43] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>National Hackathon Demo 1-Click Access:</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('student')}
              className="py-2 px-2.5 rounded-xl bg-white hover:bg-[#123C32]/5 border border-[#123C32]/30 text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#123C32]">
                <GraduationCap className="w-4 h-4 text-[#123C32]" />
                <span>Student Mode</span>
              </div>
              <div className="text-[10px] text-[#576562] mt-0.5 truncate">Asha (NIT Rourkela)</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              className="py-2 px-2.5 rounded-xl bg-white hover:bg-[#C86B43]/5 border border-[#C86B43]/30 text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#C86B43]">
                <Building2 className="w-4 h-4 text-[#C86B43]" />
                <span>MoTA Official</span>
              </div>
              <div className="text-[10px] text-[#576562] mt-0.5 truncate">Dr. R. Murmu (Director)</div>
            </button>
          </div>
        </div>

        {/* Role Toggle Tabs */}
        <div className="flex rounded-xl bg-[#F7F5EF] p-1 border border-[#E2DDD2]">
          <button
            type="button"
            onClick={() => setLoginRole('student')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
              loginRole === 'student' ? 'bg-[#123C32] text-white shadow-xs' : 'text-[#576562]'
            }`}
          >
            ST Student Applicant
          </button>
          <button
            type="button"
            onClick={() => setLoginRole('admin')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
              loginRole === 'admin' ? 'bg-[#123C32] text-white shadow-xs' : 'text-[#576562]'
            }`}
          >
            MoTA / Institution Nodal
          </button>
        </div>

        {/* Regular Login Form */}
        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#17221F] mb-1">
                {loginRole === 'student' ? 'Aadhaar / Mobile Number' : 'Official MoTA Gov Email / Username'}
              </label>
              <div className="relative">
                <Smartphone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={loginRole === 'student' ? 'Enter 10-digit mobile or Aadhaar' : 'director.st@mota.gov.in'}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E2DDD2] bg-[#F7F5EF] text-xs sm:text-sm font-medium focus:border-[#123C32] focus:outline-hidden"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#123C32] hover:bg-[#0A241E] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Send Secure Verification OTP</span>
              <ArrowRight className="w-4 h-4 text-[#E8B84A]" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyLogin} className="space-y-4">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between">
              <span>OTP sent to {identifier}</span>
              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="underline font-bold text-[#123C32]"
              >
                Change
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#17221F] mb-1">
                Enter 4-Digit OTP (Pre-filled for Demo)
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="4821"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E2DDD2] bg-[#F7F5EF] font-mono tracking-widest text-center text-sm font-bold focus:border-[#123C32] focus:outline-hidden"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#123C32] hover:bg-[#0A241E] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Verify & Open Workspace</span>
              <CheckCircle2 className="w-4 h-4 text-[#E8B84A]" />
            </button>
          </form>
        )}

        <div className="pt-2 text-center text-xs text-[#576562]">
          New student?{' '}
          <Link to="/register" className="font-bold text-[#123C32] hover:underline">
            Register for Unified Profile
          </Link>
        </div>
      </div>
    </div>
  );
};
