import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lines, Reveal, Roll } from "../../motion/primitives";
import { CucuMark } from "../brand/CucuMark";
import projects from "./projects.json";

gsap.registerPlugin(ScrollTrigger);

// The four projects shown after the hero, in this order, each with the
// brand colour of the block that carries its name.
const ORDER = [
  ["naibu", "forest"],
  ["fruit-bandi", "lime"],
  ["ark-groups", "green"],
  ["one-ent", "sage"],
];
const featured = ORDER.map(([slug, tone]) => ({ ...projects.find((p) => p.slug === slug), tone })).filter((p) => p.slug);

// VIDEO SLOT — to give a panel a moving picture, add its slug and a video
// file here, e.g.  "ark-groups": "/videos/showcase/ark.mp4"
// Use a short, muted, compressed loop (ideally under 4 MB). The project's
// cover image stays underneath as the poster and the fallback, so a panel
// never shows an empty frame or player controls while a video is missing.
const SHOWCASE_VIDEO = {};

const two = (n) => String(n).padStart(2, "0");

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 18 18 6M8 6h10v10" />
  </svg>
);

/* Cover image, with a looping video over it when one is configured.
   The video only plays while its panel is on screen. */
const Media = ({ project, eager }) => {
  const video = useRef(null);
  const src = SHOWCASE_VIDEO[project.slug];

  useEffect(() => {
    const el = video.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.play().catch(() => {});
      else el.pause();
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, [src]);

  return (
    <span className="sc-media">
      <img src={project.coverImage} alt="" loading={eager ? "eager" : "lazy"} decoding="async" width="1800" height="1200" />
      {src && <video ref={video} src={src} poster={project.coverImage} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} />}
    </span>
  );
};

/* Selected work — a gallery that travels sideways.
   Desktop: the section holds still (CSS sticky) while scrolling down moves a
   row of tall panels across the screen: picture above, a block of brand colour
   below carrying the project's name. It is tied 1:1 to the scrollbar, so wheel,
   trackpad and keyboard all behave normally and nothing is hijacked.
   Touch screens and reduced motion: the same row, swiped by hand. */
export const Showcase = () => {
  const section = useRef(null);
  const track = useRef(null);
  const bar = useRef(null);

  useEffect(() => {
    const root = section.current;
    const row = track.current;
    if (!root || !row) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 851px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      root.classList.add("is-driven");
      // The stage is no longer scrolled by hand: keep it parked at the start,
      // including when the browser nudges it to reveal a focused link.
      const stage = row.parentElement;
      const park = () => {
        if (stage.scrollLeft !== 0) stage.scrollLeft = 0;
      };
      park();
      stage.addEventListener("scroll", park);
      const distance = () => Math.max(0, row.scrollWidth - window.innerWidth);
      const size = () => root.style.setProperty("--sc-distance", `${distance()}px`);
      size();
      ScrollTrigger.addEventListener("refreshInit", size);

      // Names come into focus once their panel is properly on screen.
      const cols = gsap.utils.toArray(".sc-col", row);
      const focusNames = () => {
        const edge = window.innerWidth * 0.8;
        cols.forEach((col) => col.classList.toggle("is-in", col.getBoundingClientRect().left < edge));
      };

      const travel = gsap.to(row, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: () => `+=${distance()}`, scrub: true, invalidateOnRefresh: true, onUpdate: () => focusNames(), onRefresh: () => focusNames() },
      });
      gsap.fromTo(bar.current, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: root, start: "top top", end: () => `+=${distance()}`, scrub: true, invalidateOnRefresh: true } });

      focusNames();
      cols.forEach((col) => {
        // The picture drifts a little slower than its frame.
        const img = col.querySelector(".sc-media");
        if (img) gsap.fromTo(img, { xPercent: -7 }, { xPercent: 7, ease: "none", scrollTrigger: { trigger: col, containerAnimation: travel, start: "left right", end: "right left", scrub: true } });
      });

      // Tabbing to a panel that is off to the side brings it into view.
      const onFocus = (e) => {
        const col = e.target.closest(".sc-col, .sc-intro, .sc-outro");
        if (!col) return;
        const x = Math.min(distance(), Math.max(0, col.offsetLeft - (window.innerWidth - col.offsetWidth) / 2));
        const y = root.getBoundingClientRect().top + window.scrollY + x;
        if (window.lenis) window.lenis.scrollTo(y, { duration: 0.9 });
        else window.scrollTo({ top: y });
      };
      row.addEventListener("focusin", onFocus);

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", size);
        row.removeEventListener("focusin", onFocus);
        stage.removeEventListener("scroll", park);
        root.classList.remove("is-driven");
        root.style.removeProperty("--sc-distance");
        row.querySelectorAll(".sc-col").forEach((col) => col.classList.remove("is-in"));
        gsap.set([row, bar.current, ...row.querySelectorAll(".sc-media")], { clearProps: "transform" });
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="showcase" id="selected-work" aria-labelledby="showcase-title" ref={section}>
      <div className="sc-stage">
        <div className="sc-track" ref={track}>
          <div className="sc-intro">
            <Reveal as="span" className="eyebrow">Selected work</Reveal>
            <div>
              <Lines as="h2" id="showcase-title">
                <>Good thinking</>
                <span className="dim">deserves to be</span>
                <span className="dim">remembered.</span>
              </Lines>
              <Reveal as="p" className="sc-hint" delay={250}>
                <span className="sc-hint-scroll">Keep scrolling</span>
                <span className="sc-hint-swipe">Swipe</span>
                <i aria-hidden="true" />
              </Reveal>
            </div>
          </div>

          <ol className="sc-list">
            {featured.map((p, i) => (
              <li key={p.slug}>
                <Link to={`/project/${p.slug}`} className={`sc-col tone-${p.tone}`} aria-label={`${p.title} — ${p.category}. View project`}>
                  <span className="sc-frame">
                    <Media project={p} eager={i === 0} />
                  </span>
                  <span className="sc-block">
                    <span className="sc-go" aria-hidden="true"><Arrow /></span>
                    <span className="sc-name">
                      <span className="sc-title">{p.title}</span>
                      <span className="sc-count">{two(i + 1)} / {two(featured.length)}</span>
                    </span>
                    <span className="sc-cat">
                      <span>{p.category}</span>
                      <span>{p.industry}</span>
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>

          <div className="sc-outro">
            <span className="sc-outro-mark" aria-hidden="true"><CucuMark /></span>
            <div>
              <p>There’s more where that came from.</p>
              <Link className="sc-all" to="/work">
                <Roll>Explore all projects</Roll>
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
        <span className="sc-progress" aria-hidden="true"><i ref={bar} /></span>
      </div>
    </section>
  );
};
