"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
// Type-only import — stripped at compile time, contributes zero runtime
// bytes to the initial JS bundle. The actual Tone module is dynamically
// imported on first user gesture inside preload()/play() so the ~80KB
// Tone.js payload only ships when the audio affordance is engaged.
import type { PolySynth, Reverb, Loop } from "tone";

// Cached module reference. Populated by the first call to getTone() and
// reused by subsequent calls so a hover → click sequence does not re-fetch
// the chunk. Held at module scope (not in a ref) because there is exactly
// one Tone runtime per page and it is safe to share across remounts.
let ToneModule: typeof import("tone") | null = null;
async function getTone(): Promise<typeof import("tone")> {
  if (!ToneModule) {
    ToneModule = await import("tone");
  }
  return ToneModule;
}

/**
 * Clair de Lune fragment (motif from the opening bars). Stored here in the
 * audio module so the particle canvas component stays purely visual. The
 * notes are unchanged from the prior inline definition in ParticleHaichen,
 * so the audible tone is identical to what users heard before the decouple.
 */
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

export type AudioState = "idle" | "loading" | "ready" | "playing" | "error";

type AudioContextValue = {
  state: AudioState;
  /**
   * Constructs the synth+reverb graph WITHOUT starting AudioContext. Safe
   * to call from non-gesture handlers (e.g. onMouseEnter). Transitions
   * idle → loading → ready. No-op when state is anything else.
   */
  preload: () => Promise<void>;
  /**
   * Starts the AudioContext (Tone.start) and the melody loop. MUST be
   * called from inside a confirmed user-gesture handler (click / tap /
   * keydown). Safari and increasingly Chrome reject AudioContext.resume()
   * from hover/mouseenter events, which is why preload is separate.
   * Transitions idle/ready → loading (if synth needs lazy build) → playing.
   */
  play: () => Promise<void>;
  /** Fades out the loop over 1s and transitions playing → ready. */
  stop: () => void;
};

const Ctx = createContext<AudioContextValue | null>(null);

/**
 * Consumer hook. Throws if used outside <AudioProvider> so missing wiring
 * surfaces at first render rather than producing silent no-op buttons.
 */
export function useAudio(): AudioContextValue {
  const value = useContext(Ctx);
  if (!value) {
    throw new Error("useAudio must be used inside <AudioProvider>");
  }
  return value;
}

/**
 * Provider that owns the Tone.js audio graph and exposes preload/play/
 * stop/state. Mounted once at the app shell level so audio state persists
 * across section scrolling — the user can start audio in Hero, scroll to
 * Interview Me, and the SideNav affordance still owns the same engine.
 *
 * Architecture (Safari-safe, post-debug):
 *
 * 1. preload() runs in non-gesture context (hover). Builds the PolySynth
 *    and Reverb but does NOT call Tone.start(). The AudioContext stays
 *    suspended. State: idle → loading → ready.
 *
 * 2. play() runs in confirmed user-gesture context (click). Calls
 *    Tone.start() which resumes the AudioContext, then starts the loop.
 *    State: ready (or idle, with lazy build) → playing.
 *
 * Splitting preload from play is required because Safari (and recent
 * Chrome) do not consider mouseenter a confirmed user gesture for
 * AudioContext.resume(). Calling Tone.start() from a hover handler causes
 * the returned Promise to never resolve, leaving state stuck on 'loading'.
 *
 * Tab title side effect: while state === 'playing', a speaker emoji is
 * prepended to document.title; restored on every transition away.
 */
