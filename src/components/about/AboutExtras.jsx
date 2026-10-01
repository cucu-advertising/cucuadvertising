import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

const GREEN = "#197C48";
const MINT = "#8CF2C6";

/* ------------------------------------------------------------------ */
/* Proof numbers — counts up when scrolled into view.                  */
/* ------------------------------------------------------------------ */
const STATS = [
  { value: 50, suffix: "+", label: "Brands built & grown" },
  { value: 200, suffix: "%", label: "Average ROI increase" },
  { value: 7, suffix: "", label: "Services under one roof" },
  { value: 2, suffix: "", label: "Cities · Hyderabad & Mumbai" },
];

const CountUp = ({ to, suffix }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, to]);
  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
};

export const AboutStats = () => (
  <section className="bg-white px-6 md:px-12 py-8 md:py-12">
    <div className="max-w-[1800px] mx-auto grid grid-cols-2 lg:grid-cols-4 border-t border-b border-black/10">
      {STATS.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: i * 0.1 }}
          className={`py-10 md:py-14 px-2 md:px-8 ${i % 2 === 0 ? "border-r border-black/10" : "lg:border-r"} ${
            i === STATS.length - 1 ? "lg:border-r-0" : ""
          } ${i < 2 ? "border-b lg:border-b-0 border-black/10" : ""}`}
        >
          <div className="text-6xl md:text-8xl font-black tracking-tighter leading-none" style={{ color: GREEN }}>
            <CountUp to={s.value} suffix={s.suffix} />
          </div>
          <p className="mt-4 text-xs md:text-sm font-bold uppercase tracking-widest text-black/50">{s.label}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/* "Serious about the work. Not always ourselves." — draggable words   */
/* plus what we believe.                                               */
/* ------------------------------------------------------------------ */
// style: "solid" = white pill, "mint" = mint pill, "line" = outlined pill
const WORDS = [
  { text: "Creative Understanding", style: "mint", r: -3 },
  { text: "Branding", style: "line", r: 2 },
  { text: "Listen first", style: "solid", r: -2 },
  { text: "Ad Films", style: "line", r: 4 },
  { text: "Strategy", style: "solid", r: -4 },
  { text: "SEO", style: "line", r: 3 },
  { text: "Content", style: "line", r: -2 },
  { text: "Client → User", style: "mint", r: 2 },
  { text: "Growth", style: "solid", r: -3 },
  { text: "Performance", style: "line", r: 3 },
];

const PILL = {
  solid: "bg-white text-[#197C48] border-white",
  mint: "bg-[#8CF2C6] text-[#0b3d22] border-[#8CF2C6]",
  line: "bg-transparent text-white border-white/60",
};

const BELIEFS = [
  { title: "Listen before we create", desc: "Every brief starts with questions, not mood boards. The best ideas come from understanding the business first." },
  { title: "Creative with a reason", desc: "Pretty isn't the goal. Every visual, word and frame has a job: to make people notice, feel and act." },
  { title: "Strategy before pixels", desc: "Positioning, audience and message come first, so the design has something true to say." },
  { title: "We stay till it works", desc: "Launch is the start, not the finish. We measure, learn and keep improving alongside you." },
];

export const AboutPlayground = () => (
  <section className="bg-[#197C48] text-white px-6 md:px-12 py-16 md:py-24 overflow-hidden">
    <div className="max-w-[1800px] mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-6 md:gap-8">
        <div>
          <span className="text-xs md:text-sm font-black uppercase tracking-[0.35em]" style={{ color: MINT }}>
            How we think
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-5 text-[6.2vw] md:text-[6vw] font-black uppercase leading-[0.95] tracking-tighter whitespace-nowrap"
          >
            Serious about the work.
            <br />
            <span style={{ color: MINT }}>Not always ourselves.</span>
          </motion.h2>
        </div>
        <p className="max-w-xl md:ml-auto text-base md:text-lg leading-relaxed text-white/75">
          We take the brief seriously and the mood lightly. That's how good ideas
          survive long enough to become great work.
        </p>
      </div>

      {/* Draggable word cloud — pills spring back to place when released */}
      <div className="mt-12 md:mt-16 flex flex-wrap justify-center gap-3 md:gap-4 py-8 md:py-10 border-y border-white/15">
        {WORDS.map((w, i) => (
          <motion.div
            key={w.text}
            drag
            dragSnapToOrigin
            dragElastic={0.6}
            initial={{ opacity: 0, y: 20, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: w.r }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            whileHover={{ scale: 1.08, rotate: 0 }}
            whileDrag={{ scale: 1.12, rotate: 0, zIndex: 20 }}
            className={`cursor-grab relative px-5 md:px-8 py-3 md:py-4 rounded-full border-2 text-sm md:text-2xl font-black uppercase tracking-tight select-none whitespace-nowrap shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)] ${PILL[w.style]}`}
          >
            {w.text}
          </motion.div>
        ))}
      </div>
      <p className="mt-4 text-center text-xs md:text-sm uppercase tracking-[0.3em] text-white/50">
        Go on, grab one
      </p>

      {/* Beliefs */}
      <div className="mt-14 md:mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/15 rounded-[1.75rem] overflow-hidden">
        {BELIEFS.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="group bg-[#197C48] p-8 md:p-10 min-h-[260px] flex flex-col justify-between hover:bg-[#8CF2C6] transition-colors duration-500"
          >
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-[0.95] group-hover:text-[#0b3d22] transition-colors">
              {b.title}
            </h3>
            <p className="mt-8 text-sm md:text-base leading-relaxed text-white/70 group-hover:text-[#0b3d22]/80 transition-colors">
              {b.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
