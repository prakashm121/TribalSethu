import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  FileCheck2, 
  AlertCircle, 
  CreditCard, 
  Building, 
  Radar, 
  PieChart, 
  ShieldAlert, 
  LogOut, 
  Menu, 
  X, 
  Shield, 
  Search, 
  ExternalLink,
  Layers,
  GraduationCap
} from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setRole } = useAppStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { label: 'Command Center', path: '/admin/dashboard', icon: BarChart3 },
    { label: 'Applications Pool', path: '/admin/applications', icon: Layers },
    { label: 'Official Verification', path: '/admin/verification', icon: FileCheck2, badge: '5 Pending' },
    { label: 'Deficiencies Oversight', path: '/admin/deficiencies', icon: AlertCircle },
    { label: 'PFMS Disbursements', path: '/admin/disbursements', icon: CreditCard },
    { label: 'AISHE Institutions', path: '/admin/institutions', icon: Building },
    { label: 'Outreach Radar', path: '/admin/outreach', icon: Radar, badge: 'Active' },
    { label: 'National Analytics', path: '/admin/analytics', icon: PieChart },
    { label: 'Audit Trail & Security', path: '/admin/audit', icon: ShieldAlert },
  ];

  const isCurrent = (path: string) => location.pathname === path || (path !== '/admin/dashboard' && location.pathname.startsWith(path));

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F2EC]">
      {/* Top Admin Command Header */}
      <header className="sticky top-0 z-30 bg-[#0B251F] text-white border-b border-[#123C32] shadow-md">
        <div className="px-4 sm:px-8 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-1.5 rounded-lg text-white/80 hover:bg-white/10"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link to="/admin/dashboard" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#E8B84A] text-[#123C32] flex items-center justify-center font-black shadow-xs">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading font-black text-lg text-white tracking-wide">
                    MoTA COMMAND CENTER
                  </span>
                  <span className="text-[10px] bg-[#E8B84A]/20 text-[#E8B84A] border border-[#E8B84A]/40 px-2 py-0.2 rounded-full font-bold">
                    Official
                  </span>
                </div>
                <p className="text-[11px] text-white/70">
                  Unified Tribal Scholarship Scheme Administration
                </p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Quick Demo Switcher back to student */}
            <button
              onClick={() => {
                setRole('student');
                navigate('/student/dashboard');
              }}
              className="bg-[#123C32] hover:bg-[#1A5446] border border-[#E8B84A]/30 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 text-[#E8B84A]" />
              <span className="hidden sm:inline">Student View (Asha)</span>
            </button>

            <div className="hidden md:flex items-center gap-2 pl-3 border-l border-white/20">
              <div className="w-8 h-8 rounded-full bg-[#C86B43] text-white font-bold flex items-center justify-center text-xs">
                RM
              </div>
              <div className="text-left">
                <div className="text-xs font-bold leading-tight">Dr. R. Murmu</div>
                <div className="text-[10px] text-white/70 leading-none">Director, MoTA</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-2 sm:px-6 py-4 gap-6">
        {/* Desktop Admin Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-white rounded-2xl border border-[#E2DDD2] p-4 shadow-xs h-[calc(100vh-100px)] sticky top-16">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#82918D] px-2 mb-2">
            Governance Console
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
            {navItems.map((item) => {
              const active = isCurrent(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? 'bg-[#123C32] text-white shadow-xs'
                      : 'text-[#576562] hover:text-[#17221F] hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <item.icon className={`w-4 h-4 ${active ? 'text-[#E8B84A]' : ''}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      active ? 'bg-[#E8B84A] text-[#123C32]' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-gray-100">
            <button
              onClick={() => {
                setRole('public');
                navigate('/');
              }}
              className="w-full text-left px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2 font-semibold transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Exit Admin Console</span>
            </button>
          </div>
        </aside>

        {/* Mobile Admin Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-xs" />
            <div className="relative w-72 bg-white h-full shadow-2xl p-5 flex flex-col z-10">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <span className="font-heading font-black text-base text-[#123C32]">
                  MoTA Admin Console
                </span>
                <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-lg text-gray-500 hover:bg-gray-100">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 space-y-1.5 py-4 overflow-y-auto">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold ${
                      isCurrent(item.path) ? 'bg-[#123C32] text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Content Outlet */}
        <main className="flex-1 min-w-0 pb-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
