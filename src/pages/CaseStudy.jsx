import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { SiteFooter } from "../components/SiteFooter";
import { CurveRise, Lines, Reveal, Roll, ScrubText } from "../motion/primitives";
import { reducedMotion } from "../motion/core";
import { allProjects } from "../constants/projects";
import { optimizedSrc, projectThumb } from "../utils/optimizedImage";
import { projectPath } from "../utils/projectSlug";
import useSeo from "../hooks/useSeo";
import "../components/website/website-home.css";
import "./inner-pages.css";
import "./portfolio.css";

/* A project page, built entirely from the project's entry in
   src/constants/projects.js. Every section is optional: it appears only when
   the project has the content for it, so nothing is ever padded out.

   Fields read here
     title, industry, about, scope[]         hero and overview
     img                                     the primary visual
     challenges                              "The challenge" (one line per sentence)
     statement { lead, accent }, solution    creative direction
     approach { title, steps[] }             how the work was made
     subProjects[] { name, desc, img }       the showcase
     gallery[]                               further visuals
     films[] { title, subtitle, url }        films (no url = a labelled placeholder)
     filmFormat "vertical" | "horizontal"
     identity, brandMark { src, alt }        visual language
     palette[] { name, hex }, typeface       brand colours and type
     results[] { val, label }                numbers
     influencer { title, copy, reels[] }     Instagram Reels, embedded from Instagram
*/

const two = (n) => String(n).padStart(2, "0");
const isVideo = (src) => typeof src === "string" && /\.(mp4|webm|mov)$/i.test(src);
const sentences = (text) => (text || "").split(/(?<=\.)\s+/).map((s) => s.trim()).filter((s) => s.length > 5);

export const Arrow = ({ className = "" }) => (
  <svg className={`pg-arrow ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 18 18 6M8 6h10v10" />
  </svg>
);

/* A picture that keeps its own proportions, so nothing a client supplied is
   ever cropped. The frame opens like a curtain as it scrolls into view. */
const Frame = ({ src, alt = "", width = 1200, ratio = 1.456, eager = false, className = "" }) => {
  const [r, setR] = useState(ratio);
  if (isVideo(src)) {
    return (
      <div className={`cs-frame ${className}`} style={{ aspectRatio: "16 / 9" }}>
        <video src={src} autoPlay={!reducedMotion()} muted loop playsInline controls={reducedMotion()} />
      </div>
    );
  }
  return (
    <Reveal variant="clip" className={`cs-frame ${className}`} amount={0.12} style={{ aspectRatio: String(r) }}>
      <img
        src={optimizedSrc(src, width)}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={(e) => {
          const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
          if (w && h) setR(+(w / h).toFixed(3));
        }}
      />
    </Reveal>
  );
};

/* ───────────── Films ───────────── */

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" /></svg>
);

/* The player: opens over the page, plays with sound and the browser's own
   controls. Closes with the button, the Escape key or a click outside. */
const FilmPlayer = ({ film, vertical, onClose }) => {
  const close = useRef(null);

  useEffect(() => {
    const opener = document.activeElement;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      // Keep the keyboard inside the player while it is open.
      if (e.key === "Tab" && !e.target.closest?.(".cs-player")) {
        e.preventDefault();
        close.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    window.lenis?.stop();
    document.documentElement.classList.add("cs-player-open");
    close.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      window.lenis?.start();
      document.documentElement.classList.remove("cs-player-open");
      opener?.focus?.();
    };
  }, [onClose]);

  return createPortal(
    <div className="cs-player" role="dialog" aria-modal="true" aria-label={`${film.title}${film.subtitle ? `, ${film.subtitle}` : ""}`} onClick={onClose}>
      <button type="button" className="cs-player-close" ref={close} onClick={onClose} aria-label="Close film">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
      </button>
      <div className={"cs-player-box" + (vertical ? " is-vertical" : "")} onClick={(e) => e.stopPropagation()}>
        {isVideo(film.url) ? (
          <video src={film.url} controls autoPlay playsInline controlsList="nodownload" onContextMenu={(e) => e.preventDefault()} />
        ) : (
          <iframe src={film.url} title={film.title} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
        )}
        <p>{film.title}{film.subtitle && <span> · {film.subtitle}</span>}</p>
      </div>
    </div>,
    document.body,
  );
};

const Film = ({ film, index, vertical, onOpen }) => {
  const video = useRef(null);

  // A silent preview while the pointer rests on a film.
  const preview = (on) => {
    const el = video.current;
    if (!el || reducedMotion()) return;
    if (on) el.play().catch(() => {});
    else el.pause();
  };

  if (!film.url) {
    // A film that is planned but not delivered yet: say so, show nothing fake.
    return (
      <li className="cs-film is-empty">
        <span className="cs-film-frame">
          <span className="cs-film-soon">Film to be added</span>
        </span>
        <span className="cs-film-cap"><span>{two(index + 1)}</span><span>{film.title}{film.subtitle ? ` · ${film.subtitle}` : ""}</span></span>
      </li>
    );
  }

  return (
    <li className="cs-film">
      <button
        type="button"
        onClick={() => {
          preview(false);
          onOpen(film);
        }}
        onPointerEnter={(e) => e.pointerType === "mouse" && preview(true)}
        onPointerLeave={() => preview(false)}
        aria-label={`Play ${film.title}${film.subtitle ? `, ${film.subtitle}` : ""}`}
      >
        <span className="cs-film-frame">
          {isVideo(film.url) ? (
            // Only the first frame is fetched until someone asks for more.
            <video ref={video} src={`${film.url}#t=0.1`} poster={film.thumbnail} muted loop playsInline preload="metadata" tabIndex={-1} aria-hidden="true" />
          ) : (
            film.thumbnail && <img src={film.thumbnail} alt="" loading="lazy" decoding="async" />
          )}
          <span className="cs-film-play"><PlayIcon /></span>
        </span>
        <span className="cs-film-cap"><span>{two(index + 1)}</span><span>{film.subtitle || film.title}</span></span>
      </button>
    </li>
  );
};

