import React, { useId, useRef, useState } from "react";
import { APPLICATION_ENDPOINT } from "../../constants/jobs";
import { Arrow } from "./JobBoard";

const RESUME_TYPES = [".pdf", ".doc", ".docx"];
const RESUME_MAX_MB = 5;

const EMPTY = { name: "", email: "", phone: "", position: "", link: "", intro: "", website: "" };

const withProtocol = (url) => (/^https?:\/\//i.test(url) ? url : `https://${url}`);

const validate = (values, resume) => {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  const digits = values.phone.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15 || /[^\d\s+()-]/.test(values.phone)) errors.phone = "Please enter a valid phone number.";
  if (!values.position.trim()) errors.position = "Tell us the role or kind of work you’re after.";
  if (values.link.trim()) {
    try {
      const url = new URL(withProtocol(values.link.trim()));
      if (!url.hostname.includes(".")) throw new Error("no domain");
    } catch {
      errors.link = "That link doesn’t look right. Try something like linkedin.com/in/you.";
    }
  }
  if (!resume) errors.resume = "Please attach your resume.";
  else {
    const name = resume.name.toLowerCase();
    if (!RESUME_TYPES.some((ext) => name.endsWith(ext))) errors.resume = "Your resume must be a PDF, DOC or DOCX file.";
    else if (resume.size > RESUME_MAX_MB * 1024 * 1024) errors.resume = `Your resume must be smaller than ${RESUME_MAX_MB} MB.`;
    else if (resume.size === 0) errors.resume = "That file is empty. Please choose another.";
  }
  if (values.intro.length > 1500) errors.intro = "Please keep your introduction under 1,500 characters.";
  return errors;
};

/* The application form.
   `job`  — the role being applied for, or null for a general application.
   The success state is shown only after the server confirms it has the
   application; nothing here pretends a submission went through. */
