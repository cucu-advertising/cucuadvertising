import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SiteFooter } from "../components/SiteFooter";
import { CucuMark } from "../components/brand/CucuMark";
import { CurveRise, Lines, Magnetic, Reveal, Roll } from "../motion/primitives";
import { reducedMotion } from "../motion/core";
import { allProjects } from "../constants/projects";
import { optimizedSrc, projectThumb } from "../utils/optimizedImage";
import { projectPath } from "../utils/projectSlug";
import useSeo from "../hooks/useSeo";
import { Arrow } from "./CaseStudy";
import "../components/website/website-home.css";
import "./inner-pages.css";
import "./portfolio.css";

const two = (n) => String(n).padStart(2, "0");
const isVideo = (src) => typeof src === "string" && /\.(mp4|webm|mov)$/i.test(src);

// The disciplines a project can be filed under (its `category` in projects.js).
const FILTERS = [
  "Brand Identity & Communication",
  "Packaging Design",
  "User Experience & Interaction",
  "Web Development",
];

// Projects that were made as films get their own chapter further down.
// Only projects whose films can actually be watched are listed.
const filmProjects = allProjects.filter((p) => p.films && p.films.some((f) => f.url) && !p.disableDetail);

// Lead campaigns on Meta Ads. Figures are the campaign totals shown in the
// CUCU portfolio deck — update them here when newer numbers are available.
const campaigns = [
  { client: "Ravasa Retreat", reach: "7,16,745", leads: "1,696", cpl: "₹103.36" },
  { client: "Oryza Farmlands", reach: "4,92,155", leads: "841", cpl: "₹192.05" },
  { client: "Globus IT", reach: "1,80,975", leads: "379", cpl: "₹98.59" },
  { client: "CUCU Advertising", reach: "1,41,669", leads: "732", cpl: "₹68.62" },
];

// Social media and web work that doesn't have its own project page yet.
const social = [
  { client: "Oryza Farms", kind: "Social media", img: "/Clientwork/social/oryza.webp" },
  { client: "Howzy", kind: "Social media", img: "/Clientwork/social/howzy.webp" },
  { client: "Globus IT", kind: "Social media", img: "/Clientwork/social/globus-it.webp" },
  { client: "Ravasa Retreat", kind: "Social media", img: "/Clientwork/social/ravasa.webp" },
  { client: "H+ by Voxela", kind: "Social media", img: "/Clientwork/social/h-plus-voxela.webp" },
  { client: "Voxela", kind: "Social media", img: "/Clientwork/social/voxela.webp" },
  { client: "Daily Med", kind: "Website", img: "/Clientwork/social/dailymed-website.webp" },
];

const Card = ({ project, index }) => {
  const body = (
    <>
      <Reveal variant="clip" className="pf-card-image" amount={0.12}>
        {isVideo(project.img) ? (
          <video src={project.img} muted loop playsInline autoPlay={!reducedMotion()} />
        ) : (
          <img src={projectThumb(project, 1200)} alt={`${project.title} — ${project.industry || project.category}`} loading={index < 2 ? "eager" : "lazy"} decoding="async" />
        )}
      </Reveal>
      <span className="pf-card-meta">
        <span className="pg-num">{two(index + 1)}</span>
        <span className="pf-card-title">{project.title}</span>
        <span className="pf-card-cat">{project.industry || project.category}</span>
        {!project.disableDetail && <span className="pf-card-ring"><Arrow /></span>}
      </span>
    </>
  );

  return (
    <li className="pf-card">
      {project.disableDetail ? <div className="pf-card-in">{body}</div> : <Link className="pf-card-in" to={projectPath(project)}>{body}</Link>}
    </li>
  );
};

