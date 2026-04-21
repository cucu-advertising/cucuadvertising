import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { BigFooter } from "../components/Footer";


import { allProjects } from "../constants/projects";

export const ProjectDetailPage = ({ project, onBack, setPage, setSelectedProject }) => {
  // Find next projects from the registry
  const currentIndex = allProjects.findIndex(p => p.title === project.title);
  const nextProjects = [
    allProjects[(currentIndex + 1) % allProjects.length],
    allProjects[(currentIndex + 2) % allProjects.length]
  ];

  const handleNextProjectClick = (nextProject) => {
    setSelectedProject(nextProject);
    window.scrollTo(0, 0);
  };



  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen text-black"
    >
      {/* Premium Light Hero */}
      <section className="bg-white pt-35 pb-24 text-black overflow-hidden border-b border-neutral-100">
        {/* <div className="px-6 md:px-12 mb-20">
          <button
            onClick={onBack}
            className="flex items-center gap-4 text-[#197C48] font-bold uppercase tracking-widest hover:pl-4 transition-all"
          >
            <ChevronLeft size={24} /> Back to projects
          </button>
        </div> */}


        <div className="px-6 md:px-12 grid lg:grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="lg:col-span-7">
            {/* <span className="text-[#197C48] font-mono text-sm uppercase tracking-[0.4em] mb-8 block">
              {project.category}
            </span> */}
            <h1 className="text-[10vw] lg:text-[8vw] font-[900] uppercase text-black leading-[0.75] tracking-tighter mb-0 w-full">
              {project.title}
            </h1>
          </div>

          
          <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-[4/3] w-full rounded-[2.5rem] overflow-hidden shadow-2xl bg-neutral-100">
            <img
              src={project.img}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

        </div>


        {/* 1. Project Info Grid (Refined Light Mode) */}
        <div className="px-6 md:px-12 mt-15">
          <div className="bg-[#f8f8f8] rounded-[3rem] p-12 md:p-20 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 border border-neutral-100">
            <div className="md:col-span-6 group">
              <h4 className="text-[13px] font-black uppercase tracking-[0.4em] text-[#197C48] px-3 py-1 rounded-sm inline-block mb-12 transition-all duration-300 group-hover:bg-[#8CF2C6] group-hover:text-black">
                About
              </h4>
              <p className="text-2xl md:text-3xl text-neutral-600 font-light leading-relaxed transition-colors duration-300 group-hover:text-[#197C48]">
                {project.about || `A comprehensive transformation of ${project.title} into a market leader through strategic branding and digital innovation.`}
              </p>
            </div>

            
            <div className="md:col-span-3 group">
              <h4 className="text-[13px] font-black uppercase tracking-[0.4em] text-[#197C48] px-3 py-1 rounded-sm inline-block mb-12 transition-all duration-300 group-hover:bg-[#8CF2C6] group-hover:text-black">
                Scope
              </h4>
              <ul className="text-2xl font-bold uppercase space-y-5 text-black transition-colors duration-300 group-hover:text-[#197C48]">
                {project.scope ? project.scope.map((s, i) => <li key={i}>{s}</li>) : (
                  <>
                    <li>Brand Strategy</li>
                    <li>Visual Identity</li>
                    <li>Digital Experience</li>
                  </>
                )}
              </ul>
            </div>

            <div className="md:col-span-3 group">
              <h4 className="text-[13px] font-black uppercase tracking-[0.4em] text-[#197C48] px-3 py-1 rounded-sm inline-block mb-12 transition-all duration-300 group-hover:bg-[#8CF2C6] group-hover:text-black">
                Industry
              </h4>
              <p className="text-2xl font-bold uppercase text-black transition-colors duration-300 group-hover:text-[#197C48]">
                {project.industry || project.category || "Technology"}
              </p>
            </div>
          </div>
        </div>

        {/* 1.5 High-Impact Visual (Padded & Scaled) */}
        <div className="px-6 md:px-12 mt-10">
          <div className="aspect-[16/9] w-full overflow-hidden relative rounded-[3rem] shadow-2xl">
            <motion.img 
              initial={{ scale: 1.1, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src={project.img} 
              alt="Project Showcase" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/5" />
          </div>
        </div>
      </section>




      {/* 2. Project Narrative Sections */}
      <section className="mb-20">
        {/* Challenges Section - Premium Light Style */}
        <div className="bg-white py-12 md:py-16 text-black border-t border-neutral-100">
          <div className="px-6 md:px-12 grid lg:grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="lg:col-span-4">
              <span className="text-[#197C48] text-[10px] font-black uppercase tracking-[0.4em] mb-10 block">
                Challenges
              </span>
              <h3 className="text-4xl md:text-5xl font-black uppercase leading-[0.9] tracking-tighter mb-8">
                The <br /> <span className="text-[#197C48]">Challenges.</span>
              </h3>
            </div>
            
            <div className="lg:col-span-1" /> {/* Spacer */}

            <div className="lg:col-span-7">
              <div className="space-y-0">

                {(project.challenges ? project.challenges.split('.').filter(s => s.trim().length > 5) : [
                  "The project required a complete visual overhaul to stand out in a saturated market.",
                  "Creating a design language that resonates with both tech-savvy users and medical professionals.",
                  "Ensuring a seamless user experience across all digital touchpoints while maintaining brand integrity.",
                  "Developing a modular and scalable visual identity system for future expansion."
                ]).map((challenge, idx) => (
                  <div key={idx} className="bg-[#8CF2C6] hover:bg-white py-8 grid grid-cols-12 gap-6 transition-all duration-300 px-8 -mx-8 group border-b border-[#197C48]">
                    <span className="col-span-2 text-lg font-mono text-[#197C48] font-bold">
                      0{idx + 1}
                    </span>
                    <p className="col-span-10 text-lg md:text-xl text-black font-medium leading-relaxed">
                      {challenge.trim()}
                    </p>
                  </div>
                ))}

                <div className="border-t border-neutral-100 w-full" />
              </div>
            </div>

          </div>
        </div>



        {/* Solution Section - Card Style on White BG */}
        <div className="bg-white pb-12 md:pb-16 px-4 md:px-8">
          <div className="max-w-[1400px] mx-auto bg-neutral-900 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl">
            <div className="grid lg:grid-cols-2 items-stretch">
              {/* Text Content */}
              <div className="p-10 md:p-20 flex flex-col justify-center">
                <span className="text-[#8CF2C6] text-[10px] font-black uppercase tracking-[0.4em] mb-10 block">
                  Solution
                </span>
                <h3 className="text-4xl md:text-5xl font-black uppercase leading-[0.9] tracking-tighter text-white mb-10">
                  Strategic Innovation <br /> <span className="text-[#8CF2C6]">Realized.</span>
                </h3>
                <p className="text-lg md:text-xl text-neutral-400 font-light leading-relaxed max-w-xl">
                  {project.solution || "Our solution involved a complete overhaul of the brand's visual and verbal identity, creating a cohesive and future-proof design system."}
                </p>
              </div>

              {/* Image Content */}
              <div className="relative min-h-[400px] lg:min-h-full overflow-hidden">
                <img 
                  src={project.gallery && project.gallery[1] ? project.gallery[1] : project.img} 
                  alt="Strategic Solution" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>





        {/* 3. Results Section (New dynamic injection) */}
        {project.results && (
          <div className="bg-[#197C48] py-24 md:py-32 my-20">
            <div className="px-6 md:px-12">
              <h3 className="text-[#8CF2C6] text-[10px] font-black uppercase tracking-[0.4em] mb-12 block">
                The Results
              </h3>
              <h2 className="text-6xl md:text-8xl lg:text-[10vw] font-black uppercase text-white leading-none tracking-tighter mb-20">
                Impact <br /> & Growth.
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24">
                {project.results.map((result, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="border-l border-white/20 pl-8"
                  >
                    <span className="text-6xl md:text-7xl font-black text-white block mb-4">
                      {result.val}
                    </span>
                    <p className="text-lg md:text-xl text-[#8CF2C6] font-bold uppercase tracking-tight leading-tight">
                      {result.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. Identity Section (Refined & Compact) */}
        <div className="px-6 md:px-12 py-12 md:py-16 border-t border-neutral-100 font-light">
          <div className="grid lg:grid-cols-12 gap-10 md:gap-16 items-start mb-20">
            <div className="lg:col-span-4">
              <span className="text-[#197C48] text-[10px] font-black uppercase tracking-[0.4em] mb-10 block">
                Identity
              </span>
              <h3 className="text-4xl md:text-5xl font-black uppercase leading-[0.9] tracking-tighter mb-8">
                Visual <br /> Storytelling.
              </h3>
            </div>
            <div className="lg:col-span-1" />
            <div className="lg:col-span-7 pt-2">
              <p className="text-lg md:text-xl text-neutral-600 font-light leading-relaxed max-w-2xl">
                {project.identity || "Every brand has a story. We developed a visual language that brings that story to life across every medium."}
              </p>
            </div>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img src={project.gallery && project.gallery[2] ? project.gallery[2] : project.img} alt="Brand Asset" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl md:mt-12">
              <img src={project.gallery && project.gallery[3] ? project.gallery[3] : project.img} alt="Typography" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl lg:mt-24">
              <img src={project.gallery && project.gallery[4] ? project.gallery[4] : project.img} alt="Color Palette" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>


      </section>

      {/* More Projects Navigation */}
      <section className="py-5 px-6 md:px-12 bg-white border-t border-neutral-100">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-5xl font-black uppercase tracking-tighter">Next Projects</h2>
          <a href="#" className="hidden md:block text-sm font-black uppercase tracking-widest border-b-2 border-black pb-2">View Portfolio</a>
        </div>
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {nextProjects.map((p, idx) => (
            <div 
              key={p.title} 
              onClick={() => handleNextProjectClick(p)}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/10] overflow-hidden rounded-[2.5rem] bg-neutral-100 mb-8 relative">
                <img 
                  src={p.img} 
                  alt={p.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-3xl font-black uppercase mb-1">{p.title}</h4>
                  <p className="text-sm font-bold uppercase text-neutral-400 tracking-widest">{p.category}</p>
                </div>
                <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                  <ChevronLeft size={24} className="rotate-180" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <BigFooter setPage={setPage} />
    </motion.div>
  );
};
