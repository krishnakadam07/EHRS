import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export default function Card({ 
  children, 
  className = '', 
  variant = 'default',
  interactive = false,
  onClick,
  ...props 
}) {
  
  const baseClasses = 'w-full rounded-[20px] transition-all duration-300';
  
  const variants = {
    default: 'bg-white border border-slate-200 shadow-soft hover:shadow-premium',
    glass: 'glass-panel shadow-soft hover:shadow-premium',
    dark: 'dark-glass-panel shadow-2xl shadow-slate-900/50',
    flat: 'bg-slate-50 border border-slate-100',
  };

  const interactiveClasses = interactive || onClick 
    ? 'cursor-pointer hover:-translate-y-1' 
    : '';

  const classes = clsx(
    baseClasses,
    variants[variant],
    interactiveClasses,
    className
  );

  // If interactive, use motion.div for smoother tap effects
  if (interactive || onClick) {
     return (
        <motion.div 
           className={classes} 
           onClick={onClick} 
           whileTap={{ scale: 0.98 }}
           {...props}
        >
           {children}
        </motion.div>
     );
  }

  return (
    <motion.div 
       initial={{ opacity: 0, y: 10 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
       className={classes} 
       {...props}
    >
      {children}
    </motion.div>
  );
}

Card.Header = function CardHeader({ children, className = '', noBorder = false }) {
  return (
    <div className={clsx(
      'px-6 py-5',
      !noBorder && 'border-b border-slate-100',
      className
    )}>
      {children}
    </div>
  );
};

Card.Body = function CardBody({ children, className = '', noPadding = false, padding = 'p-6' }) {
  return (
    <div className={clsx(
      !noPadding && padding,
      className
    )}>
      {children}
    </div>
  );
};

Card.Footer = function CardFooter({ children, className = '', noBorder = false }) {
  return (
    <div className={clsx(
      'px-6 py-4 bg-slate-50/50 rounded-b-[20px]',
      !noBorder && 'border-t border-slate-100',
      className
    )}>
      {children}
    </div>
  );
};
