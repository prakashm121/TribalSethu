import React from 'react';
import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  Building2, 
  ShieldCheck, 
  Download, 
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { useAppStore } from '../../stores/useAppStore';
import { StatusBadge } from '../../components/common/StatusBadge';

export const PaymentTrackingPage: React.FC = () => {
  const { disbursements, student } = useAppStore();

  const totalSanctioned = 72000;
  const receivedAmount = disbursements
    .filter((d) => d.status === 'Credited')
    .reduce((sum, d) => sum + d.amount, 0);
  const pendingAmount = totalSanctioned - receivedAmount;

  const chartData = [
    { name: 'Aug 26', amount: 16000, status: 'Credited' },
    { name: 'Sep 26', amount: 16000, status: 'Credited' },
    { name: 'Oct 26', amount: 16000, status: 'Credited' },
    { name: 'Nov 26 (Queued)', amount: 24000, status: 'Processing' }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#123C32]">
            Direct Benefit Transfer (DBT) Tracker
          </h1>
          <p className="text-xs sm:text-sm text-[#576562] mt-0.5">
            Transparent PFMS electronic transaction ledger linked to your Aadhaar bank account.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>NPCI Aadhaar Payment Bridge Active</span>
          </span>
        </div>
      </div>

      {/* Top Fintech KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Total Sanctioned */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2DDD2] shadow-xs">
          <span className="text-xs font-bold text-[#576562] uppercase tracking-wider block">
            Total Sanctioned Grant
          </span>
          <div className="font-heading font-black text-3xl text-[#123C32] mt-1">
            ₹{totalSanctioned.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-[#82918D] mt-1">
            Top Class Education Scheme (FY 2026-27)
          </div>
        </div>

        {/* Card 2: Received */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2DDD2] shadow-xs">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
            Credited to Bank
          </span>
          <div className="font-heading font-black text-3xl text-emerald-800 mt-1">
            ₹{receivedAmount.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">
            ✓ 3 Installments Credited
          </div>
        </div>

        {/* Card 3: Pending */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2DDD2] shadow-xs">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
            Remaining Tranche
          </span>
          <div className="font-heading font-black text-3xl text-amber-900 mt-1">
            ₹{pendingAmount.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-amber-800 mt-1">
            In processing following income cert update
          </div>
        </div>
      </div>

      {/* Bank Account Verification Details Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E2DDD2] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#123C32]/10 text-[#123C32] flex items-center justify-center shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-base text-[#17221F]">{student.bankName}</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                Primary DBT Account
              </span>
            </div>
            <p className="text-xs text-[#576562] mt-0.5 font-mono">
              Account No: <strong>{student.accountNumberMasked}</strong> • IFSC: <strong>{student.ifscCode}</strong>
            </p>
          </div>
        </div>

        <div className="text-left md:text-right text-xs">
          <div className="text-[#82918D]">PFMS Beneficiary ID:</div>
          <div className="font-mono font-bold text-[#123C32]">PFMS-ST-882104-OR</div>
        </div>
      </div>

      {/* Recharts Visualization */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#E2DDD2] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-base text-[#123C32]">
              Scholarship Disbursement Breakdown
            </h3>
            <p className="text-xs text-[#576562]">
              Tranche schedule according to academic semester milestones.
            </p>
          </div>
          <span className="text-xs text-[#123C32] font-bold bg-[#123C32]/10 px-2.5 py-1 rounded-lg">
            4 Scheduled Tranches
          </span>
        </div>

        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2DDD2" />
              <XAxis dataKey="name" stroke="#576562" fontSize={12} tickLine={false} />
              <YAxis 
                stroke="#576562" 
                fontSize={12} 
                tickLine={false} 
                tickFormatter={(val) => `₹${val / 1000}k`} 
              />
              <Tooltip 
                formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Disbursement Amount']}
                contentStyle={{ borderRadius: '12px', border: '1px solid #E2DDD2' }}
              />
              <Bar dataKey="amount" fill="#123C32" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payment Timeline Ledger */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#E2DDD2] shadow-xs space-y-4">
        <h3 className="font-heading font-bold text-base text-[#123C32]">
          Transaction Timeline & PFMS Acknowledgments
        </h3>

        <div className="divide-y divide-gray-100">
          {disbursements.map((tranche) => (
            <div
              key={tranche.id}
              className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  tranche.status === 'Credited' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {tranche.status === 'Credited' ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-black text-base text-[#17221F]">
                      ₹{tranche.amount.toLocaleString('en-IN')}
                    </span>
                    <StatusBadge status={tranche.status} size="sm" />
                  </div>
                  <div className="text-xs text-[#576562] mt-0.5">
                    {tranche.schemeName}
                  </div>
                  {tranche.utrNumber && (
                    <div className="text-[11px] font-mono text-[#82918D] mt-0.5">
                      Bank UTR: <strong>{tranche.utrNumber}</strong>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-left sm:text-right text-xs">
                <div className="font-medium text-[#17221F]">
                  {tranche.disbursementDate ? `Credited on ${tranche.disbursementDate}` : `Scheduled: ${tranche.expectedDate}`}
                </div>
                <div className="text-[11px] text-[#82918D]">
                  Credit to: {tranche.bankName} (••••{tranche.accountEnding})
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
