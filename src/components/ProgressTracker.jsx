import React from 'react';

function ProgressTracker({ completed, total }) {
  const percent = Math.round((completed / total) * 100);
  return (
    <section className="mb-6 rounded-3xl bg-white/90 p-5 shadow-lg">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-bold text-sky-700">Progress Tracker</h3>
        <span className="font-bold">{percent}%</span>
      </div>
      <div className="h-5 overflow-hidden rounded-full bg-sky-100">
        <div className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 transition-all" style={{ width: `${percent}%` }} />
      </div>
    </section>
  );
}

export default ProgressTracker;
