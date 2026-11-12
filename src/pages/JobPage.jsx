import React from "react";
import { motion } from "framer-motion";
import { Link, Navigate, useParams } from "react-router-dom";
import { SiteFooter } from "../components/SiteFooter";
import { Lines, Magnetic, Reveal, Roll } from "../motion/primitives";
import { reducedMotion } from "../motion/core";
import { Arrow } from "../components/careers/JobBoard";
import { ApplicationForm } from "../components/careers/ApplicationForm";
import { GENERAL_SLUG, findJob, jobMeta } from "../constants/jobs";
import useSeo from "../hooks/useSeo";
import "../components/website/website-home.css";
import "../components/careers/careers.css";

const EMPLOYMENT_TYPE = { "Full-time": "FULL_TIME", "Part-time": "PART_TIME", Internship: "INTERN", Contract: "CONTRACTOR" };

// Google job listing data — only ever produced for roles that are open.
const jobPosting = (job) => ({
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: job.title,
  description: [
    ...job.description.map((p) => `<p>${p}</p>`),
    `<p>Responsibilities</p><ul>${job.responsibilities.map((r) => `<li>${r}</li>`).join("")}</ul>`,
    `<p>Requirements</p><ul>${job.requirements.map((r) => `<li>${r}</li>`).join("")}</ul>`,
  ].join(""),
  datePosted: job.datePosted,
  employmentType: EMPLOYMENT_TYPE[job.type],
  identifier: { "@type": "PropertyValue", name: "CUCU Advertising", value: job.id },
  hiringOrganization: { "@type": "Organization", name: "CUCU Advertising", sameAs: "https://cucuadvertising.com", logo: "https://cucuadvertising.com/media/cucu-logo.webp" },
  jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: job.location, addressCountry: "IN" } },
  ...(job.workMode === "Remote" ? { jobLocationType: "TELECOMMUTE", applicantLocationRequirements: { "@type": "Country", name: "India" } } : {}),
  directApply: !job.applyUrl,
});

const BackLink = () => (
  <Reveal after="intro" className="cr-back">
    <Link to="/careers#jobs" className="cr-back-link">
      <Arrow className="is-back" />
      <Roll>All open positions</Roll>
    </Link>
  </Reveal>
);

const toForm = (e) => {
  e.preventDefault();
  const target = document.getElementById("apply");
  if (!target) return;
  if (window.lenis) window.lenis.scrollTo(target, { offset: -24, duration: 1.2, immediate: reducedMotion() });
  else target.scrollIntoView();
};

/* /careers/apply — the general application, for people whose role isn't listed. */
const GeneralApplication = () => {
  useSeo({
    title: "Introduce Yourself | Careers at CUCU Advertising",
    description: "Don’t see your role? Tell CUCU Advertising what you do and what you love creating, and send us your resume.",
    path: `/careers/${GENERAL_SLUG}`,
  });

  return (
    <div className="cucu-site careers cr-detail">
      <header className="cr-job-hero">
        <BackLink />
        <Reveal as="span" className="eyebrow" after="intro" delay={80}>General application</Reveal>
        <Lines as="h1" after="intro" delay={120}>
          <>Introduce</>
          <span className="dim">yourself.</span>
        </Lines>
      </header>
      <section className="cr-apply" id="apply" aria-label="General application form">
        <div className="cr-apply-intro">
          <Reveal as="p" after="intro" delay={380}>
            The best opportunities don’t always come with job titles. Tell us what you do and what you love creating.
          </Reveal>
        </div>
        <Reveal after="intro" delay={460}>
          <ApplicationForm />
        </Reveal>
      </section>
    </div>
  );
};

