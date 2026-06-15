// Full-screen splash shown briefly on first load — gives the PWA a native
// "app opening" feel before revealing the site.
import { useState, useEffect, useRef } from 'react';

const DISPLAY_MS = 1500; // time fully visible before the exit begins
const FADE_MS = 800; // exit (dissolve) transition duration

/**
 * @param {object}   props
 * @param {function} [props.onComplete] - Called once, the moment the exit
 *   transition begins. Use it to flip an "appReady" flag so the rest of the
 *   page's entrance animations start as the splash dissolves — never before.
 */
export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState('visible'); // 'visible' | 'fading' | 'hidden'
  const onCompleteRef = useRef(onComplete);

  // Keep the latest callback without re-triggering the timers below.
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const fadeTimer = setTimeout(() => {
      setPhase('fading');
      onCompleteRef.current?.();
    }, DISPLAY_MS);

    const hideTimer = setTimeout(() => {
      setPhase('hidden');
      document.body.style.overflow = '';
    }, DISPLAY_MS + FADE_MS);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
      document.body.style.overflow = '';
    };
  }, []);

  if (phase === 'hidden') return null;

  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-dark transition-all ease-out ${
        phase === 'fading'
          ? 'opacity-0 scale-105 blur-sm pointer-events-none'
          : 'opacity-100 scale-100 blur-none'
      }`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      <div className="flex flex-col items-center gap-3">
        <span className="font-display text-4xl sm:text-6xl font-semibold gold-text splash-glow">
          Touchê
        </span>
        <span className="text-[10px] sm:text-xs font-mono tracking-[0.4em] uppercase text-white/25">
          Costura &amp; Arreglos
        </span>
      </div>
    </div>
  );
}