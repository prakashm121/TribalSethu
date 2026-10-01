import React, { useState } from 'react';
import { 
  Building, 
  Search, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  MapPin,
  Filter
} from 'lucide-react';
import { MOCK_INSTITUTIONS } from '../../data/mockData';

export const AdminInstitutionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [institutions, setInstitutions] = useState(MOCK_INSTITUTIONS);

  const filtered = institutions.filter((inst) =>
    inst.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inst.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inst.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#123C32]">
            AISHE & UDISE+ Institutions Directory
          </h1>
          <p className="text-xs sm:text-sm text-[#576562] mt-0.5">
            Directory of 48,920 accredited schools and universities with Nodal Officer verification backlogs.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs bg-[#123C32]/10 text-[#123C32] font-bold px-3 py-1.5 rounded-xl">
            AISHE Portal Integrated
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E2DDD2] shadow-xs flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by institute name, AISHE code (e.g. U-0361)..."
            className="w-full bg-[#F7F5EF] border border-[#E2DDD2] rounded-xl pl-9 pr-3.5 py-2 text-xs sm:text-sm focus:border-[#123C32] focus:outline-hidden"
          />
        </div>
      </div>

      {/* Institutions Table */}
      <div className="bg-white rounded-3xl border border-[#E2DDD2] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F3] border-b border-[#E2DDD2] text-[11px] font-bold uppercase text-[#576562]">
              <tr>
                <th className="py-3 px-4">AISHE Code</th>
                <th className="py-3 px-4">Institution Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">ST Enrolled</th>
                <th className="py-3 px-4">Applications</th>
                <th className="py-3 px-4">Backlog</th>
                <th className="py-3 px-4">Nodal Officer</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[#17221F]">
              {filtered.map((inst) => (
                <tr key={inst.id} className="hover:bg-gray-50/80">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#123C32]">{inst.code}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#17221F]">{inst.name}</div>
                    <div className="text-[10px] text-[#576562]">{inst.district}, {inst.state}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="bg-[#F7F5EF] px-2 py-0.5 rounded font-medium">{inst.category}</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold">{inst.totalStEnrolled}</td>
                  <td className="py-3.5 px-4">{inst.applicationsSubmitted}</td>
                  <td className="py-3.5 px-4">
                    <span className={`font-bold ${inst.verificationBacklog > 50 ? 'text-rose-700' : 'text-emerald-700'}`}>
                      {inst.verificationBacklog} pending
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold">{inst.nodalOfficerName}</div>
                    <div className="text-[10px] text-[#576562] font-mono">{inst.nodalOfficerPhone}</div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      inst.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                    }`}>
                      {inst.status}
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