export function AudioProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AudioState>("idle");

  // State setter wrapper. Keeps a ref mirror of the current state so
  // play()/stop() can read the latest value from inside their useCallback
  // bodies without needing it in the dependency array (which would
  // recreate the callback on every transition and invalidate consumers).
  const stateRef = useRef<AudioState>("idle");
  stateRef.current = state;
  const setAudioState = useCallback((next: AudioState) => {
    setState(next);
  }, []);

  const synthRef = useRef<PolySynth | null>(null);
  const reverbRef = useRef<Reverb | null>(null);
  const loopRef = useRef<Loop | null>(null);
  const fadeOutTimerRef = useRef<number | null>(null);

  // Document title side effect.
  const originalTitleRef = useRef<string | null>(null);
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (state === "playing") {
      if (originalTitleRef.current === null) {
        originalTitleRef.current = document.title;
      }
      const base = originalTitleRef.current ?? document.title;
      if (!document.title.startsWith("🔊 ")) {
        document.title = "🔊 " + base;
      }
    } else if (originalTitleRef.current !== null) {
      document.title = originalTitleRef.current;
    }
  }, [state]);

  // Helper: build the synth graph using the dynamically-loaded Tone module.
  // Pure node-graph construction; no AudioContext interaction beyond what
  // `new Tone.Reverb` schedules internally (which is allowed in suspended
  // state). Caller is responsible for fetching the module via getTone().
  function buildSynthIfNeeded(Tone: typeof import("tone")) {
    if (synthRef.current) return;
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
  }

  const preload = useCallback(async () => {
    // Only run preload from idle. Re-hover after preload is a no-op.
    if (stateRef.current !== "idle") return;
    try {
      setAudioState("loading");
      // First call to getTone() fetches the Tone.js chunk (~80KB gzipped).
      // Subsequent calls return the cached module instantly.
      const Tone = await getTone();
      buildSynthIfNeeded(Tone);
      setAudioState("ready");
    } catch (e) {
      console.error("[AmbientAudio] preload failed:", e);
      setAudioState("error");
    }
  }, [setAudioState]);

  const stop = useCallback(() => {
    if (!synthRef.current) return;
    if (stateRef.current !== "playing") return;
    // Tone module is guaranteed loaded here because stop() is only
    // reachable from the playing state, which requires play() to have
    // run and populated ToneModule. Fall back to a no-op transport stop
    // if for any reason it's null.
    synthRef.current.volume.rampTo(-60, 1);
    fadeOutTimerRef.current = window.setTimeout(() => {
      if (loopRef.current) {
        loopRef.current.stop();
        loopRef.current.dispose();
        loopRef.current = null;
      }
      ToneModule?.Transport.stop();
      fadeOutTimerRef.current = null;
      setAudioState("ready");
    }, 1100);
  }, [setAudioState]);

  const play = useCallback(async () => {
    if (stateRef.current === "playing" || stateRef.current === "loading") {
      return;
    }
    if (stateRef.current === "error") return;

    // Cancel any in-flight fade-out so click-during-fade restarts cleanly.
    if (fadeOutTimerRef.current) {
      window.clearTimeout(fadeOutTimerRef.current);
      fadeOutTimerRef.current = null;
    }

    try {
      // Lazy-build the synth if hover-preload never ran (e.g. mobile tap
      // path with no hover). The dynamic Tone import runs here in that
      // case; preload already cached the module otherwise.
      if (!synthRef.current) {
        setAudioState("loading");
      }
      const Tone = await getTone();
      if (!synthRef.current) {
        buildSynthIfNeeded(Tone);
      }

      // Tone.start() resumes the AudioContext. MUST be inside a confirmed
      // user gesture — we are, because play() is wired to onClick. Safari
      // and recent Chrome reject this from non-click events; see SideNav
      // AudioToggle for the click-only architecture.
      await Tone.start();

      if (Tone.context.state !== "running") {
        throw new Error(
          `AudioContext failed to resume: ${Tone.context.state}. ` +
            "This usually means the call site is not a confirmed user gesture."
        );
      }

      // Restore volume in case a prior stop() faded it down.
      synthRef.current!.volume.cancelScheduledValues(Tone.now());
      synthRef.current!.volume.value = -16;

      // Start the loop.
      let noteIndex = 0;
      const loop = new Tone.Loop((time) => {
        if (!synthRef.current) return;
        const [note, duration] =
          CLAIR_DE_LUNE[noteIndex % CLAIR_DE_LUNE.length];
        synthRef.current.triggerAttackRelease(note, duration, time);
        noteIndex++;
      }, "0:1:0");

      Tone.Transport.bpm.value = 56;
      loop.start(0);
      Tone.Transport.start();
      loopRef.current = loop;

      setAudioState("playing");
    } catch (e) {
      console.error("[AmbientAudio] play failed:", e);
      setAudioState("error");
    }
  }, [setAudioState]);

  // Teardown on unmount: stop the loop, dispose Tone instances, restore
  // the document title. Module reference may be null if the user never
  // engaged audio; guard the Transport.stop() accordingly.
  useEffect(() => {
    return () => {
      if (fadeOutTimerRef.current) clearTimeout(fadeOutTimerRef.current);
      loopRef.current?.stop();
      loopRef.current?.dispose();
      ToneModule?.Transport.stop();
      synthRef.current?.dispose();
      reverbRef.current?.dispose();
      if (
        originalTitleRef.current !== null &&
        typeof document !== "undefined"
      ) {
        document.title = originalTitleRef.current;
      }
    };
  }, []);

  return (
    <Ctx.Provider value={{ state, preload, play, stop }}>
      {children}
    </Ctx.Provider>
  );
}
