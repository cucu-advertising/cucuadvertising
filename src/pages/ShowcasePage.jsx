import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteFooter } from "../components/SiteFooter";
import { showcaseSections as sections } from "../constants/showcaseSections";

const SectionNav = ({ active, onSelect }) => (
  <div className="flex flex-wrap gap-3 md:gap-4">
    {sections.map((s) => (
      <button
        key={s.id}
        onClick={() => onSelect(s.id)}
        className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-500 border whitespace-nowrap ${
          active === s.id
            ? "bg-black text-white border-black"
            : "bg-transparent text-black border-black/10 hover:border-black/30"
        }`}
      >
        {s.title}
      </button>
    ))}
  </div>
);

export const ShowcasePage = ({ setPage }) => {
  const [active, setActive] = useState(sections[0].id);
  const activeSection = sections.find((s) => s.id === active);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen text-black pt-32"
    >
      {/* Header */}
      <section className="px-6 md:px-[max(3rem,calc((100%-1800px)/2))] mb-14">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
          <div className="w-full lg:w-max">
            <div className="relative">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-[45px] md:text-[55px] font-black text-black leading-[1.1] tracking-tight uppercase"
              >
                Creative
                <br />
                Showcase
              </motion.h1>
              <div className="h-1.5 w-16 bg-[#197C48] mt-6" />
            </div>
          </div>
          <div className="w-full lg:max-w-md">
            <p className="text-lg text-neutral-500 leading-relaxed font-medium border-l-4 border-[#197C48] pl-8">
              Beyond brand identity — the everyday creative that keeps our clients visible: social content, on-ground production, photography, and AI-assisted video.
            </p>
          </div>
        </div>
      </section>

      {/* Section Filter Nav */}
      <section className="px-6 md:px-[max(3rem,calc((100%-1800px)/2))] mb-16">
        <SectionNav active={active} onSelect={setActive} />
      </section>

      {/* Active Section */}
      <AnimatePresence mode="wait">
        <motion.main
          key={activeSection.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="px-6 md:px-[max(3rem,calc((100%-1800px)/2))] pb-24"
        >
          <div className="mb-12 max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[#197C48] text-sm font-mono font-bold">
                {activeSection.label}
              </span>
              <div className="h-[1px] flex-1 bg-black/10" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-4">
              {activeSection.subtitle}
            </h2>
            <p className="text-neutral-500 text-lg leading-relaxed">
              {activeSection.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
            {activeSection.items.map((item, idx) => (
              <motion.div
                key={`${activeSection.id}-${idx}`}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group"
              >
                <div className="aspect-[16/9] overflow-hidden bg-neutral-100 rounded-2xl shadow-sm border border-neutral-200">
                  <motion.img
                    src={item.img}
                    alt={`${item.client} — ${activeSection.title}`}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover transition-all duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="mt-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-8 h-[2px] bg-[#197C48]" />
                    <p className="text-neutral-400 font-bold text-xs uppercase tracking-widest">
                      {item.client}
                    </p>
                  </div>
                  <p className="text-black/80 text-base md:text-lg leading-relaxed font-medium">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.main>
      </AnimatePresence>

      {/* CTA */}
      <section className="px-6 md:px-[max(3rem,calc((100%-1800px)/2))] pb-24">
        <div className="max-w-6xl mx-auto text-center py-16 border-t border-neutral-100">
          <p className="text-xl md:text-2xl text-neutral-500 font-medium mb-10 max-w-2xl mx-auto">
            Want ongoing creative like this for your brand?
          </p>
          <button
            onClick={() => setPage("contact")}
            className="group relative inline-flex items-center gap-4 px-10 py-5 bg-transparent border border-black/10 rounded-full text-black hover:text-white transition-colors duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[#197C48] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
            <span className="relative z-10 text-lg font-bold uppercase tracking-widest">Let's Collaborate</span>
            <div className="relative z-10 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-white group-hover:text-[#197C48] group-hover:translate-x-2 transition-all duration-500">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </button>
        </div>
      </section>

      <SiteFooter />
    </motion.div>
  );
};
