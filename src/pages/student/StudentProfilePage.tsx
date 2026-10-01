import React, { useState } from 'react';
import { 
  User, 
  ShieldCheck, 
  Building2, 
  CreditCard, 
  MapPin, 
  Mail, 
  Phone, 
  Edit3, 
  CheckCircle2, 
  Sparkles,
  RefreshCw,
  School,
  Lock
} from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';

export const StudentProfilePage: React.FC = () => {
  const { student, updateStudentProfile, openDigiLockerModal } = useAppStore();
  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState(student.mobile);
  const [email, setEmail] = useState(student.email);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudentProfile({ mobile: phone, email: email });
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#123C32]">
            My Unified Scholar Profile
          </h1>
          <p className="text-xs sm:text-sm text-[#576562] mt-0.5">
            Single source of truth for all five Ministry of Tribal Affairs schemes.
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-white hover:bg-gray-50 border border-[#E2DDD2] text-[#123C32] text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>{isEditing ? 'Cancel Edit' : 'Edit Contact Details'}</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-xs text-emerald-800 rounded-xl font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Profile changes successfully updated and synced with your application dossier!</span>
        </div>
      )}

      {/* Main Profile Identity Card */}
      <div className="bg-white rounded-3xl border border-[#E2DDD2] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <img
              src={student.avatarUrl}
              alt={student.fullName}
              className="w-20 h-20 rounded-2xl object-cover border-3 border-[#123C32] shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading font-black text-xl sm:text-2xl text-[#123C32]">
                  {student.fullName}
                </h2>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified ST
                </span>
              </div>
              <p className="text-xs text-[#576562] mt-0.5">
                {student.tribeName} Community • Domicile: {student.domicileState}
              </p>
              <div className="text-[11px] font-mono text-[#82918D] mt-1">
                Student ID: <strong>{student.id}</strong>
              </div>
            </div>
          </div>

          <div className="bg-[#FAF8F3] p-4 rounded-2xl border border-[#E2DDD2] text-center sm:text-right">
            <span className="text-[11px] text-[#576562]">Profile Strength</span>
            <div className="font-heading font-black text-2xl text-[#123C32]">
              {student.profileCompletionPercentage}% Complete
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold block">13 Credentials Synced</span>
          </div>
        </div>

        {/* Section 1: Identity & Demographics */}
        <div>
          <h3 className="font-heading font-bold text-sm text-[#123C32] uppercase tracking-wider mb-3">
            Identity & Demographics
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E2DDD2]">
              <span className="text-[#82918D] block text-[10px]">Aadhaar Number</span>
              <strong className="font-mono text-sm text-[#17221F]">{student.aadhaarNumberMasked}</strong>
              <span className="text-[10px] text-emerald-700 block mt-0.5">UIDAI e-KYC Verified ✓</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E2DDD2]">
              <span className="text-[#82918D] block text-[10px]">APAAR / ABC ID</span>
              <strong className="font-mono text-sm text-[#17221F]">{student.apaarId}</strong>
              <span className="text-[10px] text-emerald-700 block mt-0.5">Academic Bank of Credits ✓</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E2DDD2]">
              <span className="text-[#82918D] block text-[10px]">Date of Birth & Gender</span>
              <strong className="text-[#17221F]">{student.dob} ({student.gender})</strong>
              <span className="text-[10px] text-gray-500 block mt-0.5">CBSE Board Verified</span>
            </div>
          </div>
        </div>

        {/* Section 2: Academic Enrolment */}
        <div>
          <h3 className="font-heading font-bold text-sm text-[#123C32] uppercase tracking-wider mb-3">
            Academic Enrolment & Institution
          </h3>
          <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E2DDD2] space-y-2 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-sm font-bold text-[#17221F]">{student.currentInstitution}</span>
              <span className="font-mono text-[11px] bg-white px-2 py-0.5 rounded border border-gray-200">
                AISHE Code: U-0361
              </span>
            </div>
            <div className="text-[#576562]">
              Course: <strong className="text-[#17221F]">{student.currentCourse}</strong> ({student.currentYear})
            </div>
            <div className="text-[11px] text-emerald-700 font-semibold">
              ✓ Premier Institution (Eligible for ₹2,00,000/yr Top Class Scholarship)
            </div>
          </div>
        </div>

        {/* Section 3: Contact & Financial Credentials */}
        <div>
          <h3 className="font-heading font-bold text-sm text-[#123C32] uppercase tracking-wider mb-3">
            Contact & Financial Credentials
          </h3>

          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4 p-4 rounded-2xl border border-[#123C32] bg-[#FAF8F3]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold block mb-1">Mobile Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-300 bg-white"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-300 bg-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-200 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#123C32] text-white rounded-xl text-xs font-bold"
                >
                  Save Updates
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E2DDD2] flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#123C32]" />
                <div>
                  <span className="text-[#82918D] text-[10px] block">Aadhaar Linked Mobile</span>
                  <strong className="text-[#17221F]">{student.mobile}</strong>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E2DDD2] flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#123C32]" />
                <div>
                  <span className="text-[#82918D] text-[10px] block">Registered Academic Email</span>
                  <strong className="text-[#17221F]">{student.email}</strong>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 4: Bank Account & DBT Seeding */}
        <div>
          <h3 className="font-heading font-bold text-sm text-[#123C32] uppercase tracking-wider mb-3">
            Bank Account & NPCI Aadhaar Seeding
          </h3>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-950 text-sm">{student.bankName}</span>
              <span className="text-xs bg-emerald-200 text-emerald-900 font-bold px-2.5 py-0.5 rounded-full">
                DBT Active ✓
              </span>
            </div>
            <div className="text-emerald-900 font-mono">
              Account: {student.accountNumberMasked} • IFSC: {student.ifscCode}
            </div>
            <p className="text-[11px] text-emerald-800">
              This account is verified on the NPCI Aadhaar Payment Bridge (APB) for direct electronic subsidy disbursement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
