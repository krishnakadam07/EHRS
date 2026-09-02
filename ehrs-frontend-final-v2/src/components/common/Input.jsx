import React, { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  icon,
  helperText,
  id,
  className = '',
  wrapperClassName = '',
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = !!error;

  return (
    <div className={`flex flex-col gap-1.5 ${wrapperClassName}`}>
      {label && (
        <label htmlFor={inputId} className="text-slate-700 text-sm font-bold">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
            {icon}
          </span>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full bg-white border rounded-lg px-4 py-2.5 outline-none transition-colors
            ${icon ? 'pl-10' : ''}
            ${hasError 
              ? 'border-danger focus:border-danger focus:ring-1 focus:ring-danger' 
              : 'border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary'
            }
            ${props.disabled ? 'bg-slate-50 text-slate-500 cursor-not-allowed' : ''}
            ${className}
          `}
          {...props}
        />
      </div>

      {hasError ? (
        <span className="text-danger text-xs font-semibold mt-0.5">{error}</span>
      ) : helperText ? (
        <span className="text-slate-500 text-xs mt-0.5">{helperText}</span>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
