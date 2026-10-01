import React from 'react';

interface TribalPatternProps {
  className?: string;
  variant?: 'strip' | 'corner' | 'mandala';
  color?: string;
}

export const TribalPattern: React.FC<TribalPatternProps> = ({ 
  className = '', 
  variant = 'strip',
  color = '#C86B43' 
}) => {
  if (variant === 'strip') {
    return (
      <div className={`w-full overflow-hidden flex items-center gap-1 opacity-70 select-none pointer-events-none ${className}`} aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => (
          <svg key={i} width="24" height="12" viewBox="0 0 24 12" fill="none" className="shrink-0">
            <path d="M0 6L6 0L12 6L18 0L24 6L18 12L12 6L6 12L0 6Z" fill={color} fillOpacity="0.4" />
            <circle cx="12" cy="6" r="1.5" fill="#E8B84A" />
          </svg>
        ))}
      </div>
    );
  }

  if (variant === 'corner') {
    return (
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className={`pointer-events-none ${className}`} aria-hidden="true">
        <path d="M0 0H60V6H6V60H0V0Z" fill={color} fillOpacity="0.3" />
        <path d="M12 12H48V16H16V48H12V12Z" fill="#E8B84A" fillOpacity="0.4" />
        <circle cx="24" cy="24" r="3" fill={color} fillOpacity="0.6" />
      </svg>
    );
  }

  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className={`pointer-events-none ${className}`} aria-hidden="true">
      <circle cx="20" cy="20" r="18" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" />
      <polygon points="20,4 24,16 36,20 24,24 20,36 16,24 4,20 16,16" fill="#E8B84A" fillOpacity="0.5" />
      <circle cx="20" cy="20" r="4" fill={color} />
    </svg>
  );
};
