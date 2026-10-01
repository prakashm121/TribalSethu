import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Shield, 
  Bell, 
  Menu, 
  X, 
  User, 
  GraduationCap, 
  Building2, 
  ChevronDown, 
  CheckCircle2, 
  FileCheck, 
  CreditCard, 
  Sparkles,
  Search,
  ExternalLink,
  Layers
} from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';
import { TribalPattern } from './TribalPattern';

export const Header: React.FC = () => {
  const { role, setRole, notifications, markAllNotificationsRead, toggleJago } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleRoleChange = (newRole: 'student' | 'admin' | 'public') => {
    setRole(newRole);
    setRoleDropdownOpen(false);
    if (newRole === 'student') navigate('/student/dashboard');
    else if (newRole === 'admin') navigate('/admin/dashboard');
    else navigate('/');
  };

  const navLinks = [
    { label: 'Scholarships', path: '/scholarships' },
    { label: 'Eligibility Wizard', path: '/eligibility', highlight: true },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Help & Grievance', path: '/help' },
  ];

  const isCurrent = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2DDD2] shadow-xs">
      {/* Top Government Strip */}
      <div className="bg-[#123C32] text-white text-xs py-1 px-4 sm:px-8 border-b border-[#0A241E]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold tracking-wide">भारत सरकार | Government of India</span>
            <span className="text-[#E8B84A] hidden sm:inline">•</span>
            <span className="text-white/80 hidden sm:inline">जनजातीय कार्य मंत्रालय | Ministry of Tribal Affairs</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Quick Demo Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="bg-[#E8B84A] hover:bg-[#d8a83a] text-[#123C32] font-bold px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <span>Demo View:</span>
                <span className="capitalize underline">
                  {role === 'student' ? '🎓 Asha (Student)' : role === 'admin' ? '🏛️ MoTA (Admin)' : '🌐 Visitor'}
                </span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-52 bg-white rounded-xl shadow-xl border border-[#E2DDD2] p-1.5 z-50 text-gray-800">
                  <div className="text-[10px] font-semibold uppercase text-gray-400 px-2 py-1">Switch Perspective</div>
                  <button
                    onClick={() => handleRoleChange('student')}
                    className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center gap-2 transition-colors ${
                      role === 'student' ? 'bg-[#123C32]/10 text-[#123C32] font-bold' : 'hover:bg-gray-100'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4 text-[#123C32]" />
                    <div>
                      <div className="font-semibold">Student Mode</div>
                      <div className="text-[10px] text-gray-500">Asha Tirkey (NIT Rourkela)</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleRoleChange('admin')}
                    className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center gap-2 transition-colors ${
                      role === 'admin' ? 'bg-[#123C32]/10 text-[#123C32] font-bold' : 'hover:bg-gray-100'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-[#C86B43]" />
                    <div>
                      <div className="font-semibold">MoTA Official</div>
                      <div className="text-[10px] text-gray-500">Command Center & Verifier</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleRoleChange('public')}
                    className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center gap-2 transition-colors ${
                      role === 'public' ? 'bg-[#123C32]/10 text-[#123C32] font-bold' : 'hover:bg-gray-100'
                    }`}
                  >
                    <Layers className="w-4 h-4 text-emerald-600" />
                    <div>
                      <div className="font-semibold">Public Portal</div>
                      <div className="text-[10px] text-gray-500">Citizen landing page</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <span className="text-white/40">|</span>
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/90">
              Accessibility: AAA
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3 group">
          {/* Emblem & Tribal Emblem Icon */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#123C32] to-[#1C5648] text-white flex items-center justify-center shadow-md border border-[#E8B84A]/40 shrink-0">
            <Shield className="w-5 h-5 text-[#E8B84A] group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-black text-lg sm:text-xl text-[#123C32] tracking-tight">
                TribalSetu
              </span>
              <span className="self-baseline text-[10px] bg-[#FAF0EB] text-[#C86B43] font-extrabold px-1.5 py-0.5 rounded border border-[#C86B43]/30">
                MoTA DPI
              </span>
            </div>
            <p className="text-xs text-[#576562] font-medium tracking-tight -mt-0.5">
              One Profile. Every Scholarship.
            </p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isCurrent(item.path)
                  ? 'bg-[#123C32] text-white shadow-2xs'
                  : item.highlight
                  ? 'bg-[#FAF0EB] text-[#C86B43] hover:bg-[#F2DFD5] border border-[#C86B43]/20'
                  : 'text-[#17221F] hover:text-[#123C32] hover:bg-black/5'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Ask JAGO Quick Button */}
          <button
            onClick={toggleJago}
            className="hidden sm:flex items-center gap-1.5 bg-[#FDF6E2] hover:bg-[#FCF4DD] text-[#8C6D1F] border border-[#E8B84A]/50 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E8B84A]" />
            <span>Ask JAGO</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              className="relative p-2 rounded-xl text-gray-700 hover:text-[#123C32] hover:bg-gray-100 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#C86B43] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {unreadCount}
                </span>
              )}
            </button>

            {notifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-[#E2DDD2] p-4 z-50">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <h4 className="font-heading font-bold text-sm text-[#123C32]">Notifications</h4>
                    {unreadCount > 0 && (
                      <span className="bg-[#FAF0EB] text-[#C86B43] text-xs font-bold px-2 py-0.5 rounded-full">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-xs text-[#123C32] hover:underline font-semibold"
                  >
                    Mark all read
                  </button>
                </div>

                <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto mt-2">
                  {notifications.slice(0, 4).map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        setNotifDropdownOpen(false);
                        if (n.actionUrl) navigate(n.actionUrl);
                      }}
                      className={`py-2.5 px-1 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors ${
                        !n.read ? 'bg-[#123C32]/5' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-bold text-[#17221F]">{n.title}</span>
                        <span className="text-[10px] text-gray-400 shrink-0">{n.timestamp}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">{n.message}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-2.5 mt-2 border-t border-gray-100 text-center">
                  <Link
                    to="/student/notifications"
                    onClick={() => setNotifDropdownOpen(false)}
                    className="text-xs font-bold text-[#123C32] hover:text-[#C86B43] transition-colors"
                  >
                    View All Notifications →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Profile / Portal Jump */}
          {role === 'student' ? (
            <Link
              to="/student/dashboard"
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-[#123C32]/5 hover:bg-[#123C32]/10 border border-[#123C32]/20 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-[#123C32] text-white flex items-center justify-center font-bold text-xs">
                AT
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-[#123C32] leading-none">Asha Tirkey</div>
                <div className="text-[10px] text-[#576562] leading-none mt-0.5">Student Dashboard</div>
              </div>
            </Link>
          ) : role === 'admin' ? (
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-[#C86B43]/10 hover:bg-[#C86B43]/20 border border-[#C86B43]/30 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-[#C86B43] text-white flex items-center justify-center font-bold text-xs">
                RM
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-[#C86B43] leading-none">Dr. R. Murmu</div>
                <div className="text-[10px] text-[#576562] leading-none mt-0.5">MoTA Official</div>
              </div>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3.5 py-1.5 text-xs font-bold text-[#123C32] hover:bg-gray-100 rounded-lg transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-3.5 py-1.5 text-xs font-bold bg-[#123C32] hover:bg-[#0A241E] text-white rounded-lg transition-colors shadow-xs"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-[#123C32] rounded-lg"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Decorative Tribal Border */}
      <TribalPattern variant="strip" color="#123C32" className="hidden sm:flex" />

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E2DDD2] p-4 shadow-xl space-y-3">
          <div className="space-y-1">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-semibold ${
                  isCurrent(item.path)
                    ? 'bg-[#123C32] text-white'
                    : 'text-[#17221F] hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <Link
              to="/student/dashboard"
              onClick={() => {
                setRole('student');
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2 px-3 rounded-lg bg-[#123C32] text-white text-xs font-bold"
            >
              Enter Student Portal (Asha Tirkey)
            </Link>
            <Link
              to="/admin/dashboard"
              onClick={() => {
                setRole('admin');
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2 px-3 rounded-lg bg-[#C86B43] text-white text-xs font-bold"
            >
              Enter MoTA Command Center
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
