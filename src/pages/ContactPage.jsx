import React, { useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SiteFooter } from "../components/SiteFooter";
import { CurveRise, Lines, Magnetic, Reveal, Roll } from "../motion/primitives";
import { finePointer, reducedMotion } from "../motion/core";
import useSeo from "../hooks/useSeo";
import "../components/website/website-home.css";
import "./inner-pages.css";
import "./contact.css";

/* Where enquiries go.
   The form posts to a small server-side script that ships with the site
   (public/api/enquiry.php). That script — never this page — holds the mail
   settings and sends every enquiry to coffee@cucuadvertising.com.
   See public/api/README.md for the one-time setup on the server. */
const ENQUIRY_ENDPOINT = "/api/enquiry.php";
const EMAIL = "coffee@cucuadvertising.com";

const SERVICES = ["Branding", "Social Media", "Performance Marketing", "SEO", "Content", "Ad Films", "Website or App", "Not sure yet"];

const socials = [
  ["Instagram", "https://www.instagram.com/cucuadvertising/"],
  ["LinkedIn", "https://www.linkedin.com/company/cucuadvertsing/"],
  ["Facebook", "https://www.facebook.com/profile.php?id=61551579710039"],
];

const EMPTY = { name: "", company: "", service: "", budget: "", email: "", message: "", website: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const validate = (v) => {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Please tell us your name.";
  if (v.company.trim().length < 2) e.company = "Please add your company or brand.";
  if (!v.service) e.service = "Please choose what you’d like to talk about.";
  if (!v.email.trim()) e.email = "Please add your email address.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "That email address doesn’t look right.";
  if (v.message.trim().length < 10) e.message = "Please tell us a little about the project.";
  return e;
};

const Arrow = () => (
  <svg className="pg-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 18 18 6M8 6h10v10" />
  </svg>
);

/* One blank in the sentence. The label is read by screen readers; sighted
   visitors see the placeholder and the words around it. */
const Blank = ({ id, label, error, wide, ...input }) => (
  <span className={"ct-blank" + (wide ? " is-wide" : "") + (error ? " has-error" : "")}>
    <label className="ct-sr" htmlFor={id}>{label}</label>
    <input id={id} aria-invalid={error ? "true" : undefined} aria-describedby={error ? `${id}-err` : undefined} {...input} />
    {error && <span className="ct-err" id={`${id}-err`}>{error}</span>}
  </span>
);

/* The email address notices the cursor: letters near it lift and light up,
   the same idea as the footer headline. Mouse only, and off when motion is reduced. */
const NoticingEmail = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer() || reducedMotion()) return;
    const letters = [...el.querySelectorAll(".ct-ch")];
    let frame = 0;
    let point = null;
    const paint = () => {
      frame = 0;
      letters.forEach((ch) => {
        if (!point) return ch.style.setProperty("--p", "0");
        const r = ch.getBoundingClientRect();
        const d = Math.hypot(point.x - (r.left + r.width / 2), point.y - (r.top + r.height / 2));
        ch.style.setProperty("--p", Math.max(0, 1 - d / (r.height * 1.7)).toFixed(3));
      });
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const move = (e) => { point = { x: e.clientX, y: e.clientY }; queue(); };
    const leave = () => { point = null; queue(); };
    const zone = el.closest(".ct-mail") || el;
    zone.addEventListener("pointermove", move);
    zone.addEventListener("pointerleave", leave);
    return () => {
      zone.removeEventListener("pointermove", move);
      zone.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <a className="ct-email" href={`mailto:${EMAIL}`} ref={ref} aria-label={`Email ${EMAIL}`}>
      <span aria-hidden="true">
        {EMAIL.split("").map((c, i) => <span className="ct-ch" key={i}>{c}</span>)}
      </span>
    </a>
  );
};

const CopyEmail = () => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };
  return (
    <button type="button" className="pill ct-copy" onClick={copy}>
      <span aria-live="polite">{copied ? "Copied" : "Copy address"}</span>
    </button>
  );
};

