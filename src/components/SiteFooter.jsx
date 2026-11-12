import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { finePointer, reducedMotion } from "../motion/core";
import { Lines, Magnetic, Reveal, Roll } from "../motion/primitives";
import { CucuMark } from "./brand/CucuMark";
import "./site-footer.css";

gsap.registerPlugin(ScrollTrigger);

const explore = [
  ["Home", "/"],
  ["Work", "/work"],
  ["Services", "/services"],
  ["About", "/about"],
  ["Clients", "/clients"],
  ["Careers", "/careers"],
];

const socials = [
  ["Instagram", "https://www.instagram.com/cucuadvertising/"],
  ["LinkedIn", "https://www.linkedin.com/company/cucuadvertsing/"],
  ["Facebook", "https://www.facebook.com/profile.php?id=61551579710039"],
];

const HEADLINE = ["Let’s make", "you the one."];

// Sign-offs shown when a visitor keeps pulling past the end of the page.
const SIGN_OFFS = ["That’s a wrap.", "Still here? Good sign.", "Now you’ve noticed us.", "Go on, say hello."];

const scrollTop = (e) => {
  e.preventDefault();
  if (window.lenis) window.lenis.scrollTo(0, { duration: 1.6 });
  else window.scrollTo({ top: 0, behavior: reducedMotion() ? "auto" : "smooth" });
};

/* The headline notices the cursor: letters near it lift and change colour. */
const NoticeHeadline = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer() || reducedMotion()) return;
    const chars = Array.from(el.querySelectorAll(".sf-char"));
    let centres = [];
    let raf = 0;
    let px = 0;
    let py = 0;

    const measure = () => {
      chars.forEach((c) => c.style.setProperty("--p", 0));
      centres = chars.map((c) => {
        const r = c.getBoundingClientRect();
        return [r.left + r.width / 2, r.top + r.height / 2 + window.scrollY];
      });
    };
    const apply = () => {
      raf = 0;
      const reach = Math.max(160, el.offsetWidth * 0.2);
      chars.forEach((c, i) => {
        const d = Math.hypot(px - centres[i][0], py + window.scrollY - centres[i][1]);
        const p = Math.max(0, 1 - d / reach);
        c.style.setProperty("--p", (p * p).toFixed(3));
      });
    };
    const move = (e) => {
      px = e.clientX;
      py = e.clientY;
      if (!centres.length) measure();
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const leave = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      chars.forEach((c) => c.style.setProperty("--p", 0));
    };
    const invalidate = () => {
      centres = [];
    };

    el.addEventListener("pointerenter", measure);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    window.addEventListener("resize", invalidate);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerenter", measure);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      window.removeEventListener("resize", invalidate);
    };
  }, []);

  let n = 0;
  return (
    <div ref={ref} className="sf-headline-wrap">
      <Lines as="h2" className="sf-headline" aria-label={HEADLINE.join(" ")}>
        {HEADLINE.map((line, li) => (
          <span key={line} className={li === 1 ? "sf-accent" : undefined} aria-hidden="true">
            {Array.from(line).map((ch, ci) => (
              <span className="sf-char" style={{ "--n": n++ }} key={ci}>{ch === " " ? " " : ch}</span>
            ))}
          </span>
        ))}
      </Lines>
    </div>
  );
};

/* Live Hyderabad time — a small sign that there are people on the other side. */
const LocalTime = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "numeric", minute: "2-digit", hour12: true });
    const tick = () => setTime(fmt.format(new Date()).toUpperCase());
    tick();
    const id = setInterval(tick, 20000);
    return () => clearInterval(id);
  }, []);
  return <span className="sf-time">{time ? `${time} IST` : " "}</span>;
};

/* The closing gesture: keep scrolling (or pulling) past the end and the page
   lifts on a curve to show a sign-off, then settles back. */
