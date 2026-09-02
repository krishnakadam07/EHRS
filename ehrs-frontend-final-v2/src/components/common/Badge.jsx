import React from 'react';

const colorMaps = {
  success: {
    solid: 'bg-success text-white border-transparent',
    soft: 'bg-emerald-100 text-emerald-800 border-transparent',
    outline: 'bg-transparent text-emerald-700 border-emerald-500'
  },
  warning: {
    solid: 'bg-warning text-white border-transparent',
    soft: 'bg-amber-100 text-amber-800 border-transparent',
    outline: 'bg-transparent text-amber-700 border-amber-500'
  },
  danger: {
    solid: 'bg-danger text-white border-transparent',
    soft: 'bg-red-100 text-red-800 border-transparent',
    outline: 'bg-transparent text-red-700 border-red-500'
  },
  info: {
    solid: 'bg-sky-500 text-white border-transparent',
    soft: 'bg-sky-100 text-sky-800 border-transparent',
    outline: 'bg-transparent text-sky-700 border-sky-500'
  },
  primary: {
    solid: 'bg-primary text-white border-transparent',
    soft: 'bg-blue-100 text-blue-800 border-transparent',
    outline: 'bg-transparent text-blue-700 border-blue-500'
  },
  neutral: {
    solid: 'bg-slate-600 text-white border-transparent',
    soft: 'bg-slate-100 text-slate-700 border-transparent',
    outline: 'bg-transparent text-slate-600 border-slate-400'
  }
};

export default function Badge({ 
  children, 
  color = 'neutral', 
  variant = 'soft',
  icon,
  className = ''
}) {
  const baseClasses = 'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border tracking-wide whitespace-nowrap';
  const colorMap = colorMaps[color] || colorMaps.neutral;
  const variantClass = colorMap[variant] || colorMap.soft;

  return (
    <span className={`${baseClasses} ${variantClass} ${className}`}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
