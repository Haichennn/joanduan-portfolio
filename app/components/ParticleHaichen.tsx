"use client";

import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";

const PARTICLE_COUNT_DESKTOP = 12000;
const PARTICLE_COUNT_MOBILE = 3800;
const REPEL_RADIUS = 160;
const REPEL_STRENGTH = 1.5;
const RETURN_STRENGTH = 0.08;
const FRICTION = 0.86;
const ENTRANCE_DURATION_MS = 2000;
const PARTICLE_SIZE = 1.5;

const CLAIR_DE_LUNE: [string, string][] = [
  ["F5", "4n"],
  ["Ab5", "4n"],
  ["F5", "4n"],
  ["Db5", "2n"],
  ["F5", "4n"],
  ["Ab5", "4n"],
  ["Db6", "4n"],
  ["C6", "2n"],
  ["Bb5", "4n"],
  ["Ab5", "4n"],
  ["F5", "4n"],
  ["Eb5", "2n"],
];

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  startX: number;
  startY: number;
  color: string;
};

export default function ParticleHaichen() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const entranceStartRef = useRef<number | null>(null);

  const synthRef = useRef<Tone.PolySynth | null>(null);
  const reverbRef = useRef<Tone.Reverb | null>(null);
  const loopRef = useRef<Tone.Loop | null>(null);
  const audioUnlockedRef = useRef(false);
  const isPlayingRef = useRef(false);
  const fadeOutTimerRef = useRef<number | null>(null);

  const [audioUnlocked, setAudioUnlocked] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;

    function setupParticles() {
      if (!canvas || !container) return;

      const rect = container.getBoundingClientRect();
      const isMobile = window.innerWidth < 768;
      const particleCount = isMobile
        ? PARTICLE_COUNT_MOBILE
        : PARTICLE_COUNT_DESKTOP;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";

      const offscreen = document.createElement("canvas");
      offscreen.width = rect.width * dpr;
      offscreen.height = rect.height * dpr;
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return;

      const fontSize = isMobile ? 88 : 220;
      offCtx.scale(dpr, dpr);
      offCtx.fillStyle = "#1A1A1A";
      offCtx.font = `400 ${fontSize}px "Fraunces", "Times New Roman", serif`;
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";

      const safeWidth = rect.width * 0.92;
      const measured = offCtx.measureText("HAICHEN");
      const scale = measured.width > safeWidth ? safeWidth / measured.width : 1;
      const effectiveFontSize = fontSize * scale;
      offCtx.font = `400 ${effectiveFontSize}px "Fraunces", "Times New Roman", serif`;

      offCtx.fillText("HAICHEN", rect.width / 2, rect.height / 2);

      const imageData = offCtx.getImageData(
        0,
        0,
        offscreen.width,
        offscreen.height
      );
      const data = imageData.data;

      const textPixels: { x: number; y: number }[] = [];
      for (let y = 0; y < offscreen.height; y += 1) {
        for (let x = 0; x < offscreen.width; x += 1) {
          const idx = (y * offscreen.width + x) * 4;
          if (data[idx + 3] > 128) {
            textPixels.push({ x: x / dpr, y: y / dpr });
          }
        }
      }

      if (textPixels.length === 0) return;

      const particles: Particle[] = [];
      const targetCount = Math.min(particleCount, textPixels.length);

      const shuffled = [...textPixels];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      const selectedPixels = shuffled.slice(0, targetCount);

      const PALETTE = [
        "#1A1A1A", "#1A1A1A", "#1A1A1A", "#1A1A1A", "#1A1A1A", "#1A1A1A", "#1A1A1A", "#1A1A1A",
        "#A0673E",
        "#5A4A3A",
      ];

      for (let i = 0; i < selectedPixels.length; i++) {
        const pixel = selectedPixels[i];
        const angle = Math.random() * Math.PI * 2;
        const dist =
          Math.max(rect.width, rect.height) * (0.6 + Math.random() * 0.3);
        const sx = rect.width / 2 + Math.cos(angle) * dist;
        const sy = rect.height / 2 + Math.sin(angle) * dist;
        const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        particles.push({
          x: sx,
          y: sy,
          vx: 0,
          vy: 0,
          tx: pixel.x,
          ty: pixel.y,
          startX: sx,
          startY: sy,
          color,
        });
      }

      particlesRef.current = particles;
      entranceStartRef.current = performance.now();
    }

    setupParticles();

    let resizeTimer: number;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(setupParticles, 200);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function onMove(e: MouseEvent) {
      const rect = container!.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
      startMelodyIfUnlocked();
    }
    function onLeave() {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
      fadeOutMelody();
    }

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);
    return () => {
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let animationId: number;

    function tick() {
      if (!canvas || !ctx) return;
      const particles = particlesRef.current;
      if (particles.length === 0) {
        animationId = requestAnimationFrame(tick);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      const now = performance.now();
      const entranceStart = entranceStartRef.current ?? now;
      const entranceProgress = Math.min(
        1,
        (now - entranceStart) / ENTRANCE_DURATION_MS
      );
      const easeOut = 1 - Math.pow(1 - entranceProgress, 3);

      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.fillStyle = p.color;

        if (entranceProgress < 1) {
          p.x = p.startX + (p.tx - p.startX) * easeOut;
          p.y = p.startY + (p.ty - p.startY) * easeOut;
        } else {
          if (Math.abs(p.x - p.tx) > 0.5 || Math.abs(p.y - p.ty) > 0.5) {
            // Continue physics
          }

          if (mouse.active) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < REPEL_RADIUS * REPEL_RADIUS && distSq > 0.1) {
              const dist = Math.sqrt(distSq);
              const force =
                ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_STRENGTH;
              p.vx += (dx / dist) * force;
              p.vy += (dy / dist) * force;
            }
          }

          p.vx += (p.tx - p.x) * RETURN_STRENGTH;
          p.vy += (p.ty - p.y) * RETURN_STRENGTH;

          p.vx *= FRICTION;
          p.vy *= FRICTION;

          p.x += p.vx;
          p.y += p.vy;
        }

        ctx.fillRect(p.x, p.y, PARTICLE_SIZE, PARTICLE_SIZE);
      }

      ctx.restore();
      animationId = requestAnimationFrame(tick);
    }

    tick();
    return () => cancelAnimationFrame(animationId);
  }, []);

  useEffect(() => {
    async function unlock() {
      if (audioUnlockedRef.current) return;
      try {
        await Tone.start();

        const reverb = new Tone.Reverb({ decay: 4, wet: 0.55 }).toDestination();
        const synth = new Tone.PolySynth(Tone.FMSynth, {
          harmonicity: 3,
          modulationIndex: 8,
          envelope: { attack: 0.01, decay: 0.6, sustain: 0.05, release: 1.8 },
          modulationEnvelope: {
            attack: 0.01,
            decay: 0.4,
            sustain: 0,
            release: 0.4,
          },
        }).connect(reverb);
        synth.volume.value = -16;

        synthRef.current = synth;
        reverbRef.current = reverb;

        audioUnlockedRef.current = true;
        setAudioUnlocked(true);
      } catch (e) {
        console.error("Audio unlock failed", e);
      }
    }

    window.addEventListener("click", unlock, { once: true });
    window.addEventListener("touchstart", unlock, { once: true });

    return () => {
      window.removeEventListener("click", unlock);
      window.removeEventListener("touchstart", unlock);
    };
  }, []);

  function startMelodyIfUnlocked() {
    if (!audioUnlockedRef.current) return;
    if (isPlayingRef.current) return;
    if (!synthRef.current) return;

    if (fadeOutTimerRef.current) {
      clearTimeout(fadeOutTimerRef.current);
      fadeOutTimerRef.current = null;
    }

    synthRef.current.volume.cancelScheduledValues(Tone.now());
    synthRef.current.volume.value = -16;

    isPlayingRef.current = true;

    let noteIndex = 0;
    const loop = new Tone.Loop((time) => {
      if (!synthRef.current) return;
      const [note, duration] = CLAIR_DE_LUNE[noteIndex % CLAIR_DE_LUNE.length];
      synthRef.current.triggerAttackRelease(note, duration, time);
      noteIndex++;
    }, "0:1:0");

    Tone.Transport.bpm.value = 56;
    loop.start(0);
    Tone.Transport.start();
    loopRef.current = loop;
  }

  function fadeOutMelody() {
    if (!isPlayingRef.current) return;
    if (!synthRef.current) return;

    synthRef.current.volume.rampTo(-60, 1);

    fadeOutTimerRef.current = window.setTimeout(() => {
      if (loopRef.current) {
        loopRef.current.stop();
        loopRef.current.dispose();
        loopRef.current = null;
      }
      Tone.Transport.stop();
      isPlayingRef.current = false;
      fadeOutTimerRef.current = null;
    }, 1100);
  }

  useEffect(() => {
    return () => {
      if (fadeOutTimerRef.current) clearTimeout(fadeOutTimerRef.current);
      loopRef.current?.stop();
      loopRef.current?.dispose();
      Tone.Transport.stop();
      synthRef.current?.dispose();
      reverbRef.current?.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[150px] md:h-[260px]"
      aria-label="HAICHEN"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />

      <span
        className={`absolute bottom-2 right-2 font-mono text-[9px] tracking-[0.2em] uppercase transition-opacity duration-500 ${
          audioUnlocked
            ? "text-[var(--accent)]/60 opacity-100"
            : "text-[var(--mute)]/40 opacity-60"
        }`}
        aria-live="polite"
      >
        {audioUnlocked ? "♪ ready · hover me" : "♪ click anywhere to unlock"}
      </span>
    </div>
  );
}
