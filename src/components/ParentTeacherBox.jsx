import React from 'react';

function ParentTeacherBox() {
  return (
    <section className="mb-6 rounded-3xl border-2 border-emerald-300 bg-emerald-50 p-5 shadow">
      <h3 className="text-lg font-bold text-emerald-700">Parent / Teacher Note</h3>
      <p className="mt-2">
        This app does not collect personal information and runs in the browser. Encourage children to describe what changed when they spoke louder, slower, or with a different pitch.
      </p>
      <div className="mt-3 rounded-2xl bg-white p-3">
        <p className="font-semibold">Printable idea:</p>
        <p>Ask your child to draw each wave style (whisper, normal, singing) and write one sentence about speech AI patterns.</p>
      </div>
    </section>
  );
}

export default ParentTeacherBox;
