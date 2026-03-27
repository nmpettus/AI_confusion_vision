import React from 'react';

function AppShell({ children, largeText, highContrast }) {
  return (
    <div className={`${largeText ? 'text-lg md:text-xl' : 'text-base'} ${highContrast ? 'high-contrast' : ''} min-h-screen bg-gradient-to-b from-sky-100 via-violet-100 to-amber-100 text-slate-900`}>
      <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8">{children}</div>
    </div>
  );
}

export default AppShell;
