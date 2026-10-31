import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";

// Navbar ported from cucu-website (components/Shell.tsx) — styles live in navbar.css.

const navigation = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Portfolio", "/work"],
];

const isCurrent = (pathname, url) =>
  url === "/" ? pathname === "/" : pathname === url || pathname.startsWith(url + "/");

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const toggle = useRef(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width:850px)");
    const resize = () => {
      if (!media.matches) setOpen(false);
    };
    media.addEventListener("change", resize);
    return () => media.removeEventListener("change", resize);
  }, []);

  // While the mobile menu is open: lock scrolling, make the page inert and trap focus.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (window.lenis) window.lenis.stop();
    const main = document.getElementById("main");
    main?.setAttribute("inert", "");
    const key = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (e.key === "Tab") {
        const nodes = Array.from(document.querySelectorAll(".cucu-header .nav-toggle,.cucu-header .fauna-links.open a"));
        const first = nodes[0],
          last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = previousOverflow;
      if (window.lenis) window.lenis.start();
      main?.removeAttribute("inert");
      document.removeEventListener("keydown", key);
    };
  }, [open]);

  return (
    <div className="cucu-header">
      <a className="skip" href="#main">Skip to content</a>
      <header className="fauna-nav">
        <Link to="/" className="cucu-brand" aria-label="CUCU Advertising home">
          <img className="brand-logo" src="/media/cucu-logo-horizontal.webp" alt="" width="645" height="240" />
        </Link>
        <div className="fauna-nav-right">
          <button
            ref={toggle}
            className={"nav-toggle" + (open ? " active" : "")}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="navigation"
          >
            <span>{open ? "Close" : "Menu"}</span>
            <i aria-hidden="true" />
          </button>
          <nav id="navigation" className={"fauna-links" + (open ? " open" : "")} aria-label="Main navigation" onClick={(e) => e.target.closest("a") && setOpen(false)}>
            {navigation.map(([name, url]) => (
              <Link key={url} to={url} aria-current={isCurrent(pathname, url) ? "page" : undefined}>
                {name}
              </Link>
            ))}
            <Link to="/contact" className="mobile-meet">Let’s Build</Link>
          </nav>
          <Link className="fauna-contact" to="/contact">Let’s Build</Link>
        </div>
      </header>
    </div>
  );
};
