import React, { useState } from 'react';
import { 
  FileCheck2, 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Info,
  Check,
  X,
  Eye,
  Building
} from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';
import { VerificationItem } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';

export const AdminVerificationPage: React.FC = () => {
  const { verifications, updateVerificationStatus } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState<VerificationItem | null>(null);
  const [reviewNote, setReviewNote] = useState('');

  const sources = ['All', 'Aadhaar', 'DigiLocker', 'ST Certificate', 'Income Certificate', 'AISHE'];

  const filtered = verifications.filter((v) => {
    const matchesSource = sourceFilter === 'All' || v.verificationSource === sourceFilter;
    const matchesSearch = v.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          v.applicationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          v.schemeName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSource && matchesSearch;
  });

  const handleAction = (item: VerificationItem, action: 'Verified' | 'Mismatch' | 'Manual Review') => {
    updateVerificationStatus(item.id, action, reviewNote || item.notes);
    setSelectedItem(null);
    setReviewNote('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#123C32]">
            Official Verification Center
          </h1>
          <p className="text-xs sm:text-sm text-[#576562] mt-0.5">
            Automated and manual verification queue for ST credentials, enrollment, and income records.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300 px-3 py-1.5 rounded-xl">
            Non-Rejection Policy Active
          </span>
        </div>
      </div>

      {/* Policy Instruction Banner */}
      <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E2DDD2] flex items-start gap-3 text-xs">
        <Info className="w-5 h-5 text-[#123C32] shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold text-[#123C32]">
            Statutory Scrutiny Directive:
          </span>
          <p className="text-[#576562] leading-relaxed">
            A mismatch in spelling, minor demographic variations, or expired certificates must <strong>NOT</strong> trigger automated rejection. Flag as <strong>"Manual Review Required"</strong> and dispatch a deficiency resolution notice to the applicant with a 14-day clearance window.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E2DDD2] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by student name, ID..."
            className="w-full bg-[#F7F5EF] border border-[#E2DDD2] rounded-xl pl-9 pr-3.5 py-2 text-xs sm:text-sm focus:border-[#123C32] focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {sources.map((src) => (
            <button
              key={src}
              onClick={() => setSourceFilter(src)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                sourceFilter === src
                  ? 'bg-[#123C32] text-white shadow-2xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {src}
            </button>
          ))}
        </div>
      </div>

      {/* Verification Queue Table */}
      <div className="bg-white rounded-3xl border border-[#E2DDD2] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F3] border-b border-[#E2DDD2] text-[11px] font-bold uppercase text-[#576562]">
              <tr>
                <th className="py-3.5 px-4">Applicant & ID</th>
                <th className="py-3.5 px-4">Scheme</th>
                <th className="py-3.5 px-4">Verification Source</th>
                <th className="py-3.5 px-4">Field Tested</th>
                <th className="py-3.5 px-4">Match Score</th>
                <th className="py-3.5 px-4">Status & Risk</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[#17221F]">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#123C32]">{item.applicantName}</div>
                    <div className="font-mono text-[11px] text-[#82918D]">{item.applicationId}</div>
                    <div className="text-[10px] text-[#576562]">{item.institutionName}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-semibold">{item.schemeName}</span>
                    <div className="text-[10px] text-[#82918D]">{item.state}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="bg-[#F7F5EF] text-[#123C32] px-2 py-0.5 rounded font-bold border border-gray-200">
                      {item.verificationSource}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-medium text-[#17221F]">{item.fieldVerified}</div>
                    {item.notes && (
                      <div className="text-[10px] text-[#82918D] mt-0.5 line-clamp-1">{item.notes}</div>
                    )}
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 font-bold">
                      <div className="w-12 bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.matchScore > 80 ? 'bg-emerald-600' : 'bg-amber-500'}`}
                          style={{ width: `${item.matchScore}%` }}
                        />
                      </div>
                      <span>{item.matchScore}%</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="space-y-1">
                      <StatusBadge status={item.status} size="sm" />
                      <div className={`text-[10px] font-bold ${
                        item.riskLevel === 'Low' ? 'text-emerald-700' : 'text-amber-800'
                      }`}>
                        Risk: {item.riskLevel}
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleAction(item, 'Verified')}
                        title="Approve & Verify"
                        className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg border border-emerald-200 transition-colors cursor-pointer"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setReviewNote(item.notes || '');
                        }}
                        title="Add Review Note / Flag"
                        className="p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg border border-amber-200 transition-colors cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal Dialog */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-[#E2DDD2] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="font-heading font-bold text-base text-[#123C32]">
                  Review Item: {selectedItem.applicantName}
                </h3>
                <p className="text-xs text-[#576562]">
                  Source: {selectedItem.verificationSource} • {selectedItem.fieldVerified}
                </p>
              </div>
              <button onClick={() => setSelectedItem(null)} className="text-gray-400">✕</button>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#E2DDD2] text-xs space-y-1.5">
              <div>Current Match Score: <strong>{selectedItem.matchScore}%</strong></div>
              <div>System Remarks: <span className="text-[#576562]">{selectedItem.notes}</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#17221F] mb-1">
                Official Resolution Remarks / Notice to Student:
              </label>
              <textarea
                rows={3}
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#E2DDD2] text-xs"
                placeholder="Explain the required clarification or rationale for manual clearance..."
              />
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleAction(selectedItem, 'Manual Review')}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl"
              >
                Mark Manual Review Required
              </button>
              <button
                type="button"
                onClick={() => handleAction(selectedItem, 'Verified')}
                className="px-4 py-2 bg-[#123C32] hover:bg-[#0A241E] text-white font-bold rounded-xl"
              >
                Clear & Verify
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
