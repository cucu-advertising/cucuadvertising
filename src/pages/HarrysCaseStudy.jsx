import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { SiteFooter } from "../components/SiteFooter";
import { Lines, Reveal, Roll, ScrubText } from "../motion/primitives";
import { projectPath } from "../utils/projectSlug";
import useSeo from "../hooks/useSeo";
import { Arrow, NextProject } from "./CaseStudy";
import wordmarkChalk from "../assets/harrys/wordmark-chalk.webp";
import wordmarkInk from "../assets/harrys/wordmark-ink.webp";
import hChalk from "../assets/harrys/h-chalk.webp";
import hInk from "../assets/harrys/h-ink.webp";
import menu from "../assets/harrys/mockups/menu.webp";
import menuS from "../assets/harrys/mockups/menu-1000.webp";
import table from "../assets/harrys/mockups/table-setting.webp";
import tableS from "../assets/harrys/mockups/table-setting-1000.webp";
import coasters from "../assets/harrys/mockups/coasters.webp";
import coastersS from "../assets/harrys/mockups/coasters-1000.webp";
import box from "../assets/harrys/mockups/gift-box.webp";
import boxS from "../assets/harrys/mockups/gift-box-1000.webp";
import tissue from "../assets/harrys/mockups/tissue-seal.webp";
import tissueS from "../assets/harrys/mockups/tissue-seal-1000.webp";
import check from "../assets/harrys/mockups/guest-check.webp";
import checkS from "../assets/harrys/mockups/guest-check-1000.webp";
import jacket from "../assets/harrys/mockups/chef-jacket.webp";
import jacketS from "../assets/harrys/mockups/chef-jacket-1000.webp";
import seal from "../assets/harrys/mockups/brass-seal.webp";
import sealS from "../assets/harrys/mockups/brass-seal-1000.webp";
import leather from "../assets/harrys/mockups/leather-deboss.webp";
import leatherS from "../assets/harrys/mockups/leather-deboss-1000.webp";
import "../components/website/website-home.css";
import "./inner-pages.css";
import "./portfolio.css";
import "./harrys.css";

/* Harry’s New York — a brand identity concept by CUCU.

   Everything on this page comes from the Harry’s brand book: the words, the
   three colours, the typeface and the logo artwork (the script wordmark and the
   standalone H, used as supplied and never redrawn or retyped).

   Harry’s is a portfolio concept. Nothing here claims a venue, an opening,
   a campaign or a result.

   The page follows the same four chapters as every identity project:
   01 Logo design, 02 Colors, 03 Typography, 04 Mockups.

   TO ADD OR CHANGE A MOCKUP: put the picture in src/assets/harrys/mockups/
   (a full-size file and a "-1000" copy), import both below and add a line to
   MOCKUPS. `wide` gives a picture the full width; the others sit in pairs. */

// Libre Franklin is the brand's supporting typeface. It is only needed on this
// page, so it is requested here rather than on every page of the site.
const FONT_ID = "hy-libre-franklin";
const FONT_HREF = "https://fonts.googleapis.com/css2?family=Libre+Franklin:ital,wght@0,400;0,500;0,600;1,400&display=swap";

const COLOURS = [
  { name: "Ink Blue", hex: "#172A4D", rgb: "23 / 42 / 77", cls: "is-ink" },
  { name: "Chalk", hex: "#F0EEE6", rgb: "240 / 238 / 230", cls: "is-chalk" },
  { name: "Stone", hex: "#A5A39A", rgb: "165 / 163 / 154", cls: "is-stone" },
];

const CHARACTER = ["Warm in its welcome.", "Assured in its presentation.", "Attentive in its details.", "Rooted in New York dining culture."];

const RULES = [
  { title: "Do not alter the form", text: "Do not stretch, compress, rotate, crop or rearrange the lettering." },
  { title: "Do not add effects", text: "Do not add outlines, drop shadows, gradients or decorative effects." },
  { title: "Do not substitute", text: "Do not retype the name, replace individual letters or use unapproved colors." },
];

const HIERARCHY = [
  { title: "Headlines", text: "Use Regular or Medium at a distinct scale. Keep line lengths short and margins open." },
  { title: "Labels & categories", text: "Use Medium or SemiBold. Uppercase labels may use modest letter spacing." },
  { title: "Body copy & menu details", text: "Use Regular for descriptions and Medium for key information. Align prices consistently." },
  { title: "Emphasis", text: "Use Italic sparingly. Avoid unnecessary font changes within a single composition." },
];

