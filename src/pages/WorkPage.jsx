import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BigFooter } from "../components/Footer";
import { allProjects } from "../constants/projects";
import { showcaseSections } from "../constants/showcaseSections";

export const WorkPage = ({ setPage, setSelectedProject }) => {
  const [filter, setFilter] = useState("Brand Identity & Communication");

  const filters = [
    "Brand Identity & Communication",
    "Packaging Design",
    "User Experience & Interaction",
    "Web Development"
  ];

  // Showcase categories now live as extra filter buttons right beside the
  // existing portfolio filters, instead of behind a separate "Showcase" button/page.
  const showcaseIds = showcaseSections.map((s) => s.id);
  const isShowcaseFilter = showcaseIds.includes(filter);
  const activeShowcaseSection = isShowcaseFilter
    ? showcaseSections.find((s) => s.id === filter)
    : null;

  const filtered = !isShowcaseFilter
    ? allProjects.filter((p) => p.category === filter)
    : [];

  // One cover photo per client, cycled in the showcase banner.
  const clientSlides = allProjects.filter(
    (p, i, arr) => p.img && arr.findIndex((q) => q.img === p.img) === i
  );
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (clientSlides.length < 2) return;
    const timer = setInterval(() => {
      setSlideIndex((i) => (i + 1) % clientSlides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [clientSlides.length]);

  const handleProjectClick = (project) => {
    if (project.disableDetail) return;
    setSelectedProject(project);
    setPage("project-detail");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen text-black pt-32"
    >
      {/* 1. Header Section */}
      <section className="px-6 md:px-[max(3rem,calc((100%-1800px)/2))] mb-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
          <div className="w-full lg:w-max">
            <div className="relative">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-[45px] md:text-[55px] font-black text-black leading-[1.1] tracking-tight uppercase"
              >
                Wow,
                <br />
                Just Wow
              </motion.h1>
              <div className="h-1.5 w-16 bg-[#197C48] mt-6" />
            </div>
          </div>
          <div className="w-full lg:max-w-md">
            <p className="text-lg text-neutral-500 leading-relaxed font-medium border-l-4 border-[#197C48] pl-8">
              A curated selection of our most impactful work, where strategy meets premium design.
            </p>
          </div>
        </div>
      </section>

      {/* 1.5 Video Showcase Section */}
      <section className="w-full mb-20 overflow-hidden">
        <div className="relative w-full aspect-video md:aspect-[21/9] bg-neutral-100">
          <AnimatePresence initial={false}>
            <motion.img
              key={clientSlides[slideIndex]?.img}
              src={clientSlides[slideIndex]?.img}
              alt={clientSlides[slideIndex]?.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
        </div>
      </section>

      {/* 2. Portfolio Filter Section */}
      <section className="px-6 md:px-[max(3rem,calc((100%-1800px)/2))] mb-16">
        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
          <h2 className="text-3xl md:text-4xl font-light uppercase tracking-[0.2em] text-black/80 shrink-0">
            Portfolio
          </h2>
          
          <div className="flex flex-wrap items-center gap-4">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-8 py-3 rounded-full text-sm font-light transition-all duration-500 whitespace-nowrap border ${
                  filter === f
                    ? "bg-black text-white border-black"
                    : "bg-transparent text-black border-black/10 hover:border-black/30"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Project Grid / Showcase Section */}
      <main className="px-6 md:px-[max(3rem,calc((100%-1800px)/2))] pb-24">
        <AnimatePresence mode="wait">
          {!isShowcaseFilter ? (
            <motion.div
              key="project-grid"
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16 lg:gap-x-14 lg:gap-y-24"
            >
              {filtered.map((p) => (
                <motion.div
                  key={p.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className={`group ${p.disableDetail ? "cursor-default" : "cursor-pointer"}`}
                  onClick={() => handleProjectClick(p)}
                >
                  <div className="aspect-[16/11] overflow-hidden bg-neutral-100 rounded-2xl shadow-sm border border-neutral-200">
                    {p.img.toLowerCase().endsWith('.mp4') ? (
                      <video
                        src={p.img}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover transition-all duration-500"
                      />
                    ) : (
                      <motion.img
                        src={p.img}
                        alt={p.title}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full object-cover transition-all duration-500"
                      />
                    )}
                  </div>
                  <div className="mt-8">
                    <h3 className="text-3xl lg:text-4xl font-black text-black uppercase leading-none tracking-tighter mb-4">
                      {p.title}
                    </h3>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-[2px] bg-[#197C48]" />
                      <p className="text-neutral-400 font-bold text-xs uppercase tracking-widest">
                        {p.category}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={activeShowcaseSection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-12 max-w-3xl">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[#197C48] text-sm font-mono font-bold">
                    {activeShowcaseSection.label}
                  </span>
                  <div className="h-[1px] flex-1 bg-black/10" />
                </div>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-4">
                  {activeShowcaseSection.subtitle}
                </h2>
                <p className="text-neutral-500 text-lg leading-relaxed">
                  {activeShowcaseSection.intro}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
                {activeShowcaseSection.items.map((item, idx) => (
                  <motion.div
                    key={`${activeShowcaseSection.id}-${idx}`}
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    className="group"
                  >
                    <div className="aspect-[16/9] overflow-hidden bg-neutral-100 rounded-2xl shadow-sm border border-neutral-200">
                      <motion.img
                        src={item.img}
                        alt={`${item.client} — ${activeShowcaseSection.title}`}
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
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <BigFooter setPage={setPage} />
    </motion.div>
  );
};



