import React, { useEffect, useRef, useState } from 'react';

function SoundWaveVisualizer({ onComplete }) {
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const streamRef = useRef(null);
  const animationRef = useRef(null);

  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState([]);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas || !analyserRef.current) return;

    const ctx = canvas.getContext('2d');
    const bufferLength = analyserRef.current.fftSize;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      analyserRef.current.getByteTimeDomainData(dataArray);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ecfeff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#7c3aed';
      ctx.beginPath();

      const sliceWidth = (canvas.width * 1.0) / bufferLength;
      let x = 0;
      let sum = 0;

      for (let i = 0; i < bufferLength; i += 1) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;
        sum += Math.abs(dataArray[i] - 128);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      const avg = sum / bufferLength;
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 18px Trebuchet MS';
      ctx.fillText(avg > 18 ? 'Loud = Big Waves' : 'Quiet = Small Waves', 16, 28);
      animationRef.current = requestAnimationFrame(render);
    };

    render();
  };

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;
      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      sourceRef.current.connect(analyserRef.current);
      setIsListening(true);
      draw();
    } catch (error) {
      setFeedback((prev) => [...prev, 'Microphone access was blocked. Ask a grown-up for help.']);
    }
  };

  const stopListening = () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    streamRef.current?.getTracks().forEach((track) => track.stop());
    audioContextRef.current?.close();
    setIsListening(false);
  };

  const addChallengeFeedback = (label) => {
    const messages = {
      whisper: 'Nice! Whispering made smaller waves.',
      normal: 'Great! Talking normally made medium waves.',
      sing: 'Wow! Singing made energetic wave patterns.'
    };
    setFeedback((prev) => [...prev, messages[label]]);
    onComplete('Wave Explorer');
  };

  useEffect(() => () => stopListening(), []);

  return (
    <section className="rounded-3xl bg-white/90 p-5 shadow-lg" aria-labelledby="wave-title">
      <h3 id="wave-title" className="text-2xl font-bold text-sky-700">Activity 1: Sound Wave Visualizer</h3>
      <p className="mt-2">We'll use your microphone to see vibrations as moving waves. You are in control and can stop any time.</p>
      <p className="mt-3 rounded-2xl bg-cyan-50 p-3 text-sm md:text-base">Sound is made of vibrations. Your microphone hears those vibrations and turns them into signals a computer can read.</p>

      <canvas ref={canvasRef} width={800} height={220} className="mt-4 w-full rounded-2xl border-2 border-cyan-200" aria-label="Live sound wave visualizer" />

      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={startListening} className="rounded-full bg-emerald-600 px-5 py-3 font-bold text-white" disabled={isListening}>Start Listening</button>
        <button onClick={stopListening} className="rounded-full bg-rose-500 px-5 py-3 font-bold text-white">Stop</button>
        <button onClick={() => setFeedback([])} className="rounded-full bg-violet-600 px-5 py-3 font-bold text-white">Reset</button>
      </div>

      <div className="mt-4 rounded-2xl bg-amber-50 p-4">
        <p className="font-bold">Mini Challenge:</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <button className="rounded-xl bg-white px-4 py-2 shadow" onClick={() => addChallengeFeedback('whisper')}>Try whispering</button>
          <button className="rounded-xl bg-white px-4 py-2 shadow" onClick={() => addChallengeFeedback('normal')}>Try talking normally</button>
          <button className="rounded-xl bg-white px-4 py-2 shadow" onClick={() => addChallengeFeedback('sing')}>Try singing</button>
        </div>
      </div>

      <div className="mt-4 grid gap-2 md:grid-cols-2">
        {feedback.map((item, idx) => (
          <div key={`${item}-${idx}`} className="rounded-2xl bg-fuchsia-100 p-3 font-semibold text-fuchsia-800">{item}</div>
        ))}
      </div>
    </section>
  );
}

export default SoundWaveVisualizer;
