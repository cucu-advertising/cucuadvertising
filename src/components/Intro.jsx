import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { markIntroDone, markIntroRevealed, reducedMotion } from "../motion/core";
import {
  ADVERTISING_PATH,
  HOOK_LINES,
  LETTER_BAND,
  LETTER_PATHS,
  LOGO_H,
  LOGO_W,
  MARK_CENTER,
  MARK_PATH,
} from "./brand/logoPaths";
import "./intro.css";

const SEEN_KEY = "cucu-intro-seen";
const ORIGIN = `${MARK_CENTER[0]} ${MARK_CENTER[1]}`;

// Dev aid: `localStorage.setItem("cucu-slow", "0.2")` plays every animation at
// a fifth of the speed so the sequence can be inspected frame by frame.
if (import.meta.env.DEV) {
  const slow = Number(localStorage.getItem("cucu-slow"));
  if (slow > 0) gsap.globalTimeline.timeScale(slow);
}

const hasSeen = () => {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
};

// Resolves once fonts and the first paint's assets are in, but never keeps a
// visitor waiting more than `cap` ms.
const pageReady = (cap) =>
  new Promise((resolve) => {
    const timer = setTimeout(resolve, cap);
    const fonts = document.fonts?.ready ?? Promise.resolve();
    const loaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((r) => window.addEventListener("load", r, { once: true }));
    Promise.all([fonts, loaded]).then(() => {
      clearTimeout(timer);
      resolve();
    });
  });

/**
 * Intro — the site's opening.
 * The mark grows out of its own centre, one hook per letter of C·U·C·U, the
 * wordmark rises underneath it, then the green sheet lifts on a curve and the
 * first screen animates in beneath it.
 *
 * First visit: the full sequence (~3.5s, the page is visible from ~2.6s). Later loads in the same session: the
 * finished logo and the lift only. Reduced motion: a plain fade.
 */
