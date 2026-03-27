import React, { useEffect, useMemo, useState } from 'react';
import AppShell from './components/AppShell';
import Header from './components/Header';
import LandingHero from './components/LandingHero';
import ActivityCard from './components/ActivityCard';
import ProgressTracker from './components/ProgressTracker';
import SoundWaveVisualizer from './components/SoundWaveVisualizer';
import EchoGame from './components/EchoGame';
import RobotVoiceMaker from './components/RobotVoiceMaker';
import BadgeDisplay from './components/BadgeDisplay';
import ParentTeacherBox from './components/ParentTeacherBox';
import Footer from './components/Footer';

const PROGRESS_KEY = 'artie-progress-v1';

function App() {
  const [completed, setCompleted] = useState([]);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(PROGRESS_KEY);
    if (saved) setCompleted(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(completed));
  }, [completed]);

  const handleComplete = (badge) => {
    setCompleted((prev) => (prev.includes(badge) ? prev : [...prev, badge]));
  };

  const badges = useMemo(() => completed, [completed]);

  const speakInstructions = () => {
    const instructions = 'Welcome to Arties Voice Lab. Complete three activities: sound waves, echo game, and robot voice maker.';
    const utterance = new SpeechSynthesisUtterance(instructions);
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
  };

  return (
    <AppShell highContrast={highContrast} largeText={largeText}>
      <Header
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        largeText={largeText}
        setLargeText={setLargeText}
        speakInstructions={speakInstructions}
      />

      <LandingHero />

      <section className="mb-6 grid gap-4 md:grid-cols-3">
        <ActivityCard title="1. Sound Wave Visualizer" description="See loud and quiet sounds as animated wave shapes." status={completed.includes('Wave Explorer') ? 'Completed 🎉' : 'Try me'} />
        <ActivityCard title="2. Artie's Echo Game" description="Listen, repeat, and earn stars through 5 fun levels." status={completed.includes('Echo Champion') ? 'Completed 🎉' : 'Try me'} />
        <ActivityCard title="3. Robot Voice Maker" description="Transform text into fun robot speech with controls." status={completed.includes('Voice Inventor') ? 'Completed 🎉' : 'Try me'} />
      </section>

      <ProgressTracker completed={completed.length} total={3} />
      <BadgeDisplay badges={badges} />

      <div className="space-y-6">
        <SoundWaveVisualizer onComplete={handleComplete} />
        <EchoGame onComplete={handleComplete} />
        <RobotVoiceMaker onComplete={handleComplete} />
      </div>

      <section className="my-6 rounded-3xl bg-white/90 p-5 shadow-lg">
        <h3 className="text-xl font-bold text-fuchsia-700">What did we learn?</h3>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>Sound creates wave patterns from vibrations.</li>
          <li>Speech tools detect patterns and improve with clear audio.</li>
          <li>Text-to-speech changes voice feeling using speed and pitch.</li>
        </ul>
      </section>

      <ParentTeacherBox />
      <Footer />
    </AppShell>
  );
}

export default App;
