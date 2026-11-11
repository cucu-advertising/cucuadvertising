import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { finePointer, onIntroReveal, reducedMotion } from "./core";
import "./motion.css";

gsap.registerPlugin(ScrollTrigger);

/* useReveal — adds `is-in` once the element enters the viewport.
   `after: "intro"` waits for the opening curtain to start lifting instead. */
const useReveal = ({ after = "view", amount = 0.2 } = {}) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (after === "intro") return onIntroReveal(() => setShown(true));
    let off = () => {};
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        // Nothing reveals behind the intro panel.
        off = onIntroReveal(() => setShown(true));
      },
      { threshold: amount, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      off();
    };
  }, [after, amount]);

  return [ref, shown];
};

/* Lines — a heading whose lines rise out of a mask, one after another.
   Pass each line as a child:  <Lines as="h2"><>First</><>Second</></Lines> */
export const Lines = ({ as: Tag = "div", children, className = "", after, delay = 0, ...rest }) => {
  const [ref, shown] = useReveal({ after });
  const lines = React.Children.toArray(children);
  return (
    <Tag ref={ref} className={`m-lines ${shown ? "is-in" : ""} ${className}`} style={{ "--d": `${delay}ms` }} {...rest}>
      {lines.map((line, i) => (
        <span className="m-line" key={i}>
          <span className="m-line-in" style={{ "--i": i }}>{line}</span>
        </span>
      ))}
    </Tag>
  );
};

/* Reveal — fade-and-rise (default) or an image "curtain" (variant="clip"). */
export const Reveal = ({ as: Tag = "div", variant = "rise", children, className = "", after, delay = 0, amount, ...rest }) => {
  const [ref, shown] = useReveal({ after, amount });
  return (
    <Tag ref={ref} className={`m-reveal m-${variant} ${shown ? "is-in" : ""} ${className}`} style={{ "--d": `${delay}ms` }} {...rest}>
      {/* The clipped layer is a child: an element clipped to nothing never
          reports itself as visible, so the unclipped frame is what gets observed. */}
      {variant === "clip" ? <span className="m-clip-in">{children}</span> : children}
    </Tag>
  );
};

/* ScrubText — words come into focus as the reader scrolls through them. */
export const ScrubText = ({ as: Tag = "p", text, className = "", accent = [], start = "top 82%", end = "bottom 55%" }) => {
  const ref = useRef(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".m-word"),
        { opacity: 0.16 },
        { opacity: 1, ease: "none", stagger: 0.12, scrollTrigger: { trigger: el, start, end, scrub: 0.6 } },
      );
    }, el);
    return () => ctx.revert();
  }, [start, end, text]);

  return (
    <Tag ref={ref} className={`m-scrub ${className}`}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span className={`m-word ${accent.includes(w.replace(/[.,]/g, "")) ? "is-accent" : ""}`}>{w}</span>{" "}
        </React.Fragment>
      ))}
    </Tag>
  );
};

/* Magnetic — the child leans toward the cursor and settles back. Mouse only. */
export const Magnetic = ({ children, strength = 0.28, className = "", as: Tag = "span" }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer() || reducedMotion()) return;
    const x = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
    const move = (e) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - (r.left + r.width / 2)) * strength);
      y((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      x(0);
      y(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [strength]);

  return <Tag ref={ref} className={`m-magnetic ${className}`}>{children}</Tag>;
};

/* Roll — link text that rolls up to a copy of itself on hover / focus. */
export const Roll = ({ children }) => (
  <span className="m-roll">
    <span className="m-roll-a">{children}</span>
    <span className="m-roll-b" aria-hidden="true">{children}</span>
  </span>
);

/* CurveRise — the next section arrives as a soft hill that flattens as it
   settles. The same curve opens the site (intro) and closes it (footer). */
export const CurveRise = ({ color = "currentColor", className = "" }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleY: 1 },
        { scaleY: 0, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "top 45%", scrub: true } },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <svg ref={ref} className={`m-curve ${className}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 100 Q50 -100 100 100 Z" fill={color} />
    </svg>
  );
};
