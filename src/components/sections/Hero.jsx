import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const WORD_GROUPS = [
  {
    words: [
      { text: "We", delay: 0 },
      { text: "make", delay: 120 },
      { text: "the", delay: 240 },
      { text: "world", delay: 360 },
    ],
  },
  {
    words: [
      { text: "believe", delay: 560, className: "text-[#16C768]" },
      { text: "in", delay: 700, className: "font-light italic text-[#c0c0c0] text-[clamp(40px,6.5vw,70px)]" },
    ],
  },
  {
    words: [
      { text: "your", delay: 880 },
      { text: "brand.", delay: 1020, className: "text-[#16C768]" },
    ],
  },
];

// Writing animation: each letter fades + slides in from the right, one after
// another.
const CHAR_STEP = 0.045; // seconds between letters
const START_DELAY = 0.3;

// Global letter index where each word starts (spaces count as a beat).
let charCursor = 0;
const WORD_START = WORD_GROUPS.map((group) =>
  group.words.map((word) => {
    const start = charCursor;
    charCursor += word.text.length + 1;
    return start;
  })
);
const TOTAL_CHARS = charCursor;
const TYPE_DURATION_MS = (START_DELAY + TOTAL_CHARS * CHAR_STEP) * 1000;

export const Hero = ({ setPage }) => {
  const [started, setStarted] = useState(false);
  const [typed, setTyped] = useState(false);
  const [isSubVisible, setIsSubVisible] = useState(false);
  const stageRef = useRef(null);

  // Start writing only once the intro loader has finished.
  useEffect(() => {
    if (window.__cucuLoaded) {
      setStarted(true);
      return;
    }
    const onLoaded = () => setStarted(true);
    window.addEventListener("cucu:loaded", onLoaded);
    return () => window.removeEventListener("cucu:loaded", onLoaded);
  }, []);

  useEffect(() => {
    if (!started) return;
    const typedTimer = setTimeout(() => setTyped(true), TYPE_DURATION_MS + 300);
    const subTimer = setTimeout(() => setIsSubVisible(true), TYPE_DURATION_MS + 500);
    return () => {
      clearTimeout(typedTimer);
      clearTimeout(subTimer);
    };
  }, [started]);

  useEffect(() => {
    // Particles
    const stage = stageRef.current;
    if (stage) {
      for (let i = 0; i < 14; i++) {
        const p = document.createElement("div");
        p.className = "particle";
        const s = 2 + Math.random() * 5;
        p.style.width = `${s}px`;
        p.style.height = `${s}px`;
        p.style.left = `${5 + Math.random() * 90}%`;
        p.style.bottom = `${Math.random() * 60}px`;
        p.style.animationDuration = `${5 + Math.random() * 6}s`;
        p.style.animationDelay = `${Math.random() * 8}s`;
        stage.appendChild(p);
      }
    }
  }, []);

  return (
    <section 
      ref={stageRef}
      className="stage w-full min-h-[600px] h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden bg-white"
    >
      <style>{`
        .word-wrap {
          overflow: hidden;
          display: inline-block;
          padding-bottom: 0.12em;
        }

        .word {
          display: inline-block;
          font-family: 'Manrope', sans-serif;
          font-size: clamp(52px, 8.5vw, 90px);
          font-weight: 900;
          line-height: 1.05;
          padding-right: 0.1em;
        }

        .float-word {
          animation: wordFloat ease-in-out infinite;
        }

        @keyframes wordFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          background: #16C768;
          opacity: 0;
          pointer-events: none;
          animation: rise linear infinite;
          z-index: 1;
        }

        @keyframes rise {
          0% { opacity: 0; transform: translateY(0) scale(0.6); }
          20% { opacity: 0.5; }
          80% { opacity: 0.2; }
          100% { opacity: 0; transform: translateY(-400px) scale(1.1); }
        }

        .dot {
          display: inline-block;
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #16C768;
          margin-left: 8px;
          vertical-align: middle;
          animation: blink 1.2s ease-in-out infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .sub {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #ccc;
          margin-top: 3.5rem;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .sub.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div className="lines flex flex-col items-center gap-[1.4rem] z-10 mt-20">
        {WORD_GROUPS.map((group, gIdx) => (
          <div key={gIdx} className="line flex items-baseline gap-[1.2rem] flex-wrap justify-center">
            {group.words.map((word, wIdx) => {
              // Use provided className or default to dark color
              const colorClass = word.className && word.className.includes('text-') 
                ? word.className 
                : `text-[#0a0a0a] ${word.className || ''}`;

              return (
                <div key={wIdx} className="word-wrap">
                  <span
                    className={`word ${typed ? "float-word" : ""} ${colorClass}`}
                    style={typed ? {
                      animationDuration: `${(2.6 + ((gIdx + wIdx) % 4) * 0.45).toFixed(2)}s`,
                      animationDelay: `${(((gIdx * 3 + wIdx) % 5) * 0.4).toFixed(2)}s`
                    } : {}}
                  >
                    {word.text.split("").map((char, cIdx) => (
                      <motion.span
                        key={cIdx}
                        className="inline-block"
                        initial={{ opacity: 0, x: 20 }}
                        animate={started ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                        transition={{
                          duration: 0.18,
                          delay: START_DELAY + (WORD_START[gIdx][wIdx] + cIdx) * CHAR_STEP,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <p className={`sub ${isSubVisible ? "visible" : ""}`}>
        cucuadvertising.com<span className="dot" />
      </p>
    </section>
  );
};
