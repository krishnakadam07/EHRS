import React, { useState, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

export default function SearchBar({
  onSearch,
  placeholder = 'Search...',
  debounceTime = 300,
  className = ''
}) {
  const [query, setQuery] = useState('');

  // Handle debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(query);
    }, debounceTime);

    return () => clearTimeout(handler);
  }, [query, onSearch, debounceTime]);

  const handleClear = () => {
    setQuery('');
    // Focus could be managed here if a ref was attached
  };

  return (
    <div className={`relative flex items-center w-full md:w-auto ${className}`}>
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
        <FiSearch size={18} />
      </span>
      
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full md:w-80 pl-10 pr-10 py-2.5 rounded-lg border border-slate-300 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors bg-white text-sm"
      />

      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
          aria-label="Clear search"
        >
          <FiX size={18} />
        </button>
      )}
    </div>
  );
}
