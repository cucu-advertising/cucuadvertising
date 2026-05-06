import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { BigFooter } from "../components/Footer";
import { allProjects } from "../constants/projects";

export const WorkPage = ({ setPage, setSelectedProject }) => {
  const [filter, setFilter] = useState("Brand Identity & Communication");
  const marqueeRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: marqueeRef,
    offset: ["start end", "end start"]
  });

  const xTranslate = useTransform(scrollYProgress, [0, 1], [0, -500]);

  const filters = [
    "Brand Identity & Communication",
    "Packaging Design",
    "User Experience & Interaction",
    "Web Development"
  ];

  const filtered = filter === "Brand Identity & Communication" 
    ? allProjects 
    : allProjects.filter((p) => p.category === filter);

  const handleProjectClick = (project) => {
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
      <section className="px-6 md:px-24 mb-10">
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
        <div className="w-full aspect-video md:aspect-[21/9] bg-neutral-100">
          <video
            src="/workbranding/Video Project 19.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* 2. Portfolio Filter Section */}
      <section className="px-6 md:px-24 mb-16">
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

      {/* 3. Project Grid Section */}
      <main className="px-6 md:px-24 pb-24">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16 lg:gap-x-14 lg:gap-y-24"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group cursor-pointer"
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
          </AnimatePresence>
        </motion.div>
      </main>

      {/* 4. Scrolling Marquee Section */}
      <section ref={marqueeRef} className="py-20 bg-white text-black overflow-hidden border-t border-neutral-100">
        <div className="flex whitespace-nowrap overflow-hidden">
          <motion.div style={{ x: xTranslate }} className="flex gap-12 items-center">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <h2 key={i} className="text-[6vw] md:text-[5vw] font-black uppercase tracking-tighter text-black/90">
                Every Project, Every Story.
              </h2>
            ))}
          </motion.div>
        </div>

        <div className="px-6 md:px-24 mt-24 max-w-6xl mx-auto text-center relative py-12">
          {/* Floating Side Images (Desktop only) */}
          <div className="hidden lg:block absolute left-[-5%] top-1/2 -translate-y-1/2 w-48 z-10">
            <motion.img 
              initial={{ opacity: 0, x: -40, rotate: -15 }}
              whileInView={{ opacity: 1, x: 0, rotate: -8 }}
              transition={{ duration: 1, ease: "easeOut" }}
              src="/workbranding/banner 2.webp" 
              alt="Work branding 2"
              className="w-full rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-neutral-100"
            />
          </div>

          <div className="hidden lg:block absolute right-[-5%] top-1/2 -translate-y-1/2 w-56 z-10">
            <div className="relative">
              <motion.img 
                initial={{ opacity: 0, x: 40, rotate: 15 }}
                whileInView={{ opacity: 1, x: 0, rotate: 5 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                src="/workbranding/banner 3.webp" 
                alt="Work branding 3"
                className="w-4/5 ml-auto rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-neutral-100 mb-4"
              />
              <motion.img 
                initial={{ opacity: 0, y: 30, rotate: -10 }}
                whileInView={{ opacity: 1, y: 0, rotate: -3 }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                src="/workbranding/banner 4.webp" 
                alt="Work branding 4"
                className="w-full rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.2)] border border-neutral-100 mt-[-20%] relative z-10"
              />
            </div>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl md:text-3xl text-neutral-500 leading-relaxed font-medium max-w-3xl mx-auto"
          >
            We Believe That Every Project Has Its Own Story To Tell. From Concept To Completion, We Infuse Creativity, Strategy And Innovation To Deliver Exceptional Results.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex justify-center"
          >
            <button 
              onClick={() => setPage("contact")}
              className="group relative flex items-center gap-4 px-10 py-5 bg-transparent border border-black/10 rounded-full text-black hover:text-white transition-colors duration-500 overflow-hidden"
            >
              {/* Animated Background Fill */}
              <div className="absolute inset-0 bg-[#197C48] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
              
              <span className="relative z-10 text-lg font-bold uppercase tracking-widest">Let's Collaborate</span>
              <div className="relative z-10 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-white group-hover:text-[#197C48] group-hover:translate-x-2 transition-all duration-500">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </button>
          </motion.div>
        </div>
      </section>

      <BigFooter setPage={setPage} />
    </motion.div>
  );
};



