import React from 'react';

export default function EmptyState({ 
  icon, 
  title = "No data found", 
  description = "Get started by creating a new record.", 
  action,
  className = ''
}) {
  return (
    <div className={`flex flex-col items-center justify-center p-10 text-center ${className}`}>
      {icon && (
        <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mb-4 text-2xl border border-slate-100 shadow-sm">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-bold text-slate-800 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-6">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
