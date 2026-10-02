import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { optimizedSrc } from "../utils/optimizedImage";

// Optional case-study sections for ProjectDetailPage. Each one renders only
// when its field exists on the project, so older projects are unaffected.

const Eyebrow = ({ children, light = false }) => (
  <span
    className={`text-[10px] font-black uppercase tracking-[0.4em] mb-10 block ${
      light ? "text-[#8CF2C6]" : "text-[#197C48]"
    }`}
  >
    {children}
  </span>
);

// project.statement: { lead, accent }
export const StatementSection = ({ statement }) => (
  <section className="px-6 md:px-12 py-16 md:py-24">
    <Eyebrow>Creative Direction</Eyebrow>
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-[12vw] md:text-[8vw] font-black uppercase leading-[0.85] tracking-tighter text-black"
    >
      {statement.lead}
      <br />
      <span className="text-[#197C48]">{statement.accent}</span>
    </motion.h2>
  </section>
);

// project.subProjects: [{ name, desc, img }]
export const SubProjectsSection = ({ subProjects, brand }) => (
  <section className="px-6 md:px-12 pb-16 md:pb-24">
    <div className={`grid gap-6 ${subProjects.length > 1 ? "md:grid-cols-2" : ""}`}>
      {subProjects.map((sp, idx) => (
        <div
          key={sp.name}
          className="relative min-h-[480px] md:min-h-[640px] rounded-[2.5rem] overflow-hidden shadow-2xl bg-neutral-900 group"
        >
          <img
            src={optimizedSrc(sp.img, 1200)}
            loading="lazy"
            decoding="async"
            alt={sp.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/85 p-8 md:p-10 flex flex-col justify-between text-white">
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">
              Project 0{idx + 1} / {brand}
            </span>
            <div>
              <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-4">
                {sp.name}
              </h3>
              <p className="text-base md:text-lg text-white/85 max-w-md leading-relaxed">{sp.desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const isVideoFile = (url) => /\.(webm|mp4|mov)$/i.test(url || "");

// Pop-up player. Plays with sound and native controls; closes on ✕, Esc or a
// click on the dark backdrop. Page scrolling is paused while it's open.
const FilmModal = ({ film, vertical, onClose }) => {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    window.lenis?.stop();
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      window.lenis?.start();
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-label={film.title}
    >
      <button
        onClick={onClose}
        aria-label="Close video"
        className="absolute top-5 right-5 md:top-8 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-[#8CF2C6] hover:text-black text-white text-2xl flex items-center justify-center transition-colors"
      >
        ✕
      </button>
      <motion.div
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 10 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col items-center"
      >
        {isVideoFile(film.url) ? (
          <video
            src={film.url}
            poster={film.thumbnail}
            controls
            controlsList="nodownload noplaybackrate noremoteplayback"
            disablePictureInPicture
            disableRemotePlayback
            onContextMenu={(e) => e.preventDefault()}
            autoPlay
            playsInline
            className={`rounded-2xl bg-black shadow-2xl ${
              vertical ? "h-[80vh] max-w-[90vw] w-auto" : "w-[90vw] max-w-6xl max-h-[80vh]"
            }`}
          />
        ) : (
          <iframe
            src={film.url}
            title={film.title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className={`rounded-2xl bg-black shadow-2xl ${
              vertical ? "h-[80vh] aspect-[9/16]" : "w-[90vw] max-w-6xl aspect-video"
            }`}
          />
        )}
        <p className="mt-4 text-white text-sm md:text-base font-bold uppercase tracking-widest">
          {film.title}
          {film.subtitle && <span className="text-white/50"> · {film.subtitle}</span>}
        </p>
      </motion.div>
    </motion.div>
  );
};

const FilmCard = ({ film, idx, brand, vertical, onOpen }) => {
  const hasUrl = Boolean(film.url);
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // Hover preview with sound. Browsers only allow sound after the visitor has
  // interacted with the page; if it's blocked, fall back to a silent preview.
  const startPreview = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.play().catch(() => {
      v.muted = true;
      v.play().catch(() => {});
    });
  };
  const stopPreview = () => videoRef.current?.pause();

  return (
    <div
      role={hasUrl ? "button" : undefined}
      tabIndex={hasUrl ? 0 : undefined}
      onClick={() => {
        if (!hasUrl) return;
        stopPreview();
        onOpen(film);
      }}
      onKeyDown={(e) => {
        if (hasUrl && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          stopPreview();
          onOpen(film);
        }
      }}
      onMouseEnter={startPreview}
      onMouseLeave={stopPreview}
      className={`relative block overflow-hidden rounded-3xl shadow-xl group bg-gradient-to-br from-[#197C48] to-neutral-950 ${
        vertical ? "aspect-[9/16]" : "aspect-video"
      } ${hasUrl ? "cursor-pointer" : "cursor-default"}`}
    >
      {isVideoFile(film.url) ? (
        // Shows the first frame and only plays on hover, so a page with several
        // films doesn't download every video up front.
        <video
          ref={videoRef}
          src={`${film.url}#t=0.1`}
          poster={film.thumbnail}
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          onContextMenu={(e) => e.preventDefault()}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
        />
      ) : film.thumbnail && (
        <img
          src={film.thumbnail}
          alt={film.title}
          className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
        />
      )}
      {/* Overlay — fades away while the preview plays so the video is visible */}
      <div
        className={`absolute inset-0 p-5 md:p-6 flex flex-col justify-between text-white transition-opacity duration-300 ${
          playing ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.2em]">
          <span>Film / 0{idx + 1}</span>
          <span>{brand}</span>
        </div>
        <div>
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center font-bold mb-4 shadow-lg transition-transform ${
              hasUrl ? "bg-[#8CF2C6] text-black group-hover:scale-110" : "bg-white/20 text-white"
            }`}
          >
            ▶
          </div>
          <h4 className={`${vertical ? "text-2xl" : "text-3xl md:text-5xl"} font-black uppercase tracking-tighter leading-none`}>
            {film.title}
          </h4>
          <p className="text-xs md:text-sm text-white/75 mt-2">
            {hasUrl ? film.subtitle : `${film.subtitle ? film.subtitle + " · " : ""}Coming soon`}
          </p>
        </div>
      </div>
      {/* Small "click to watch" hint while previewing */}
      {hasUrl && (
        <span
          className={`absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur text-white text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-opacity duration-300 ${
            playing ? "opacity-100" : "opacity-0"
          }`}
        >
          Click to watch full
        </span>
      )}
    </div>
  );
};

// project.films: [{ title, subtitle, url?, thumbnail? }]
// project.filmFormat: "vertical" (9:16, default) | "horizontal" (16:9)
export const FilmsSection = ({ films, brand, format = "vertical", intro }) => {
  const [openFilm, setOpenFilm] = useState(null);
  const closeFilm = useCallback(() => setOpenFilm(null), []);
  const vertical = format !== "horizontal";
  const gridCols = !vertical
    ? "grid-cols-1"
    : films.length >= 5
    ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
    : "grid-cols-2 lg:grid-cols-4";

  return (
    <section className="px-6 md:px-12 py-16 md:py-24 border-t border-neutral-100">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
        <div>
          <Eyebrow>The Films</Eyebrow>
          <h3 className="text-4xl md:text-6xl font-black uppercase leading-[0.9] tracking-tighter">
            {films.length === 1 ? "One film." : `${films.length} stories.`}
            <br />
            <span className="text-[#197C48]">{films.length === 1 ? "Front and centre." : "One system."}</span>
          </h3>
        </div>
        {intro && (
          <p className="text-lg text-neutral-600 font-light leading-relaxed max-w-md">{intro}</p>
        )}
      </div>
      <div className={`grid gap-4 ${gridCols}`}>
        {films.map((film, idx) => (
          <FilmCard key={idx} film={film} idx={idx} brand={brand} vertical={vertical} onOpen={setOpenFilm} />
        ))}
      </div>
      <AnimatePresence>
        {openFilm && (
          <FilmModal key="film-modal" film={openFilm} vertical={vertical} onClose={closeFilm} />
        )}
      </AnimatePresence>
    </section>
  );
};

// project.approach: { title?, steps: [{ title, desc }] }
export const ApproachSection = ({ approach }) => (
  <section className="px-6 md:px-12 py-16 md:py-24 border-t border-neutral-100">
    <div className="grid lg:grid-cols-12 gap-10 md:gap-16 mb-14">
      <div className="lg:col-span-4">
        <Eyebrow>Our Approach</Eyebrow>
      </div>
      <h3 className="lg:col-span-8 text-4xl md:text-6xl font-black uppercase leading-[0.9] tracking-tighter">
        {approach.title}
      </h3>
    </div>
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 gap-6 ${
        approach.steps.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
      }`}
    >
      {approach.steps.map((step, idx) => (
        <motion.div
          key={step.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          className="border-t-4 border-[#197C48] bg-neutral-50 hover:bg-[#8CF2C6] transition-colors duration-300 rounded-2xl p-8 min-h-[240px] flex flex-col justify-between"
        >
          <span className="text-2xl font-mono font-bold text-[#197C48]">0{idx + 1}</span>
          <div>
            <h4 className="text-xl font-black uppercase tracking-tight text-black mb-3">{step.title}</h4>
            <p className="text-sm text-neutral-600 leading-relaxed">{step.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

// project.palette: [{ name, hex? }], project.typeface?: { name, note }
export const PaletteSection = ({ palette, typeface }) => (
  <div className="grid lg:grid-cols-2 gap-8 mb-20">
    <div className="bg-[#f8f8f8] rounded-[2.5rem] p-8 md:p-12 border border-neutral-100">
      <Eyebrow>Colour Palette</Eyebrow>
      <div className="grid grid-cols-2 gap-4">
        {palette.map((c) => (
          <div key={c.name} className="rounded-2xl overflow-hidden border border-neutral-200 bg-white">
            <div
              className={`h-28 ${c.hex ? "" : "bg-[repeating-linear-gradient(45deg,#eee,#eee_10px,#f7f7f7_10px,#f7f7f7_20px)]"}`}
              style={c.hex ? { background: c.hex } : undefined}
            />
            <div className="p-4 flex justify-between text-xs font-bold uppercase tracking-widest">
              <span>{c.name}</span>
              <span className="text-neutral-400">{c.hex || "TBC"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
    {typeface && (
      <div className="bg-neutral-900 text-white rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between">
        <Eyebrow light>Typography</Eyebrow>
        <span className="text-[120px] md:text-[180px] font-black leading-none tracking-tighter">Aa</span>
        <div>
          <p className="text-2xl font-black uppercase tracking-tight">{typeface.name}</p>
          {typeface.note && <p className="text-sm text-neutral-400 mt-2">{typeface.note}</p>}
        </div>
      </div>
    )}
  </div>
);