const Films = ({ project }) => {
  const [open, setOpen] = useState(null);
  const close = useCallback(() => setOpen(null), []);
  const { films } = project;
  const vertical = project.filmFormat !== "horizontal";
  const ready = films.filter((f) => f.url).length;

  return (
    <section className="cs-films" aria-labelledby="cs-films-title">
      <div className="cs-head">
        <div>
          <Reveal as="span" className="eyebrow">The films</Reveal>
          <Lines as="h2" id="cs-films-title">
            <>{films.length === 1 ? "One film." : `${two(films.length)} films.`}</>
            <span className="dim">{films.length === 1 ? "One story." : "One system."}</span>
          </Lines>
        </div>
        <div className="cs-head-side">
          {project.filmsIntro && <Reveal as="p" delay={150}>{project.filmsIntro}</Reveal>}
          {ready > 0 && <Reveal as="span" className="cs-hint" delay={220}>Select a film to watch it with sound</Reveal>}
        </div>
      </div>
      <ol className={"cs-film-row" + (vertical ? " is-vertical" : " is-wide")} style={{ "--n": films.length }}>
        {films.map((film, i) => <Film film={film} index={i} vertical={vertical} onOpen={setOpen} key={film.title + i} />)}
      </ol>
      {open && <FilmPlayer film={open} vertical={vertical} onClose={close} />}
    </section>
  );
};

/* ───────────── Influencer marketing: Reels embedded from Instagram ─────────────
   The Reels stay on Instagram and are shown through Instagram's own embed, so
   nothing is downloaded or re-hosted. Embeds are only requested once the section
   is close to the screen. If an embed is blocked or unavailable, the card behind
   it and the link below it still lead to the Reel. */

