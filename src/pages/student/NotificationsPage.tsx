import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Bell, 
  CheckCircle2, 
  AlertTriangle, 
  CreditCard, 
  Info, 
  CheckCheck,
  ChevronRight,
  Filter
} from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';

export const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { notifications, markNotificationRead, markAllNotificationsRead } = useAppStore();
  const [filter, setFilter] = useState<'all' | 'unread' | 'warning' | 'payment'>('all');

  const filteredNotifs = notifications.filter((n) => {
    if (filter === 'unread') return !n.read;
    if (filter === 'warning') return n.type === 'warning';
    if (filter === 'payment') return n.type === 'payment';
    return true;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#123C32]">
            Notification Center
          </h1>
          <p className="text-xs sm:text-sm text-[#576562] mt-0.5">
            Real-time updates regarding official verifications, deficiencies, and DBT disbursements.
          </p>
        </div>

        <button
          onClick={markAllNotificationsRead}
          className="px-4 py-2 bg-white hover:bg-gray-50 border border-[#E2DDD2] text-xs font-bold text-[#123C32] rounded-xl flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <CheckCheck className="w-4 h-4 text-emerald-600" />
          <span>Mark All as Read</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
            filter === 'all' ? 'bg-[#123C32] text-white shadow-2xs' : 'bg-white text-gray-700 border border-[#E2DDD2]'
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
            filter === 'unread' ? 'bg-[#123C32] text-white shadow-2xs' : 'bg-white text-gray-700 border border-[#E2DDD2]'
          }`}
        >
          Unread ({notifications.filter((n) => !n.read).length})
        </button>
        <button
          onClick={() => setFilter('warning')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
            filter === 'warning' ? 'bg-amber-600 text-white shadow-2xs' : 'bg-white text-gray-700 border border-[#E2DDD2]'
          }`}
        >
          Action Required
        </button>
        <button
          onClick={() => setFilter('payment')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
            filter === 'payment' ? 'bg-emerald-700 text-white shadow-2xs' : 'bg-white text-gray-700 border border-[#E2DDD2]'
          }`}
        >
          DBT Payments
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifs.map((item) => {
          let Icon = Info;
          let iconBg = 'bg-blue-100 text-blue-800';

          if (item.type === 'warning') {
            Icon = AlertTriangle;
            iconBg = 'bg-amber-100 text-amber-900';
          } else if (item.type === 'payment') {
            Icon = CreditCard;
            iconBg = 'bg-emerald-100 text-emerald-800';
          } else if (item.type === 'success') {
            Icon = CheckCircle2;
            iconBg = 'bg-emerald-100 text-emerald-800';
          }

          return (
            <div
              key={item.id}
              onClick={() => markNotificationRead(item.id)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer ${
                !item.read
                  ? 'bg-white border-[#123C32]/30 shadow-xs ring-1 ring-[#123C32]/10'
                  : 'bg-white/80 border-[#E2DDD2] hover:bg-white'
              }`}
            >
              <div className="flex items-start gap-3.5 flex-1">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-bold text-sm text-[#17221F]">
                      {item.title}
                    </h3>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-[#C86B43]" />
                    )}
                  </div>
                  <p className="text-xs text-[#576562] leading-relaxed">
                    {item.message}
                  </p>
                  <span className="text-[10px] text-[#82918D] block">
                    {item.timestamp}
                  </span>
                </div>
              </div>

              {item.actionUrl && (
                <div className="shrink-0 self-end sm:self-center">
                  <Link
                    to={item.actionUrl}
                    className="px-3.5 py-1.5 bg-[#FAF8F3] hover:bg-[#F2DFD5] text-[#C86B43] border border-[#C86B43]/30 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <span>{item.actionLabel || 'View Details'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
