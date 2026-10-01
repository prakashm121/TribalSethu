import React, { useState } from 'react';
import { 
  PhoneCall, 
  Mail, 
  Send, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Clock, 
  MapPin, 
  Building 
} from 'lucide-react';

export const HelpCenterPage: React.FC = () => {
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('Payment Issue');
  const [ticketDesc, setTicketDesc] = useState('');
  const [applicationId, setApplicationId] = useState('TS-2026-004821');
  const [submittedTicketId, setSubmittedTicketId] = useState<string | null>(null);

  const [searchTicketId, setSearchTicketId] = useState('');
  const [ticketStatusResult, setTicketStatusResult] = useState<{ id: string; status: string; remarks: string } | null>(null);

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketDesc.trim()) return;
    const newId = `GRV-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    setSubmittedTicketId(newId);
    setTicketSubject('');
    setTicketDesc('');
  };

  const handleTrackTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTicketId.trim()) return;
    setTicketStatusResult({
      id: searchTicketId,
      status: 'Under Investigation by District Welfare Officer',
      remarks: 'Your grievance regarding payment tranche 3 has been assigned to Sundargarh DWO office. Resolution deadline: 48 hours.'
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#123C32]/10 text-[#123C32] text-xs font-bold">
          <PhoneCall className="w-3.5 h-3.5 text-[#C86B43]" />
          <span>Grievance Redressal & Helpdesk</span>
        </div>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-[#123C32]">
          Tribal Scholar Support & Grievance Portal
        </h1>
        <p className="text-xs sm:text-sm text-[#576562] max-w-xl mx-auto">
          We are committed to resolving student queries and payment issues within 48 to 72 hours.
        </p>
      </div>

      {/* Helpline Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#E2DDD2] shadow-xs flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#123C32]/10 text-[#123C32] flex items-center justify-center shrink-0">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#C86B43] uppercase tracking-wider block">
              Toll-Free Helpline
            </span>
            <div className="text-xl font-black text-[#123C32] mt-0.5">1800-11-7788</div>
            <p className="text-xs text-[#576562] mt-1">
              Mon - Sat (9:00 AM to 6:00 PM IST). Multilingual tribal language operators.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E2DDD2] shadow-xs flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#C86B43]/10 text-[#C86B43] flex items-center justify-center shrink-0">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#C86B43] uppercase tracking-wider block">
              Official Email
            </span>
            <div className="text-base font-bold text-[#17221F] mt-0.5">help.tribal@gov.in</div>
            <p className="text-xs text-[#576562] mt-1">
              For escalation of unverified institutions or missing PFMS credits.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E2DDD2] shadow-xs flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#E8B84A]/20 text-[#8C6D1F] flex items-center justify-center shrink-0">
            <Building className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#C86B43] uppercase tracking-wider block">
              Field Support
            </span>
            <div className="text-base font-bold text-[#17221F] mt-0.5">District Welfare Officer</div>
            <p className="text-xs text-[#576562] mt-1">
              Walk-in counters available in all 730+ tribal district collectorates.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Lodge Grievance Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#E2DDD2] shadow-xs space-y-6">
          <div>
            <h3 className="font-heading font-black text-xl text-[#123C32]">
              Lodge a Formal Grievance
            </h3>
            <p className="text-xs text-[#576562] mt-1">
              Submit an official ticket directly to the MoTA central monitoring cell.
            </p>
          </div>

          {submittedTicketId ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-heading font-bold text-lg text-emerald-900">
                Grievance Lodged Successfully!
              </h4>
              <p className="text-xs text-emerald-800">
                Your ticket tracking reference ID is:
              </p>
              <div className="font-mono text-base font-bold bg-white px-4 py-2 rounded-xl border border-emerald-300 inline-block text-[#123C32]">
                {submittedTicketId}
              </div>
              <p className="text-[11px] text-[#576562]">
                An SMS confirmation has been sent to your registered mobile number.
              </p>
              <button
                onClick={() => setSubmittedTicketId(null)}
                className="text-xs font-bold text-[#123C32] underline pt-2 block mx-auto cursor-pointer"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitTicket} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#17221F] mb-1">
                    Grievance Category
                  </label>
                  <select
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#E2DDD2] bg-[#F7F5EF] text-xs font-medium focus:border-[#123C32] focus:outline-hidden"
                  >
                    <option>Payment / DBT Delay</option>
                    <option>Institute Verification Backlog</option>
                    <option>DigiLocker Document Sync Error</option>
                    <option>Income Certificate Deficiency Appeal</option>
                    <option>Bank Account / IFSC Change</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#17221F] mb-1">
                    Application ID (if applicable)
                  </label>
                  <input
                    type="text"
                    value={applicationId}
                    onChange={(e) => setApplicationId(e.target.value)}
                    placeholder="e.g. TS-2026-004821"
                    className="w-full p-2.5 rounded-xl border border-[#E2DDD2] bg-[#F7F5EF] text-xs font-mono focus:border-[#123C32] focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#17221F] mb-1">
                  Subject Line
                </label>
                <input
                  type="text"
                  required
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="Brief summary of your grievance..."
                  className="w-full p-2.5 rounded-xl border border-[#E2DDD2] bg-[#F7F5EF] text-xs font-medium focus:border-[#123C32] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#17221F] mb-1">
                  Detailed Explanation
                </label>
                <textarea
                  rows={4}
                  required
                  value={ticketDesc}
                  onChange={(e) => setTicketDesc(e.target.value)}
                  placeholder="Please state dates, transaction reference numbers, or institute nodal officer remarks..."
                  className="w-full p-2.5 rounded-xl border border-[#E2DDD2] bg-[#F7F5EF] text-xs font-medium focus:border-[#123C32] focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#123C32] hover:bg-[#0A241E] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4 text-[#E8B84A]" />
                <span>Submit Grievance to Ministry Cell</span>
              </button>
            </form>
          )}
        </div>

        {/* Right: Track Existing Ticket */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-[#E2DDD2] shadow-xs space-y-4">
            <div>
              <h3 className="font-heading font-black text-lg text-[#123C32]">
                Track Grievance Status
              </h3>
              <p className="text-xs text-[#576562] mt-1">
                Enter your ticket reference ID to see live resolution remarks.
              </p>
            </div>

            <form onSubmit={handleTrackTicket} className="flex gap-2">
              <input
                type="text"
                value={searchTicketId}
                onChange={(e) => setSearchTicketId(e.target.value)}
                placeholder="GRV-2026-XXXXX"
                className="flex-1 p-2.5 rounded-xl border border-[#E2DDD2] bg-[#F7F5EF] text-xs font-mono focus:border-[#123C32] focus:outline-hidden"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#C86B43] hover:bg-[#b25a33] text-white font-bold rounded-xl text-xs transition-colors shrink-0 cursor-pointer"
              >
                Track
              </button>
            </form>

            {ticketStatusResult && (
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs space-y-2">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-blue-900 font-mono">{ticketStatusResult.id}</span>
                  <span className="bg-blue-200 text-blue-900 px-2 py-0.5 rounded-full text-[10px]">
                    In Progress
                  </span>
                </div>
                <div className="font-semibold text-blue-950">{ticketStatusResult.status}</div>
                <p className="text-blue-900/80 leading-relaxed text-[11px]">
                  {ticketStatusResult.remarks}
                </p>
              </div>
            )}
          </div>

          <div className="bg-[#FAF8F3] p-6 rounded-3xl border border-[#E2DDD2] text-xs space-y-3">
            <h4 className="font-bold text-[#123C32] flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#C86B43]" />
              <span>Service Level Agreements (Citizen Charter)</span>
            </h4>
            <ul className="space-y-2 text-[#576562]">
              <li>• Payment reconciliation complaints: <strong>48 business hours</strong></li>
              <li>• Deficiency re-examination: <strong>3 calendar days</strong></li>
              <li>• Change of institution / transfer: <strong>5 calendar days</strong></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
