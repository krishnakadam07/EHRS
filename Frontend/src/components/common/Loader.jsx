import React from 'react';

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16'
};

export default function Loader({ 
  size = 'md', 
  variant = 'spinner', 
  fullScreen = false, 
  inline = false,
  className = ''
}) {
  const sizeClass = sizeMap[size] || sizeMap.md;
  
  const spinner = (
    <div className={`relative ${sizeClass} ${className}`}>
      <div className="absolute inset-0 rounded-full border-2 border-slate-200"></div>
      <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
    </div>
  );

  const pulse = (
    <div className={`rounded-full bg-primary animate-pulse ${sizeClass} ${className}`}></div>
  );

  const dots = (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className={`rounded-full bg-primary animate-bounce ${sizeMap.sm}`} style={{ animationDelay: '0ms' }}></div>
      <div className={`rounded-full bg-primary animate-bounce ${sizeMap.sm}`} style={{ animationDelay: '150ms' }}></div>
      <div className={`rounded-full bg-primary animate-bounce ${sizeMap.sm}`} style={{ animationDelay: '300ms' }}></div>
    </div>
  );

  let loaderContent;
  switch (variant) {
    case 'pulse': loaderContent = pulse; break;
    case 'dots': loaderContent = dots; break;
    case 'spinner':
    default:
      loaderContent = spinner; break;
  }

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {loaderContent}
      </div>
    );
  }

  if (inline) {
    return loaderContent;
  }

  return (
    <div className="flex items-center justify-center w-full h-full p-4">
      {loaderContent}
    </div>
  );
}