// The approved mockups, in the order they are shown. Every picture keeps its
// own 16:9 proportions and is never cropped.
const MOCKUPS = [
  { src: menu, small: menuS, wide: true, name: "Menu", alt: "Harry’s menu: an Ink Blue cover with the signature, and the dinner menu page inside" },
  { src: table, small: tableS, name: "Table setting", alt: "A place setting with a Harry’s napkin on a white plate" },
  { src: coasters, small: coastersS, name: "Coasters", alt: "Harry’s coasters in Ink Blue, Chalk and Stone on a marble table" },
  { src: box, small: boxS, wide: true, name: "Gift box", alt: "A Harry’s gift box sliding open to show tissue printed with the signature pattern" },
  { src: tissue, small: tissueS, name: "Signature pattern", alt: "Tissue paper printed with the Harry’s signature pattern, closed with an H seal" },
  { src: check, small: checkS, name: "Guest check", alt: "A Harry’s bill folder held open with a guest check inside" },
  { src: jacket, small: jacketS, wide: true, name: "Chef’s jacket", alt: "An Ink Blue chef’s jacket with the Harry’s signature on the chest" },
  { src: seal, small: sealS, name: "Brass seal", alt: "A brass seal engraved with the standalone H" },
  { src: leather, small: leatherS, name: "Debossed leather", alt: "The Harry’s signature and H debossed into blue leather" },
];

const Head = ({ num, label, children, side }) => (
  <div className="hy-head">
    <div>
      <Reveal as="span" className="eyebrow hy-eyebrow"><span>{num}</span>{label}</Reveal>
      <Lines as="h2">{children}</Lines>
    </div>
    {side && <Reveal as="p" className="hy-head-side" delay={150}>{side}</Reveal>}
  </div>
);

// The logo artwork, always at its own proportions.
const Wordmark = ({ on = "chalk", className = "", alt = "" }) => (
  <img className={`hy-wordmark ${className}`} src={on === "ink" ? wordmarkChalk : wordmarkInk} alt={alt} width="1010" height="415" loading="lazy" decoding="async" />
);
const HMark = ({ on = "chalk", className = "", alt = "" }) => (
  <img className={`hy-h ${className}`} src={on === "ink" ? hChalk : hInk} alt={alt} width="589" height="308" loading="lazy" decoding="async" />
);

