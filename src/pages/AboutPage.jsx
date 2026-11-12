import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SiteFooter } from "../components/SiteFooter";
// Web-sized copy (1600px) of "about us big.webp" — the original is 3264px / 452KB.
import aboutHeroImg from "../assets/NEW/about us big-1600.webp";
import { NameStory } from "../components/about/NameStory";
import { AboutStats, AboutPlayground } from "../components/about/AboutExtras";
import { ClientMarquee } from "../components/sections/Clients";
import { CucuMark } from "../components/brand/CucuMark";
import { Lines, Magnetic, Reveal, Roll, ScrubText } from "../motion/primitives";
import useSeo from "../hooks/useSeo";
import "../components/website/website-home.css";
import "./inner-pages.css";

export const AboutPage = () => {
  useSeo({
    title: "About CUCU Advertising | Creative & Growth Studio in Hyderabad",
    description:
      "CUCU Advertising is a creative and growth studio from Hyderabad. Client to User, with Creative Understanding: the story behind the name and how we think.",
    path: "/about",
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="cucu-site pg about">
        {/* Hero — the dark stage shared with Home and Careers */}
        <section className="pg-hero" aria-label="About CUCU Advertising">
          <div className="pg-hero-top">
            <Reveal as="span" className="eyebrow" after="intro" delay={80}>Our story</Reveal>
            <Reveal as="span" className="eyebrow pg-hero-place" after="intro" delay={140}>Hyderabad · Mumbai</Reveal>
          </div>
          <Lines as="h1" after="intro" delay={120}>
            <span className="dim">We’re CUCU</span>
            <em>Advertising.</em>
          </Lines>
          <div className="pg-hero-bottom">
            <Reveal as="p" className="pg-hero-sub ab-motto" after="intro" delay={480}>
              <b>C</b>lient to <b>U</b>ser, with <b>C</b>reative <b>U</b>nderstanding.
            </Reveal>
            <Reveal className="pg-hero-actions" after="intro" delay={600}>
              <Magnetic><Link to="/work" className="pill cinema-primary"><Roll>See Our Work</Roll></Link></Magnetic>
              <Magnetic><Link to="/contact" className="pill"><Roll>Let’s Build</Roll></Link></Magnetic>
            </Reveal>
          </div>
          <span className="pg-hero-mark" aria-hidden="true"><CucuMark /></span>
        </section>

        {/* Who we are */}
        <section className="ab-intro">
          <div className="ab-intro-copy">
            <Reveal as="span" className="eyebrow">Who we are</Reveal>
            <ScrubText
              as="p"
              className="ab-statement"
              text="A creative and growth studio from Hyderabad. We bring strategy, branding, content, films and performance together to build brands people notice, remember and choose."
              start="top 85%"
              end="bottom 60%"
            />
          </div>
          <Reveal variant="clip" className="ab-intro-image" amount={0.2}>
            <img src={aboutHeroImg} alt="Three people from CUCU holding up a storyboard" width="1600" height="1160" loading="lazy" />
          </Reveal>
          <AboutStats />
        </section>

        {/* The name — dark */}
        <NameStory />

        {/* How we think */}
        <AboutPlayground />

        {/* Clients */}
        <section className="ab-clients">
          <div className="ab-clients-head">
            <Reveal as="span" className="eyebrow">Clients</Reveal>
            <Lines as="h2">
              <>The brands that are</>
              <span className="dim">part of our story.</span>
            </Lines>
            <Reveal delay={200}><Link className="text-link" to="/clients"><Roll>Meet our clients</Roll></Link></Reveal>
          </div>
          <Reveal delay={120}><ClientMarquee /></Reveal>
        </section>
      </div>
      <SiteFooter />
    </motion.div>
  );
};
