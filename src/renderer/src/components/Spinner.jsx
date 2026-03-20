import React from 'react';

const Spinner = () => (
  <div className="flex items-center justify-center py-8">
    <svg className="h-5 w-5 animate-spin text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4"></circle>
      <path className="opacity-75" d="M4 12a8 8 0 018-8" strokeWidth="4"></path>
    </svg>
  </div>
);

export default Spinner;
