import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Search, 
  Filter, 
  PlusCircle, 
  ChevronRight, 
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';
import { StatusBadge } from '../../components/common/StatusBadge';

export const StudentApplicationsPage: React.FC = () => {
  const { applications } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const statuses = ['All', 'Submitted', 'Under Review', 'Deficiency', 'Sanctioned', 'Disbursed'];

  const filtered = applications.filter((app) => {
    const matchesStatus = statusFilter === 'All' || app.status.toLowerCase().includes(statusFilter.toLowerCase());
    const matchesSearch = app.schemeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.institutionName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#123C32]">
            My Scholarship Applications
          </h1>
          <p className="text-xs sm:text-sm text-[#576562] mt-0.5">
            Track and manage all your past and current ST scholarship submissions.
          </p>
        </div>

        <Link
          to="/student/apply"
          className="px-4 py-2.5 bg-[#123C32] hover:bg-[#0A241E] text-white text-xs font-bold rounded-xl shadow-sm transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 text-[#E8B84A]" />
          <span>Apply for New Scheme</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E2DDD2] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ID, scheme name..."
            className="w-full bg-[#F7F5EF] border border-[#E2DDD2] rounded-xl pl-9 pr-3.5 py-2 text-xs sm:text-sm focus:border-[#123C32] focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#123C32] text-white shadow-2xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filtered.map((app) => (
          <div
            key={app.id}
            className="bg-white rounded-2xl border border-[#E2DDD2] p-5 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#123C32] bg-[#123C32]/10 px-2 py-0.5 rounded">
                  {app.id}
                </span>
                <StatusBadge status={app.status} size="sm" />
                <span className="text-xs text-[#82918D]">Academic Year {app.academicYear}</span>
              </div>

              <div>
                <h3 className="font-heading font-bold text-base text-[#17221F]">
                  {app.schemeName}
                </h3>
                <p className="text-xs text-[#576562]">
                  {app.institutionName} • {app.courseName}
                </p>
              </div>

              <div className="text-xs text-[#576562] flex flex-wrap items-center gap-4 pt-1">
                <span>Sanctioned: <strong className="text-[#123C32]">₹{app.sanctionedAmount.toLocaleString('en-IN')}</strong></span>
                <span>Submitted: <strong>{app.submissionDate}</strong></span>
                <span>Last Updated: <strong>{app.lastUpdated}</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100">
              <Link
                to={`/student/applications/${app.id}`}
                className="px-4 py-2 bg-[#123C32] hover:bg-[#0A241E] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span>View Timeline & Slip</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-[#E2DDD2] p-12 text-center text-[#576562] space-y-3">
            <FileText className="w-10 h-10 text-gray-300 mx-auto" />
            <h4 className="font-heading font-bold text-base text-[#123C32]">No Applications Found</h4>
            <p className="text-xs max-w-sm mx-auto">
              No applications match your selected filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
