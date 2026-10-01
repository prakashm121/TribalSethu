import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  Printer, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Building2, 
  FileText, 
  FolderLock, 
  Sparkles,
  QrCode,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';
import { StatusBadge } from '../../components/common/StatusBadge';

export const ApplicationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { applications, student, documents } = useAppStore();
  const [printSuccess, setPrintSuccess] = useState(false);

  const application = applications.find((a) => a.id === id) || applications[0];

  const handlePrintSlip = () => {
    setPrintSuccess(true);
    setTimeout(() => {
      window.print();
      setPrintSuccess(false);
    }, 300);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Breadcrumb & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          to="/student/applications"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#123C32] hover:text-[#C86B43] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Applications</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrintSlip}
            className="px-4 py-2 bg-white hover:bg-gray-50 border border-[#E2DDD2] text-[#17221F] text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Acknowledgment</span>
          </button>
          <button
            onClick={handlePrintSlip}
            className="px-4 py-2 bg-[#123C32] hover:bg-[#0A241E] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#E8B84A]" />
            <span>Download PDF Slip</span>
          </button>
        </div>
      </div>

      {/* Main Application Summary Card */}
      <div className="bg-white rounded-3xl border border-[#E2DDD2] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="font-mono text-sm font-bold text-[#123C32] bg-[#123C32]/10 px-2.5 py-0.5 rounded-lg">
                {application.id}
              </span>
              <StatusBadge status={application.status} size="md" />
              <span className="text-xs text-[#82918D]">Academic Cycle {application.academicYear}</span>
            </div>
            <h1 className="font-heading font-black text-xl sm:text-2xl text-[#123C32]">
              {application.schemeName}
            </h1>
            <p className="text-xs sm:text-sm text-[#576562] mt-0.5">
              {application.institutionName} • {application.courseName}
            </p>
          </div>

          <div className="bg-[#FAF8F3] p-4 rounded-2xl border border-[#E2DDD2] text-left md:text-right">
            <span className="text-[11px] text-[#576562] block">Total Sanctioned Grant</span>
            <span className="font-heading font-black text-2xl text-[#123C32]">
              ₹{application.sanctionedAmount.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-emerald-700 block font-semibold">Direct DBT to SBI ••••8392</span>
          </div>
        </div>

        {/* Detailed Timeline Events */}
        <div className="space-y-4">
          <h3 className="font-heading font-bold text-base text-[#123C32] flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#C86B43]" />
            <span>End-to-End Application Progress Ledger</span>
          </h3>

          <div className="space-y-3 pl-2 border-l-2 border-[#123C32]/20 ml-2">
            {application.timeline.map((event, idx) => (
              <div key={idx} className="relative pl-6 pb-4">
                {/* Timeline node */}
                <div className={`absolute -left-[17px] top-0 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                  event.status === 'completed'
                    ? 'bg-emerald-600 text-white'
                    : event.status === 'action_required'
                    ? 'bg-amber-600 text-white animate-pulse'
                    : event.status === 'in_progress'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {event.status === 'completed' ? '✓' : event.status === 'action_required' ? '!' : idx + 1}
                </div>

                <div className="bg-[#FAF8F3] p-4 rounded-2xl border border-[#E2DDD2]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <span className="font-heading font-bold text-sm text-[#17221F]">
                      {event.title}
                    </span>
                    <span className="text-xs text-[#82918D]">{event.date}</span>
                  </div>

                  {event.remarks && (
                    <p className={`text-xs mt-1 ${
                      event.status === 'action_required' ? 'text-amber-950 font-semibold' : 'text-[#576562]'
                    }`}>
                      {event.remarks}
                    </p>
                  )}

                  {event.verifiedBy && (
                    <div className="text-[11px] text-[#123C32] font-medium mt-1">
                      Authenticated by: <strong>{event.verifiedBy}</strong>
                    </div>
                  )}

                  {event.status === 'action_required' && (
                    <div className="mt-3">
                      <Link
                        to="/student/verification"
                        className="px-4 py-1.5 bg-[#C86B43] hover:bg-[#b55b35] text-white text-xs font-bold rounded-lg inline-flex items-center gap-1.5 transition-colors shadow-2xs"
                      >
                        <span>Fix Income Certificate in Deficiency Center</span>
                        <ArrowLeft className="w-3 h-3 rotate-180" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attached Documents Checklist */}
        <div className="space-y-3 pt-4 border-t border-gray-100">
          <h3 className="font-heading font-bold text-base text-[#123C32] flex items-center gap-2">
            <FolderLock className="w-4 h-4 text-[#123C32]" />
            <span>Attached & Reusable Digital Credentials ({application.attachedDocuments.length})</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {documents.slice(0, 6).map((doc) => (
              <div
                key={doc.id}
                className="p-3.5 rounded-xl border border-[#E2DDD2] bg-[#F7F5EF]/60 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#17221F] truncate">{doc.title}</div>
                  <div className="text-[11px] text-[#576562] truncate">{doc.issuer}</div>
                </div>
                <StatusBadge status={doc.status} size="sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Printable Slip Preview Footer */}
        <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-[#576562] gap-4">
          <div className="flex items-center gap-3">
            <QrCode className="w-10 h-10 text-[#123C32]" />
            <div>
              <div className="font-bold text-[#17221F]">Official Digital Verification QR</div>
              <div className="text-[10px]">Tamper-proof SHA256 e-Sign certificate</div>
            </div>
          </div>

          <div className="text-right">
            <div>Scholar: <strong>{student.fullName}</strong></div>
            <div>Aadhaar Masked: <strong>{student.aadhaarNumberMasked}</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
};
