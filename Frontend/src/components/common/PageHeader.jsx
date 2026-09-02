import React from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

export default function PageHeader({ 
  title, 
  subtitle, 
  breadcrumbs = [], 
  actions,
  className = ''
}) {
  return (
    <div className={`flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8 ${className}`}>
      <div className="space-y-1">
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center text-sm text-slate-500 mb-2">
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <div key={index} className="flex items-center">
                  {isLast ? (
                    <span className="font-medium text-slate-800">{crumb.label}</span>
                  ) : (
                    <>
                      {crumb.to ? (
                        <Link to={crumb.to} className="hover:text-primary transition-colors">
                          {crumb.label}
                        </Link>
                      ) : (
                        <span>{crumb.label}</span>
                      )}
                      <FiChevronRight className="mx-2 w-4 h-4 text-slate-400" />
                    </>
                  )}
                </div>
              );
            })}
          </nav>
        )}
        
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-slate-500 text-sm sm:text-base font-medium">
            {subtitle}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
}
