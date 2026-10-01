import React, { useState } from 'react';
import { 
  Users, 
  FileText, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  TrendingUp, 
  ArrowUpRight, 
  MapPin, 
  Sparkles,
  Search,
  Filter
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  Legend 
} from 'recharts';
import { MOCK_ADMIN_METRICS } from '../../data/mockData';
import { Link } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>('Odisha');

  // Schemes breakdown chart data
  const schemeChartData = [
    { name: 'Post-Matric ST', apps: 1240, color: '#123C32' },
    { name: 'Pre-Matric ST', apps: 580, color: '#C86B43' },
    { name: 'Top Class ST', apps: 72, color: '#E8B84A' },
    { name: 'NFST Fellowship', apps: 24, color: '#1B5345' },
    { name: 'NOS Overseas', apps: 4, color: '#883C1B' }
  ];

  // State distribution data
  const stateDistributionData = [
    { state: 'Odisha', total: 342, verified: 310, pvtg: 48 },
    { state: 'Jharkhand', total: 312, verified: 285, pvtg: 36 },
    { state: 'Chhattisgarh', total: 289, verified: 260, pvtg: 42 },
    { state: 'Madhya Pradesh', total: 278, verified: 245, pvtg: 39 },
    { state: 'Assam & NE', total: 210, verified: 192, pvtg: 15 },
    { state: 'Maharashtra', total: 184, verified: 168, pvtg: 12 }
  ];

  // Monthly disbursement trend
  const trendData = [
    { month: 'Apr', amount: 85 },
    { month: 'May', amount: 140 },
    { month: 'Jun', amount: 195 },
    { month: 'Jul', amount: 260 },
    { month: 'Aug', amount: 310 },
    { month: 'Sep', amount: 250 }
  ];

  // Deficiency Category Pie Data
  const deficiencyPieData = [
    { name: 'Expired Income', value: 34, color: '#C86B43' },
    { name: 'Aadhaar Name Variation', value: 23, color: '#123C32' },
    { name: 'Bank IFSC / Inactive APB', value: 19, color: '#E8B84A' },
    { name: 'Enrollment Missing', value: 15, color: '#1B5345' },
    { name: 'Caste e-District Gap', value: 9, color: '#883C1B' }
  ];

  return (
    <div className="space-y-6">
      {/* Title & Official Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-[#E2DDD2] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#123C32]">
              MoTA Scholarship Command Center
            </h1>
            <span className="text-xs bg-[#123C32]/10 text-[#123C32] font-bold px-2 py-0.5 rounded-full">
              Live National Pulse
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#576562] mt-0.5">
            Real-time monitoring across 28 States, 8 UTs, and 48,920 affiliated educational institutions.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Link
            to="/admin/verification"
            className="px-4 py-2 bg-[#123C32] hover:bg-[#0A241E] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <span>Review Verification Queue</span>
            <span className="bg-[#E8B84A] text-[#123C32] px-1.5 py-0.2 rounded-full text-[10px]">5</span>
          </Link>
          <Link
            to="/admin/outreach"
            className="px-4 py-2 bg-[#C86B43] hover:bg-[#b25a33] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <span>Outreach Radar</span>
          </Link>
        </div>
      </div>

      {/* TOP 5 OFFICIAL METRIC CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Metric 1: Registered Students */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E2DDD2] shadow-xs">
          <span className="text-[11px] font-bold text-[#576562] uppercase tracking-wider block">
            Registered ST Students
          </span>
          <div className="font-heading font-black text-2xl sm:text-3xl text-[#123C32] mt-1">
            2.84M
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-0.5">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14.2% YoY</span>
          </div>
        </div>

        {/* Metric 2: Applications */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E2DDD2] shadow-xs">
          <span className="text-[11px] font-bold text-[#576562] uppercase tracking-wider block">
            Total Applications
          </span>
          <div className="font-heading font-black text-2xl sm:text-3xl text-[#17221F] mt-1">
            1.92M
          </div>
          <div className="text-[11px] text-[#576562] mt-1">
            Across 5 Central Schemes
          </div>
        </div>

        {/* Metric 3: Disbursed Amount */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E2DDD2] shadow-xs">
          <span className="text-[11px] font-bold text-[#C86B43] uppercase tracking-wider block">
            Disbursed via DBT
          </span>
          <div className="font-heading font-black text-2xl sm:text-3xl text-[#C86B43] mt-1">
            ₹1,240 Cr
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">
            99.1% PFMS Success
          </div>
        </div>

        {/* Metric 4: Verified Percentage */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E2DDD2] shadow-xs">
          <span className="text-[11px] font-bold text-[#576562] uppercase tracking-wider block">
            Verified Ratio
          </span>
          <div className="font-heading font-black text-2xl sm:text-3xl text-emerald-800 mt-1">
            87.4%
          </div>
          <div className="text-[11px] text-[#576562] mt-1">
            Automated AISHE Match
          </div>
        </div>

        {/* Metric 5: Pending Actions */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E2DDD2] shadow-xs col-span-2 lg:col-span-1">
          <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
            Pending Actions
          </span>
          <div className="font-heading font-black text-2xl sm:text-3xl text-amber-900 mt-1">
            14,208
          </div>
          <div className="text-[11px] text-amber-800 font-semibold mt-1">
            Average Turnaround: 3.2 Days
          </div>
        </div>
      </div>

      {/* CHARTS ROW 1: Applications by Scheme & Monthly DBT Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Applications by Scheme (BarChart) */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-3xl border border-[#E2DDD2] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-base text-[#123C32]">
                Applications by Central Scheme
              </h3>
              <p className="text-xs text-[#576562]">
                Volume in thousands (k) across the five unified portals.
              </p>
            </div>
            <span className="text-xs font-bold text-[#123C32] bg-[#123C32]/10 px-2 py-0.5 rounded">
              FY 2026-27
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={schemeChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2DDD2" />
                <XAxis dataKey="name" stroke="#576562" fontSize={11} tickLine={false} />
                <YAxis stroke="#576562" fontSize={11} tickLine={false} tickFormatter={(v) => `${v}k`} />
                <Tooltip
                  formatter={(val: any) => [`${val}k Applications`, 'Scheme Total']}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #E2DDD2' }}
                />
                <Bar dataKey="apps" fill="#123C32" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Monthly DBT Trend (LineChart) */}
        <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-3xl border border-[#E2DDD2] shadow-xs space-y-4">
          <div>
            <h3 className="font-heading font-bold text-base text-[#123C32]">
              DBT Disbursement Velocity
            </h3>
            <p className="text-xs text-[#576562]">
              Monthly release volume in ₹ Crores via PFMS gateway.
            </p>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2DDD2" />
                <XAxis dataKey="month" stroke="#576562" fontSize={12} tickLine={false} />
                <YAxis stroke="#576562" fontSize={12} tickLine={false} tickFormatter={(v) => `₹${v}Cr`} />
                <Tooltip
                  formatter={(val: any) => [`₹${val} Crores`, 'Disbursed']}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #E2DDD2' }}
                />
                <Line type="monotone" dataKey="amount" stroke="#C86B43" strokeWidth={3} dot={{ r: 4, fill: '#C86B43' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* CHARTS ROW 2: Stylized India Map Coverage & Deficiency Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Stylized Map Coverage Visualization */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-3xl border border-[#E2DDD2] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-base text-[#123C32]">
                State-wise ST Scholarship Coverage
              </h3>
              <p className="text-xs text-[#576562]">
                Interactive geographic distribution across major tribal belts.
              </p>
            </div>
            <span className="text-xs text-[#C86B43] font-bold">
              Selected: <strong>{selectedState}</strong>
            </span>
          </div>

          {/* Interactive State Coverage Grid & Stylized Graphic */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            {stateDistributionData.map((st) => (
              <div
                key={st.state}
                onClick={() => setSelectedState(st.state)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  selectedState === st.state
                    ? 'border-[#123C32] bg-[#123C32]/5 shadow-xs'
                    : 'border-[#E2DDD2] hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-[#17221F]">{st.state}</span>
                  <MapPin className={`w-3.5 h-3.5 ${selectedState === st.state ? 'text-[#123C32]' : 'text-gray-400'}`} />
                </div>
                <div className="font-heading font-black text-lg text-[#123C32]">
                  {st.total}k <span className="text-[11px] font-normal text-[#576562]">apps</span>
                </div>
                <div className="text-[10px] text-emerald-700 font-medium mt-0.5">
                  ✓ {st.verified}k verified • {st.pvtg}k PVTG
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-[#FAF8F3] rounded-xl border border-[#E2DDD2] text-xs text-[#576562] flex items-center justify-between">
            <span>Special Focus: 75 Particularly Vulnerable Tribal Groups (PVTGs)</span>
            <Link to="/admin/outreach" className="text-[#123C32] font-bold hover:underline">
              Open Outreach Radar →
            </Link>
          </div>
        </div>

        {/* Right: Deficiency Category Breakdown (PieChart) */}
        <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-3xl border border-[#E2DDD2] shadow-xs space-y-4">
          <div>
            <h3 className="font-heading font-bold text-base text-[#123C32]">
              Deficiency Categories Breakdown
            </h3>
            <p className="text-xs text-[#576562]">
              Root causes for delayed verification across pending cases.
            </p>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deficiencyPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {deficiencyPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: any) => [`${val}%`, 'Incidence']} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-xs">
            {deficiencyPieData.map((d, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-[#576562]">{d.name}</span>
                </div>
                <span className="font-bold text-[#17221F]">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
