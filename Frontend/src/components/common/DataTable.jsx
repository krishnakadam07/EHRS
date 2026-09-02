import React from 'react';
import EmptyState from './EmptyState';
import { FiDatabase } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function DataTable({
                                    columns = [],
                                    data = [],
                                    loading = false,
                                    onRowClick,
                                    emptyTitle = "No data available",
                                    emptyDescription = "There are no records to display at the moment.",
                                    className = ''
                                  }) {
  const handleRowClick = (row) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  if (loading) {
    return (
        <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {columns.map((col, index) => (
                    <th key={index} className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">
                      {col.header}
                    </th>
                ))}
              </tr>
              </thead>
              <tbody>
              {[...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-slate-100">
                    {columns.map((_, j) => (
                        <td key={j} className="px-6 py-4">
                          <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4"></div>
                        </td>
                    ))}
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
    );
  }

  if (data.length === 0) {
    return (
        <div className={`bg-white rounded-xl shadow-sm border border-slate-200 ${className}`}>
          <EmptyState
              icon={<FiDatabase />}
              title={emptyTitle}
              description={emptyDescription}
          />
        </div>
    );
  }

  return (
      <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-white rounded-[20px] shadow-sm hover:shadow-premium transition-shadow border border-slate-200 overflow-hidden ${className}`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {columns.map((col, index) => (
                  <th
                      key={index}
                      className={`px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider ${col.className || ''}`}
                  >
                    {col.header}
                  </th>
              ))}
            </tr>
            </thead>
            <motion.tbody
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
                }}
                className="divide-y divide-slate-100"
            >
              {data.map((row, rowIndex) => (
                  <motion.tr
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
                      }}
                      key={row.id || rowIndex}
                      onClick={() => handleRowClick(row)}
                      className={`group ${onRowClick ? 'cursor-pointer hover:bg-slate-50 transition-colors' : ''}`}
                  >
                    {columns.map((col, colIndex) => (
                        <td
                            key={colIndex}
                            className={`px-6 py-4 text-sm text-slate-700 ${col.cellClassName || ''}`}
                        >
                          {col.cell ? col.cell(row) : row[col.accessor]}
                        </td>
                    ))}
                  </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </motion.div>
  );
}