const reelId = (url) => (String(url).match(/\/(?:reel|reels|p)\/([^/?#]+)/) || [])[1];

const Influencer = ({ project }) => {
  const { influencer, title } = project;
  const root = useRef(null);
  const [near, setNear] = useState(false);
  const reels = (influencer.reels || []).map((url) => ({ url, id: reelId(url) })).filter((r) => r.id);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setNear(true); io.disconnect(); }
    }, { rootMargin: "500px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Instagram's embed reports its real height; fit each frame to it so a Reel
  // is never cropped or left with a gap.
  useEffect(() => {
    const onMessage = (e) => {
      if (!/^https:\/\/(www\.)?instagram\.com$/.test(e.origin)) return;
      let data = e.data;
      try { if (typeof data === "string") data = JSON.parse(data); } catch { return; }
      const height = data && data.type === "MEASURE" && data.details && Number(data.details.height);
      if (!height || !root.current) return;
      root.current.querySelectorAll("iframe").forEach((frame) => {
        if (frame.contentWindow === e.source) {
          frame.style.height = `${Math.round(height)}px`;
          frame.parentElement.classList.add("is-sized");
        }
      });
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  if (!reels.length) return null;

  return (
    <section className="cs-influence" aria-labelledby="cs-influence-title" ref={root}>
      <CurveRise color="#151715" />
      <div className="cs-head">
        <div>
          <Reveal as="span" className="eyebrow">Influencer Marketing</Reveal>
          <Lines as="h2" id="cs-influence-title">
            {(influencer.title || []).map((line, i) => (i === 0 ? <React.Fragment key={line}>{line}</React.Fragment> : <span className="lime" key={line}>{line}</span>))}
          </Lines>
        </div>
        <div className="cs-head-side">
          {influencer.copy && <Reveal as="p" delay={150}>{influencer.copy}</Reveal>}
          <Reveal as="span" className="cs-hint" delay={220}>{two(reels.length)} Reels, played from Instagram</Reveal>
        </div>
      </div>
      <ol className="cs-reel-row" tabIndex={0} aria-label={`${title} influencer Reels, scroll sideways for more`}>
        {reels.map((reel, i) => (
          <Reveal as="li" className="cs-reel" key={reel.id} delay={(i % 4) * 80}>
            <span className="cs-reel-frame">
              <a className="cs-reel-fallback" href={reel.url} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">
                <span className="pg-num">{two(i + 1)}</span>
                <span>Reel {two(i + 1)}</span>
                <span>View on Instagram</span>
              </a>
              {near && (
                <iframe
                  src={`https://www.instagram.com/reel/${reel.id}/embed/`}
                  title={`${title} influencer Reel ${i + 1} on Instagram`}
                  loading="lazy"
                  scrolling="no"
                  allow="encrypted-media; picture-in-picture; web-share; clipboard-write"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              )}
            </span>
            <a className="cs-reel-link" href={reel.url} target="_blank" rel="noopener noreferrer">
              <span>{two(i + 1)}</span>
              <span>View on Instagram <Arrow /></span>
            </a>
          </Reveal>
        ))}
      </ol>
    </section>
  );
};

/* ───────────── Closing: the next project ───────────── */

export const NextProject = ({ project }) => {
  const list = allProjects.filter((p) => !p.disableDetail);
  const at = list.findIndex((p) => p.title === project.title);
  const next = list[(at + 1) % list.length];
  if (!next || next.title === project.title) return null;

  return (
    <section className="cs-next" aria-label="Next project">
      <Link to={projectPath(next)} className="cs-next-link">
        <span className="cs-next-copy">
          <Reveal as="span" className="eyebrow">Next project</Reveal>
          <Lines as="span" className="cs-next-title">
            <>{next.title}</>
          </Lines>
          <Reveal as="span" className="cs-next-meta" delay={150}>
            <span>{next.industry || next.category}</span>
            <span className="cs-next-ring"><Arrow /></span>
          </Reveal>
        </span>
        <Reveal variant="clip" className={"cs-next-image" + (next.logo ? " has-logo" : "")} amount={0.15}>
          {next.logo ? (
            <span className="cs-next-logo" style={next.logo.bg ? { "--logo-bg": next.logo.bg } : undefined}>
              <img src={next.logo.src} alt="" loading="lazy" decoding="async" />
            </span>
          ) : isVideo(next.img) ? (
            <video src={next.img} muted loop playsInline autoPlay={!reducedMotion()} />
          ) : (
            <img src={projectThumb(next, 1200)} alt="" loading="lazy" decoding="async" />
          )}
        </Reveal>
      </Link>
      <Reveal className="cs-next-all">
        <Link to="/work" className="text-link"><Roll>All projects</Roll></Link>
      </Reveal>
    </section>
  );
};

/* ───────────── The page ───────────── */

export const CaseStudy = ({ project }) => {
  const {
    title, industry, about, scope, img, challenges, statement, solution, approach,
    subProjects, films, identity, brandMark, results, typeface,
  } = project;

  useSeo({
    title: `${title} | Work by CUCU Advertising`,
    description: about ? about.slice(0, 155) : `${title}, a project by CUCU Advertising.`,
    path: projectPath(project),
  });

  // Further visuals: whatever is in the gallery that hasn't been shown already.
  const used = new Set([img, ...(subProjects || []).map((s) => s.img)]);
  const gallery = [...new Set(project.gallery || [])].filter((g) => g && !used.has(g));
  const problems = sentences(challenges);
  const palette = (project.palette || []).filter((c) => c.hex);
  // Text on a swatch is dark or light depending on how bright the colour is.
  const onSwatch = (hex) => {
    const n = parseInt(hex.slice(1), 16);
    const lum = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
    return lum > 0.62 ? "#151715" : "#ffffff";
  };
  // The headline already says the first line of the solution: don't say it twice.
  const opener = statement ? `${statement.lead} ${statement.accent}` : "";
  const solutionText = solution && opener && solution.startsWith(opener) ? solution.slice(opener.length).trim() : solution;
  const hasDirection = statement || solution || approach;
  const hasShow = (subProjects && subProjects.length > 0) || gallery.length > 0;

  return (
    <>
      <div className="cucu-site pg cs">
        {/* 01 — Introduction */}
        <section className={"pg-hero cs-hero" + (title.length > 12 ? " is-long" : "")} aria-label={title}>
          <div className="pg-hero-top">
            <Reveal as="span" className="eyebrow" after="intro" delay={80}>
              <Link to="/work" className="cs-back"><Arrow className="is-back" /><Roll>All projects</Roll></Link>
            </Reveal>
            <Reveal as="span" className="eyebrow pg-hero-place" after="intro" delay={140}>Case study</Reveal>
          </div>
          <Lines as="h1" after="intro" delay={120}>
            <>{title}</>
          </Lines>
          <Reveal as="dl" className="cs-facts" after="intro" delay={460}>
            <div><dt>Client</dt><dd>{title}</dd></div>
            {industry && <div><dt>Industry</dt><dd>{industry}</dd></div>}
            {scope && scope.every((s) => s.length < 26) && <div className="is-wide"><dt>Scope</dt><dd>{scope.join(" · ")}</dd></div>}
          </Reveal>
        </section>

        {img && (
          <div className="cs-lead">
            <Frame src={img} alt={`${title} — primary visual`} width={2000} eager />
          </div>
        )}

        {/* 02 — Overview */}
        {about && (
          <section className="cs-overview">
            <div>
              <Reveal as="span" className="eyebrow">Overview</Reveal>
              <ScrubText className="cs-statement" text={about} />
            </div>
            {scope && (
              <Reveal className="cs-scope" delay={120}>
                <span className="eyebrow">What we did</span>
                <ul>
                  {scope.map((s, i) => <li key={s}><span>{two(i + 1)}</span>{s}</li>)}
                </ul>
              </Reveal>
            )}
          </section>
        )}

        {problems.length > 0 && (
          <section className="cs-brief">
            <div className="cs-brief-head">
              <Reveal as="span" className="eyebrow">The challenge</Reveal>
              <Lines as="h2">
                <>What the work</>
                <span className="dim">had to solve.</span>
              </Lines>
            </div>
            <ol className="cs-brief-list">
              {problems.map((p, i) => (
                <Reveal as="li" key={p} delay={(i % 2) * 90}>
                  <span className="pg-num">{two(i + 1)}</span>
                  <p>{p}</p>
                </Reveal>
              ))}
            </ol>
          </section>
        )}

        {/* 03 — Creative direction: a black chapter */}
        {hasDirection && (
          <section className="cs-direction">
            <CurveRise color="#151715" />
            <Reveal as="span" className="eyebrow">Creative direction</Reveal>
            {statement ? (
              <Lines as="h2">
                <>{statement.lead}</>
                <span className="lime">{statement.accent}</span>
              </Lines>
            ) : (
              <Lines as="h2">
                <>The idea,</>
                <span className="lime">made clear.</span>
              </Lines>
            )}
            {solutionText && (
              <div className="cs-direction-bottom">
                <ScrubText text={solutionText} />
              </div>
            )}
            {approach && (
              <div className="cs-approach">
                <Reveal as="h3">{approach.title}</Reveal>
                <ol>
                  {approach.steps.map((step, i) => (
                    <Reveal as="li" key={step.title} delay={i * 90}>
                      <span className="pg-num">{two(i + 1)}</span>
                      <h4>{step.title}</h4>
                      <p>{step.desc}</p>
                    </Reveal>
                  ))}
                </ol>
              </div>
            )}
          </section>
        )}

        {/* 04 — Showcase */}
        {hasShow && (
          <section className="cs-show">
            <div className="cs-head">
              <div>
                <Reveal as="span" className="eyebrow">The work</Reveal>
                <Lines as="h2">
                  {subProjects && subProjects.length > 1 ? (
                    <>{two(subProjects.length)} projects.</>
                  ) : (
                    <>In the</>
                  )}
                  <span className="dim">{subProjects && subProjects.length > 1 ? "One visual language." : "real world."}</span>
                </Lines>
              </div>
            </div>
            {subProjects && subProjects.length > 0 && (
              <div className="cs-pair">
                {subProjects.map((sp, i) => (
                  <figure key={sp.name} className={"cs-pair-item" + (i % 2 ? " is-offset" : "")}>
                    <Frame src={sp.img} alt={`${sp.name} — ${title}`} width={1200} />
                    <figcaption>
                      <span className="pg-num">{two(i + 1)} / {two(subProjects.length)}</span>
                      <Reveal as="h3">{sp.name}</Reveal>
                      <Reveal as="p" delay={100}>{sp.desc}</Reveal>
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
            {gallery.length > 0 && (
              <div className="cs-gallery">
                {gallery.map((g, i) => (
                  <Frame key={g + i} src={g} alt={`${title} — visual ${i + 1}`} width={i % 3 === 0 ? 2000 : 1200} className={"cs-g" + (i % 3)} />
                ))}
              </div>
            )}
          </section>
        )}

        {films && films.length > 0 && <Films project={project} />}

        {project.influencer && <Influencer project={project} />}

        {/* Brand colours and typeface */}
        {palette.length > 0 && (
          <section className="cs-system" aria-label="Brand colours and typeface">
            <div className="cs-head">
              <div>
                <Reveal as="span" className="eyebrow">The system</Reveal>
                <Lines as="h2">
                  <>Colour</>
                  <span className="dim">and type.</span>
                </Lines>
              </div>
            </div>
            <div className={"cs-system-grid" + (typeface ? " has-type" : "")}>
              <Reveal as="ul" className="cs-swatches" style={{ "--n": palette.length }}>
                {palette.map((c) => (
                  <li key={c.hex + c.name} style={{ background: c.hex, color: onSwatch(c.hex) }} className={onSwatch(c.hex) === "#151715" ? "is-light" : ""}>
                    <span>{c.name}</span>
                    <span>{c.hex.toUpperCase()}</span>
                  </li>
                ))}
              </Reveal>
              {typeface && (
                <Reveal className="cs-type" delay={120}>
                  <span className="cs-type-label">{typeface.note || "Typeface"}</span>
                  <span className="cs-type-aa" aria-hidden="true">Aa</span>
                  <span className="cs-type-name">{typeface.name}</span>
                </Reveal>
              )}
            </div>
          </section>
        )}

        {/* 05 — Visual language and applications */}
        {identity && (
          <section className={"cs-identity" + (brandMark ? " has-mark" : "")}>
            <div>
              <Reveal as="span" className="eyebrow">Visual language</Reveal>
              <Reveal as="p" className="cs-identity-text" delay={100}>{identity}</Reveal>
            </div>
            {brandMark && (
              <Reveal className="cs-mark" delay={160}>
                <img src={brandMark.src} alt={brandMark.alt} loading="lazy" decoding="async" />
                <span>Client identity</span>
              </Reveal>
            )}
          </section>
        )}

        {results && results.length > 0 && (
          <section className="cs-results" aria-label="Delivered">
            <Reveal as="span" className="eyebrow">Delivered</Reveal>
            <dl>
              {results.map((r, i) => (
                <Reveal className="cs-result" key={r.label} delay={i * 90}>
                  <dd>{r.val}</dd>
                  <dt>{r.label}</dt>
                </Reveal>
              ))}
            </dl>
          </section>
        )}

        {/* 06 — Closing */}
        <NextProject project={project} />
      </div>
      <SiteFooter />
    </>
  );
};
