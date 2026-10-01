import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Lock, 
  PhoneCall, 
  Mail, 
  ExternalLink, 
  FileText, 
  Heart,
  Layers,
  HelpCircle
} from 'lucide-react';
import { TribalPattern } from './TribalPattern';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A241E] text-white pt-12 pb-8 border-t border-[#123C32] mt-auto">
      {/* Decorative Tribal Pattern Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-8">
        <TribalPattern variant="strip" color="#E8B84A" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
        {/* Column 1: Ministry Info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8B84A] text-[#123C32] flex items-center justify-center font-black shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg text-white tracking-wide">
                TribalSetu
              </h3>
              <p className="text-xs text-[#E8B84A] font-medium">
                Unified Tribal Scholarship Portal
              </p>
            </div>
          </div>

          <p className="text-xs text-white/70 leading-relaxed max-w-md">
            An initiative of the Ministry of Tribal Affairs (MoTA), Government of India, consolidating five Scheduled Tribe scholarship schemes into one unified digital public infrastructure.
          </p>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80 space-y-1.5">
            <div className="flex items-center gap-2 text-[#E8B84A] font-bold">
              <Lock className="w-4 h-4" />
              <span>Data Protection & Privacy Notice</span>
            </div>
            <p className="text-[11px] text-white/70">
              Your documents are protected. Only authorized officials can access verification data. Every important action is recorded in the immutable audit ledger.
            </p>
          </div>
        </div>

        {/* Column 2: 5 Central ST Schemes */}
        <div>
          <h4 className="font-heading font-bold text-sm text-[#E8B84A] uppercase tracking-wider mb-3">
            Schemes
          </h4>
          <ul className="space-y-2 text-xs text-white/80">
            <li>
              <Link to="/scholarships" className="underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white transition-colors">
                Pre-Matric Scholarship
              </Link>
            </li>
            <li>
              <Link to="/scholarships" className="underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white transition-colors">
                Post-Matric ST Scheme
              </Link>
            </li>
            <li>
              <Link to="/scholarships" className="underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white transition-colors">
                Top Class Education (IITs/NITs)
              </Link>
            </li>
            <li>
              <Link to="/scholarships" className="underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white transition-colors">
                NFST Fellowship (Ph.D.)
              </Link>
            </li>
            <li>
              <Link to="/scholarships" className="underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white transition-colors">
                National Overseas (NOS)
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Portals & Tools */}
        <div>
          <h4 className="font-heading font-bold text-sm text-[#E8B84A] uppercase tracking-wider mb-3">
            Quick Portals
          </h4>
          <ul className="space-y-2 text-xs text-white/80">
            <li>
              <Link to="/eligibility" className="underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white transition-colors flex items-center gap-2">
                <span>Eligibility Wizard</span>
                <span className="text-[9px] leading-4 bg-[#E8B84A]/30 text-[#E8B84A] px-1 rounded">Smart</span>
              </Link>
            </li>
            <li>
              <Link to="/student/documents" className="underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white transition-colors">
                Digital Document Wallet
              </Link>
            </li>
            <li>
              <Link to="/student/payments" className="underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white transition-colors">
                PFMS-DBT Payment Tracker
              </Link>
            </li>
            <li>
              <Link to="/admin/dashboard" className="underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white transition-colors">
                MoTA Command Center
              </Link>
            </li>
            <li>
              <Link to="/admin/outreach" className="underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white transition-colors">
                Outreach Radar
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Helpdesk & Grievance */}
        <div>
          <h4 className="font-heading font-bold text-sm text-[#E8B84A] mb-3">
            Support & Helpline
          </h4>
          <div className="space-y-2.5 text-xs text-white/80">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-[#E8B84A] shrink-0" />
              <div>
                <div className="text-[10px] text-white/60">National ST Toll-Free</div>
                <div className="font-bold text-white">1800-11-7788</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#E8B84A] shrink-0" />
              <div>
                <div className="text-[10px] text-white/60">Grievance Desk</div>
                <div className="font-semibold">help.tribal@gov.in</div>
              </div>
            </div>
            <Link
              to="/help"
              className="ml-6 inline-flex items-center gap-1 text-xs text-[#E8B84A] hover:underline font-semibold pt-1"
            >
              <span>File a Grievance Ticket</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
        <div>
          © 2026 Ministry of Tribal Affairs, Government of India. Designed for National Digital Public Infrastructure.
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>Designed with WCAG 2.1 AA Compliance</span>
          <span>•</span>
          <span className="text-[#E8B84A]">Hackathon Showcase Prototype</span>
        </div>
      </div>
    </footer>
  );
};
