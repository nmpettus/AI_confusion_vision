import React, { useMemo, useState } from 'react';
import { echoPhrases } from '../data/phrases';

function EchoGame({ onComplete }) {
  const [level, setLevel] = useState(0);
  const [stars, setStars] = useState(0);
  const [recognized, setRecognized] = useState('');
  const [message, setMessage] = useState('Tap "Artie Says" to hear the phrase.');
  const [manualCheck, setManualCheck] = useState(false);

  const currentPhrase = echoPhrases[level];
  const SpeechRecognition = useMemo(() => window.SpeechRecognition || window.webkitSpeechRecognition, []);

  const speakPhrase = () => {
    const utterance = new SpeechSynthesisUtterance(currentPhrase);
    utterance.rate = 0.95;
    utterance.pitch = 1.1;
    speechSynthesis.speak(utterance);
  };

  const nextLevel = () => {
    const newStars = stars + 1;
    setStars(newStars);
    if (level < echoPhrases.length - 1) {
      setLevel(level + 1);
      setRecognized('');
      setMessage('Great job! Ready for the next level?');
    } else {
      setMessage('Level complete! Awesome listening! ⭐');
      onComplete('Echo Champion');
    }
  };

  const startRecognition = () => {
    if (!SpeechRecognition) {
      setManualCheck(true);
      setMessage('This browser has no speech recognition. Use self-check and continue!');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const heard = event.results[0][0].transcript;
      setRecognized(heard);
      if (heard.toLowerCase().includes(currentPhrase.toLowerCase().replace(/[?.,]/g, ''))) {
        setMessage('Great match! AI heard your pattern clearly.');
      } else {
        setMessage('Close try! Speak slowly and clearly, then try again.');
      }
    };

    recognition.onerror = () => setMessage('Oops! We could not hear that. Try again.');
    recognition.start();
  };

  return (
    <section className="rounded-3xl bg-white/90 p-5 shadow-lg" aria-labelledby="echo-title">
      <h3 id="echo-title" className="text-2xl font-bold text-violet-700">Activity 2: Artie's Echo Game</h3>
      <p className="mt-2 rounded-2xl bg-violet-50 p-3">AI hears patterns in speech and works better when speech is clear.</p>
      <p className="mt-3 text-lg font-bold">Level {level + 1} / 5</p>
      <p className="mt-2 rounded-2xl bg-cyan-100 p-4 text-2xl font-extrabold">“{currentPhrase}”</p>
      <p className="mt-2 text-sm">Captions: Artie says the phrase above.</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={speakPhrase} className="rounded-full bg-cyan-600 px-5 py-3 font-bold text-white">Artie Says</button>
        <button onClick={startRecognition} className="rounded-full bg-emerald-600 px-5 py-3 font-bold text-white">I Repeat</button>
        <button onClick={nextLevel} className="rounded-full bg-fuchsia-600 px-5 py-3 font-bold text-white">Next Level</button>
      </div>

      {manualCheck && (
        <div className="mt-4 rounded-2xl bg-amber-100 p-3">
          <p className="font-semibold">Self-check mode:</p>
          <p>Did your spoken phrase match? Ask a parent/teacher, then tap Next Level.</p>
        </div>
      )}

      <div className="mt-4 rounded-2xl bg-slate-100 p-3">
        <p><strong>Heard:</strong> {recognized || 'Waiting...'}</p>
        <p className="mt-2 font-semibold text-slate-700">{message}</p>
        <p className="mt-2 text-xl">Stars: {'⭐'.repeat(stars)}</p>
      </div>
    </section>
  );
}

export default EchoGame;