const EnquiryForm = () => {
  const id = useId();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState("idle"); // idle | sending | sent | failed
  const [problem, setProblem] = useState("");
  const [sentTo, setSentTo] = useState({ name: "", email: "" });
  const startedAt = useRef(Date.now());
  const form = useRef(null);
  const done = useRef(null);

  const set = (key) => (e) => {
    const value = e.target.value;
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  useEffect(() => {
    if (state === "sent") done.current?.focus();
  }, [state]);

  const send = async () => {
    if (state === "sending") return; // never two at once
    const found = validate(values);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      const field = form.current?.querySelector(first === "service" ? "input[name=service]" : `[name=${first}]`);
      field?.focus();
      return;
    }

    setState("sending");
    setProblem("");
    try {
      const response = await fetch(ENQUIRY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          company: values.company.trim(),
          service: values.service,
          budget: values.budget.trim(),
          message: values.message.trim(),
          website: values.website, // left empty by people
          elapsed: Date.now() - startedAt.current,
        }),
      });
      let data = null;
      try { data = await response.json(); } catch { /* not JSON: treated as a failure below */ }

      // Success is only ever shown when the server says the email was accepted.
      if (response.ok && data && data.ok === true) {
        setSentTo({ name: values.name.trim().split(" ")[0], email: values.email.trim() });
        setValues(EMPTY);
        startedAt.current = Date.now();
        setState("sent");
        return;
      }
      if (data && data.errors) setErrors(data.errors);
      setProblem((data && data.message) || "Our server couldn’t send your enquiry just now.");
      setState("failed");
    } catch {
      setProblem("We couldn’t reach our server. Please check your connection.");
      setState("failed");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    send();
  };

  if (state === "sent") {
    return (
      <div className="ct-done" role="status" tabIndex={-1} ref={done}>
        <span className="ct-done-tick" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
        </span>
        <h2>Hello received{sentTo.name ? `, ${sentTo.name}` : ""}.</h2>
        <p>Your enquiry has been sent to our team. We’ll reply to <strong>{sentTo.email}</strong>.</p>
        <button type="button" className="text-link" onClick={() => setState("idle")}>Send another enquiry</button>
      </div>
    );
  }

  const sending = state === "sending";
  const mailBody = encodeURIComponent(`${values.message}\n\n${values.name}${values.company ? `, ${values.company}` : ""}`);

  return (
    <form className="ct-form" onSubmit={onSubmit} noValidate ref={form} aria-busy={sending}>
      <p className="ct-line">
        Hello, my name is{" "}
        <Blank id={`${id}-name`} label="Your name" name="name" type="text" autoComplete="name" placeholder="your name" maxLength={80} value={values.name} onChange={set("name")} error={errors.name} />
        {" "}and I’m with{" "}
        <Blank id={`${id}-company`} label="Company or brand name" name="company" type="text" autoComplete="organization" placeholder="company or brand" maxLength={100} value={values.company} onChange={set("company")} error={errors.company} /><span className="ct-dot">.</span>
      </p>

      <fieldset className={"ct-choice" + (errors.service ? " has-error" : "")} aria-describedby={errors.service ? `${id}-service-err` : undefined}>
        <legend className="ct-line">I’d like to talk about</legend>
        <div className="ct-chips">
          {SERVICES.map((s) => (
            <label className="ct-chip" key={s}>
              <input type="radio" name="service" value={s} checked={values.service === s} onChange={set("service")} />
              <span>{s}</span>
            </label>
          ))}
        </div>
        {errors.service && <span className="ct-err" id={`${id}-service-err`}>{errors.service}</span>}
      </fieldset>

      <p className="ct-line">
        My budget is around{" "}
        <Blank id={`${id}-budget`} label="Project budget (optional)" name="budget" type="text" placeholder="optional" maxLength={60} value={values.budget} onChange={set("budget")} />
        {" "}and you can reach me at{" "}
        <Blank id={`${id}-email`} label="Email address" name="email" type="email" inputMode="email" autoComplete="email" placeholder="your email address" maxLength={120} wide value={values.email} onChange={set("email")} error={errors.email} /><span className="ct-dot">.</span>
      </p>

      <div className={"ct-area" + (errors.message ? " has-error" : "")}>
        <label className="ct-line" htmlFor={`${id}-message`}>Here’s what I have in mind:</label>
        <textarea id={`${id}-message`} name="message" rows={4} maxLength={4000} placeholder="Tell us about your project" value={values.message} onChange={set("message")} aria-invalid={errors.message ? "true" : undefined} aria-describedby={errors.message ? `${id}-message-err` : undefined} />
        {errors.message && <span className="ct-err" id={`${id}-message-err`}>{errors.message}</span>}
      </div>

      {/* Not for people. Hidden from sight and from assistive technology. */}
      <div className="ct-trap" aria-hidden="true">
        <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set("website")} /></label>
      </div>

      {state === "failed" && (
        <div className="ct-fail" role="alert">
          <strong>That didn’t send.</strong>
          <p>{problem} Nothing has been lost: your message is still here.</p>
          <div className="ct-fail-actions">
            <button type="button" className="pill dark" onClick={send}>Try again</button>
            <a className="text-link" href={`mailto:${EMAIL}?subject=${encodeURIComponent("New Website Enquiry | CUCU Advertising")}&body=${mailBody}`}>Email us instead</a>
          </div>
        </div>
      )}

      <div className="ct-submit">
        <Magnetic>
          <button type="submit" className="pill dark pg-pill-arrow ct-send" disabled={sending}>
            <Roll>{sending ? "Sending…" : "Let’s Make It Happen"}</Roll>
            {sending ? <span className="ct-spin" aria-hidden="true" /> : <Arrow />}
          </button>
        </Magnetic>
        <span className="ct-note">Goes straight to {EMAIL}</span>
      </div>
    </form>
  );
};

