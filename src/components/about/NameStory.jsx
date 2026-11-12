import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { CurveRise } from "../../motion/primitives";

// Scroll-driven story of the name, told on a dark stage. The section is several
// screens tall; its content stays in place while the visitor scrolls through
// four steps. Styles live in pages/inner-pages.css (.ns-*).
const STEPS = ["Client → User", "Creative Understanding", "CU + CU", "Visual symmetry"];
const PHASES = STEPS.length;
const EASE = [0.16, 1, 0.3, 1];

// First letter stays lit; the rest fades away after a beat.
const Initialled = ({ word, fade = false, delay = 0 }) => (
  <span className="ns-word">
    <span className="ns-lit">{word[0]}</span>
    {word
      .slice(1)
      .split("")
      .map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 1 }}
          animate={{ opacity: fade ? 0.16 : 1 }}
          transition={{ duration: 0.6, delay: fade ? delay + i * 0.04 : 0 }}
        >
          {ch}
        </motion.span>
      ))}
  </span>
);

const Lead = ({ children }) => <p className="ns-lead">{children}</p>;

const Caption = ({ children, delay = 1 }) => (
  <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay, ease: EASE }} className="ns-caption">
    {children}
  </motion.p>
);

const Phase = ({ index }) => {
  switch (index) {
    case 0:
      return (
        <>
          <Lead>Advertising is a bridge between</Lead>
          <div className="ns-big ns-row">
            <Initialled word="Client" fade delay={0.6} />
            <span className="ns-soft ns-arrow">→</span>
            <Initialled word="User" fade delay={0.6} />
          </div>
          <Caption delay={1.3}>
            That’s the connection we build every day. So we took the prefix: <span className="ns-lit">CU</span>.
          </Caption>
        </>
      );
    case 1:
      return (
        <>
          <Lead>But we don’t just connect. We do it with</Lead>
          <div className="ns-big ns-mid ns-stack">
            <Initialled word="Creative" fade delay={0.6} />
            <Initialled word="Understanding" fade delay={0.6} />
          </div>
          <Caption delay={1.4}>
            Of the brand. Again, the prefix: <span className="ns-lit">CU</span>.
          </Caption>
        </>
      );
    case 2:
      return (
        <>
          <Lead>Two connections. One name.</Lead>
          <div className="ns-big ns-row ns-tight">
            <motion.span className="ns-lit" initial={{ x: "-60%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}>
              CU
            </motion.span>
            <motion.span initial={{ x: "60%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}>
              CU
            </motion.span>
          </div>
          <Caption delay={1}>Client to User, with Creative Understanding.</Caption>
        </>
      );
    default:
      return (
        <>
          <Lead>Then came the part that made it perfect.</Lead>
          <div className="ns-big ns-row">
            {/* A C turned a quarter-turn opens upward — it becomes a U. */}
            <motion.span
              className="ns-lit ns-turn"
              animate={{ rotate: [0, 0, -90, -90, 0] }}
              transition={{ duration: 3.2, times: [0, 0.2, 0.45, 0.8, 1], repeat: Infinity, ease: "easeInOut" }}
            >
              C
            </motion.span>
            <span className="ns-soft ns-equals">=</span>
            <span>U</span>
          </div>
          <Caption delay={0.8}>
            Flip a C, it’s a U. Flip a U, it’s a C. <span className="ns-lit">Now that’s visual symmetry.</span>
          </Caption>
        </>
      );
  }
};

export const NameStory = () => {
  const ref = useRef(null);
  const [phase, setPhase] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setPhase(Math.min(PHASES - 1, Math.max(0, Math.floor(v * PHASES))));
  });

  return (
    <section ref={ref} className="ns" style={{ height: `${PHASES * 55 + 45}vh` }} aria-label="How we got our name">
      <CurveRise color="#151715" />
      <div className="ns-stage">
        <span className="eyebrow ns-eyebrow">How we got our name</span>

        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -40, filter: "blur(8px)" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="ns-phase"
          >
            <Phase index={phase} />
          </motion.div>
        </AnimatePresence>

        <div className="ns-tracker" aria-hidden="true">
          {STEPS.map((label, i) => (
            <div key={label} className={"ns-step" + (i === phase ? " is-current" : "")}>
              <span className="ns-bar"><i style={{ transform: `scaleX(${i <= phase ? 1 : 0})` }} /></span>
              <span className="ns-step-label">{label}</span>
            </div>
          ))}
        </div>
        <span className="ns-mobile-step" aria-hidden="true">{phase + 1} / {STEPS.length} · {STEPS[phase]}</span>
      </div>
    </section>
  );
};
