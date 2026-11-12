import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiteFooter } from "../components/SiteFooter";
import { CurveRise, Lines, Magnetic, Reveal, Roll, ScrubText } from "../motion/primitives";
import { reducedMotion } from "../motion/core";
import { Arrow, JobBoard } from "../components/careers/JobBoard";
import { GENERAL_SLUG, jobs } from "../constants/jobs";
import projects from "../components/website/projects.json";
import useSeo from "../hooks/useSeo";
import "../components/website/website-home.css";
import "../components/careers/careers.css";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  ["Work that means something", "Every brief starts with a real business and a real problem. We look for the idea that makes people notice, and then we make it properly."],
  ["Many disciplines, one table", "Strategists, designers, writers, filmmakers and developers work on the same problem together, so the thinking and the making never drift apart."],
  ["Curious by habit", "We try things, test them and learn from what happens. If you like asking “what if?” and then finding out, you’ll fit in."],
];

const steps = [
  ["Apply", "Send us your details, your resume and a link to your work. Tell us what you love making."],
  ["Let’s Talk", "If it looks like a fit, we’ll set up a conversation about you, the role and how we work."],
  ["Meet the Team", "Spend time with the people you’d be working alongside, and ask us anything."],
  ["Next Steps", "We’ll tell you where things stand and what happens next."],
];

const scrollToJobs = (immediate = false) => {
  const target = document.getElementById("jobs");
  if (!target) return;
  // Lenis remembers the previous page's height until told otherwise.
  window.lenis?.resize?.();
  if (window.lenis) window.lenis.scrollTo(target, { offset: -24, immediate, force: true, duration: 1.4 });
  else target.scrollIntoView({ behavior: immediate || reducedMotion() ? "auto" : "smooth" });
};

/* Recent work, laid out as one long strip. On desktop the strip travels
   sideways as the reader scrolls past; on touch screens it is swiped. */
