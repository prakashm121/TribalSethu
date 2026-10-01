import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  Clock, 
  Download,
  Building,
  Check
} from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Application } from '../../types';

export const AdminApplicationsPage: React.FC = () => {
  const { applications } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedScheme, setSelectedScheme] = useState('All');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const schemes = ['All', 'TOP_CLASS', 'POST_MATRIC', 'PRE_MATRIC', 'NFST_FELLOWSHIP', 'NOS_OVERSEAS'];

  const filtered = applications.filter((app) => {
    const matchesScheme = selectedScheme === 'All' || app.schemeCode === selectedScheme;
    const matchesSearch = app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.schemeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.institutionName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesScheme && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#123C32]">
            Central Applications Registry
          </h1>
          <p className="text-xs sm:text-sm text-[#576562] mt-0.5">
            Unified pool of Scheduled Tribe scholarship dossiers across all five Ministry schemes.
          </p>
        </div>

        <button
          onClick={() => alert('Applications batch exported to CSV.')}
          className="px-4 py-2 bg-white hover:bg-gray-50 border border-[#E2DDD2] text-xs font-bold text-[#123C32] rounded-xl flex items-center gap-1.5 shadow-2xs self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export All Applications (CSV)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E2DDD2] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ID, institution..."
            className="w-full bg-[#F7F5EF] border border-[#E2DDD2] rounded-xl pl-9 pr-3.5 py-2 text-xs sm:text-sm focus:border-[#123C32] focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {schemes.map((sc) => (
            <button
              key={sc}
              onClick={() => setSelectedScheme(sc)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedScheme === sc
                  ? 'bg-[#123C32] text-white shadow-2xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {sc.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-3xl border border-[#E2DDD2] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F3] border-b border-[#E2DDD2] text-[11px] font-bold uppercase text-[#576562]">
              <tr>
                <th className="py-3.5 px-4">Application ID</th>
                <th className="py-3.5 px-4">Scheme Name</th>
                <th className="py-3.5 px-4">Institution & Course</th>
                <th className="py-3.5 px-4">Submission Date</th>
                <th className="py-3.5 px-4">Sanction Amount</th>
                <th className="py-3.5 px-4">Status & Stage</th>
                <th className="py-3.5 px-4 text-right">Review</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[#17221F]">
              {filtered.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#123C32]">
                    {app.id}
                  </td>
                  <td className="py-3.5 px-4 font-bold">
                    {app.schemeName}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-[#17221F]">{app.institutionName}</div>
                    <div className="text-[10px] text-[#576562]">{app.courseName}</div>
                  </td>
                  <td className="py-3.5 px-4 text-[#576562]">
                    {app.submissionDate}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#123C32]">
                    ₹{app.sanctionedAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={app.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedApp(app)}
                      className="px-3 py-1 bg-gray-100 hover:bg-[#123C32] hover:text-white text-gray-800 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Dossier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Dossier Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-[#E2DDD2] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <span className="font-mono text-xs font-bold text-[#123C32] bg-[#123C32]/10 px-2 py-0.5 rounded">
                  {selectedApp.id}
                </span>
                <h3 className="font-heading font-bold text-base text-[#123C32] mt-1">
                  {selectedApp.schemeName}
                </h3>
              </div>
              <button onClick={() => setSelectedApp(null)} className="text-gray-400">✕</button>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#E2DDD2] text-xs space-y-2">
              <div>Institution: <strong>{selectedApp.institutionName}</strong></div>
              <div>Course: <strong>{selectedApp.courseName}</strong></div>
              <div>Current Stage: <strong>{selectedApp.currentStage}</strong></div>
              <div>Sanction Amount: <strong className="text-[#123C32]">₹{selectedApp.sanctionedAmount.toLocaleString('en-IN')}</strong></div>
              <div>Last Status Note: <span className="text-[#576562]">{selectedApp.nextAction}</span></div>
            </div>

            <div className="pt-2 flex justify-end gap-2 text-xs">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 bg-gray-200 rounded-xl font-bold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Application ${selectedApp.id} cleared for sanction order.`);
                  setSelectedApp(null);
                }}
                className="px-4 py-2 bg-[#123C32] text-white rounded-xl font-bold"
              >
                Approve Sanction
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
