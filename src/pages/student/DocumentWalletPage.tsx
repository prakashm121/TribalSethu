import React, { useState } from 'react';
import { 
  FolderLock, 
  RefreshCw, 
  Upload, 
  FileCheck2, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  ShieldCheck,
  Search,
  Filter
} from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';
import { StatusBadge } from '../../components/common/StatusBadge';
import { DocumentItem } from '../../types';

export const DocumentWalletPage: React.FC = () => {
  const { documents, openDigiLockerModal, resolveDeficiency } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);

  const statuses = ['All', 'Verified', 'Needs Attention', 'Pending'];

  const filteredDocs = documents.filter((doc) => {
    const matchesStatus = statusFilter === 'All' || doc.status.toLowerCase().includes(statusFilter.toLowerCase());
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.docNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#123C32]">
            My Digital Document Wallet
          </h1>
          <p className="text-xs sm:text-sm text-[#576562] mt-0.5">
            Encrypted personal vault integrated with DigiLocker and State e-Pramaan services.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={openDigiLockerModal}
            className="px-4 py-2.5 bg-[#002D62] hover:bg-[#001D42] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 text-[#E8B84A]" />
            <span>Fetch from DigiLocker</span>
          </button>
        </div>
      </div>

      {/* Info Strip */}
      <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E2DDD2] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-[#17221F]">
            Documents in this wallet are <strong>automatically reused</strong> across Pre-Matric, Post-Matric, and Top Class schemes.
          </span>
        </div>
        <span className="text-[11px] text-[#82918D] shrink-0 font-medium">
          IT Act 2000 Rule 9A Certified
        </span>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl border border-[#E2DDD2] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search documents by name, issuer..."
            className="w-full bg-[#F7F5EF] border border-[#E2DDD2] rounded-xl pl-9 pr-3.5 py-2 text-xs sm:text-sm focus:border-[#123C32] focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
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

      {/* Document Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className={`bg-white rounded-2xl border p-5 shadow-xs flex flex-col justify-between transition-all ${
              doc.status === 'Needs Attention'
                ? 'border-amber-300 ring-2 ring-amber-100'
                : 'border-[#E2DDD2] hover:shadow-md'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 uppercase">
                  {doc.source}
                </span>
                <StatusBadge status={doc.status} size="sm" />
              </div>

              <h3 className="font-heading font-bold text-base text-[#123C32] mb-1 leading-snug">
                {doc.title}
              </h3>
              <p className="text-xs text-[#576562] mb-3">
                {doc.issuer}
              </p>

              <div className="bg-[#FAF8F3] p-3 rounded-xl border border-[#E2DDD2] space-y-1.5 text-xs font-mono text-[#17221F] mb-3">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#82918D] font-sans">Doc No:</span>
                  <span className="truncate max-w-[170px]">{doc.docNumber}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#82918D] font-sans">Issue Date:</span>
                  <span>{doc.issueDate}</span>
                </div>
                {doc.expiryDate && (
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#82918D] font-sans">Expiry:</span>
                    <span className={doc.status === 'Needs Attention' ? 'text-amber-800 font-bold' : ''}>
                      {doc.expiryDate}
                    </span>
                  </div>
                )}
              </div>

              {doc.remarks && (
                <p className={`text-[11px] leading-tight mb-3 ${
                  doc.status === 'Needs Attention' ? 'text-amber-950 font-semibold' : 'text-[#82918D]'
                }`}>
                  {doc.remarks}
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-[#82918D]">{doc.fileSize}</span>
              <div className="flex items-center gap-2">
                {doc.status === 'Needs Attention' ? (
                  <button
                    onClick={openDigiLockerModal}
                    className="px-3 py-1.5 bg-[#C86B43] hover:bg-[#b55b35] text-white rounded-lg font-bold transition-colors shadow-2xs cursor-pointer flex items-center gap-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Renew</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setPreviewDoc(doc)}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-[#17221F] rounded-lg font-bold transition-colors cursor-pointer"
                  >
                    View
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Document Quick Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-[#E2DDD2] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-heading font-bold text-base text-[#123C32]">
                {previewDoc.title}
              </h3>
              <button
                onClick={() => setPreviewDoc(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="p-4 bg-[#FAF8F3] rounded-2xl border border-[#E2DDD2] space-y-2 text-xs">
              <div>Issuer: <strong>{previewDoc.issuer}</strong></div>
              <div>Document Number: <strong className="font-mono">{previewDoc.docNumber}</strong></div>
              <div>Digital Source: <strong>{previewDoc.source}</strong></div>
              <div>Security Verification: <strong className="text-emerald-700">SHA-256 e-Signed ✓</strong></div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-5 py-2 bg-[#123C32] text-white text-xs font-bold rounded-xl"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
