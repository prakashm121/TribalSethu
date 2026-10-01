import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Search, 
  Send, 
  CheckCircle2, 
  Clock, 
  Building, 
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { MOCK_DEFICIENCIES } from '../../data/mockData';

export const AdminDeficienciesPage: React.FC = () => {
  const [deficiencies, setDeficiencies] = useState(MOCK_DEFICIENCIES);
  const [sentAlert, setSentAlert] = useState(false);

  const handleBulkRemind = () => {
    setSentAlert(true);
    setTimeout(() => setSentAlert(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#123C32]">
            Deficiencies & Clarification Oversight
          </h1>
          <p className="text-xs sm:text-sm text-[#576562] mt-0.5">
            Monitor and resolve applicant deficiencies across institutions without cancellations.
          </p>
        </div>

        <button
          onClick={handleBulkRemind}
          className="px-4 py-2 bg-[#C86B43] hover:bg-[#b25a33] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Dispatch Bulk SMS Nudge to Students</span>
        </button>
      </div>

      {sentAlert && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 rounded-xl font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Bulk automated reminder SMS dispatched to 14,208 students with pending renewals.</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E2DDD2] shadow-xs">
          <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
            Open Deficiencies
          </span>
          <div className="font-heading font-black text-3xl text-amber-900 mt-1">
            14,208
          </div>
          <div className="text-[11px] text-[#576562] mt-1">
            Top cause: Expired income certificate (34%)
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2DDD2] shadow-xs">
          <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
            Resolved via DigiLocker
          </span>
          <div className="font-heading font-black text-3xl text-emerald-800 mt-1">
            82.6%
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">
            Instant paperless resolution
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2DDD2] shadow-xs">
          <span className="text-[11px] font-bold text-[#123C32] uppercase tracking-wider block">
            Average Clearance Time
          </span>
          <div className="font-heading font-black text-3xl text-[#123C32] mt-1">
            3.2 Days
          </div>
          <div className="text-[11px] text-[#576562] mt-1">
            Down from 45 days in legacy system
          </div>
        </div>
      </div>

      {/* Deficiencies Table */}
      <div className="bg-white rounded-3xl border border-[#E2DDD2] shadow-xs overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-heading font-bold text-base text-[#123C32]">
            Active Deficiencies Ledger
          </h3>
          <span className="text-xs text-[#82918D]">Live Monitoring</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F3] border-b border-[#E2DDD2] text-[11px] font-bold uppercase text-[#576562]">
              <tr>
                <th className="py-3 px-4">Application ID</th>
                <th className="py-3 px-4">Scheme</th>
                <th className="py-3 px-4">Deficiency Category</th>
                <th className="py-3 px-4">Official Reason</th>
                <th className="py-3 px-4">Deadline</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[#17221F]">
              {deficiencies.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50/80">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#123C32]">{d.applicationId}</td>
                  <td className="py-3.5 px-4 font-semibold">{d.schemeName}</td>
                  <td className="py-3.5 px-4">{d.title}</td>
                  <td className="py-3.5 px-4 text-[#576562] max-w-xs">{d.reason}</td>
                  <td className="py-3.5 px-4 font-bold text-rose-700">{d.deadline}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                      d.status === 'Open' ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => alert(`Nudge sent for application ${d.applicationId}`)}
                      className="px-2.5 py-1 bg-gray-100 hover:bg-[#123C32] hover:text-white rounded text-xs font-bold transition-colors cursor-pointer"
                    >
                      Ping Student
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