const JobDetail = ({ job }) => {
  useSeo({
    title: `${job.title} | Careers at CUCU Advertising`,
    description: `${job.title} — ${jobMeta(job).join(", ")}. ${job.summary}`,
    path: `/careers/${job.slug}`,
    jsonLd: job.open ? jobPosting(job) : null,
  });

  return (
    <div className="cucu-site careers cr-detail">
      <article>
        <header className="cr-job-hero">
          <BackLink />
          <Reveal as="span" className="eyebrow" after="intro" delay={80}>{job.department}</Reveal>
          <Lines as="h1" after="intro" delay={120}>
            <>{job.title}</>
          </Lines>
          <Reveal as="dl" className="cr-facts" after="intro" delay={380}>
            <div><dt>Department</dt><dd>{job.department}</dd></div>
            <div><dt>Type</dt><dd>{job.type}</dd></div>
            <div><dt>Location</dt><dd>{job.location} · {job.workMode}</dd></div>
            {job.experience && <div><dt>Experience</dt><dd>{job.experience}</dd></div>}
          </Reveal>
        </header>

        <div className="cr-job-body">
          <aside className="cr-job-aside">
            <Reveal as="p" className="cr-job-summary">{job.summary}</Reveal>
            {job.open && (
              <Reveal delay={120}>
                <Magnetic>
                  {job.applyUrl ? (
                    <a href={job.applyUrl} className="pill dark cr-pill-arrow" target="_blank" rel="noopener noreferrer">
                      <Roll>Apply for This Role</Roll>
                      <Arrow />
                    </a>
                  ) : (
                    <a href="#apply" className="pill dark cr-pill-arrow" onClick={toForm}>
                      <Roll>Apply for This Role</Roll>
                      <Arrow className="is-down" />
                    </a>
                  )}
                </Magnetic>
              </Reveal>
            )}
          </aside>
          <div className="cr-job-copy">
            <Reveal as="section">
              <h2>The role</h2>
              {job.description.map((p) => <p key={p}>{p}</p>)}
            </Reveal>
            <Reveal as="section">
              <h2>What you’ll do</h2>
              <ul>{job.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul>
            </Reveal>
            <Reveal as="section">
              <h2>What we’re looking for</h2>
              <ul>{job.requirements.map((item) => <li key={item}>{item}</li>)}</ul>
            </Reveal>
          </div>
        </div>
      </article>

      {job.open && !job.applyUrl && (
        <section className="cr-apply" id="apply" aria-labelledby="apply-title">
          <div className="cr-apply-intro">
            <Reveal as="span" className="eyebrow">Apply</Reveal>
            <Lines as="h2" id="apply-title">
              <>Like the</>
              <span className="dim">sound of it?</span>
            </Lines>
            <Reveal as="p" delay={150}>Tell us about yourself. It takes a couple of minutes.</Reveal>
          </div>
          <Reveal delay={150}>
            <ApplicationForm job={job} />
          </Reveal>
        </section>
      )}

      {!job.open && (
        <section className="cr-apply cr-apply-closed" id="apply">
          <div className="cr-apply-intro">
            <Reveal as="span" className="eyebrow">Closed</Reveal>
            <Lines as="h2">
              <>This role isn’t</>
              <span className="dim">open right now.</span>
            </Lines>
          </div>
          <Reveal className="cr-closed-side" delay={150}>
            <p>It isn’t published and can’t take applications. You can still introduce yourself.</p>
            <Link to={`/careers/${GENERAL_SLUG}`} className="pill dark cr-pill-arrow">
              <Roll>Introduce Yourself</Roll>
              <Arrow />
            </Link>
          </Reveal>
        </section>
      )}
    </div>
  );
};

export const JobPage = () => {
  const { slug } = useParams();
  const job = slug === GENERAL_SLUG ? null : findJob(slug);

  // A role that is closed or doesn't exist sends people back to the list.
  if (slug !== GENERAL_SLUG && !job) return <Navigate to="/careers#jobs" replace />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {job ? <JobDetail job={job} /> : <GeneralApplication />}
      <SiteFooter />
    </motion.div>
  );
};
