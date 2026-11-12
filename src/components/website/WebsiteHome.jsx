import React, { useId, useState } from "react";
import { Link } from "react-router-dom";
import { StudioDisplay } from "./StudioDisplay";
import { Showcase } from "./Showcase";
import { ClientMarquee } from "../sections/Clients";
import { SiteFooter } from "../SiteFooter";
import { CurveRise, Lines, Magnetic, Reveal, Roll, ScrubText } from "../../motion/primitives";
import "./website-home.css";

const services = [
  ["Branding", "Give people a clear reason to choose you. We define your position, then build an identity that makes it recognisable.", "Brand strategy · Identity · Packaging · Campaigns"],
  ["Content", "Say something worth someone’s time. We turn your expertise, products and point of view into stories made for the people you want to reach.", "Social media · UGC · Influencers · Photography"],
  ["Films", "A good film makes one thing clear: why this brand matters. We find the story, write the script and bring it to the screen.", "Ad films · Video · Motion · CGI · AI-assisted creative"],
  ["Digital", "Your website should make the next step obvious. We design websites, apps and CRM systems around what your customers and your team need to do.", "Interactive web · App design · Development · CRM"],
  ["Performance", "Put the right message in front of the right people. Then test, measure and improve what happens after the click.", "Meta Ads · Google Ads · Creative testing · Measurement"],
];

const ServiceList = () => {
  const [open, setOpen] = useState(0);
  const id = useId();
  return (
    <div className="service-list">
      {services.map(([name, desc, detail], i) => {
        const isOpen = open === i;
        return (
          <Reveal className={"service" + (isOpen ? " is-open" : "")} key={name} delay={i * 70}>
            <h3>
              <button type="button" id={`${id}-b${i}`} aria-expanded={isOpen} aria-controls={`${id}-p${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                <span className="service-num">0{i + 1}</span>
                <span className="service-name">{name}</span>
                <span className="plus" aria-hidden="true" />
              </button>
            </h3>
            <div className="service-panel" id={`${id}-p${i}`} role="region" aria-labelledby={`${id}-b${i}`} inert={!isOpen}>
              <div className="service-panel-in">
                <div className="service-copy">
                  <p>{desc}</p>
                  <span>{detail}</span>
                  <Link to="/contact"><Roll>Discuss your {name.toLowerCase()} brief</Roll></Link>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
};

export const WebsiteHome = () => {
  return (
    <>
      <div className="cucu-site" id="top">
        <section className="cucu-cinema" aria-label="CUCU Advertising">
          <div className="cinema-copy">
            <Lines as="h1" after="intro" delay={120}>
              <span className="dim">People don’t</span>
              <>buy what they</>
              <em>don’t notice.</em>
            </Lines>
            <Reveal as="p" className="cinema-sub" after="intro" delay={520}>
              Branding, content, films and digital from a young Hyderabad team that tells you honestly what works.
            </Reveal>
            <Reveal className="actions" after="intro" delay={640}>
              <Magnetic><Link to="/work" className="pill cinema-primary"><Roll>See Our Work</Roll></Link></Magnetic>
              <Magnetic><Link to="/contact" className="pill"><Roll>Let’s Build</Roll></Link></Magnetic>
            </Reveal>
          </div>
          <StudioDisplay />
        </section>

        <Showcase />

        <section className="editorial-statement">
          <CurveRise color="#151715" />
          <Reveal as="span" className="eyebrow">The way we see it</Reveal>
          <Lines as="h2">
            <>Worth choosing isn’t</>
            <>the same as <span className="lime">chosen.</span></>
          </Lines>
          <div className="editorial-statement-bottom">
            <ScrubText text="We find what makes your business worth choosing. Then we give people a reason to look, a reason to care and a reason to choose you." />
            <Reveal><Link className="text-link" to="/about"><Roll>Get to know CUCU</Roll></Link></Reveal>
          </div>
        </section>

        <section className="services editorial-services">
          <div className="service-intro">
            <Reveal as="span" className="eyebrow">What we do</Reveal>
            <Lines as="h2">
              <>From the first</>
              <>“Who’s that?”</>
              <>to “That’s the one.”</>
            </Lines>
            <Reveal as="p" delay={200}>Branding, content, films and digital experiences that turn first impressions into lasting connections.</Reveal>
          </div>
          <ServiceList />
        </section>

        <section className="editorial-trust">
          <Reveal as="span" className="eyebrow">A few names behind the work</Reveal>
          <Reveal delay={120}><ClientMarquee /></Reveal>
        </section>
      </div>
      <SiteFooter />
    </>
  );
};
