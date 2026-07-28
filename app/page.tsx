"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const INTRO_FLAG = "popwars-intro-seen";

export default function IntroPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [skipVisible, setSkipVisible] = useState(true);
  const [openDisabled, setOpenDisabled] = useState(false);

  const introSceneRef = useRef<HTMLDivElement>(null);
  const gateWrapRef = useRef<HTMLDivElement>(null);
  const zeusRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const travelBoltRef = useRef<HTMLDivElement>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const thunderBufferRef = useRef<AudioBuffer | null>(null);
  const thunderLoadPromiseRef = useRef<Promise<AudioBuffer | null> | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(INTRO_FLAG) === "true") {
      router.replace("/home");
      return;
    }
    // One-time read of a browser-only API (localStorage) to decide whether to reveal the intro; no external subscription to set up.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReady(true);
  }, [router]);

  function getAudioCtx() {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    return audioCtxRef.current;
  }

  function loadThunderBuffer() {
    if (thunderLoadPromiseRef.current) return thunderLoadPromiseRef.current;
    const ctx = getAudioCtx();

    thunderLoadPromiseRef.current = fetch("/assets/audio/thunder.mp3")
      .then((response) => {
        if (!response.ok) throw new Error("Thunder audio not available");
        return response.arrayBuffer();
      })
      .then((arrayBuffer) => ctx.decodeAudioData(arrayBuffer))
      .then((buf) => {
        thunderBufferRef.current = buf;
        return buf;
      })
      .catch(() => null);

    return thunderLoadPromiseRef.current;
  }

  function scheduleThunder(delaySeconds: number) {
    const ctx = getAudioCtx();
    if (ctx.state === "suspended") ctx.resume();
    loadThunderBuffer()
      ?.then((buffer) => {
        if (!buffer) return;
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start(ctx.currentTime + delaySeconds);
      })
      .catch(() => {});
  }

  function showHomepage() {
    localStorage.setItem(INTRO_FLAG, "true");
    router.push("/home");
  }

  function playOpenSequence() {
    if (!introSceneRef.current || !gateWrapRef.current || !zeusRef.current || !flashRef.current || !travelBoltRef.current) return;

    setOpenDisabled(true);
    setSkipVisible(false);
    scheduleThunder(0.56);

    zeusRef.current.classList.add("striking");

    setTimeout(() => travelBoltRef.current?.classList.add("strike"), 200);
    setTimeout(() => flashRef.current?.classList.add("strike"), 560);
    setTimeout(() => gateWrapRef.current?.classList.add("open"), 780);
    setTimeout(() => introSceneRef.current?.classList.add("entering"), 1900);
    setTimeout(() => showHomepage(), 3600);
  }

  if (!ready) return null;

  return (
    <>
    <div ref={flashRef} id="flash" />
    <div id="intro-scene" ref={introSceneRef}>
      <div className="stars" />
      <div className="stars-far" />
      <div className="moon" />
      <div className="sheet-lightning flicker" />
      <div className="cloud c1" />
      <div className="cloud c2" />
      <div className="cloud c3" />

      <div className="embers">
        <span className="ember" style={{ left: "10%", animationDelay: "0s" }} />
        <span className="ember" style={{ left: "22%", animationDelay: "1.6s" }} />
        <span className="ember" style={{ left: "38%", animationDelay: "3.2s" }} />
        <span className="ember" style={{ left: "62%", animationDelay: ".8s" }} />
        <span className="ember" style={{ left: "78%", animationDelay: "2.4s" }} />
        <span className="ember" style={{ left: "90%", animationDelay: "4s" }} />
      </div>

      <div className="ruins ruins-left">
        <svg viewBox="0 0 120 300" preserveAspectRatio="xMidYMax meet">
          <rect x="15" y="252" width="90" height="20" fill="var(--sky-low)" opacity="0.6" />
          <rect x="24" y="30" width="72" height="16" fill="var(--sky-low)" opacity="0.6" />
          <rect x="32" y="46" width="14" height="206" fill="var(--sky-mid)" opacity="0.5" />
          <rect x="53" y="46" width="14" height="206" fill="var(--sky-mid)" opacity="0.5" />
          <rect x="74" y="46" width="14" height="150" fill="var(--sky-mid)" opacity="0.5" />
          <path d="M74 46 L88 46 L82 20 Z" fill="var(--sky-mid)" opacity="0.4" />
        </svg>
      </div>
      <div className="ruins ruins-right">
        <svg viewBox="0 0 120 300" preserveAspectRatio="xMidYMax meet">
          <rect x="15" y="252" width="90" height="20" fill="var(--sky-low)" opacity="0.6" />
          <rect x="24" y="30" width="72" height="16" fill="var(--sky-low)" opacity="0.6" />
          <rect x="32" y="46" width="14" height="206" fill="var(--sky-mid)" opacity="0.5" />
          <rect x="53" y="46" width="14" height="206" fill="var(--sky-mid)" opacity="0.5" />
          <rect x="32" y="46" width="14" height="120" fill="var(--sky-mid)" opacity="0.5" />
          <path d="M32 46 L46 46 L40 16 Z" fill="var(--sky-mid)" opacity="0.4" />
        </svg>
      </div>

      <div className="skyline">
        <svg viewBox="0 0 1000 260" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 260 L0 190 L60 190 L60 150 L100 150 L100 190 L170 190 L170 120 L185 90 L200 120 L200 190 L280 190 L280 160 L330 160 L330 190 L420 190 L420 100 L440 60 L460 100 L460 190 L560 190 L560 170 L610 170 L610 190 L700 190 L700 110 L720 75 L740 110 L740 190 L820 190 L820 155 L870 155 L870 190 L1000 190 L1000 260 Z"
            fill="var(--sky-low)"
            opacity="0.75"
          />
        </svg>
      </div>

      <div id="stage">
        <div className="zeus-wrap" ref={zeusRef}>
          <img className="zeus-layer" src="/assets/images/zeus-body.png" alt="Zeus body" />
          <img className="zeus-layer zeus-cape" src="/assets/images/zeus-cape.png" alt="Zeus cape" />
          <img className="zeus-layer zeus-arm" src="/assets/images/zeus-arm.png" alt="Zeus arm" />
          <img className="zeus-layer zeus-hair" src="/assets/images/zeus-hair.png" alt="Zeus hair" />
        </div>

        <div className="gate-wrap" ref={gateWrapRef}>
          <img className="gate-layer door-left" src="/assets/images/gate-left-door.png" alt="Gate left door" />
          <img className="gate-layer door-right" src="/assets/images/gate-right-door.png" alt="Gate right door" />
          <img className="gate-layer" src="/assets/images/gate-background.png" alt="Gate frame" />
        </div>

        <div className="traveling-bolt" ref={travelBoltRef}>
          <img src="/assets/images/bolt.png" alt="Traveling bolt" />
        </div>
      </div>

      <div className="intro-copy" style={{ position: "absolute", top: "8%", left: 0, right: 0 }}>
        <div className="eyebrow">Popwars Collectables</div>
        <h1>Welcome, Traveler.</h1>
        <p>The Vault of Legends awaits.</p>
      </div>

      <div className="intro-actions" style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <button className="btn-open" onClick={playOpenSequence} disabled={openDisabled}>
          ⚡ Open The Gates
        </button>
        {skipVisible && (
          <button className="btn-skip" onClick={showHomepage}>
            Skip Intro
          </button>
        )}
      </div>
    </div>
    </>
  );
}
