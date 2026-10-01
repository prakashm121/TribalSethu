import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  AlertCircle, 
  ArrowUpRight, 
  CheckCheck, 
  XCircle 
} from 'lucide-react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  size = 'md', 
  showIcon = true,
  className = '' 
}) => {
  const norm = status.toLowerCase();

  let bg = 'bg-gray-100 text-gray-800 border-gray-200';
  let Icon = Clock;

  if (norm.includes('disbursed') || norm.includes('credited') || norm.includes('completed')) {
    bg = 'bg-emerald-50 text-emerald-800 border-emerald-300';
    Icon = CheckCheck;
  } else if (norm.includes('sanctioned') || norm.includes('approved')) {
    bg = 'bg-teal-50 text-teal-800 border-teal-300';
    Icon = CheckCircle2;
  } else if (norm.includes('deficiency') || norm.includes('attention') || norm.includes('action')) {
    bg = 'bg-amber-50 text-amber-900 border-amber-300 font-semibold animate-pulse';
    Icon = AlertTriangle;
  } else if (norm.includes('mismatch') || norm.includes('rejected') || norm.includes('failed') || norm.includes('expired')) {
    bg = 'bg-rose-50 text-rose-800 border-rose-300';
    Icon = XCircle;
  } else if (norm.includes('verification') || norm.includes('review') || norm.includes('processing')) {
    bg = 'bg-blue-50 text-blue-800 border-blue-300';
    Icon = Clock;
  } else if (norm.includes('verified') || norm.includes('eligible')) {
    bg = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    Icon = CheckCircle2;
  } else if (norm.includes('submitted')) {
    bg = 'bg-indigo-50 text-indigo-700 border-indigo-200';
    Icon = ArrowUpRight;
  } else if (norm.includes('check required') || norm.includes('potentially eligible')) {
    bg = 'bg-amber-50 text-amber-800 border-amber-200';
    Icon = AlertCircle;
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs sm:text-sm px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-medium'
  }[size];

  return (
    <span className={`inline-flex items-center rounded-full border shadow-xs ${bg} ${sizeClasses} ${className}`}>
      {showIcon && <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />}
      <span>{status}</span>
    </span>
  );
};