export const HarrysCaseStudy = ({ project }) => {
  useSeo({
    title: "Harry’s New York — Brand Identity | Work by CUCU Advertising",
    description:
      "Harry’s New York: a brand identity concept by CUCU Advertising. A script signature, an Ink Blue, Chalk and Stone palette, and Libre Franklin typography.",
    path: projectPath(project),
  });

  useEffect(() => {
    if (document.getElementById(FONT_ID)) return;
    const link = document.createElement("link");
    link.id = FONT_ID;
    link.rel = "stylesheet";
    link.href = FONT_HREF;
    document.head.appendChild(link);
  }, []);

  return (
    <>
      <div className="cucu-site pg cs hy">
        {/* Project hero */}
        <section className="pg-hero cs-hero hy-hero" aria-label="Harry’s New York">
          <div className="pg-hero-top">
            <Reveal as="span" className="eyebrow" after="intro" delay={80}>
              <Link to="/work" className="cs-back"><Arrow className="is-back" /><Roll>All projects</Roll></Link>
            </Reveal>
            <Reveal as="span" className="eyebrow pg-hero-place" after="intro" delay={140}>Case study</Reveal>
          </div>
          <h1 className="hy-sign">
            <Reveal as="span" className="hy-sign-mark" after="intro" delay={160}>
              <img src={wordmarkChalk} alt="Harry’s" width="1010" height="415" decoding="async" fetchPriority="high" />
            </Reveal>
            <Reveal as="span" className="hy-place" after="intro" delay={420}>New York</Reveal>
          </h1>
          <div className="hy-hero-bottom">
            <Lines as="p" className="hy-hero-line" after="intro" delay={380}>
              <>An old-school sense of</>
              <>occasion, <em>reimagined.</em></>
            </Lines>
            <Reveal as="dl" className="cs-facts" after="intro" delay={560}>
              <div><dt>Project</dt><dd>Harry’s New York</dd></div>
              <div><dt>Category</dt><dd>Brand Identity</dd></div>
              <div><dt>Status</dt><dd>Portfolio concept</dd></div>
            </Reveal>
          </div>
        </section>

        <div className="hy-body">
          {/* The brand story */}
          <section className="hy-story" aria-labelledby="hy-story-title">
            <Reveal as="span" className="eyebrow hy-eyebrow">Brand story</Reveal>
            <h2 id="hy-story-title" className="hy-vh">The brand story</h2>
            <ScrubText
              className="hy-story-lead"
              text="Harry’s begins with a simple pleasure: being looked after. A familiar welcome, a carefully set table and an evening with time to unfold."
            />
            <div className="hy-story-grid">
              <div className="hy-story-copy">
                <Reveal as="p">
                  Inspired by the warmth of an established New York dining room, Harry’s brings an old-school sense of occasion to the everyday ritual of going out.
                </Reveal>
                <Reveal as="p" delay={90}>
                  The room feels assured. The service feels personal. A well-made drink arrives, conversation settles in and there is no reason to rush. Harry’s is conceived as a place guests return to for the feeling as much as the food. The identity carries that promise through expressive lettering, a restrained palette and thoughtful details.
                </Reveal>
              </div>
              <div className="hy-story-side">
                <Reveal className="hy-idea">
                  <span className="hy-label">The brand idea</span>
                  <p>A personal welcome.<br />A considered evening.</p>
                </Reveal>
                <Reveal className="hy-character" delay={100}>
                  <span className="hy-label">The character</span>
                  <ul>
                    {CHARACTER.map((c, i) => <li key={c}><span>{String(i + 1).padStart(2, "0")}</span>{c}</li>)}
                  </ul>
                </Reveal>
              </div>
            </div>
          </section>

          {/* 01 — Logo design */}
          <section className="hy-logo" aria-label="Logo design">
            <Head
              num="01"
              label="Logo design"
              side="The Harry’s signature gives the restaurant a human presence. Its flowing script, open curves and sweeping strokes suggest the ease and confidence of a thoughtful host."
            >
              <>A signature,</>
              <span className="hy-soft">not a typeface.</span>
            </Head>

            <Reveal variant="clip" className="hy-plate is-primary" amount={0.12}>
              <span className="hy-plate-in">
                <Wordmark alt="The Harry’s primary signature in Ink Blue on Chalk" />
                <span className="hy-cap"><span>The primary signature</span><span>Ink Blue on Chalk</span></span>
              </span>
            </Reveal>

            <div className="hy-logo-note">
              <Reveal as="p">
                The personal name makes the welcome feel direct; the expressive lettering brings character and a sense of occasion. The script is finished artwork: it is never recreated by typing the name in a similar font.
              </Reveal>
            </div>

            <div className="hy-duo">
              <Reveal variant="clip" className="hy-plate is-ink" amount={0.12}>
                <span className="hy-plate-in">
                  <HMark on="ink" alt="The standalone H submark in Chalk on Ink Blue" />
                  <span className="hy-cap"><span>The H submark</span><span>Chalk on Ink Blue</span></span>
                </span>
              </Reveal>
              <div className="hy-duo-copy">
                <Reveal as="h3">The H submark</Reveal>
                <Reveal as="p" delay={90}>
                  The standalone H is taken from the primary wordmark. It carries the same warmth and movement in a smaller signature. Use it where the full name has already been introduced, or on discreet details with limited space.
                </Reveal>
              </div>
            </div>

            <div className="hy-variants">
              <Reveal as="h3">Approved pairings</Reveal>
              <Reveal as="p" delay={90}>
                Ink Blue on Chalk and Chalk on Ink Blue. Choose the version that gives the lettering a clear, uninterrupted contrast. Use the same pairing for both the wordmark and the H.
              </Reveal>
              <div className="hy-variant-grid">
                <Reveal className="hy-tile is-chalk"><Wordmark alt="Wordmark, Ink Blue on Chalk" /></Reveal>
                <Reveal className="hy-tile is-ink" delay={80}><Wordmark on="ink" alt="Wordmark, Chalk on Ink Blue" /></Reveal>
                <Reveal className="hy-tile is-chalk" delay={120}><HMark alt="H submark, Ink Blue on Chalk" /></Reveal>
                <Reveal className="hy-tile is-ink" delay={200}><HMark on="ink" alt="H submark, Chalk on Ink Blue" /></Reveal>
              </div>
            </div>

            <div className="hy-usage">
              <Reveal className="hy-clear">
                <span className="hy-clear-box">
                  <span className="hy-x is-tl" aria-hidden="true">x</span>
                  <span className="hy-x is-br" aria-hidden="true">x</span>
                  <Wordmark alt="Wordmark shown inside its clear space" />
                </span>
              </Reveal>
              <div className="hy-usage-copy">
                <Reveal as="h3">Clear space &amp; minimum size</Reveal>
                <Reveal as="p" delay={90}>
                  Keep a clear area around every signature. For the wordmark, let x equal one quarter of the full mark height. Maintain at least x on all four sides, measured from the outermost strokes. Give the H the same proportional breathing room.
                </Reveal>
                <Reveal as="dl" className="hy-min" delay={140}>
                  <div><dt>Wordmark</dt><dd>35 mm in print<br />180 px on screen</dd></div>
                  <div><dt>Standalone H</dt><dd>12 mm in print<br />64 px on screen</dd></div>
                </Reveal>
              </div>
            </div>

            <ol className="hy-rules">
              {RULES.map((r, i) => (
                <Reveal as="li" key={r.title} delay={i * 90}>
                  <span className="hy-label">{r.title}</span>
                  <p>{r.text}</p>
                </Reveal>
              ))}
            </ol>
          </section>

          {/* 02 — Colors */}
          <section className="hy-colour" aria-label="Colour palette">
            <Head
              num="02"
              label="Colors"
              side="Ink Blue and Chalk form the core identity. Stone supports them through fine rules and secondary details. The palette takes its character from dark leather, warm paper and the composed atmosphere of a classic dining room."
            >
              <>Dark leather.</>
              <span className="hy-soft">Warm paper.</span>
            </Head>
            <ul className="hy-fields">
              {COLOURS.map((c, i) => (
                <Reveal as="li" variant="clip" className={`hy-field ${c.cls}`} key={c.hex} delay={i * 140} amount={0.12}>
                  <span className="hy-field-in" style={{ background: c.hex }}>
                    <span className="hy-field-name">{c.name}</span>
                    <span className="hy-field-code"><span>{c.hex}</span><span>RGB {c.rgb}</span></span>
                  </span>
                </Reveal>
              ))}
            </ul>
          </section>

          {/* 03 — Typography: an Ink Blue chapter */}
          <section className="hy-type" aria-label="Typography">
            <Head
              num="03"
              label="Typography"
              side="The Harry’s script is the custom brand signature. Libre Franklin is the supporting type family for headlines, brand copy, menus and practical information. Its clear forms balance the expressive wordmark without competing with it."
            >
              <>Libre Franklin,</>
              <span className="hy-soft">in support.</span>
            </Head>
            <div className="hy-type-grid">
              <Reveal className="hy-aa" aria-hidden="true">Aa</Reveal>
              <div className="hy-specimen">
                <Reveal as="p" className="hy-glyphs">ABCDEFGHIJKLMNOPQRSTUVWXYZ</Reveal>
                <Reveal as="p" className="hy-glyphs" delay={80}>abcdefghijklmnopqrstuvwxyz</Reveal>
                <Reveal as="p" className="hy-glyphs" delay={160}>0123456789 $ &amp; ( )</Reveal>
                <Reveal as="ul" className="hy-weights" delay={220}>
                  <li style={{ fontWeight: 400 }}>Regular</li>
                  <li style={{ fontWeight: 500 }}>Medium</li>
                  <li style={{ fontWeight: 600 }}>SemiBold</li>
                  <li style={{ fontStyle: "italic" }}>Italic</li>
                </Reveal>
              </div>
            </div>
            <Reveal className="hy-script">
              <Wordmark on="ink" alt="The Harry’s script wordmark, supplied artwork" />
              <div>
                <span className="hy-label">The brand signature</span>
                <p>The script wordmark is supplied artwork, not a font. It is placed as a finished piece and never typed.</p>
              </div>
            </Reveal>
            <ol className="hy-hierarchy">
              {HIERARCHY.map((h, i) => (
                <Reveal as="li" key={h.title} delay={(i % 2) * 90}>
                  <span className="hy-label">{h.title}</span>
                  <p>{h.text}</p>
                </Reveal>
              ))}
            </ol>
          </section>

          {/* 04 — Mockups */}
          <section className="hy-mockups" aria-label="Mockups">
            <Head
              num="04"
              label="Mockups"
              side="Stationery brings the identity into the guest’s hands. The same signatures, palette, typography and spacing carry across each piece, and the signature pattern lines boxes, tissue and stationery backs."
            >
              <>Into the</>
              <span className="hy-soft">guest’s hands.</span>
            </Head>
            <div className="hy-gallery">
              {MOCKUPS.map((m, i) => (
                <figure className={"hy-shot" + (m.wide ? " is-wide" : "")} key={m.name}>
                  <Reveal variant="clip" className="hy-shot-frame" amount={0.12} delay={m.wide ? 0 : (i % 2) * 110}>
                    <img
                      src={m.src}
                      srcSet={`${m.small} 1000w, ${m.src} 2000w`}
                      sizes={m.wide ? "(max-width: 767px) 92vw, 88vw" : "(max-width: 767px) 92vw, 44vw"}
                      alt={m.alt}
                      width="2000"
                      height="1125"
                      loading="lazy"
                      decoding="async"
                    />
                  </Reveal>
                  <figcaption><span>{String(i + 1).padStart(2, "0")}</span>{m.name}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          {/* Closing */}
          <section className="hy-close" aria-label="Harry’s New York, brand concept by CUCU Advertising">
            <Reveal className="hy-close-mark" amount={0.3}>
              <Wordmark on="ink" alt="Harry’s" />
              <span className="hy-place">New York</span>
            </Reveal>
            <div className="hy-close-foot">
              <span>Brand concept by CUCU Advertising</span>
              <span>Portfolio concept</span>
            </div>
          </section>
        </div>

        <NextProject project={project} />
      </div>
      <SiteFooter />
    </>
  );
};

export default HarrysCaseStudy;
