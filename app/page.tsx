"use client";

import { useEffect, useState } from "react";

interface Ember {
  id: number;
  left: number;
  duration: number;
  delay: number;
  drift: number;
}

export default function ComingSoon() {
  const [embers, setEmbers] = useState<Ember[]>([]);
  const [rattling, setRattling] = useState(false);
  const [note, setNote] = useState("No spam. One knock when the gates open.");

  useEffect(() => {
    const count = typeof window !== "undefined" && window.innerWidth < 600 ? 12 : 22;
    setEmbers(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        duration: 6 + Math.random() * 7,
        delay: Math.random() * 10,
        drift: Math.random() * 60 - 30,
      }))
    );
  }, []);

  const handleGateClick = () => {
    if (rattling) return;
    setRattling(true);
    setNote("The gate holds firm. Not yet...");
    setTimeout(() => {
      setRattling(false);
      setNote("No spam. One knock when the gates open.");
    }, 1800);
  };

  return (
    <>
      <div className="bg" />
      <div className="vignette" />

      <div className="gate" aria-hidden="true">
        <svg viewBox="0 0 800 900" preserveAspectRatio="xMidYMax meet">
          <defs>
            <linearGradient id="stone" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2A2420" />
              <stop offset="50%" stopColor="#1C1815" />
              <stop offset="100%" stopColor="#0F0C0A" />
            </linearGradient>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E6603F" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#7A1F24" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#7A1F24" stopOpacity="0" />
            </radialGradient>
          </defs>

          <g className={`gate-leaves ${rattling ? "rattle" : ""}`}>
            <path d="M20,900 L20,120 Q20,40 140,20 L370,20 L370,900 Z" fill="url(#stone)" />
            <path d="M780,900 L780,120 Q780,40 660,20 L430,20 L430,900 Z" fill="url(#stone)" />

            <g fill="#4A4038" opacity="0.9">
              <circle cx="70" cy="140" r="6" /><circle cx="140" cy="110" r="6" /><circle cx="230" cy="95" r="6" /><circle cx="320" cy="100" r="6" />
              <circle cx="70" cy="300" r="6" /><circle cx="320" cy="300" r="6" />
              <circle cx="70" cy="470" r="6" /><circle cx="320" cy="470" r="6" />
              <circle cx="70" cy="640" r="6" /><circle cx="320" cy="640" r="6" />
              <circle cx="70" cy="800" r="6" /><circle cx="320" cy="800" r="6" />
            </g>
            <g fill="#4A4038" opacity="0.9">
              <circle cx="730" cy="140" r="6" /><circle cx="660" cy="110" r="6" /><circle cx="570" cy="95" r="6" /><circle cx="480" cy="100" r="6" />
              <circle cx="730" cy="300" r="6" /><circle cx="480" cy="300" r="6" />
              <circle cx="730" cy="470" r="6" /><circle cx="480" cy="470" r="6" />
              <circle cx="730" cy="640" r="6" /><circle cx="480" cy="640" r="6" />
              <circle cx="730" cy="800" r="6" /><circle cx="480" cy="800" r="6" />
            </g>

            <g stroke="#050403" strokeWidth="3" opacity="0.6" fill="none">
              <rect x="55" y="150" width="240" height="180" />
              <rect x="55" y="360" width="240" height="180" />
              <rect x="55" y="570" width="240" height="220" />
              <rect x="505" y="150" width="240" height="180" />
              <rect x="505" y="360" width="240" height="180" />
              <rect x="505" y="570" width="240" height="220" />
            </g>
          </g>

          <rect x="365" y="15" width="70" height="885" fill="url(#glow)" className="gate-glow" />
          <rect x="393" y="15" width="14" height="885" fill="#F4C9A0" opacity="0.9" className="gate-glow" />
        </svg>
      </div>

      <button className="gate-clickable" onClick={handleGateClick} aria-label="Try the gate" />

      <div className="embers" aria-hidden="true">
        {embers.map((e) => (
          <div
            key={e.id}
            className="ember"
            style={{
              left: `${e.left}vw`,
              animationDuration: `${e.duration}s`,
              animationDelay: `${e.delay}s`,
              ["--drift" as string]: `${e.drift}px`,
            }}
          />
        ))}
      </div>

      <main className="stage">
        <div className="brandmark" role="img" aria-label="PopWars Collectables — crossed Spartan warriors beneath a crowned helm">
          <div className="brandmark-row">
            {/* PASTE YOUR <img class="warrior warrior-left" ...> TAG HERE, exactly as in your original index.html */}

            <svg className="helmet-icon" viewBox="160 30 360 320" aria-hidden="true">
              <path d="M340,110 L280,105 L285,55 L310,80 L340,40 L370,80 L395,55 L400,105 L360,110 Z" fill="#7A1F24" />
              <circle cx="285" cy="55" r="5" fill="#7A1F24" stroke="#3A0E10" strokeWidth="1" />
              <circle cx="340" cy="40" r="6" fill="#7A1F24" stroke="#3A0E10" strokeWidth="1" />
              <circle cx="395" cy="55" r="5" fill="#7A1F24" stroke="#3A0E10" strokeWidth="1" />
              <path
                fill="#141210"
                fillRule="evenodd"
                d="M340,130 C365,130 385,138 400,155 C415,172 420,195 415,220 C410,245 425,260 440,270 C450,277 448,290 438,296 C425,304 415,318 410,332 C405,334 402,336 400,336 L340,340 L280,336 C278,336 275,334 270,332 C265,318 255,304 242,296 C232,290 230,277 240,270 C255,260 270,245 265,220 C260,195 265,172 280,155 C295,138 315,130 340,130 Z M325,160 L355,160 L355,190 L395,190 L395,220 L355,220 L355,330 L325,330 L325,220 L285,220 L285,190 L325,190 Z"
              />
            </svg>

            {/* PASTE YOUR <img class="warrior warrior-right" ...> TAG HERE, exactly as in your original index.html */}
          </div>
          <div className="ground-line" />
          <div className="wordmark">POPWARS</div>
          <div className="sub-row">
            <span className="rule" /><span className="label">Collectables</span><span className="rule" />
          </div>
        </div>

        <div className="text-vignette" />

        <p className="eyebrow">The gates are being forged</p>
        <h1>Something worth<br /><span>collecting</span> is coming</h1>
        <p className="sub">Popwars Collectables is arriving soon — a home for the figures, statues and rare pieces that turn a shelf into a story. Be the first through the gates when they open.</p>

        <a href="https://chat.whatsapp.com/J1mwXMH6LH79bguu4PcaaM" target="_blank" rel="noopener noreferrer" className="whatsapp-btn">💬 Join our WhatsApp Group</a>
        <p className="note">{note}</p>

        <div className="socials">
          <a href="https://www.instagram.com/popwars_collectables/" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
          <a href="mailto:popwarscollectable@gmail.com">EMAIL</a>
        </div>

        <footer>© {new Date().getFullYear()} Popwars Collectables. Every shelf tells a story.</footer>
      </main>
    </>
  );
}