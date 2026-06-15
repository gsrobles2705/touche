// Typewriter effect hook — types out a string character by character.
// Runs only once `start` is true; resets when the target string changes.
import { useState, useEffect, useRef } from 'react';

/**
 * @param {string}  text       - The full string to type out
 * @param {number}  speed      - Milliseconds per character (default 45)
 * @param {number}  startDelay - Milliseconds before typing begins (default 300)
 * @param {boolean} start      - Gate that controls when typing is allowed to begin.
 *                                While false, nothing happens (no ticking in the
 *                                background) — useful to wait for a splash screen,
 *                                page transition, etc.
 * @returns {{ displayed: string, isDone: boolean }}
 */
export function useTypewriter(text, speed = 45, startDelay = 300, start = true) {
  const [displayed, setDisplayed] = useState('');
  const [isDone, setIsDone] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!start) return;

    // Reset state whenever the target text changes (e.g. user logs in)
    // or typing becomes allowed to start.
    setDisplayed('');
    setIsDone(false);
    indexRef.current = 0;

    const startTimeout = setTimeout(() => {
      timerRef.current = setInterval(() => {
        const next = indexRef.current + 1;
        setDisplayed(text.slice(0, next));
        indexRef.current = next;

        if (next >= text.length) {
          clearInterval(timerRef.current);
          setIsDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(timerRef.current);
    };
  }, [text, speed, startDelay, start]);

  return { displayed, isDone };
}