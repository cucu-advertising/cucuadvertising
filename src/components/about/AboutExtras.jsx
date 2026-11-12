import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Lines, Reveal } from "../../motion/primitives";
import { reducedMotion } from "../../motion/core";

// Styles live in pages/inner-pages.css (.ab-*).

/* ------------------------------------------------------------------ */
/* Proof numbers — count up when scrolled into view.                   */
/* ------------------------------------------------------------------ */
const STATS = [
  { value: 50, suffix: "+", label: "Brands built & grown" },
  { value: 200, suffix: "%", label: "Average ROI increase" },
  { value: 6, suffix: "", label: "Services under one roof" },
  { value: 2, suffix: "", label: "Cities · Hyderabad & Mumbai" },
];

const CountUp = ({ to, suffix }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(() => (reducedMotion() ? to : 0));
  useEffect(() => {
    if (!inView || reducedMotion()) return;
    const controls = animate(0, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
};

export const AboutStats = () => (
  <dl className="ab-stats">
    {STATS.map((s, i) => (
      <Reveal className="ab-stat" key={s.label} delay={i * 90}>
        <dd><CountUp to={s.value} suffix={s.suffix} /></dd>
        <dt>{s.label}</dt>
      </Reveal>
    ))}
  </dl>
);

/* ------------------------------------------------------------------ */
/* "Serious about the work. Not always ourselves." — draggable words   */
/* plus what we believe.                                               */
/* ------------------------------------------------------------------ */
// style: "solid" = dark pill, "lime" = lime pill, "line" = outlined pill
const WORDS = [
  { text: "Creative Understanding", style: "lime", r: -3 },
  { text: "Branding", style: "line", r: 2 },
  { text: "Listen first", style: "solid", r: -2 },
  { text: "Ad Films", style: "line", r: 4 },
  { text: "Strategy", style: "solid", r: -4 },
  { text: "SEO", style: "line", r: 3 },
  { text: "Content", style: "line", r: -2 },
  { text: "Client → User", style: "lime", r: 2 },
  { text: "Growth", style: "solid", r: -3 },
  { text: "Performance", style: "line", r: 3 },
];

const BELIEFS = [
  { title: "Listen before we create", desc: "Every brief starts with questions, not mood boards. The best ideas come from understanding the business first." },
  { title: "Creative with a reason", desc: "Pretty isn't the goal. Every visual, word and frame has a job: to make people notice, feel and act." },
  { title: "Strategy before pixels", desc: "Positioning, audience and message come first, so the design has something true to say." },
  { title: "Good work keeps getting better", desc: "Launch is the start, not the finish. We measure, learn and keep improving alongside you." },
];

export const AboutPlayground = () => (
  <section className="ab-think">
    <div className="ab-think-head">
      <div>
        <Reveal as="span" className="eyebrow">How we think</Reveal>
        <Lines as="h2">
          <>Serious about the work.</>
          <span className="dim">Not always ourselves.</span>
        </Lines>
      </div>
      <Reveal as="p" delay={200}>
        We take the work seriously, but believe the best ideas come when there's room to play.
      </Reveal>
    </div>

    {/* Draggable words — each springs back to its place when released. */}
    <Reveal className="ab-play">
      <div className="ab-pills">
        {WORDS.map((w, i) => (
          <motion.span
            key={w.text}
            drag
            dragSnapToOrigin
            dragElastic={0.6}
            initial={{ opacity: 0, y: 20, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: w.r }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.06, rotate: 0 }}
            whileDrag={{ scale: 1.1, rotate: 0, zIndex: 20 }}
            className={`ab-pill is-${w.style}`}
          >
            {w.text}
          </motion.span>
        ))}
      </div>
      <p className="ab-play-hint">Go on, grab one</p>
    </Reveal>

    <ol className="ab-beliefs">
      {BELIEFS.map((b, i) => (
        <Reveal as="li" className="ab-belief" key={b.title} delay={(i % 2) * 90}>
          <span className="pg-num">0{i + 1}</span>
          <div>
            <h3>{b.title}</h3>
            <p>{b.desc}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  </section>
);