const WorkStrip = () => {
  const wrap = useRef(null);
  const track = useRef(null);

  useEffect(() => {
    const el = track.current;
    const box = wrap.current;
    if (!el || !box || reducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 851px) and (hover: hover) and (pointer: fine)", () => {
      box.classList.add("is-driven");
      const tween = gsap.fromTo(
        el,
        { x: 0 },
        {
          x: () => -(el.scrollWidth - box.clientWidth),
          ease: "none",
          scrollTrigger: { trigger: box, start: "top 85%", end: "bottom 15%", scrub: 0.6, invalidateOnRefresh: true },
        },
      );
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(el, { clearProps: "transform" });
        box.classList.remove("is-driven");
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <div className="cr-strip" ref={wrap}>
      <ul className="cr-strip-track" ref={track}>
        {projects.map((p, i) => (
          <li key={p.slug} className={"cr-strip-item" + (i % 3 === 1 ? " is-tall" : "")}>
            <Link to={`/project/${p.slug}`}>
              <Reveal variant="clip" className="cr-strip-image" amount={0.15} delay={(i % 3) * 90}>
                <img src={p.coverImage} alt={`${p.title} — ${p.category} by CUCU`} loading="lazy" width="1400" height="1000" />
              </Reveal>
              <span className="cr-strip-caption">
                <span>{p.title}</span>
                <span>{p.category}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const CareersPage = () => {
  const { hash } = useLocation();
  const openCount = jobs.filter((job) => job.open).length;

  useSeo({
    title: "Careers at CUCU Advertising | Creative Jobs in Hyderabad",
    description:
      "Join CUCU Advertising, a branding, content, films and digital studio in Hyderabad. See open roles, how we hire and how to introduce yourself.",
    path: "/careers",
  });

  // Arriving at /careers#jobs (for example from a job page) lands on the list.
  useEffect(() => {
    if (hash !== "#jobs") return;
    // Twice: once straight away, and once after images and fonts have settled the layout.
    const timers = [120, 700].map((ms) => setTimeout(() => scrollToJobs(true), ms));
    return () => timers.forEach(clearTimeout);
  }, [hash]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="cucu-site careers">
        {/* 01 — Hero */}
        <section className="cr-hero" aria-label="Careers at CUCU Advertising">
          <Reveal as="span" className="eyebrow" after="intro" delay={80}>Careers</Reveal>
          <Lines as="h1" after="intro" delay={120}>
            <span className="dim">Make work</span>
            <>worth <em>making.</em></>
          </Lines>
          <div className="cr-hero-bottom">
            <Reveal as="p" className="cr-hero-sub" after="intro" delay={480}>
              Great work doesn’t happen by accident. It happens when curious minds, bold thinkers, and talented people come together.
            </Reveal>
            <Reveal className="cr-hero-actions" after="intro" delay={600}>
              <Magnetic>
                <a
                  href="#jobs"
                  className="pill cinema-primary cr-pill-arrow"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToJobs();
                  }}
                >
                  <Roll>Explore Open Roles</Roll>
                  <Arrow className="is-down" />
                </a>
              </Magnetic>
              <span className="cr-hero-count">
                {openCount > 0 ? `${openCount} open ${openCount === 1 ? "role" : "roles"}` : "Always open to talent"}
              </span>
            </Reveal>
          </div>
        </section>

        {/* 02 — Why work with us */}
        <section className="cr-why">
          <div className="cr-why-intro">
            <Reveal as="span" className="eyebrow">Why work with us</Reveal>
            <Lines as="h2">
              <>Good people.</>
              <span className="dim">Great things.</span>
            </Lines>
            <Reveal as="p" delay={200}>
              We’re a young Hyderabad team making branding, content, films and digital work. Here’s what working here is like.
            </Reveal>
          </div>
          <ol className="cr-why-list">
            {reasons.map(([title, text], i) => (
              <Reveal as="li" className="cr-why-item" key={title} delay={i * 80}>
                <span className="cr-num">0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* 03 — Culture, told through the work */}
        <section className="cr-culture">
          <CurveRise color="#151715" />
          <div className="cr-culture-head">
            <Reveal as="span" className="eyebrow">How we work</Reveal>
            <Lines as="h2">
              <>The work is</>
              <>the <span className="lime">culture.</span></>
            </Lines>
            <div className="cr-culture-bottom">
              <ScrubText text="Culture here isn’t a poster on the wall. It’s the work: what we choose to make, how carefully we make it, and how honestly we talk about what’s working." />
              <Reveal><Link className="text-link" to="/work"><Roll>See all the work</Roll></Link></Reveal>
            </div>
          </div>
          <WorkStrip />
        </section>

        {/* 04 — Hiring process */}
        <section className="cr-process">
          <div className="cr-process-head">
            <Reveal as="span" className="eyebrow">Our hiring process</Reveal>
            <Lines as="h2">
              <>Four steps.</>
              <span className="dim">No surprises.</span>
            </Lines>
          </div>
          <ol className="cr-steps">
            {steps.map(([title, text], i) => (
              <Reveal as="li" className="cr-step" key={title} delay={i * 110}>
                <span className="cr-num">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* 05 — Open positions */}
        <JobBoard />

        {/* 08 — General application */}
        <section className="cr-general">
          <div className="cr-general-card">
            <Lines as="h2">
              <>Don’t see</>
              <>your role?</>
            </Lines>
            <div className="cr-general-side">
              <Reveal as="p" delay={150}>
                The best opportunities don’t always come with job titles. Tell us what you do and what you love creating.
              </Reveal>
              <Reveal delay={250}>
                <Magnetic>
                  <Link to={`/careers/${GENERAL_SLUG}`} className="pill dark cr-pill-arrow">
                    <Roll>Get in Touch</Roll>
                    <Arrow />
                  </Link>
                </Magnetic>
              </Reveal>
            </div>
          </div>
        </section>
      </div>
      <SiteFooter />
    </motion.div>
  );
};
