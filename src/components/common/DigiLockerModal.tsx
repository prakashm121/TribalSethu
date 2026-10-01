import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ShieldCheck, 
  FileCheck2, 
  CheckCircle, 
  Lock, 
  Loader2,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';

export const DigiLockerModal: React.FC = () => {
  const { isDigiLockerModalOpen, closeDigiLockerModal, fetchDigiLockerDocuments, resolveDeficiency, student } = useAppStore();
  const [selectedDocs, setSelectedDocs] = useState<string[]>([
    'ST_CERTIFICATE',
    'INCOME_CERTIFICATE',
    'DOMICILE_CERTIFICATE',
    'MARKSHEET_PREV'
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'selection' | 'fetching' | 'success'>('selection');

  if (!isDigiLockerModalOpen) return null;

  const availableDocs = [
    {
      id: 'ST_CERTIFICATE',
      title: 'Scheduled Tribe Community Certificate',
      issuer: 'Govt. of Odisha (e-District)',
      docNumber: 'E-ST/2021/48902',
      badge: 'Authenticated'
    },
    {
      id: 'INCOME_CERTIFICATE',
      title: 'Annual Income Certificate (FY 2026-27 Renewal)',
      issuer: 'Tahasildar Hemgir, Sundargarh',
      docNumber: 'INC/OD/SNG/2026/0991',
      badge: 'Fresh Renewal Available ✨'
    },
    {
      id: 'DOMICILE_CERTIFICATE',
      title: 'Permanent Resident / Domicile Certificate',
      issuer: 'Govt. of Odisha e-Pramaan',
      docNumber: 'DOM/OD/2021/33891',
      badge: 'Lifetime Valid'
    },
    {
      id: 'MARKSHEET_PREV',
      title: 'Senior School Certificate (Class XII CBSE)',
      issuer: 'Central Board of Secondary Education',
      docNumber: 'CBSE/2022/94129',
      badge: '91.4% Verified'
    }
  ];

  const handleToggleDoc = (id: string) => {
    if (selectedDocs.includes(id)) {
      setSelectedDocs(selectedDocs.filter((d) => d !== id));
    } else {
      setSelectedDocs([...selectedDocs, id]);
    }
  };

  const handleImport = async () => {
    setIsProcessing(true);
    setStep('fetching');

    // Simulate API Setu authentication and DigiLocker doc extraction
    setTimeout(() => {
      // Also resolve income deficiency if selected
      if (selectedDocs.includes('INCOME_CERTIFICATE')) {
        resolveDeficiency('def-1', 'digilocker');
      }
      fetchDigiLockerDocuments(selectedDocs);
      setStep('success');

      setTimeout(() => {
        setIsProcessing(false);
        setStep('selection');
        closeDigiLockerModal();
      }, 1200);
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#E2DDD2]"
        >
          {/* DigiLocker Header */}
          <div className="bg-[#002D62] text-white p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-xs">
                <span className="text-[#002D62] font-black text-lg">DL</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base tracking-wide">DigiLocker India</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-emerald-400/30">
                    Official API Setu
                  </span>
                </div>
                <p className="text-xs text-blue-200">National Digital Public Infrastructure Gateway</p>
              </div>
            </div>
            <button
              onClick={closeDigiLockerModal}
              disabled={isProcessing}
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6">
            {step === 'selection' && (
              <>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                  <div>
                    <h3 className="text-base font-bold text-[#123C32]">Consent to Fetch Credentials</h3>
                    <p className="text-xs text-[#576562]">
                      Authenticated for <strong className="text-[#17221F]">{student.fullName}</strong> ({student.aadhaarNumberMasked})
                    </p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> 4 Documents Found
                  </span>
                </div>

                <p className="text-xs text-[#576562] mb-3">
                  Select documents to pull directly into your unified scholarship wallet. Digital signatures will be automatically authenticated:
                </p>

                <div className="space-y-2.5 max-h-[280px] overflow-y-auto pr-1">
                  {availableDocs.map((doc) => {
                    const isSelected = selectedDocs.includes(doc.id);
                    return (
                      <div
                        key={doc.id}
                        onClick={() => handleToggleDoc(doc.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                          isSelected
                            ? 'bg-[#123C32]/5 border-[#123C32] shadow-xs'
                            : 'bg-white border-gray-200 hover:border-gray-300 opacity-70'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="mt-0.5 rounded text-[#123C32] focus:ring-[#123C32] w-4 h-4 cursor-pointer"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-semibold text-[#17221F] truncate">{doc.title}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${
                              doc.id === 'INCOME_CERTIFICATE' 
                                ? 'bg-amber-100 text-amber-900 border border-amber-300 font-bold'
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {doc.badge}
                            </span>
                          </div>
                          <div className="text-xs text-[#576562] mt-0.5 flex items-center justify-between">
                            <span>{doc.issuer}</span>
                            <span className="font-mono text-[11px]">{doc.docNumber}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5 p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
                  <Lock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <p>
                    <strong>Paperless & Tamper-Proof:</strong> Documents fetched via DigiLocker are legally recognized under IT Act 2000 Rule 9A and exempt you from manual physical verification.
                  </p>
                </div>
              </>
            )}

            {step === 'fetching' && (
              <div className="py-12 text-center">
                <Loader2 className="w-12 h-12 text-[#123C32] animate-spin mx-auto mb-4" />
                <h4 className="text-lg font-bold text-[#123C32]">Fetching from DigiLocker API...</h4>
                <p className="text-sm text-[#576562] mt-1 max-w-sm mx-auto">
                  Validating digital certificates against Odisha e-District and CBSE state servers.
                </p>
              </div>
            )}

            {step === 'success' && (
              <div className="py-10 text-center">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h4 className="text-lg font-bold text-[#123C32]">4 Documents Synced!</h4>
                <p className="text-sm text-[#576562] mt-1">
                  Income Certificate renewal verified. Pending deficiency has been resolved!
                </p>
              </div>
            )}
          </div>

          {/* Footer Controls */}
          {step === 'selection' && (
            <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-100">
              <span className="text-xs text-[#82918D] flex items-center gap-1">
                <ExternalLink className="w-3.5 h-3.5" /> DigiLocker 2.0 Integration
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={closeDigiLockerModal}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleImport}
                  disabled={selectedDocs.length === 0}
                  className="px-5 py-2 text-sm bg-[#123C32] hover:bg-[#0A241E] text-white rounded-lg transition-colors font-semibold shadow-sm flex items-center gap-2 disabled:opacity-50"
                >
                  <RefreshCw className="w-4 h-4" /> Import {selectedDocs.length} Documents
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
