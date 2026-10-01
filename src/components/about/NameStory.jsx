import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

// Scroll-driven story of the name. The section is several screens tall; its
// content stays pinned while the visitor scrolls through five steps.
const GREEN = "#197C48";
const STEPS = ["Client → User", "Creative Understanding", "CU + CU", "Visual symmetry"];
const PHASES = STEPS.length;

// First letter stays in brand green; the rest fades away after a beat.
const Initialled = ({ word, fade = false, delay = 0 }) => (
  <span className="inline-flex whitespace-nowrap">
    <span style={{ color: GREEN }}>{word[0]}</span>
    {word
      .slice(1)
      .split("")
      .map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 1 }}
          animate={{ opacity: fade ? 0.12 : 1 }}
          transition={{ duration: 0.6, delay: fade ? delay + i * 0.04 : 0 }}
        >
          {ch}
        </motion.span>
      ))}
  </span>
);

const Lead = ({ children }) => (
  <p className="text-lg md:text-2xl text-neutral-500 font-medium mb-6 md:mb-10">{children}</p>
);

const Caption = ({ children, delay = 1 }) => (
  <motion.p
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="mt-8 md:mt-12 text-base md:text-2xl font-black uppercase tracking-tight"
  >
    {children}
  </motion.p>
);

const BIG = "text-[19vw] md:text-[10vw] font-black uppercase leading-[0.85] tracking-tighter";

const Phase = ({ index }) => {
  switch (index) {
    case 0:
      return (
        <>
          <Lead>Advertising is a bridge between</Lead>
          <div className={`${BIG} flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-x-[0.25em] gap-y-1`}>
            <Initialled word="Client" fade delay={0.6} />
            <span className="text-neutral-300 rotate-90 md:rotate-0 text-[0.55em] md:text-[1em] leading-none">→</span>
            <Initialled word="User" fade delay={0.6} />
          </div>
          <Caption delay={1.3}>
            That's the connection we build every day. So we took the prefix:{" "}
            <span style={{ color: GREEN }}>CU</span>.
          </Caption>
        </>
      );
    case 1:
      return (
        <>
          <Lead>But we don't just connect. We do it with</Lead>
          <div className={`text-[10vw] md:text-[7.5vw] font-black uppercase leading-[0.9] tracking-tighter flex flex-col items-center`}>
            <Initialled word="Creative" fade delay={0.6} />
            <Initialled word="Understanding" fade delay={0.6} />
          </div>
          <Caption delay={1.4}>
            Of the brand. Again, the prefix: <span style={{ color: GREEN }}>CU</span>.
          </Caption>
        </>
      );
    case 2:
      return (
        <>
          <Lead>Two connections. One name.</Lead>
          <div className={`${BIG} flex justify-center`} style={{ color: GREEN }}>
            <motion.span
              initial={{ x: "-60%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            >
              CU
            </motion.span>
            <motion.span
              initial={{ x: "60%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              className="text-[#050505]"
            >
              CU
            </motion.span>
          </div>
          <Caption delay={1}>
            Client to User, with Creative Understanding.
          </Caption>
        </>
      );
    default:
      return (
        <>
          <Lead>Then came the part that made it perfect.</Lead>
          <div className={`${BIG} flex justify-center items-center gap-[0.15em]`}>
            {/* A C turned a quarter-turn opens upward — it becomes a U. */}
            <motion.span
              className="inline-block"
              style={{ color: GREEN }}
              animate={{ rotate: [0, 0, -90, -90, 0] }}
              transition={{ duration: 3.2, times: [0, 0.2, 0.45, 0.8, 1], repeat: Infinity, ease: "easeInOut" }}
            >
              C
            </motion.span>
            <span className="text-neutral-300 text-[0.5em]">=</span>
            <span>U</span>
          </div>
          <Caption delay={0.8}>
            Flip a C, it's a U. Flip a U, it's a C.{" "}
            <span style={{ color: GREEN }}>Now that's visual symmetry.</span>
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
    <section ref={ref} className="relative bg-white text-[#050505]" style={{ height: `${PHASES * 55 + 45}vh` }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center md:justify-start pt-16 pb-24 md:pb-0 md:pt-32 overflow-hidden px-6 text-center">
        <span className="mb-6 md:mb-8 text-xs md:text-sm font-black uppercase tracking-[0.35em]" style={{ color: GREEN }}>
          How we got our name
        </span>

        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -40, filter: "blur(8px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center max-w-6xl"
          >
            <Phase index={phase} />
          </motion.div>
        </AnimatePresence>

        {/* Current step name — phones only */}
        <span className="md:hidden absolute bottom-[3.25rem] left-0 right-0 text-[11px] font-bold uppercase tracking-widest text-black/50">
          {phase + 1} / {STEPS.length} · {STEPS[phase]}
        </span>

        {/* Step tracker */}
        <div className="absolute bottom-8 md:bottom-12 left-6 right-6 md:left-12 md:right-12 flex items-center gap-3 md:gap-6">
          {STEPS.map((label, i) => (
            <div key={label} className="flex-1">
              <div className="h-[3px] rounded-full bg-black/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: GREEN }}
                  animate={{ width: i <= phase ? "100%" : "0%" }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span
                className={`hidden md:block mt-3 text-[11px] font-bold uppercase tracking-widest transition-colors ${
                  i === phase ? "text-black" : "text-black/30"
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
