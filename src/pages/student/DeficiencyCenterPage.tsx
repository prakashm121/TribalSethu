import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  Upload, 
  Building, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  HelpCircle,
  FileCheck2
} from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';
import { StatusBadge } from '../../components/common/StatusBadge';

export const DeficiencyCenterPage: React.FC = () => {
  const { deficiencies, resolveDeficiency, openDigiLockerModal } = useAppStore();
  const [resolvingId, setResolvingId] = useState<string | null>(null);

  const openList = deficiencies.filter((d) => d.status === 'Open');
  const resolvedList = deficiencies.filter((d) => d.status === 'Resolved');

  const handleManualResolve = (id: string) => {
    setResolvingId(id);
    setTimeout(() => {
      resolveDeficiency(id, 'upload');
      setResolvingId(null);
    }, 900);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#123C32]">
            Deficiency & Clarification Center
          </h1>
          {openList.length > 0 && (
            <span className="text-xs bg-amber-100 text-amber-900 border border-amber-300 font-bold px-2 py-0.5 rounded-full">
              {openList.length} Pending Action
            </span>
          )}
        </div>
        <p className="text-xs sm:text-sm text-[#576562] mt-0.5">
          Clear official remarks and renewal requests without application cancellation or delay.
        </p>
      </div>

      {/* Philosophy Banner */}
      <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E2DDD2] flex items-start gap-3 text-xs">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold text-[#17221F]">
            Guaranteed Non-Rejection Policy:
          </span>
          <p className="text-[#576562] leading-relaxed">
            In TribalSetu, an expired document or spelling mismatch is presented as a deficiency for review, not an automatic rejection. Applicants can provide an updated document or clarification according to the applicable scheme rules.
          </p>
        </div>
      </div>

      {/* Active Deficiencies */}
      <div className="space-y-4">
        <h3 className="font-heading font-bold text-base text-[#123C32] flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-700" />
          <span>Active Deficiencies Requiring Resolution ({openList.length})</span>
        </h3>

        <AnimatePresence>
          {openList.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border-2 border-amber-300 p-6 sm:p-7 shadow-md space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
                      {item.schemeName}
                    </span>
                    <span className="font-mono text-xs text-[#576562]">App ID: {item.applicationId}</span>
                  </div>
                  <h2 className="font-heading font-black text-xl text-[#123C32] mt-1.5">
                    {item.title}
                  </h2>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-xl border border-rose-200 self-start sm:self-auto">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Deadline: {item.deadline}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-amber-950 space-y-2">
                <div>
                  <strong className="block text-xs uppercase tracking-wider text-amber-800">
                    Official Remark by {item.raisedBy}:
                  </strong>
                  <p className="mt-0.5 leading-relaxed font-medium">
                    "{item.reason}"
                  </p>
                </div>
                <div className="pt-2 border-t border-amber-200 text-xs text-amber-900">
                  <strong>Prescribed Action:</strong> {item.actionRequired}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={openDigiLockerModal}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#002D62] hover:bg-[#001D42] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4 text-[#E8B84A]" />
                  <span>Fetch Fresh Certificate from DigiLocker (Recommended)</span>
                </button>

                <button
                  onClick={() => handleManualResolve(item.id)}
                  disabled={resolvingId === item.id}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#123C32] hover:bg-[#0A241E] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <Upload className="w-4 h-4 text-[#E8B84A]" />
                  <span>{resolvingId === item.id ? 'Verifying Upload...' : 'Upload Scanned Tehsildar PDF'}</span>
                </button>

                <a
                  href="tel:1800117788"
                  className="w-full sm:w-auto px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl transition-colors text-center cursor-pointer"
                >
                  Contact Nodal Officer
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {openList.length === 0 && (
          <div className="bg-emerald-50/70 border-2 border-emerald-300 rounded-3xl p-8 text-center space-y-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="font-heading font-black text-xl text-emerald-950">
              All Deficiencies Resolved! 🎉
            </h4>
            <p className="text-xs text-emerald-800 max-w-sm mx-auto">
              Your scholarship applications are completely verified and in queue for final DBT sanction order release.
            </p>
          </div>
        )}
      </div>

      {/* Resolved History */}
      {resolvedList.length > 0 && (
        <div className="space-y-3 pt-6 border-t border-gray-100">
          <h3 className="font-heading font-bold text-sm text-[#82918D] uppercase tracking-wider">
            Cleared & Verified History ({resolvedList.length})
          </h3>

          {resolvedList.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-emerald-200 p-4 shadow-2xs flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#17221F]">{item.title}</h4>
                  <p className="text-[11px] text-[#576562]">
                    Renewed and authenticated with Odisha e-District. Sanction status restored.
                  </p>
                </div>
              </div>

              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Resolved
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
