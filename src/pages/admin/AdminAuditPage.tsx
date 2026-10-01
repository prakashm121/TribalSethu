import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  Lock, 
  Key, 
  CheckCircle2, 
  Filter, 
  FileText,
  Clock,
  Download
} from 'lucide-react';
import { MOCK_AUDIT_LOGS } from '../../data/mockData';

export const AdminAuditPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [logs] = useState(MOCK_AUDIT_LOGS);

  const filtered = logs.filter((log) =>
    log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.targetId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#123C32]">
            Immutable Audit Trail & System Security
          </h1>
          <p className="text-xs sm:text-sm text-[#576562] mt-0.5">
            Every verification, sanction order, and fund disbursement is cryptographically hashed for complete accountability.
          </p>
        </div>

        <button
          onClick={() => alert('Audit ledger signed and exported.')}
          className="px-4 py-2 bg-white hover:bg-gray-50 border border-[#E2DDD2] text-xs font-bold text-[#123C32] rounded-xl flex items-center gap-1.5 shadow-2xs self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Cryptographic Ledger</span>
        </button>
      </div>

      {/* Security Principles Banner */}
      <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E2DDD2] flex items-start gap-3 text-xs">
        <Lock className="w-5 h-5 text-[#123C32] shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold text-[#123C32]">
            Statutory Accountability Standards:
          </span>
          <p className="text-[#576562] leading-relaxed">
            All administrative decisions, official verifications, and PFMS transfers are timestamped with digital certificates. Any tampering invalidates the hash chain and alerts the National Informatics Centre (NIC) Security Operations Centre.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E2DDD2] shadow-xs flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by actor, action, or target ID..."
            className="w-full bg-[#F7F5EF] border border-[#E2DDD2] rounded-xl pl-9 pr-3.5 py-2 text-xs sm:text-sm focus:border-[#123C32] focus:outline-hidden"
          />
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-3xl border border-[#E2DDD2] shadow-xs overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-heading font-bold text-base text-[#123C32]">
            Official Action Ledger (SHA-256 Verified)
          </h3>
          <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Chain Validated ✓
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F3] border-b border-[#E2DDD2] text-[11px] font-bold uppercase text-[#576562]">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Actor & Official Role</th>
                <th className="py-3 px-4">Action Type</th>
                <th className="py-3 px-4">Target Reference</th>
                <th className="py-3 px-4">Event Details</th>
                <th className="py-3 px-4">IP Address</th>
                <th className="py-3 px-4 text-right">Integrity Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[#17221F]">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50/80">
                  <td className="py-3.5 px-4 font-mono text-[#576562] whitespace-nowrap">{log.timestamp}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#123C32]">{log.actor}</div>
                    <div className="text-[10px] text-[#576562]">{log.role}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="bg-[#F7F5EF] text-[#123C32] px-2 py-0.5 rounded font-mono font-bold text-[10px] border border-gray-200">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold">{log.targetId}</td>
                  <td className="py-3.5 px-4 text-[#576562] max-w-xs">{log.details}</td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-[#82918D]">{log.ipAddress}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="font-mono text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {log.integrityHash}
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
