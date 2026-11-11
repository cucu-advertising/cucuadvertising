// Shared motion language for the whole site.
// One set of curves and one place that knows about reduced motion and the intro.

export const EASE = {
  out: [0.16, 1, 0.3, 1], // settles softly — reveals, hovers
  inOut: [0.76, 0, 0.24, 1], // curtains and section transitions
};

export const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const finePointer = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

// --- Intro hand-off -------------------------------------------------------
// The intro curtain tells the page when it starts to lift so the first screen
// can animate in underneath it, instead of finishing unseen behind the panel.
const listeners = new Set();
let revealed = false;

export const introRevealed = () => revealed;

export const markIntroRevealed = () => {
  if (revealed) return;
  revealed = true;
  document.documentElement.classList.add("intro-revealed");
  listeners.forEach((fn) => fn());
  listeners.clear();
};

export const onIntroReveal = (fn) => {
  if (revealed) {
    fn();
    return () => {};
  }
  listeners.add(fn);
  return () => listeners.delete(fn);
};

// Fired when the intro has fully left the screen.
const doneListeners = new Set();
let done = false;

export const markIntroDone = () => {
  if (done) return;
  done = true;
  doneListeners.forEach((fn) => fn());
  doneListeners.clear();
};

export const onIntroDone = (fn) => {
  if (done) {
    fn();
    return () => {};
  }
  doneListeners.add(fn);
  return () => doneListeners.delete(fn);
};
