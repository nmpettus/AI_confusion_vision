# Artie's Voice Lab (React + Vite + Tailwind)

A child-friendly educational web app (ages 7–12) for **Maggie's AI Adventure Book 2**.

## 1) Folder structure

```
.
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── src
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── data
│   │   └── phrases.js
│   └── components
│       ├── ActivityCard.jsx
│       ├── AppShell.jsx
│       ├── BadgeDisplay.jsx
│       ├── EchoGame.jsx
│       ├── Footer.jsx
│       ├── Header.jsx
│       ├── LandingHero.jsx
│       ├── ParentTeacherBox.jsx
│       ├── ProgressTracker.jsx
│       ├── RobotVoiceMaker.jsx
│       └── SoundWaveVisualizer.jsx
```

## 2) Setup instructions

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Open the local URL shown by Vite.

## 3) Browser compatibility notes

- **Wave visualizer (Web Audio API + getUserMedia):** works in modern Chrome, Edge, Firefox, Safari with microphone permission.
- **SpeechSynthesis:** available in most modern browsers.
- **SpeechRecognition:** best support in Chromium browsers. App includes self-check fallback where unavailable.

## 4) Custom illustrations later (Maggie/Riley/Artie)

- Replace emoji mascot in `src/components/LandingHero.jsx` with `<img>` or SVG.
- Keep alt text child-friendly and descriptive.
- Place local files in `src/assets/` and import into components.

## 5) Suggested improvements

- Add particle confetti library for richer celebrations.
- Add printable completion certificate component.
- Add multilingual phrases for ESL support.
- Add parent dashboard export (local-only PDF) for class usage.

## 6) Notes on placeholder audio/images

- Current audio uses built-in browser voices.
- For custom Artie voice, connect to a safe TTS API later.
- For custom character art, replace mascot placeholders with approved illustration packs.

## 7) Privacy & child safety

- No personal info collected
- No ads
- No unsafe external links
- Browser localStorage only for progress/settings
