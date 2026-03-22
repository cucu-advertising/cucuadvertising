import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BigFooter } from "../components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { allProjects } from "../constants/projects";

gsap.registerPlugin(ScrollTrigger);

export const WorkPage = ({ setPage, setSelectedProject }) => {
  const [filter, setFilter] = useState("All");
  const sidebarRef = useRef(null);
  const mainContentRef = useRef(null);

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: sidebarRef.current,
      start: "top 100px",
      endTrigger: mainContentRef.current,
      end: "bottom bottom",
      pin: true,
      pinSpacing: false,
    });

    return () => st.kill();
  }, []);

  const filters = ["All", ...new Set(allProjects.map((p) => p.category))];


  const filtered =
    filter === "All"
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
      className="bg-white min-h-screen text-black"
    >
      {/* 1. Header Section */}
      <section className="pt-32 pb-20 px-6 md:px-24">
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

      {/* 2. Main Layout Container */}
      <div className="flex flex-col md:flex-row pr-6 md:pl-0 md:pr-12 pb-5 gap-12 lg:gap-20">
        {/* Sidebar Wrapper */}
        <aside className="w-full md:w-[320px] lg:w-[380px] shrink-0">
          <div 
            ref={sidebarRef}
            className="bg-[#197C48] p-10 md:p-12 w-full h-[calc(100vh-100px)] flex flex-col justify-center shadow-xl shadow-[#197C48]/10"
          >
            <div className="flex flex-col gap-8 items-start">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`text-left text-lg font-black uppercase tracking-widest transition-colors duration-300 ${
                    filter === f ? "text-white" : "text-white/40 hover:text-white/70"
                  } flex items-center gap-4`}
                >
                  {filter === f && (
                    <motion.div
                      layoutId="activeDot"
                      className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]"
                    />
                  )}
                  {f}
                </button>
              ))}
            </div>
            
            <div className="mt-20 border-t border-white/10 pt-10">
              <p className="text-white/20 font-black uppercase text-[10px] tracking-[1em]">
                Portfolio Archive
              </p>
            </div>
          </div>
        </aside>

        {/* Project Grid Area */}
        <main ref={mainContentRef} className="flex-1">
          <motion.div 
            layout
            className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-16 lg:gap-x-14 lg:gap-y-24"
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
                  <div className="aspect-[16/11] overflow-hidden bg-neutral-100 rounded-2xl shadow-sm border border-neutral-100">
                    <motion.img
                      src={p.img}
                      alt={p.title}
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full object-cover transition-all duration-500"
                    />
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
      </div>

      <BigFooter setPage={setPage} />
    </motion.div>
  );
};