const Finale = ({ footer }) => {
  const panel = useRef(null);
  const [message, setMessage] = useState(0);

  useEffect(() => {
    const el = panel.current;
    const foot = footer.current;
    if (!el || !foot || reducedMotion()) return;

    const page = document.getElementById("main") || foot;
    const MAX = Math.min(window.innerHeight * 0.34, 300);
    const state = { pull: 0 };
    let acc = 0;
    let idle = 0;
    let active = false;
    let touchY = null;
    let tween = null;

    const atEnd = () => window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    const inFooter = () => foot.getBoundingClientRect().top < window.innerHeight;

    const render = () => {
      const p = state.pull;
      gsap.set(page, { y: -p });
      gsap.set(el, { height: p, autoAlpha: p > 0.5 ? 1 : 0 });
      el.style.setProperty("--k", Math.min(1, p / MAX).toFixed(3));
      if (p < 0.5) gsap.set(page, { clearProps: "transform" });
    };
    const begin = () => {
      if (active) return;
      active = true;
      setMessage((m) => (m + 1) % SIGN_OFFS.length);
    };
    const pullTo = (raw) => {
      tween?.kill();
      begin();
      state.pull = MAX * (1 - Math.exp(-raw / (MAX * 1.1))); // resistance
      render();
    };
    const release = () => {
      acc = 0;
      touchY = null;
      if (!active) return;
      active = false;
      tween = gsap.to(state, { pull: 0, duration: 0.9, ease: "expo.out", onUpdate: render });
    };

    const wheel = (e) => {
      if (e.deltaY <= 0) {
        if (active) release();
        return;
      }
      if (!atEnd() || !inFooter()) return;
      acc += Math.min(e.deltaY, 120) * 0.9;
      pullTo(acc);
      clearTimeout(idle);
      idle = setTimeout(release, 160);
    };
    const touchStart = (e) => {
      touchY = atEnd() && inFooter() ? e.touches[0].clientY : null;
    };
    const touchMove = (e) => {
      if (touchY === null) return;
      const dy = touchY - e.touches[0].clientY;
      if (dy > 0) pullTo(dy * 1.4);
      else if (active) release();
    };

    window.addEventListener("wheel", wheel, { passive: true });
    window.addEventListener("touchstart", touchStart, { passive: true });
    window.addEventListener("touchmove", touchMove, { passive: true });
    window.addEventListener("touchend", release, { passive: true });
    window.addEventListener("touchcancel", release, { passive: true });
    return () => {
      clearTimeout(idle);
      tween?.kill();
      gsap.set(page, { clearProps: "transform" });
      window.removeEventListener("wheel", wheel);
      window.removeEventListener("touchstart", touchStart);
      window.removeEventListener("touchmove", touchMove);
      window.removeEventListener("touchend", release);
      window.removeEventListener("touchcancel", release);
    };
  }, [footer]);

  return createPortal(
    <div className="sf-finale" ref={panel} aria-hidden="true">
      <svg className="sf-finale-curve" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0 100 Q50 -100 100 100 Z" />
      </svg>
      <p className="sf-finale-text">{SIGN_OFFS[message]}</p>
    </div>,
    document.body,
  );
};

export const SiteFooter = () => {
  const footer = useRef(null);
  const mark = useRef(null);

  // The mark turns with the scroll, like a pinwheel catching the page's wind.
  useEffect(() => {
    const el = mark.current;
    if (!el || reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { rotate: -120 },
        { rotate: 0, ease: "none", scrollTrigger: { trigger: footer.current, start: "top bottom", end: "bottom bottom", scrub: 0.8 } },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer className="site-footer" ref={footer}>
      <div className="sf-surface">
        <div className="sf-top">
          <Reveal as="span" className="sf-eyebrow">Your next chapter</Reveal>
          <span className="sf-mark" ref={mark}><CucuMark /></span>
        </div>

        <div className="sf-hero">
          <NoticeHeadline />
          <div className="sf-pitch">
            <Reveal as="p" delay={150}>Tell us what you’re building.<br />We’ll help you build it better.</Reveal>
            <Reveal delay={250} className="sf-cta-wrap">
              <Magnetic strength={0.3}>
                <Link to="/contact" className="sf-cta">
                  <span className="sf-cta-label">Let’s Build</span>
                  <svg className="sf-cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M6 18 18 6M8 6h10v10" />
                  </svg>
                </Link>
              </Magnetic>
            </Reveal>
          </div>
        </div>

        <div className="sf-grid">
          <nav className="sf-col" aria-label="Explore">
            <span className="sf-label">Explore</span>
            <ul>
              {explore.map(([name, url]) => (
                <li key={url}><Link to={url}><Roll>{name}</Roll></Link></li>
              ))}
            </ul>
          </nav>
          <div className="sf-col sf-col-wide">
            <span className="sf-label">Say hello</span>
            <ul>
              {/* The two ways to reach us carry the same weight: same size, same roll-over. */}
              <li><a className="sf-big" href="mailto:coffee@cucuadvertising.com"><Roll>coffee@cucuadvertising.com</Roll></a></li>
              <li><a className="sf-big" href="https://api.whatsapp.com/send?phone=919440417034" target="_blank" rel="noopener noreferrer"><Roll>WhatsApp us</Roll></a></li>
            </ul>
          </div>
          <nav className="sf-col" aria-label="Social">
            <span className="sf-label">Follow</span>
            <ul>
              {socials.map(([name, url]) => (
                <li key={name}><a href={url} target="_blank" rel="noopener noreferrer"><Roll>{name}</Roll></a></li>
              ))}
            </ul>
          </nav>
          <div className="sf-col">
            <span className="sf-label">Studio</span>
            <ul>
              <li>Hyderabad, India</li>
              <li><LocalTime /></li>
            </ul>
          </div>
        </div>

        <div className="sf-base">
          <span>© {new Date().getFullYear()} CUCU Advertising</span>
          <span className="sf-hint">Keep scrolling. There’s one more thing.</span>
          <a href="#top" onClick={scrollTop}><Roll>Back to top</Roll></a>
        </div>
      </div>
      <Finale footer={footer} />
    </footer>
  );
};
