import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Lines, Magnetic, Reveal, Roll } from "../../motion/primitives";
import { DEPARTMENTS, GENERAL_SLUG, TYPES, filterJobs, filterOptions, jobMeta, previewMode, visibleJobs } from "../../constants/jobs";

export const Arrow = ({ className = "" }) => (
  <svg className={`cr-arrow ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 18 18 6M8 6h10v10" />
  </svg>
);

/* A small listbox: "Discipline: All ▾". Works with mouse, touch and keyboard
   (arrows, Home/End, Enter/Space to choose, Escape to close). */
const Filter = ({ label, options, value, onChange }) => {
  const id = useId();
  const root = useRef(null);
  const button = useRef(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!open) return;
    const outside = (e) => {
      if (!root.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);

  const show = () => {
    setActive(Math.max(0, options.indexOf(value)));
    setOpen(true);
  };
  const choose = (option) => {
    onChange(option);
    setOpen(false);
    button.current?.focus();
  };

  const onKeyDown = (e) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        show();
      }
      return;
    }
    const last = options.length - 1;
    if (e.key === "ArrowDown") setActive((i) => Math.min(last, i + 1));
    else if (e.key === "ArrowUp") setActive((i) => Math.max(0, i - 1));
    else if (e.key === "Home") setActive(0);
    else if (e.key === "End") setActive(last);
    else if (e.key === "Enter" || e.key === " ") choose(options[active]);
    else if (e.key === "Escape") setOpen(false);
    else if (e.key === "Tab") {
      setOpen(false);
      return;
    } else return;
    e.preventDefault();
  };

  return (
    <div className={"cr-filter" + (open ? " is-open" : "")} ref={root}>
      <button
        ref={button}
        type="button"
        className="cr-filter-button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-activedescendant={open ? `${id}-o${active}` : undefined}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onKeyDown}
      >
        <span className="cr-filter-label">{label}:</span>
        <span className="cr-filter-value">{value}</span>
        <i className="cr-filter-caret" aria-hidden="true" />
      </button>
      <ul className="cr-filter-list" id={`${id}-list`} role="listbox" aria-label={label} data-lenis-prevent>
        {options.map((option, i) => (
          <li
            key={option}
            id={`${id}-o${i}`}
            role="option"
            aria-selected={option === value}
            className={i === active ? "is-active" : ""}
            onPointerEnter={() => setActive(i)}
            onClick={() => choose(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

const JobRow = ({ job, index }) => (
  <li className="cr-job" style={{ "--i": index }}>
    <Link to={`/careers/${job.slug}`} className="cr-job-link">
      <h3 className="cr-job-title">{job.title}</h3>
      <p className="cr-job-meta">
        {jobMeta(job).map((item) => (
          <span key={item}>{item}</span>
        ))}
      </p>
      {!job.open && <span className="cr-job-flag">Closed · preview</span>}
      <span className="cr-job-arrow" aria-hidden="true">
        <Arrow />
      </span>
    </Link>
  </li>
);

export const JobBoard = () => {
  const all = useMemo(() => visibleJobs(), []);
  const preview = previewMode();
  const [department, setDepartment] = useState("All");
  const [type, setType] = useState("All");

  const departments = useMemo(() => filterOptions(all, "department", DEPARTMENTS), [all]);
  const types = useMemo(() => filterOptions(all, "type", TYPES), [all]);
  const shown = filterJobs(all, { department, type });
  const filtered = department !== "All" || type !== "All";

  return (
    <section className="cr-jobs" id="jobs" aria-labelledby="jobs-title">
      <div className="cr-jobs-head">
        <div>
          <Reveal as="span" className="eyebrow">Open positions</Reveal>
          <Lines as="h2" id="jobs-title">
            <>Find your</>
            <span className="dim">next move.</span>
          </Lines>
        </div>
        {all.length > 0 && (
          <Reveal className="cr-filters" delay={150}>
            <Filter label="Discipline" options={departments} value={department} onChange={setDepartment} />
            <Filter label="Type" options={types} value={type} onChange={setType} />
          </Reveal>
        )}
      </div>

      {preview && all.some((job) => !job.open) && (
        <p className="cr-preview-note" role="note">
          Preview: roles marked “Closed” are not published and visitors cannot see them. <a href="?preview=off">Leave preview</a>
        </p>
      )}

      {all.length === 0 ? (
        <Reveal className="cr-empty">
          <h3>
            No openings.
            <br />
            <span className="dim">Still open to talent.</span>
          </h3>
          <div className="cr-empty-side">
            <p>We might not have the perfect role listed right now, but we’d still love to hear from you.</p>
            <Magnetic>
              <Link to={`/careers/${GENERAL_SLUG}`} className="pill dark cr-pill-arrow">
                <Roll>Introduce Yourself</Roll>
                <Arrow />
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      ) : (
        <Reveal className="cr-job-wrap">
          <p className="cr-count" aria-live="polite">
            {shown.length} {shown.length === 1 ? "role" : "roles"}
            {filtered ? ` of ${all.length}` : ""}
          </p>
          {shown.length > 0 ? (
            <ul className="cr-job-list" key={`${department}|${type}`}>
              {shown.map((job, i) => (
                <JobRow job={job} index={i} key={job.id} />
              ))}
            </ul>
          ) : (
            <div className="cr-nomatch">
              <p>No roles match those filters.</p>
              <button
                type="button"
                className="text-link"
                onClick={() => {
                  setDepartment("All");
                  setType("All");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </Reveal>
      )}
    </section>
  );
};