export const WorkPage = () => {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? allProjects : allProjects.filter((p) => p.category === filter);

  useSeo({
    title: "Portfolio | CUCU Advertising — Branding, Films, Content and Digital Work",
    description:
      "Selected work by CUCU Advertising: brand identities, packaging, films, content and web experiences for brands in Hyderabad and beyond.",
    path: "/work",
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="cucu-site pg pf">
        {/* Hero — the dark stage shared with the rest of the site */}
        <section className="pg-hero pf-hero" aria-label="Portfolio">
          <div className="pg-hero-top">
            <Reveal as="span" className="eyebrow" after="intro" delay={80}>Portfolio</Reveal>
            <Reveal as="span" className="eyebrow pg-hero-place" after="intro" delay={140}>{two(allProjects.length)} projects</Reveal>
          </div>
          <Lines as="h1" after="intro" delay={120}>
            <span className="dim">The work we’ve</span>
            <>been <em>up to.</em></>
          </Lines>
          <div className="pg-hero-bottom">
            <Reveal as="p" className="pg-hero-sub" after="intro" delay={480}>
              Different brands, different challenges, a lot of thinking in between.
            </Reveal>
          </div>
          <span className="pg-hero-mark" aria-hidden="true"><CucuMark /></span>
        </section>

        {/* The work */}
        <section className="pf-board" aria-label="Projects">
          <div className="pf-bar">
            <div className="pf-filters" role="group" aria-label="Filter projects by discipline">
              {["All", ...FILTERS].map((f) => (
                <button type="button" key={f} className={"pf-filter" + (filter === f ? " is-on" : "")} aria-pressed={filter === f} onClick={() => setFilter(f)}>
                  {f}
                </button>
              ))}
            </div>
            <p className="pf-count" aria-live="polite">{two(shown.length)} {shown.length === 1 ? "project" : "projects"}</p>
          </div>
          <ol className="pf-grid" key={filter}>
            {shown.map((p, i) => <Card project={p} index={i} key={p.title} />)}
          </ol>
        </section>

        {/* Films — a black chapter */}
        {filmProjects.length > 0 && (
          <section className="pf-films">
            <CurveRise color="#151715" />
            <div className="pf-films-head">
              <Reveal as="span" className="eyebrow">Films</Reveal>
              <Lines as="h2">
                <>Made to be</>
                <span className="lime">watched.</span>
              </Lines>
            </div>
            <ol className="pf-film-list">
              {filmProjects.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 80}>
                  <Link to={projectPath(p)} className="pf-film">
                    <span className="pg-num">{two(i + 1)}</span>
                    <span className="pf-film-title">{p.title}</span>
                    <span className="pf-film-meta">{p.industry}</span>
                    <span className="pf-film-count">{two(p.films.filter((f) => f.url).length)} {p.films.filter((f) => f.url).length === 1 ? "film" : "films"}</span>
                    <span className="pf-card-ring"><Arrow /></span>
                  </Link>
                </Reveal>
              ))}
            </ol>
          </section>
        )}

        {/* Performance marketing — the numbers */}
        <section className="pf-perf" aria-labelledby="pf-perf-title">
          <div className="pf-perf-head">
            <div>
              <Reveal as="span" className="eyebrow">Performance marketing</Reveal>
              <Lines as="h2" id="pf-perf-title">
                <>Noticed.</>
                <span className="dim">Then counted.</span>
              </Lines>
            </div>
            <Reveal as="p" delay={150}>Lead campaigns on Meta Ads. Reach, leads and cost per lead are campaign totals.</Reveal>
          </div>
          <div className="pf-perf-table" role="table" aria-label="Meta Ads lead campaign results">
            <div className="pf-perf-row is-head" role="row">
              <span role="columnheader">Client</span>
              <span role="columnheader">Accounts reached</span>
              <span role="columnheader">Leads generated</span>
              <span role="columnheader">Cost per lead</span>
            </div>
            {campaigns.map((c, i) => (
              <Reveal className="pf-perf-row" role="row" key={c.client} delay={i * 70}>
                <span role="cell" className="pf-perf-client"><span className="pg-num">{two(i + 1)}</span>{c.client}</span>
                <span role="cell" data-label="Accounts reached">{c.reach}</span>
                <span role="cell" data-label="Leads generated" className="is-strong">{c.leads}</span>
                <span role="cell" data-label="Cost per lead">{c.cpl}</span>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Social media and web */}
        <section className="pf-social" aria-labelledby="pf-social-title">
          <div className="pf-social-head">
            <Reveal as="span" className="eyebrow">Social media and web</Reveal>
            <Lines as="h2" id="pf-social-title">
              <>Every day,</>
              <span className="dim">on every feed.</span>
            </Lines>
          </div>
          <ul className="pf-social-row" tabIndex={0} aria-label="Social media and web work, scroll sideways for more">
            {social.map((item, i) => (
              <li key={item.client}>
                <Reveal variant="clip" className="pf-social-image" amount={0.12} delay={(i % 3) * 80}>
                  <img src={optimizedSrc(item.img, 1200)} alt={`${item.client} — ${item.kind.toLowerCase()} work by CUCU`} loading="lazy" decoding="async" width="1200" height="675" />
                </Reveal>
                <span className="pf-social-cap"><span>{item.client}</span><span>{item.kind}</span></span>
              </li>
            ))}
          </ul>
        </section>

        {/* Enquiry */}
        <section className="pg-cta pf-cta">
          <div className="pg-cta-card">
            <Lines as="h2">
              <>Yours could</>
              <>be next.</>
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