export const ContactPage = () => {
  useSeo({
    title: "Contact CUCU Advertising | Start a Project",
    description:
      "Have a brand to build, an idea to explore, or something ambitious in mind? Tell CUCU Advertising about it, or write to coffee@cucuadvertising.com.",
    path: "/contact",
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="cucu-site pg ct">
        {/* Hero */}
        <section className="pg-hero ct-hero" aria-label="Contact CUCU Advertising">
          <div className="pg-hero-top">
            <Reveal as="span" className="eyebrow" after="intro" delay={80}>Contact</Reveal>
            <Reveal as="span" className="eyebrow pg-hero-place" after="intro" delay={140}>Hyderabad, India</Reveal>
          </div>
          <Lines as="h1" after="intro" delay={120}>
            <span className="dim">Good things start</span>
            <>with a <em>hello.</em></>
          </Lines>
          <div className="pg-hero-bottom">
            <Reveal as="p" className="pg-hero-sub" after="intro" delay={480}>
              Have a brand to build, an idea to explore, or something ambitious in mind? We’d love to hear about it.
            </Reveal>
          </div>
        </section>

        {/* The form — written as a sentence */}
        <section className="ct-talk" aria-labelledby="ct-talk-title">
          <div className="ct-talk-head">
            <Reveal as="span" className="eyebrow">Start the conversation</Reveal>
            <Lines as="h2" id="ct-talk-title">
              <>Fill in</>
              <span className="dim">the blanks.</span>
            </Lines>
          </div>
          <Reveal className="ct-talk-body" delay={120}>
            <EnquiryForm />
          </Reveal>
        </section>

        {/* Email — the black chapter */}
        <section className="ct-mail">
          <CurveRise color="#151715" />
          <Reveal as="span" className="eyebrow">Or simply write to us</Reveal>
          <Reveal delay={100}><NoticingEmail /></Reveal>
          <div className="ct-mail-bottom">
            <Reveal delay={180}><CopyEmail /></Reveal>
            <Reveal as="ul" className="ct-socials" delay={240}>
              {socials.map(([name, url]) => (
                <li key={name}><a href={url} target="_blank" rel="noopener noreferrer"><Roll>{name}</Roll></a></li>
              ))}
            </Reveal>
          </div>
        </section>
      </div>
      <SiteFooter />
    </motion.div>
  );
};
