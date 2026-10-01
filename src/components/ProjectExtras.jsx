import React from "react";
import { motion } from "framer-motion";

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
            src={sp.img}
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

const FilmCard = ({ film, idx, brand, vertical }) => {
  const hasUrl = Boolean(film.url);
  const Tag = hasUrl ? "a" : "div";
  return (
    <Tag
      {...(hasUrl ? { href: film.url, target: "_blank", rel: "noopener noreferrer" } : {})}
      onMouseEnter={(e) => e.currentTarget.querySelector("video")?.play().catch(() => {})}
      onMouseLeave={(e) => e.currentTarget.querySelector("video")?.pause()}
      className={`relative block overflow-hidden rounded-3xl shadow-xl group bg-gradient-to-br from-[#197C48] to-neutral-950 ${
        vertical ? "aspect-[9/16]" : "aspect-video"
      } ${hasUrl ? "cursor-pointer" : "cursor-default"}`}
    >
      {isVideoFile(film.url) ? (
        // Shows the first frame and only plays on hover, so a page with several
        // films doesn't download every video up front.
        <video
          src={`${film.url}#t=0.1`}
          poster={film.thumbnail}
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
        />
      ) : film.thumbnail && (
        <img
          src={film.thumbnail}
          alt={film.title}
          className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
        />
      )}
      <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-between text-white">
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
    </Tag>
  );
};

// project.films: [{ title, subtitle, url?, thumbnail? }]
// project.filmFormat: "vertical" (9:16, default) | "horizontal" (16:9)
export const FilmsSection = ({ films, brand, format = "vertical", intro }) => {
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
          <FilmCard key={idx} film={film} idx={idx} brand={brand} vertical={vertical} />
        ))}
      </div>
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
