import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  FolderLock, 
  AlertTriangle, 
  CreditCard, 
  Bell, 
  UserCircle, 
  LogOut, 
  Menu, 
  X, 
  ShieldCheck, 
  Sparkles,
  RefreshCw,
  Home,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';
import { JagoChatbot } from '../components/common/JagoChatbot';
import { DigiLockerModal } from '../components/common/DigiLockerModal';
import { TribalPattern } from '../components/common/TribalPattern';

export const StudentLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { student, deficiencies, notifications, openDigiLockerModal, setRole, toggleJago } = useAppStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openDeficienciesCount = deficiencies.filter((d) => d.status === 'Open').length;
  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  const navItems = [
    { label: 'Overview', path: '/student/dashboard', icon: LayoutDashboard },
    { label: 'Applications', path: '/student/applications', icon: FileText },
    { label: 'Apply for Scheme', path: '/student/apply', icon: PlusCircle, highlight: true },
    { label: 'Document Wallet', path: '/student/documents', icon: FolderLock },
    { 
      label: 'Deficiency Center', 
      path: '/student/verification', 
      icon: AlertTriangle, 
      badge: openDeficienciesCount > 0 ? `${openDeficienciesCount} Action` : undefined,
      badgeColor: 'bg-amber-500 text-white animate-pulse'
    },
    { label: 'DBT Payments', path: '/student/payments', icon: CreditCard },
    { 
      label: 'Notifications', 
      path: '/student/notifications', 
      icon: Bell,
      badge: unreadNotifsCount > 0 ? `${unreadNotifsCount}` : undefined,
      badgeColor: 'bg-[#C86B43] text-white'
    },
    { label: 'My Profile', path: '/student/profile', icon: UserCircle },
  ];

  const isCurrent = (path: string) => location.pathname === path || (path !== '/student/dashboard' && location.pathname.startsWith(path));

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5EF]">
      {/* Top Banner & Navigation for Student Portal */}
      <header className="sticky top-0 z-30 bg-white border-b border-[#E2DDD2] shadow-xs">
        {/* Subtle Government Top Strip */}
        <div className="bg-[#123C32] text-white text-[11px] py-1 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#E8B84A]">TribalSetu</span>
            <span>•</span>
            <span className="text-white/80">Unified ST Scholar Portal</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setRole('admin');
                navigate('/admin/dashboard');
              }}
              className="bg-[#C86B43] hover:bg-[#b55b35] text-white px-2 py-0.5 rounded text-[10px] font-bold transition-colors"
            >
              Switch to MoTA Admin →
            </button>
            <span className="text-white/40 hidden sm:inline">|</span>
            <Link to="/" className="text-white/80 hover:text-white text-[10px] hidden sm:inline">
              Public Portal
            </Link>
          </div>
        </div>

        {/* Action Header */}
        <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-1.5 rounded-lg text-gray-700 hover:bg-gray-100"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link to="/student/dashboard" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#123C32] text-[#E8B84A] flex items-center justify-center font-black">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-heading font-black text-base text-[#123C32] leading-none">
                  TribalSetu
                </span>
                <span className="text-[10px] block text-[#576562]">Scholar Workspace</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* DigiLocker Sync Button */}
            <button
              onClick={openDigiLockerModal}
              className="bg-[#002D62] hover:bg-[#001D42] text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#E8B84A]" />
              <span className="hidden sm:inline">DigiLocker Sync</span>
            </button>

            {/* Ask JAGO Button */}
            <button
              onClick={toggleJago}
              className="bg-[#FAF0EB] hover:bg-[#F2DFD5] text-[#C86B43] border border-[#C86B43]/30 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C86B43]" />
              <span className="hidden sm:inline">Ask JAGO</span>
            </button>

            {/* Student Avatar */}
            <Link
              to="/student/profile"
              className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <img
                src={student.avatarUrl}
                alt={student.fullName}
                className="w-8 h-8 rounded-full object-cover border-2 border-[#123C32]"
              />
              <span className="text-xs font-bold text-[#17221F] hidden md:inline">
                {student.fullName}
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Body with Sidebar + Content */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-2 sm:px-6 py-4 gap-6">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-white rounded-2xl border border-[#E2DDD2] p-4 shadow-xs h-[calc(100vh-120px)] sticky top-20">
          {/* Student Profile Quick Card */}
          <div className="p-3.5 rounded-xl bg-[#123C32]/5 border border-[#123C32]/10 mb-4">
            <div className="flex items-center gap-3 mb-2">
              <img
                src={student.avatarUrl}
                alt={student.fullName}
                className="w-10 h-10 rounded-full object-cover border-2 border-[#123C32]"
              />
              <div className="min-w-0">
                <h4 className="font-heading font-bold text-sm text-[#123C32] truncate">
                  {student.fullName}
                </h4>
                <p className="text-[11px] text-[#576562] truncate">
                  {student.tribeName} Tribe
                </p>
              </div>
            </div>

            {/* Profile Completion Bar */}
            <div className="mt-2 pt-2 border-t border-[#123C32]/10">
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="text-[#576562]">Profile Strength</span>
                <span className="font-bold text-[#123C32]">{student.profileCompletionPercentage}%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#123C32] rounded-full"
                  style={{ width: `${student.profileCompletionPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
            {navItems.map((item) => {
              const active = isCurrent(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-[#123C32] text-white shadow-xs'
                      : item.highlight
                      ? 'bg-[#FAF0EB] text-[#C86B43] hover:bg-[#f6e2d8]'
                      : 'text-[#576562] hover:text-[#17221F] hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <item.icon className={`w-4 h-4 ${active ? 'text-[#E8B84A]' : ''}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Tribal Decorative Accent & Helpline */}
          <div className="mt-auto pt-3 border-t border-gray-100">
            <div className="text-[11px] text-[#82918D] flex items-center justify-between">
              <span>National ST Helpline</span>
              <span className="font-bold text-[#123C32]">1800-11-7788</span>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay Drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            />
            <div className="relative w-72 bg-white h-full shadow-2xl p-5 flex flex-col z-10">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#123C32] text-[#E8B84A] flex items-center justify-center font-bold">
                    TS
                  </div>
                  <span className="font-heading font-black text-base text-[#123C32]">
                    TribalSetu
                  </span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 rounded-lg text-gray-500 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 space-y-1.5 py-4 overflow-y-auto">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold ${
                      isCurrent(item.path)
                        ? 'bg-[#123C32] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </nav>

              <div className="pt-3 border-t border-gray-100">
                <button
                  onClick={() => {
                    setSidebarOpen(false);
                    setRole('public');
                    navigate('/');
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2 font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Exit Student Session</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Outlet */}
        <main className="flex-1 min-w-0 pb-16 lg:pb-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[#E2DDD2] shadow-lg flex items-center justify-around py-2 px-1">
        <Link
          to="/student/dashboard"
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-[10px] font-bold ${
            isCurrent('/student/dashboard') ? 'text-[#123C32]' : 'text-[#82918D]'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </Link>
        <Link
          to="/student/applications"
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-[10px] font-bold ${
            isCurrent('/student/applications') ? 'text-[#123C32]' : 'text-[#82918D]'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Applications</span>
        </Link>
        <Link
          to="/student/apply"
          className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-full bg-[#123C32] text-white -mt-4 shadow-md"
        >
          <PlusCircle className="w-5 h-5 text-[#E8B84A]" />
          <span className="text-[9px] font-bold">Apply</span>
        </Link>
        <Link
          to="/student/documents"
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-[10px] font-bold ${
            isCurrent('/student/documents') ? 'text-[#123C32]' : 'text-[#82918D]'
          }`}
        >
          <FolderLock className="w-4 h-4" />
          <span>Wallet</span>
        </Link>
        <Link
          to="/student/payments"
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-[10px] font-bold ${
            isCurrent('/student/payments') ? 'text-[#123C32]' : 'text-[#82918D]'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>DBT</span>
        </Link>
      </nav>

      {/* Global AI Assistant and DigiLocker Modals */}
      <JagoChatbot />
      <DigiLockerModal />
    </div>
  );
};
