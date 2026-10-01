import React, { useState } from 'react';
import { 
  Radar, 
  Users, 
  Building, 
  Send, 
  Download, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  MapPin, 
  Sparkles,
  ArrowRight
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
import { MOCK_OUTREACH_TARGETS } from '../../data/mockData';

export const AdminOutreachPage: React.FC = () => {
  const [outreachTargets, setOutreachTargets] = useState(MOCK_OUTREACH_TARGETS);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const stateGapData = [
    { state: 'Odisha', gap: 5421 },
    { state: 'Jharkhand', gap: 4103 },
    { state: 'Chhattisgarh', gap: 3812 },
    { state: 'Madhya Pradesh', gap: 2932 },
    { state: 'Assam & NE', gap: 2153 }
  ];

  const handleAction = (type: string) => {
    if (type === 'sms') {
      setActionNotice('SMS Broadcast Queued: 18,421 prospective ST scholars will receive bilingual scheme alerts via Telecom Gateway.');
    } else if (type === 'camp') {
      setActionNotice('Field Camp Schedule Planned: 48 mobile enrollment vans dispatched to Mayurbhanj and West Singhbhum.');
    } else if (type === 'export') {
      setActionNotice('Report Exported: "Outreach_Saturation_Index_Q3_2026.xlsx" generated.');
    } else {
      setActionNotice('Outreach List Generated: High-priority institutions assigned to respective District Welfare Officers.');
    }

    setTimeout(() => setActionNotice(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#123C32]">
              Scholarship Outreach Radar
            </h1>
            <span className="text-xs bg-[#C86B43]/10 text-[#C86B43] border border-[#C86B43]/30 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Radar className="w-3.5 h-3.5" /> 100% Saturation Engine
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#576562] mt-0.5">
            Identify institutions where eligible ST students may be underrepresented in scholarship applications.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => handleAction('list')}
            className="px-3.5 py-2 bg-[#123C32] hover:bg-[#0A241E] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Generate Outreach List
          </button>
          <button
            onClick={() => handleAction('sms')}
            className="px-3.5 py-2 bg-[#C86B43] hover:bg-[#b55b35] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send SMS Alert</span>
          </button>
          <button
            onClick={() => handleAction('camp')}
            className="px-3.5 py-2 bg-white hover:bg-gray-50 border border-[#E2DDD2] text-[#17221F] text-xs font-bold rounded-xl shadow-2xs transition-colors cursor-pointer"
          >
            Plan Field Visit
          </button>
          <button
            onClick={() => handleAction('export')}
            className="px-3.5 py-2 bg-white hover:bg-gray-50 border border-[#E2DDD2] text-[#17221F] text-xs font-bold rounded-xl shadow-2xs transition-colors cursor-pointer"
          >
            Export Report
          </button>
        </div>
      </div>

      {actionNotice && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 rounded-2xl font-semibold flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Top 2 Outreach Core Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border-2 border-rose-300 shadow-xs">
          <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider block">
            Potential Students Not Reached
          </span>
          <div className="font-heading font-black text-3xl text-rose-900 mt-1">
            18,421
          </div>
          <div className="text-[11px] text-[#576562] mt-1">
            Enrolled in AISHE but zero application lodged
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border-2 border-amber-300 shadow-xs">
          <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
            High-Priority Institutions
          </span>
          <div className="font-heading font-black text-3xl text-amber-900 mt-1">
            2,184
          </div>
          <div className="text-[11px] text-[#576562] mt-1">
            Over 30% ST enrollment gap detected
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2DDD2] shadow-xs">
          <span className="text-[11px] font-bold text-[#576562] uppercase tracking-wider block">
            Outreach Coverage Ratio
          </span>
          <div className="font-heading font-black text-3xl text-emerald-800 mt-1">
            81.2%
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">
            Targeting 100% saturation by Dec 2026
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2DDD2] shadow-xs">
          <span className="text-[11px] font-bold text-[#576562] uppercase tracking-wider block">
            Mobile Field Camps Conducted
          </span>
          <div className="font-heading font-black text-3xl text-[#123C32] mt-1">
            142
          </div>
          <div className="text-[11px] text-[#576562] mt-1">
            In remote ITDA / EMRS blocks
          </div>
        </div>
      </div>

      {/* Chart: Unreached ST Students by State */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#E2DDD2] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-base text-[#123C32]">
              Unreached ST Students by State
            </h3>
            <p className="text-xs text-[#576562]">
              Gap between estimated eligible ST student enrollments and applications received.
            </p>
          </div>
          <span className="text-xs font-bold text-rose-800 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
            Total Gap: 18,421
          </span>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stateGapData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2DDD2" />
              <XAxis dataKey="state" stroke="#576562" fontSize={12} tickLine={false} />
              <YAxis stroke="#576562" fontSize={12} tickLine={false} />
              <Tooltip
                formatter={(val: any) => [`${Number(val).toLocaleString('en-IN')} Students`, 'Outreach Gap']}
                contentStyle={{ borderRadius: '12px', border: '1px solid #E2DDD2' }}
              />
              <Bar dataKey="gap" fill="#C86B43" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* High Priority District Targets Table */}
      <div className="bg-white rounded-3xl border border-[#E2DDD2] shadow-xs overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-base text-[#123C32]">
              Priority District Intervention Matrix
            </h3>
            <p className="text-xs text-[#576562]">
              Target districts mapped for door-to-door tribal welfare mobilization.
            </p>
          </div>
          <span className="text-xs text-[#123C32] font-bold">5 High-Intensity Hubs</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F3] border-b border-[#E2DDD2] text-[11px] font-bold uppercase text-[#576562]">
              <tr>
                <th className="py-3 px-4">State & District</th>
                <th className="py-3 px-4">Institutions</th>
                <th className="py-3 px-4">Estimated Eligible</th>
                <th className="py-3 px-4">Actual Applications</th>
                <th className="py-3 px-4">Outreach Gap</th>
                <th className="py-3 px-4">Priority Level</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[#17221F]">
              {outreachTargets.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#123C32]">{item.district}</div>
                    <div className="text-[11px] text-[#576562]">{item.state}</div>
                  </td>
                  <td className="py-3.5 px-4 font-bold">{item.institutionCount}</td>
                  <td className="py-3.5 px-4">{item.estimatedEligibleSt.toLocaleString('en-IN')}</td>
                  <td className="py-3.5 px-4">{item.actualApplications.toLocaleString('en-IN')}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-rose-700">
                      +{item.outreachGap.toLocaleString('en-IN')}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.priorityLevel === 'Critical'
                        ? 'bg-rose-100 text-rose-900 border border-rose-300'
                        : item.priorityLevel === 'High'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-blue-100 text-blue-900'
                    }`}>
                      {item.priorityLevel}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleAction('sms')}
                      className="px-3 py-1 bg-[#123C32] hover:bg-[#0A241E] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Trigger Nudge
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
