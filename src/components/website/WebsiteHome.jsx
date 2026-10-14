import React from "react";
import { Link } from "react-router-dom";
import { StudioDisplay } from "./StudioDisplay";
import projects from "./projects.json";
import "./website-home.css";

// Homepage ported from cucu-website (Next.js) — styles are scoped under .cucu-site.

const services = [
  ["Branding", "Give people a clear reason to choose you. We define your position, then build an identity that makes it recognisable.", "Brand strategy · Identity · Packaging · Campaigns"],
  ["Content", "Say something worth someone’s time. We turn your expertise, products and point of view into stories made for the people you want to reach.", "Social media · UGC · Influencers · Photography"],
  ["Films", "A good film makes one thing clear: why this brand matters. We find the story, write the script and bring it to the screen.", "Ad films · Video · Motion · CGI · AI-assisted creative"],
  ["Digital", "Your website should make the next step obvious. We design websites, apps and CRM systems around what your customers and your team need to do.", "Interactive web · App design · Development · CRM"],
  ["Performance", "Put the right message in front of the right people. Then test, measure and improve what happens after the click.", "Meta Ads · Google Ads · Creative testing · Measurement"],
];

const featuredOrder = ["naibu", "fruit-bandi", "ark-groups", "one-ent"];
const featured = projects
  .filter((p) => p.featured)
  .sort((a, b) => featuredOrder.indexOf(a.slug) - featuredOrder.indexOf(b.slug));

const projectUrl = (slug) => `/project/${slug}`;

// Lenis owns scrolling, so route "Back to top" through it when it's running.
const backToTop = (e) => {
  e.preventDefault();
  if (window.lenis) window.lenis.scrollTo(0);
  else window.scrollTo({ top: 0, behavior: "smooth" });
};

// Real client logos — every file in src/assets/client-logos is picked up automatically.
const logoFiles = import.meta.glob("../../assets/client-logos/*.{webp,png,jpg,svg}", {
  eager: true,
  import: "default",
});
const LOGO_NAMES = {
  are: "ARE", "daily med": "Daily Med", es: "ES Enterprises", fb: "Fruit Bandi", globus: "Globus IT",
  gn: "GN Caters", he: "Happy Events", jaspire: "Jaspire", nyra: "Nyra", "one ent": "One ENT",
  oryza: "Oryza", ravasa: "Ravasa", remedy: "Remedy", sannidi: "Sannidhi", seccretping: "Secret Ping",
  "split be": "Split Be", svd: "SVD", varun: "Varun Engineers", vijari: "Vihari", zargold: "Zargold",
};
const clientLogos = Object.entries(logoFiles).map(([path, logo]) => {
  const file = path.split("/").pop().replace(/\.[^.]+$/, "");
  return { name: LOGO_NAMES[file] || file, logo };
});

export const WebsiteHome = () => (
  <div className="cucu-site">
    <section className="cucu-cinema" aria-label="CUCU Advertising">
      <div className="cinema-copy">
        <h1>
          <span>Being good ain't<br className="desktop-break" /> our thing,</span>
          <br />we help you in<br />being <em>remembered.</em>
        </h1>
        <p className="cinema-period">Period</p>
        <div className="actions">
          <Link to="/work" className="pill cinema-primary">See Our Work</Link>
          <Link to="/contact" className="pill">Book a Meet</Link>
        </div>
      </div>
      <StudioDisplay />
    </section>

    <section className="work-section editorial-work" id="selected-work">
      <div className="section-heading">
        <span className="eyebrow">Selected work</span>
        <h2>Good thinking.<br /><span>Out in the world.</span></h2>
        <Link className="text-link" to="/work">Explore all projects</Link>
      </div>
      <div className="project-grid">
        {featured.map((p) => (
          <Link className="project" key={p.slug} to={projectUrl(p.slug)}>
            <div className="project-image">
              <img src={p.coverImage} alt={`${p.title} — ${p.category} by CUCU`} loading="lazy" width="1400" height="1000" />
              <span className="project-view">View project</span>
            </div>
            <div className="project-caption">
              <h3>{p.title}</h3>
              <span>{p.category}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>

    <section className="editorial-statement">
      <span className="eyebrow">The way we see it</span>
      <h2>People don’t buy<br />what they <span>don’t notice.</span></h2>
      <div className="editorial-statement-bottom">
        <p>We find what makes your business worth choosing. Then give people a reason to look, a reason to care and a reason to choose you.</p>
        <Link className="text-link" to="/about">Get to know CUCU</Link>
      </div>
    </section>

    <section className="services editorial-services">
      <div className="service-intro">
        <span className="eyebrow">What we do</span>
        <h2>From the first<br />“Who’s that?”<br />to “That’s the one.”</h2>
        <p>Branding, content, films and digital experiences. Built around your business. Made for your audience.</p>
      </div>
      <div className="service-list">
        {services.map(([name, desc, detail], i) => (
          <details key={name} className="service">
            <summary>
              <span className="service-num">0{i + 1}</span>
              <h3>{name}</h3>
              <span className="plus" aria-hidden="true">+</span>
            </summary>
            <div className="service-copy">
              <p>{desc}</p>
              <span>{detail}</span>
              <Link to="/contact">Discuss your {name.toLowerCase()} brief</Link>
            </div>
          </details>
        ))}
      </div>
    </section>

    <section className="editorial-trust">
      <span className="eyebrow">A few names behind the work</span>
      <div className="client-wall">
        {clientLogos.map((c) => (
          <div className="client-logo" key={c.name}>
            <img src={c.logo} alt={c.name} loading="lazy" />
          </div>
        ))}
      </div>
    </section>

    <section className="editorial-cta">
      <span className="eyebrow">Your next chapter</span>
      <div className="cta-editorial-row">
        <h2>Let’s make<br /><span>you the one.</span></h2>
        <div>
          <p>Tell us what you’re building.<br />We’ll bring a fresh perspective.</p>
          <Link className="pill dark" to="/contact">Let’s Talk</Link>
        </div>
      </div>
    </section>

    <footer className="fauna-footer">
      <div className="footer-surface">
        <div className="footer-content-grid">
          <div className="footer-intro">
            <Link to="/" className="footer-brand" aria-label="CUCU Advertising home">cucu</Link>
            <h2>Making brands<br />worth remembering.</h2>
            <p>Based in Hyderabad.<br />Made for ambitious brands.</p>
          </div>
          <nav className="footer-column" aria-label="Explore">
            <span>Explore</span>
            <Link to="/">Home</Link>
            <Link to="/work">Our work</Link>
            <Link to={projectUrl("naibu")}>Naibu</Link>
            <Link to={projectUrl("fruit-bandi")}>Fruit Bandi</Link>
          </nav>
          <nav className="footer-column" aria-label="CUCU">
            <span>CUCU</span>
            <Link to="/about">About us</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          <div className="footer-column footer-conversation">
            <span>Start a conversation</span>
            <Link to="/contact">Tell us your brief</Link>
            <Link to="/contact" className="footer-booking">Book a Meet</Link>
          </div>
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} CUCU Advertising</span>
          <span>Hyderabad, India</span>
          <a href="#top" onClick={backToTop}>Back to top</a>
        </div>
      </div>
    </footer>
  </div>
);
