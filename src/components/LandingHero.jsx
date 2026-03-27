import React from 'react';

function LandingHero() {
  return (
    <section className="mb-8 grid gap-4 rounded-3xl bg-white/90 p-6 shadow-xl md:grid-cols-2">
      <div>
        <h2 className="text-2xl font-extrabold text-sky-700 md:text-3xl">Meet Artie 🤖</h2>
        <p className="mt-3 leading-relaxed">
          Welcome to your colorful robot workshop! We'll make waves, echo words, and build silly robot voices while learning how computers understand speech.
        </p>
        <p className="mt-3 rounded-2xl bg-emerald-100 p-3 font-semibold text-emerald-800">Awesome listening + Great robot science = Super learner badge!</p>
      </div>
      <div className="flex items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-200 to-violet-200 p-6 text-center">
        <div className="animate-float text-7xl" aria-hidden="true">🤖🎤🌈</div>
      </div>
    </section>
  );
}

export default LandingHero;
