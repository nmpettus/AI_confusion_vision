import React from 'react';

function ActivityCard({ title, description, status }) {
  return (
    <article className="rounded-3xl border-2 border-white bg-white/90 p-4 shadow-md">
      <h3 className="text-xl font-bold text-violet-700">{title}</h3>
      <p className="mt-2 text-sm md:text-base">{description}</p>
      <p className="mt-3 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">{status}</p>
    </article>
  );
}

export default ActivityCard;
