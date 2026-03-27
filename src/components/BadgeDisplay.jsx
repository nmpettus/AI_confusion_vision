import React from 'react';

function BadgeDisplay({ badges }) {
  return (
    <section className="mb-6 rounded-3xl bg-white/90 p-5 shadow-lg">
      <h3 className="mb-3 text-lg font-bold text-violet-700">Badge Shelf ⭐</h3>
      <div className="flex flex-wrap gap-3">
        {badges.length ? (
          badges.map((badge) => (
            <span key={badge} className="animate-pop rounded-full bg-gradient-to-r from-amber-300 to-pink-300 px-4 py-2 font-bold text-slate-800">
              {badge}
            </span>
          ))
        ) : (
          <p>Complete activities to earn badges!</p>
        )}
      </div>
    </section>
  );
}

export default BadgeDisplay;
