import React from 'react';

function Header({ highContrast, setHighContrast, largeText, setLargeText, speakInstructions }) {
  return (
    <header className="mb-6 rounded-3xl bg-white/90 p-4 shadow-lg md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-violet-700 md:text-4xl">Artie's Voice Lab - Let's Explore Sound!</h1>
          <p className="mt-2 text-sm md:text-base">A playful science lab from Maggie's AI Adventure Book 2.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setHighContrast(!highContrast)} className="rounded-full bg-slate-900 px-4 py-2 font-bold text-white" aria-label="Toggle high contrast mode">
            {highContrast ? 'Normal Colors' : 'High Contrast'}
          </button>
          <button onClick={() => setLargeText(!largeText)} className="rounded-full bg-fuchsia-600 px-4 py-2 font-bold text-white" aria-label="Toggle larger text">
            {largeText ? 'Standard Text' : 'Larger Text'}
          </button>
          <button onClick={speakInstructions} className="rounded-full bg-cyan-600 px-4 py-2 font-bold text-white" aria-label="Read instructions aloud">
            Read Instructions
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
