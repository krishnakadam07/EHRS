import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export default function Button({
                                 children,
                                 variant = 'primary',
                                 size = 'md',
                                 fullWidth = false,
                                 icon,
                                 rightIcon, // <-- We added rightIcon here!
                                 isLoading = false,
                                 disabled = false,
                                 className = '',
                                 type = 'button',
                                 onClick,
                                 ...props
                               }) {

  const baseClasses = 'inline-flex items-center justify-center font-bold transition-all duration-200 outline-none disabled:opacity-50 disabled:cursor-not-allowed group';

  const sizes = {
    sm: 'text-xs px-4 py-2 rounded-lg',
    md: 'text-sm px-6 py-3 rounded-xl',
    lg: 'text-base px-8 py-4 rounded-2xl',
  };

  const variants = {
    primary: 'bg-gradient-to-b from-blue-600 to-blue-700 text-white shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/40 border border-blue-700/50',
    secondary: 'bg-gradient-to-b from-sky-400 to-sky-500 text-white shadow-md shadow-sky-500/20 hover:shadow-lg hover:shadow-sky-500/40 border border-sky-500/50',
    outline: 'bg-white/80 backdrop-blur-sm border border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50 shadow-sm hover:shadow',
    danger: 'bg-gradient-to-b from-red-500 to-red-600 text-white shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/40 border border-red-600/50',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900',
  };

  const classes = clsx(
      baseClasses,
      sizes[size],
      variants[variant],
      fullWidth && 'w-full',
      className
  );

  return (
      <motion.button
          type={type}
          className={classes}
          onClick={onClick}
          disabled={disabled || isLoading}
          whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
          {...props}
      >
        {isLoading ? (
            <span className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
        ) : (
            <span className="flex items-center justify-center gap-2 w-full">
          {icon && <span className={clsx("shrink-0", children ? "mr-1" : "")}>{icon}</span>}
              {children}
              {/* We added the logic to render the rightIcon here! */}
              {rightIcon && <span className={clsx("shrink-0", children ? "ml-1" : "")}>{rightIcon}</span>}
        </span>
        )}
      </motion.button>
  );
}