export const ApplicationForm = ({ job = null }) => {
  const id = useId();
  const form = useRef(null);
  const fileInput = useRef(null);
  const [values, setValues] = useState({ ...EMPTY, position: job ? job.title : "" });
  const [resume, setResume] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | failed
  const [failure, setFailure] = useState("");

  const set = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const pickResume = (e) => {
    const file = e.target.files?.[0] || null;
    setResume(file);
    const fileError = validate({ ...EMPTY, name: "ok", email: "a@b.co", phone: "1234567", position: "x" }, file).resume;
    setErrors((er) => ({ ...er, resume: file ? fileError : undefined }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    if (values.website) return; // honeypot: real people never see or fill this field

    const found = validate(values, resume);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      form.current?.querySelector(`[name="${first}"]`)?.focus();
      return;
    }

    const [firstName, ...rest] = values.name.trim().split(/\s+/);
    const link = values.link.trim() ? withProtocol(values.link.trim()) : "";
    const body = new FormData();
    body.append("job_title", values.position.trim());
    body.append("location", job ? job.location : "General application");
    body.append("first_name", firstName);
    body.append("last_name", rest.join(" ") || "-");
    body.append("email", values.email.trim());
    body.append("mobile", values.phone.trim());
    if (link) body.append(/linkedin\.com/i.test(link) ? "linkedin_url" : "portfolio_url", link);
    body.append("introduction", values.intro.trim());
    body.append("resume", resume);

    setStatus("sending");
    setFailure("");
    try {
      const response = await fetch(APPLICATION_ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body });
      if (response.ok) {
        setStatus("sent");
        return;
      }
      let message = "We couldn’t send your application. Please try again in a moment.";
      try {
        const data = await response.json();
        if (data?.errors) message = Object.values(data.errors).flat().join(" ");
        else if (response.status < 500 && data?.message) message = data.message;
      } catch {
        /* not JSON — keep the general message */
      }
      setFailure(message);
      setStatus("failed");
    } catch {
      setFailure("We couldn’t reach the server. Check your connection and try again.");
      setStatus("failed");
    }
  };

  if (status === "sent") {
    return (
      <div className="cr-form-done" role="status" tabIndex={-1} ref={(el) => el?.focus()}>
        <span className="cr-form-done-mark" aria-hidden="true" />
        <h3>Application received.</h3>
        <p>
          Thank you, {values.name.trim().split(/\s+/)[0]}. We have your application
          {job ? ` for ${job.title}` : ""} and will be in touch at {values.email.trim()} if there’s a fit.
        </p>
      </div>
    );
  }

  const field = (name) => ({
    id: `${id}-${name}`,
    name,
    value: values[name],
    onChange: set,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id}-${name}-e` : undefined,
  });
  const error = (name) => errors[name] && <span className="cr-field-error" id={`${id}-${name}-e`}>{errors[name]}</span>;
  const sending = status === "sending";

  return (
    <form className="cr-form" ref={form} onSubmit={submit} noValidate aria-busy={sending}>
      <div className={"cr-field" + (errors.name ? " has-error" : "")}>
        <label htmlFor={`${id}-name`}>Full name</label>
        <input type="text" autoComplete="name" required {...field("name")} />
        {error("name")}
      </div>
      <div className={"cr-field" + (errors.email ? " has-error" : "")}>
        <label htmlFor={`${id}-email`}>Email address</label>
        <input type="email" autoComplete="email" inputMode="email" required {...field("email")} />
        {error("email")}
      </div>
      <div className={"cr-field" + (errors.phone ? " has-error" : "")}>
        <label htmlFor={`${id}-phone`}>Phone number</label>
        <input type="tel" autoComplete="tel" inputMode="tel" required {...field("phone")} />
        {error("phone")}
      </div>
      <div className={"cr-field" + (errors.position ? " has-error" : "")}>
        <label htmlFor={`${id}-position`}>{job ? "Position" : "What do you do?"}</label>
        <input type="text" required readOnly={Boolean(job)} placeholder={job ? undefined : "Designer, editor, strategist…"} {...field("position")} />
        {error("position")}
      </div>
      <div className={"cr-field cr-field-wide" + (errors.link ? " has-error" : "")}>
        <label htmlFor={`${id}-link`}>Portfolio or LinkedIn link <em>Optional</em></label>
        <input type="url" autoComplete="url" inputMode="url" placeholder="https://" {...field("link")} />
        {error("link")}
      </div>
      <div className={"cr-field cr-field-wide" + (errors.resume ? " has-error" : "")}>
        <label htmlFor={`${id}-resume`}>Resume</label>
        <div className="cr-file">
          <input
            ref={fileInput}
            type="file"
            id={`${id}-resume`}
            name="resume"
            accept={RESUME_TYPES.join(",") + ",application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"}
            onChange={pickResume}
            aria-invalid={errors.resume ? true : undefined}
            aria-describedby={`${id}-resume-h` + (errors.resume ? ` ${id}-resume-e` : "")}
          />
          <span className="cr-file-face" aria-hidden="true">
            <span className="cr-file-name">{resume ? resume.name : "Choose a file"}</span>
            <span className="cr-file-action">{resume ? "Change" : "Browse"}</span>
          </span>
        </div>
        <span className="cr-field-hint" id={`${id}-resume-h`}>PDF, DOC or DOCX, up to {RESUME_MAX_MB} MB.</span>
        {error("resume")}
      </div>
      <div className={"cr-field cr-field-wide" + (errors.intro ? " has-error" : "")}>
        <label htmlFor={`${id}-intro`}>A short introduction <em>Optional</em></label>
        <textarea rows={5} maxLength={1600} placeholder="What you do, and what you love making." {...field("intro")} />
        {error("intro")}
      </div>

      {/* Honeypot — hidden from people and assistive technology. */}
      <div className="cr-hp" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input type="text" id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set} />
      </div>

      <div className="cr-form-foot cr-field-wide">
        {status === "failed" && (
          <p className="cr-form-alert" role="alert">{failure}</p>
        )}
        <button type="submit" className="pill dark cr-pill-arrow" disabled={sending}>
          <span>{sending ? "Sending…" : status === "failed" ? "Try Again" : "Send Application"}</span>
          {sending ? <i className="cr-spinner" aria-hidden="true" /> : <Arrow />}
        </button>
        <p className="cr-form-note">We use these details only to review your application.</p>
      </div>
    </form>
  );
};
