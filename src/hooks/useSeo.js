import { useEffect } from "react";

const SITE = "https://cucuadvertising.com";

/* Sets the page title, meta description, canonical link and (optionally)
   structured data for the current page, and puts things back on leaving. */
const useSeo = ({ title, description, path, jsonLd }) => {
  const data = jsonLd ? JSON.stringify(jsonLd) : "";

  useEffect(() => {
    const previousTitle = document.title;
    if (title) document.title = title;

    const head = document.head;
    const added = [];
    const restore = [];

    const setTag = (selector, create, attr, value) => {
      let el = head.querySelector(selector);
      if (el) {
        const before = el.getAttribute(attr);
        restore.push(() => (before === null ? el.removeAttribute(attr) : el.setAttribute(attr, before)));
      } else {
        el = create();
        head.appendChild(el);
        added.push(el);
      }
      el.setAttribute(attr, value);
    };

    if (description) {
      setTag('meta[name="description"]', () => Object.assign(document.createElement("meta"), { name: "description" }), "content", description);
    }
    if (path) {
      setTag('link[rel="canonical"]', () => Object.assign(document.createElement("link"), { rel: "canonical" }), "href", SITE + path);
    }
    if (data) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = data;
      head.appendChild(script);
      added.push(script);
    }

    return () => {
      document.title = previousTitle;
      added.forEach((el) => el.remove());
      restore.forEach((fn) => fn());
    };
  }, [title, description, path, data]);
};

export default useSeo;
