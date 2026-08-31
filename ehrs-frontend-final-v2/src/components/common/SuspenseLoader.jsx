import React from 'react';
import Loader from './Loader';

export default function SuspenseLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50/50">
      <Loader />
      <p className="mt-4 text-slate-500 font-medium animate-pulse">Loading module...</p>
    </div>
  );
}
