import React from 'react';
import { 
  PieChart as PieChartIcon, 
  TrendingUp, 
  Users, 
  Sparkles, 
  Award, 
  Download,
  Calendar
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  LineChart, 
  Line 
} from 'recharts';

export const AdminAnalyticsPage: React.FC = () => {
  const genderData = [
    { name: 'Female Scholars', value: 52, color: '#C86B43' },
    { name: 'Male Scholars', value: 48, color: '#123C32' }
  ];

  const yoyGrowthData = [
    { year: '2023-24', applicantsK: 1420, disbursedCr: 880 },
    { year: '2024-25', applicantsK: 1680, disbursedCr: 1040 },
    { year: '2025-26', applicantsK: 1840, disbursedCr: 1180 },
    { year: '2026-27 (Current)', applicantsK: 1920, disbursedCr: 1240.85 }
  ];

  const pvtgCoverageData = [
    { tribe: 'Birhor (JH/OD)', target: 1200, reached: 1140 },
    { tribe: 'Dongria Kondh (OD)', target: 2400, reached: 2310 },
    { tribe: 'Baiga (MP/CG)', target: 3800, reached: 3520 },
    { tribe: 'Chenchu (AP/TG)', target: 1600, reached: 1540 },
    { tribe: 'Asur (JH)', target: 950, reached: 890 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#123C32]">
            National Analytics & Inclusion Index
          </h1>
          <p className="text-xs sm:text-sm text-[#576562] mt-0.5">
            Macro trends, gender parity in tribal education, and saturation across 75 PVTG communities.
          </p>
        </div>

        <button
          onClick={() => alert('Analytics dossier downloaded.')}
          className="px-4 py-2 bg-[#123C32] hover:bg-[#0A241E] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-[#E8B84A]" />
          <span>Download Policy Whitepaper (PDF)</span>
        </button>
      </div>

      {/* Top 3 KPI Callouts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E2DDD2] shadow-xs">
          <span className="text-[11px] font-bold text-[#C86B43] uppercase tracking-wider block">
            Female Scholar Share
          </span>
          <div className="font-heading font-black text-3xl text-[#C86B43] mt-1">
            52.4%
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">
            Historic milestone in tribal higher education
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2DDD2] shadow-xs">
          <span className="text-[11px] font-bold text-[#123C32] uppercase tracking-wider block">
            PVTG Inclusion Index
          </span>
          <div className="font-heading font-black text-3xl text-[#123C32] mt-1">
            94.1%
          </div>
          <div className="text-[11px] text-[#576562] mt-1">
            184,500 PVTG students funded
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2DDD2] shadow-xs">
          <span className="text-[11px] font-bold text-[#576562] uppercase tracking-wider block">
            National Leakage Reduction
          </span>
          <div className="font-heading font-black text-3xl text-emerald-800 mt-1">
            100%
          </div>
          <div className="text-[11px] text-[#576562] mt-1">
            Zero cash / intermediary handling
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Year over Year Growth */}
        <div className="lg:col-span-8 bg-white p-5 sm:p-6 rounded-3xl border border-[#E2DDD2] shadow-xs space-y-4">
          <h3 className="font-heading font-bold text-base text-[#123C32]">
            4-Year Growth in ST Scholarship Reach
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yoyGrowthData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2DDD2" />
                <XAxis dataKey="year" stroke="#576562" fontSize={12} tickLine={false} />
                <YAxis stroke="#576562" fontSize={12} tickLine={false} tickFormatter={(v) => `${v}k`} />
                <Tooltip contentStyle={{ borderRadius: '12px' }} />
                <Bar dataKey="applicantsK" fill="#123C32" name="Applicants (Thousands)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Gender Ratio Pie */}
        <div className="lg:col-span-4 bg-white p-5 sm:p-6 rounded-3xl border border-[#E2DDD2] shadow-xs space-y-4">
          <h3 className="font-heading font-bold text-base text-[#123C32]">
            Gender Parity Index
          </h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: any) => [`${val}%`, 'Share']} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[#576562]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C86B43]" /> Female Scholars
              </span>
              <span className="font-bold">52%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[#576562]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#123C32]" /> Male Scholars
              </span>
              <span className="font-bold">48%</span>
            </div>
          </div>
        </div>
      </div>

      {/* PVTG Coverage Saturation Table */}
      <div className="bg-white rounded-3xl border border-[#E2DDD2] shadow-xs overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-heading font-bold text-base text-[#123C32]">
            Priority PVTG Saturation Index
          </h3>
          <span className="text-xs text-[#123C32] font-bold">PM-PVTG Mission Alignment</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F3] border-b border-[#E2DDD2] text-[11px] font-bold uppercase text-[#576562]">
              <tr>
                <th className="py-3 px-4">PVTG Community</th>
                <th className="py-3 px-4">Eligible Cohort Target</th>
                <th className="py-3 px-4">Scholars Reached</th>
                <th className="py-3 px-4">Saturation %</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[#17221F]">
              {pvtgCoverageData.map((item, i) => (
                <tr key={i} className="hover:bg-gray-50/80">
                  <td className="py-3.5 px-4 font-bold text-[#123C32]">{item.tribe}</td>
                  <td className="py-3.5 px-4">{item.target.toLocaleString('en-IN')}</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-800">{item.reached.toLocaleString('en-IN')}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold">{Math.round((item.reached / item.target) * 100)}%</span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full text-[10px] border border-emerald-200">
                      Target Achieved ✓
                    </span>
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