export const Intro = () => {
  const root = useRef(null);
  const [done, setDone] = useState(false);
  const [mode] = useState(() => (reducedMotion() ? "reduced" : hasSeen() ? "repeat" : "first"));

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    // The static cover in index.html has done its job once this is on screen.
    document.getElementById("cucu-intro-cover")?.remove();
    document.documentElement.classList.add("intro-lock");
    window.scrollTo(0, 0);

    let cancelled = false;
    const finish = () => {
      if (cancelled) return;
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* private mode — the intro simply plays again next load */
      }
      document.documentElement.classList.remove("intro-lock");
      window.lenis?.start();
      markIntroRevealed();
      markIntroDone();
      setDone(true);
    };

    const q = gsap.utils.selector(el);
    const ctx = gsap.context(() => {
      if (mode === "reduced") {
        gsap.set(q(".intro-hook"), { strokeDashoffset: 0 });
        gsap.set(q(".intro-letter, .intro-adv, .intro-ring"), { opacity: 1, y: 0, scale: 1 });
        pageReady(1500).then(() => {
          if (cancelled) return;
          markIntroRevealed();
          gsap.to(el, { opacity: 0, duration: 0.35, delay: 0.3, ease: "none", onComplete: finish });
        });
        return;
      }

      const lift = () => {
        if (cancelled) return;
        const out = gsap.timeline({ onComplete: finish });
        out
          .to(q(".intro-line"), { scaleX: 1, duration: 0.3, ease: "power2.out" })
          .to(q(".intro-stage"), { y: -36, opacity: 0, duration: 0.45, ease: "power2.in" }, "<0.1")
          .to(q(".intro-line"), { opacity: 0, duration: 0.2 }, "<")
          .add(() => markIntroRevealed(), ">-0.1")
          .to(q(".intro-sheet"), { yPercent: -100, duration: 1.15, ease: "expo.inOut" }, "<")
          .to(q(".intro-curve"), { scaleY: 1, duration: 0.55, ease: "power2.in" }, "<")
          .to(q(".intro-curve"), { scaleY: 0, duration: 0.6, ease: "power2.out" }, ">");
      };

      if (mode === "repeat") {
        gsap.set(q(".intro-hook"), { strokeDashoffset: 0 });
        gsap.set(q(".intro-ring, .intro-letter, .intro-adv"), { opacity: 1, y: 0, scale: 1 });
        gsap.set(q(".intro-word-b"), { autoAlpha: 1 });
        gsap.fromTo(q(".intro-line"), { scaleX: 0.4 }, { scaleX: 0.9, duration: 0.5, ease: "power1.out" });
        Promise.all([pageReady(2500), new Promise((r) => setTimeout(r, 450))]).then(lift);
        return;
      }

      const tl = gsap.timeline();
      tl.to(q(".intro-line"), { scaleX: 0.86, duration: 2, ease: "power1.inOut" }, 0)
        .fromTo(q(".intro-ring"), { scale: 0, opacity: 1, svgOrigin: ORIGIN }, { scale: 1, duration: 0.45, ease: "power3.out" }, 0.1)
        .to(q(".intro-hook"), { strokeDashoffset: 0, duration: 0.85, ease: "power2.inOut", stagger: 0.17 }, 0.22)
        .fromTo(q(".intro-letter"), { y: 420, opacity: 1 }, { y: 0, duration: 0.85, ease: "expo.out", stagger: 0.17 }, 0.34)
        .fromTo(q(".intro-adv"), { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power1.out" }, 1.2)
        // y is pinned to 0 so GSAP never mistakes the percentage offset for pixels.
        .set(q(".intro-words span"), { autoAlpha: 1, y: 0, yPercent: 110 }, 0)
        .fromTo(q(".intro-word-a"), { y: 0, yPercent: 110 }, { y: 0, yPercent: 0, duration: 0.6, ease: "expo.out" }, 0.25)
        .to(q(".intro-word-a"), { y: 0, yPercent: -110, duration: 0.45, ease: "expo.in" }, 1.15)
        .fromTo(q(".intro-word-b"), { y: 0, yPercent: 110 }, { y: 0, yPercent: 0, duration: 0.6, ease: "expo.out" }, 1.55);

      Promise.all([pageReady(3500), tl.then()]).then(lift);
    }, el);

    return () => {
      cancelled = true;
      ctx.revert();
      document.documentElement.classList.remove("intro-lock");
    };
  }, [mode]);

  if (done) return null;

  const [cx, cy] = MARK_CENTER;

  return (
    <div className="intro" ref={root} role="status" aria-label="CUCU Advertising is loading">
      <div className="intro-sheet">
        <div className="intro-panel">
          <div className="intro-stage">
            <svg className="intro-logo" viewBox={`0 0 ${LOGO_W} ${LOGO_H}`} fill="currentColor" aria-hidden="true">
              <defs>
                {HOOK_LINES.map((d, i) => (
                  <mask id={`intro-hook-${i}`} key={i} maskUnits="userSpaceOnUse" x="0" y="0" width={LOGO_W} height={LOGO_W}>
                    {/* drawn from the centre outwards: the path runs free-end -> centre */}
                    <path className="intro-hook" d={d} pathLength="1" fill="none" stroke="#fff" strokeWidth="100" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1" strokeDashoffset="-1" />
                  </mask>
                ))}
                <mask id="intro-ring-mask" maskUnits="userSpaceOnUse" x="0" y="0" width={LOGO_W} height={LOGO_W}>
                  <circle className="intro-ring" cx={cx} cy={cy} r="96" fill="#fff" />
                </mask>
                <clipPath id="intro-wordmark">
                  <rect x="0" y={LETTER_BAND[0] - 24} width={LOGO_W} height={LETTER_BAND[1] - LETTER_BAND[0] + 48} />
                </clipPath>
              </defs>

              <g mask="url(#intro-ring-mask)"><path d={MARK_PATH} fillRule="evenodd" /></g>
              {HOOK_LINES.map((_, i) => (
                <g mask={`url(#intro-hook-${i})`} key={i}><path d={MARK_PATH} fillRule="evenodd" /></g>
              ))}

              <g clipPath="url(#intro-wordmark)">
                {LETTER_PATHS.map((d, i) => (
                  <path className="intro-letter" d={d} fillRule="evenodd" key={i} />
                ))}
              </g>
              <path className="intro-adv" d={ADVERTISING_PATH} fillRule="evenodd" />
            </svg>
          </div>

          <p className="intro-words" aria-hidden="true">
            <span className="intro-word-a">People don’t buy what they don’t notice.</span>
            <span className="intro-word-b">So, noticed.</span>
          </p>
          <span className="intro-line" />
        </div>
        <svg className="intro-curve" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 0 L0 100 Q50 -100 100 100 L100 0 Z" />
        </svg>
      </div>
    </div>
  );
};
