import React, { useEffect, useState } from 'react';
import { voicePresets } from '../data/phrases';

const STORAGE_KEY = 'artie-voice-settings';

function RobotVoiceMaker({ onComplete }) {
  const [text, setText] = useState('Hi! I am Artie, your robot science buddy!');
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [effect, setEffect] = useState(0);
  const [status, setStatus] = useState('Press play to hear your robot voice.');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setRate(parsed.rate ?? 1);
      setPitch(parsed.pitch ?? 1);
      setEffect(parsed.effect ?? 0);
      setText(parsed.text ?? text);
    }
  }, []);

  const playVoice = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = Number(rate);
    utterance.pitch = Number(pitch) + Number(effect) * 0.1;
    speechSynthesis.speak(utterance);
    setStatus('Great robot science! Listen for speed and pitch changes.');
    onComplete('Voice Inventor');
  };

  const saveSettings = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ text, rate, pitch, effect }));
    setStatus('Saved! Your settings are ready for next time.');
  };

  const applyPreset = (preset) => {
    setRate(preset.rate);
    setPitch(preset.pitch);
    setStatus(`Preset ready: ${preset.label}`);
  };

  return (
    <section className="rounded-3xl bg-white/90 p-5 shadow-lg" aria-labelledby="voice-title">
      <h3 id="voice-title" className="text-2xl font-bold text-emerald-700">Activity 3: Robot Voice Maker</h3>
      <p className="mt-2 rounded-2xl bg-emerald-50 p-3">Text-to-speech turns words into spoken sound. Prosody means how voice speed, pitch, and rhythm change expression.</p>

      <label className="mt-4 block font-bold" htmlFor="voiceText">Type your robot message:</label>
      <textarea id="voiceText" value={text} onChange={(e) => setText(e.target.value)} className="mt-2 w-full rounded-2xl border-2 border-emerald-200 p-3" rows={4} />

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <label className="rounded-2xl bg-sky-50 p-3">Speed: {rate}
          <input type="range" min="0.5" max="2" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} className="mt-2 w-full" />
        </label>
        <label className="rounded-2xl bg-violet-50 p-3">Pitch: {pitch}
          <input type="range" min="0.5" max="2" step="0.1" value={pitch} onChange={(e) => setPitch(e.target.value)} className="mt-2 w-full" />
        </label>
        <label className="rounded-2xl bg-amber-50 p-3">Robot Effect: {effect}
          <input type="range" min="0" max="5" step="1" value={effect} onChange={(e) => setEffect(e.target.value)} className="mt-2 w-full" />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {Object.values(voicePresets).map((preset) => (
          <button key={preset.label} onClick={() => applyPreset(preset)} className="rounded-full bg-white px-4 py-2 font-bold shadow">{preset.label}</button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={playVoice} className="rounded-full bg-emerald-600 px-5 py-3 font-bold text-white">Play</button>
        <button onClick={saveSettings} className="rounded-full bg-slate-700 px-5 py-3 font-bold text-white">Save My Settings</button>
      </div>

      <p className="mt-4 rounded-2xl bg-slate-100 p-3 font-semibold">{status}</p>
    </section>
  );
}

export default RobotVoiceMaker;
