import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SiteFooter } from "../components/SiteFooter";
import { CurveRise, Lines, Magnetic, Reveal, Roll } from "../motion/primitives";
import { reducedMotion } from "../motion/core";
import { services } from "../constants/services";
import useSeo from "../hooks/useSeo";
import "../components/website/website-home.css";
import "./inner-pages.css";

const Arrow = ({ className = "" }) => (
  <svg className={`pg-arrow ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 18 18 6M8 6h10v10" />
  </svg>
);

const goTo = (id) => (e) => {
  const target = document.getElementById(id);
  if (!target) return;
  e.preventDefault();
  if (window.lenis) window.lenis.scrollTo(target, { offset: -40, duration: 1.3, immediate: reducedMotion() });
  else target.scrollIntoView();
};

/* One service: a number, a large title, what it does in a sentence, a way to
   start the conversation, and its illustration. */
const Service = ({ service, index }) => (
  <article className={"sv-row" + (index % 2 ? " is-flipped" : "")} id={service.id}>
    <div className="sv-copy">
      <Reveal as="span" className="pg-num">0{index + 1} / 0{services.length}</Reveal>
      <Lines as="h2" className="sv-title">
        <>{service.title}</>
      </Lines>
      <Reveal as="p" className="sv-line" delay={120}>
        <strong>{service.headlineHighlight}</strong>
        {service.headlineRest}
      </Reveal>
      <Reveal delay={220}>
        <Link to="/contact" className="sv-cta" aria-label={`Talk to us about ${service.title}`}>
          <span className="sv-cta-ring" aria-hidden="true"><Arrow /></span>
          <Roll>Talk to us about this</Roll>
        </Link>
      </Reveal>
    </div>
    <Reveal variant="clip" className="sv-image" amount={0.2}>
      <img src={service.image} alt="" loading="lazy" width="1080" height="1080" />
    </Reveal>
  </article>
);

export const ServicesPage = () => {
  useSeo({
    title: "Services | CUCU Advertising — Social, Performance, SEO, Content, Films, Web",
    description:
      "What CUCU Advertising does: social media marketing, performance marketing, SEO, content creation, ad films and web experiences, from a creative studio in Hyderabad.",
    path: "/services",
  });

  const half = Math.ceil(services.length / 2);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="cucu-site pg services-page">
        {/* Hero */}
        <section className="pg-hero is-long" aria-label="Services">
          <div className="pg-hero-top">
            <Reveal as="span" className="eyebrow" after="intro" delay={80}>Services</Reveal>
            <Reveal as="span" className="eyebrow pg-hero-place" after="intro" delay={140}>0{services.length} ways we help</Reveal>
          </div>
          <Lines as="h1" after="intro" delay={120}>
            <span className="dim">From the first</span>
            <span className="dim">“Who’s that?” to</span>
            <em>“That’s the one.”</em>
          </Lines>
          <div className="pg-hero-bottom">
            <Reveal as="ul" className="sv-index" after="intro" delay={480} aria-label="Jump to a service">
              {services.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} onClick={goTo(s.id)}>
                    <span>0{i + 1}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </Reveal>
          </div>
        </section>

        {/* First half — on white */}
        <section className="sv-list" aria-label="Services, part one">
          {services.slice(0, half).map((s, i) => <Service service={s} index={i} key={s.id} />)}
        </section>

        {/* Second half — on black */}
        <section className="sv-list is-dark" aria-label="Services, part two">
          <CurveRise color="#151715" />
          {services.slice(half).map((s, i) => <Service service={s} index={half + i} key={s.id} />)}
        </section>

        {/* Enquiry */}
        <section className="pg-cta">
          <div className="pg-cta-card">
            <Lines as="h2">
              <>Not sure which</>
              <>one you need?</>
            </Lines>
            <div className="pg-cta-side">
              <Reveal as="p" delay={150}>
                Tell us what you’re building. We’ll tell you honestly what works.
              </Reveal>
              <Reveal delay={250}>
                <Magnetic>
                  <Link to="/contact" className="pill dark pg-pill-arrow">
                    <Roll>Let’s Build</Roll>
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
