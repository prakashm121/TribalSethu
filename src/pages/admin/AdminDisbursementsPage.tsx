import React, { useState } from 'react';
import { 
  CreditCard, 
  CheckCircle2, 
  Send, 
  Clock, 
  Building, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowUpRight 
} from 'lucide-react';
import { MOCK_DISBURSEMENTS } from '../../data/mockData';

export const AdminDisbursementsPage: React.FC = () => {
  const [batches, setBatches] = useState([
    {
      batchId: 'PFMS-MOTA-2026-B91',
      scheme: 'Top Class Education (Tranche 3)',
      totalScholars: 4210,
      totalAmountCr: 24.8,
      status: 'Ready for Release',
      bankGateway: 'SBI / NPCI APB'
    },
    {
      batchId: 'PFMS-MOTA-2026-B90',
      scheme: 'Post-Matric Scholarship (Quarter 2)',
      totalScholars: 84200,
      totalAmountCr: 142.5,
      status: 'Disbursed',
      bankGateway: 'PFMS Central APBS'
    },
    {
      batchId: 'PFMS-MOTA-2026-B89',
      scheme: 'NFST Fellowship (Sep 2026 Stipend)',
      totalScholars: 742,
      totalAmountCr: 3.12,
      status: 'Disbursed',
      bankGateway: 'Canara / UGC APB'
    }
  ]);

  const [authorized, setAuthorized] = useState<string | null>(null);

  const handleAuthorizeBatch = (batchId: string) => {
    setAuthorized(batchId);
    setBatches(batches.map((b) => b.batchId === batchId ? { ...b, status: 'Disbursed' } : b));
    setTimeout(() => setAuthorized(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#123C32]">
            PFMS & DBT Disbursement Engine
          </h1>
          <p className="text-xs sm:text-sm text-[#576562] mt-0.5">
            Public Financial Management System batch execution and Aadhaar Payment Bridge reconciliation.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-3 py-1.5 rounded-xl border border-emerald-200">
            NPCI APB Gateway: 99.8% Online
          </span>
        </div>
      </div>

      {authorized && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 rounded-2xl font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Batch {authorized} authorized successfully. Electronic funds released to NPCI Aadhaar mapper!</span>
        </div>
      )}

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E2DDD2] shadow-xs">
          <span className="text-[11px] font-bold text-[#576562] uppercase tracking-wider block">
            Current Financial Year Disbursed
          </span>
          <div className="font-heading font-black text-3xl text-[#123C32] mt-1">
            ₹1,240.85 Cr
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">
            Directly to 1.92M student accounts
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2DDD2] shadow-xs">
          <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
            Awaiting Digital Signature (DSC)
          </span>
          <div className="font-heading font-black text-3xl text-amber-900 mt-1">
            ₹24.80 Cr
          </div>
          <div className="text-[11px] text-amber-800 mt-1">
            4,210 verified Top Class scholars
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2DDD2] shadow-xs">
          <span className="text-[11px] font-bold text-[#C86B43] uppercase tracking-wider block">
            Bank Failure Rate
          </span>
          <div className="font-heading font-black text-3xl text-[#C86B43] mt-1">
            0.09%
          </div>
          <div className="text-[11px] text-[#576562] mt-1">
            Lowest in history due to prior Aadhaar seeding checks
          </div>
        </div>
      </div>

      {/* PFMS Batch Queue Table */}
      <div className="bg-white rounded-3xl border border-[#E2DDD2] shadow-xs overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-heading font-bold text-base text-[#123C32]">
            PFMS Payment Release Batches
          </h3>
          <span className="text-xs text-[#82918D]">MoTA Drawing & Disbursing Officer (DDO) Console</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F3] border-b border-[#E2DDD2] text-[11px] font-bold uppercase text-[#576562]">
              <tr>
                <th className="py-3 px-4">Batch Reference</th>
                <th className="py-3 px-4">Scheme Allocation</th>
                <th className="py-3 px-4">Beneficiary Count</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Payment Gateway</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Authorize</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[#17221F]">
              {batches.map((b) => (
                <tr key={b.batchId} className="hover:bg-gray-50/80">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#123C32]">{b.batchId}</td>
                  <td className="py-3.5 px-4 font-semibold">{b.scheme}</td>
                  <td className="py-3.5 px-4 font-bold">{b.totalScholars.toLocaleString('en-IN')} students</td>
                  <td className="py-3.5 px-4 font-black text-[#123C32]">₹{b.totalAmountCr} Crores</td>
                  <td className="py-3.5 px-4 text-[#576562]">{b.bankGateway}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                      b.status === 'Ready for Release' ? 'bg-amber-100 text-amber-900 animate-pulse' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {b.status === 'Ready for Release' ? (
                      <button
                        onClick={() => handleAuthorizeBatch(b.batchId)}
                        className="px-3.5 py-1.5 bg-[#123C32] hover:bg-[#0A241E] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        e-Sign & Release
                      </button>
                    ) : (
                      <span className="text-emerald-700 font-bold text-xs">✓ Disbursed</span>
                    )}
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
