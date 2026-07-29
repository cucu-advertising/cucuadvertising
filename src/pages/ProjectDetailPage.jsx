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



  const isAdvanced = project.goalObj !== undefined;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen text-black font-sans"
    >
      {isAdvanced ? (
        <div className="advanced-case-study pt-32 pb-20 overflow-hidden">
          {/* Header Bar */}
          <div className="px-6 md:px-12 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-neutral-100 pb-6 gap-4">
            <div>
              <span className="text-xs font-mono tracking-[0.3em] text-neutral-400 uppercase block mb-1">Agency</span>
              <p className="text-sm font-bold tracking-widest uppercase text-black">CUCU Advertising</p>
            </div>
            <div className="text-left md:text-right">
              <span className="text-xs font-mono tracking-[0.3em] text-neutral-400 uppercase block mb-1">Project</span>
              <p className="text-sm font-bold tracking-widest uppercase text-[#197C48]">{project.title}</p>
            </div>
          </div>

          {/* Title & Subtitle */}
          <div className="px-6 md:px-12 mb-16">
            <h1 className="text-[11vw] lg:text-[9vw] font-[900] uppercase text-black leading-[0.8] tracking-tighter mb-6">
              {project.title}
            </h1>
            <p className="text-lg md:text-2xl font-medium tracking-tight text-neutral-600 max-w-4xl border-l-2 border-[#197C48] pl-6 py-1">
              {project.subtitle}
            </p>
          </div>

          {/* Hero Media Showcase */}
          <div className="px-6 md:px-12 mb-24">
            <div className="aspect-[16/9] w-full overflow-hidden rounded-[2.5rem] md:rounded-[4rem] shadow-2xl relative bg-neutral-100">
              {project.img.toLowerCase().endsWith('.mp4') ? (
                <video src={project.img} autoPlay loop muted playsInline className="w-full h-full object-cover" />
              ) : (
                <img src={project.img} alt={project.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </div>

          {/* PAGE 1: The Goal & Pillars */}
          <section className="px-6 md:px-12 mb-32">
            <div className="bg-[#f8f8f8] rounded-[3rem] p-10 md:p-20 border border-neutral-100 shadow-sm">
              <span className="text-[#197C48] text-xs font-black uppercase tracking-[0.4em] mb-6 block">
                The Goal
              </span>
              <h3 className="text-3xl md:text-5xl font-black text-black tracking-tight leading-tight max-w-5xl mb-16">
                {project.goalObj.text}
              </h3>

              <div className="grid md:grid-cols-3 gap-10 border-t border-neutral-200 pt-16 mb-16">
                {project.goalObj.pillars.map((pillar, idx) => (
                  <div key={idx} className="group flex flex-col justify-between bg-white p-8 rounded-2xl border border-neutral-100 hover:border-[#197C48] hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#197C48] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                    <div>
                      <span className="text-4xl font-mono font-bold text-[#197C48] block mb-6">
                        {pillar.num}
                      </span>
                      <h4 className="text-xl font-black uppercase tracking-tight text-black mb-4 group-hover:text-[#197C48] transition-colors">
                        {pillar.title}
                      </h4>
                      <p className="text-base text-neutral-600 leading-relaxed font-light">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center bg-[#8CF2C6]/30 p-6 rounded-xl border border-[#8CF2C6]">
                <p className="text-sm md:text-base font-bold uppercase tracking-wider text-[#197C48]">
                  {project.goalObj.footer}
                </p>
              </div>
            </div>
          </section>

          {/* PAGE 2: The Challenges We Solved */}
          <section className="px-6 md:px-12 mb-32">
            <div className="border-t border-b border-neutral-200 py-16 md:py-24">
              <span className="text-[#197C48] text-xs font-black uppercase tracking-[0.4em] mb-4 block">
                Problem Space
              </span>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-black mb-16">
                The Challenges <br />
                <span className="text-[#197C48]">We Solved.</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                {project.detailedChallenges.map((ch, idx) => (
                  <div key={idx} className="bg-neutral-50 hover:bg-[#8CF2C6] p-8 rounded-3xl transition-colors duration-300 group flex flex-col justify-between border border-neutral-100">
                    <div>
                      <span className="text-3xl font-mono font-bold text-[#197C48] group-hover:text-black block mb-8 transition-colors">
                        {ch.num}
                      </span>
                      <h4 className="text-lg font-bold uppercase text-black tracking-tight mb-4 border-b border-neutral-200 pb-3 group-hover:border-black/20">
                        {ch.label}
                      </h4>
                      <p className="text-sm text-neutral-600 group-hover:text-neutral-900 leading-relaxed font-light">
                        {ch.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* STRATEGIC DEEP DIVES */}
          
          {/* Deep Dive 01: Founder Storytelling */}
          {project.strategicDeepDives && project.strategicDeepDives[0] && (
            <section className="px-6 md:px-12 mb-32">
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-6">
                  <span className="text-xs font-mono font-bold text-[#197C48] uppercase tracking-[0.3em] block mb-4">
                    Strategy 01
                  </span>
                  <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6 text-black">
                    {project.strategicDeepDives[0].title}
                  </h3>
                  <p className="text-xl text-neutral-600 font-light leading-relaxed mb-10 max-w-xl">
                    {project.strategicDeepDives[0].subtitle}
                  </p>

                  <div className="bg-[#f8f8f8] p-8 rounded-3xl border border-neutral-100 mb-8">
                    <p className="text-xs font-bold uppercase text-[#197C48] tracking-widest mb-6 block">
                      {project.strategicDeepDives[0].listLabel}
                    </p>
                    <ul className="space-y-4">
                      {project.strategicDeepDives[0].items.map((it, i) => (
                        <li key={i} className="flex items-start gap-4 text-base md:text-lg font-medium text-black">
                          <span className="w-2 h-2 rounded-full bg-[#197C48] mt-2 shrink-0" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <div className="aspect-[4/3] rounded-[3rem] overflow-hidden relative shadow-2xl group cursor-pointer bg-neutral-900">
                    <img 
                      src={project.gallery && project.gallery[0] ? project.gallery[0] : project.img} 
                      alt="Founder Storytelling" 
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-all duration-700" 
                    />
                    <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-16 h-16 rounded-full bg-[#8CF2C6] text-black flex items-center justify-center font-bold mb-4 shadow-lg group-hover:scale-110 transition-transform">
                        ▶
                      </div>
                      <span className="text-white font-bold uppercase tracking-widest text-xs bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                        {project.strategicDeepDives[0].mediaNote}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Deep Dive 02: Premium Media Showcase */}
          {project.strategicDeepDives && project.strategicDeepDives[1] && (
            <section className="mb-32 bg-neutral-900 text-white py-24 overflow-hidden rounded-[3rem] mx-4 md:mx-8">
              <div className="px-6 md:px-12 mb-16 max-w-4xl">
                <span className="text-xs font-mono font-bold text-[#8CF2C6] uppercase tracking-[0.3em] block mb-4">
                  Strategy 02
                </span>
                <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6 text-white">
                  {project.strategicDeepDives[1].title}
                </h3>
                <p className="text-lg md:text-xl text-neutral-400 font-light leading-relaxed">
                  {project.strategicDeepDives[1].subtitle}
                </p>
              </div>

              <div className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {project.gallery && project.gallery.slice(1, 4).map((gImg, gIdx) => (
                  <div key={gIdx} className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative group bg-neutral-800">
                    <img 
                      src={gImg} 
                      alt="Premium Visual" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                      <span className="text-xs font-mono text-[#8CF2C6] uppercase tracking-widest">Premium Output 0{gIdx + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Deep Dive 03: SEO Positioning */}
          {project.strategicDeepDives && project.strategicDeepDives[2] && (
            <section className="px-6 md:px-12 mb-32">
              <div className="bg-[#197C48] text-white rounded-[3rem] p-10 md:p-20 relative overflow-hidden shadow-2xl">
                <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
                <div className="grid lg:grid-cols-12 gap-12 items-start">
                  <div className="lg:col-span-6">
                    <span className="text-xs font-mono font-bold text-[#8CF2C6] uppercase tracking-[0.3em] block mb-4">
                      Strategy 03
                    </span>
                    <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6 text-white">
                      SEO: Eco-Luxury <br /> Positioning
                    </h3>
                    <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed mb-8 max-w-lg">
                      {project.strategicDeepDives[2].subtitle}
                    </p>
                    <div className="inline-block bg-white text-black px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg">
                      Target: Eco Luxury Resort in Hyderabad
                    </div>
                  </div>

                  <div className="lg:col-span-6 bg-black/20 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-white/10">
                    <p className="text-xs font-bold uppercase text-[#8CF2C6] tracking-widest mb-8 block">
                      {project.strategicDeepDives[2].listLabel}
                    </p>
                    <div className="space-y-6">
                      {project.strategicDeepDives[2].items.map((action, aIdx) => (
                        <div key={aIdx} className="flex items-center gap-6 border-b border-white/10 pb-4 last:border-0 last:pb-0">
                          <span className="text-sm font-mono font-bold text-[#8CF2C6]">0{aIdx + 1}</span>
                          <span className="text-base md:text-lg font-bold tracking-tight">{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Deep Dive 04: Reddit Marketing */}
          {project.strategicDeepDives && project.strategicDeepDives[3] && (
            <section className="px-6 md:px-12 mb-32">
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5">
                  <span className="text-xs font-mono font-bold text-[#197C48] uppercase tracking-[0.3em] block mb-4">
                    Strategy 04
                  </span>
                  <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6 text-black">
                    {project.strategicDeepDives[3].title}
                  </h3>
                  <p className="text-base md:text-lg text-neutral-600 font-light leading-relaxed">
                    {project.strategicDeepDives[3].subtitle}
                  </p>
                </div>

                <div className="lg:col-span-7">
                  <div className="grid sm:grid-cols-2 gap-6">
                    {project.strategicDeepDives[3].items.map((rItem, rIdx) => (
                      <div key={rIdx} className="bg-white p-8 rounded-2xl border border-neutral-200 hover:border-[#197C48] transition-colors shadow-sm flex flex-col justify-between">
                        <div className="w-8 h-8 rounded-full bg-[#8CF2C6]/50 flex items-center justify-center text-xs font-mono font-bold text-[#197C48] mb-6">
                          ✓
                        </div>
                        <p className="text-base font-bold text-black leading-snug tracking-tight">
                          {rItem}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Deep Dive 05: Influencer Marketing */}
          {project.strategicDeepDives && project.strategicDeepDives[4] && (
            <section className="px-6 md:px-12 mb-32">
              <div className="bg-[#f8f8f8] rounded-[3rem] p-10 md:p-20 border border-neutral-100">
                <div className="grid lg:grid-cols-12 gap-12 items-start mb-16">
                  <div className="lg:col-span-6">
                    <span className="text-xs font-mono font-bold text-[#197C48] uppercase tracking-[0.3em] block mb-4">
                      Strategy 05
                    </span>
                    <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6 text-black">
                      {project.strategicDeepDives[4].title}
                    </h3>
                    <p className="text-lg md:text-xl text-neutral-600 font-light leading-relaxed mb-8">
                      {project.strategicDeepDives[4].subtitle}
                    </p>
                    <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm inline-block">
                      <p className="text-sm font-bold uppercase tracking-widest text-[#197C48] block mb-1">Impact Callout</p>
                      <p className="text-xl md:text-2xl font-black text-black tracking-tight">{project.strategicDeepDives[4].footerNote}</p>
                    </div>
                  </div>

                  <div className="lg:col-span-6 bg-white p-8 rounded-3xl border border-neutral-200">
                    <p className="text-xs font-bold uppercase text-[#197C48] tracking-widest mb-6 block">
                      {project.strategicDeepDives[4].listLabel}
                    </p>
                    <div className="space-y-4 mb-8">
                      {project.strategicDeepDives[4].items.map((infItem, infIdx) => (
                        <div key={infIdx} className="flex items-center gap-4 bg-neutral-50 p-4 rounded-xl">
                          <span className="text-xs font-mono bg-[#8CF2C6] text-black px-2 py-1 rounded font-bold">0{infIdx + 1}</span>
                          <span className="text-sm md:text-base font-bold text-black">{infItem}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <span className="inline-flex items-center gap-2 bg-neutral-900 text-white text-xs font-bold tracking-widest uppercase px-5 py-3 rounded-full cursor-pointer hover:bg-[#197C48] transition-colors">
                        ▶ {project.strategicDeepDives[4].mediaNote} 1
                      </span>
                      <span className="inline-flex items-center gap-2 bg-neutral-900 text-white text-xs font-bold tracking-widest uppercase px-5 py-3 rounded-full cursor-pointer hover:bg-[#197C48] transition-colors">
                        ▶ {project.strategicDeepDives[4].mediaNote} 2
                      </span>
                    </div>
                  </div>
                </div>

                {/* Influencer Images Collage */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {project.gallery && project.gallery.slice(0, 4).map((cImg, cIdx) => (
                    <div key={cIdx} className="aspect-square rounded-2xl overflow-hidden bg-neutral-200 shadow">
                      <img src={cImg} alt="Influencer output" className="w-full h-full object-cover hover:scale-105 transition-transform" />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* CHANNELS ACTIVATED MATRIX */}
          {project.channelsActivated && (
            <section className="px-6 md:px-12 mb-32">
              <div className="border-t border-b border-neutral-200 py-16 md:py-24">
                <div className="max-w-3xl mb-16">
                  <span className="text-xs font-mono font-bold text-[#197C48] uppercase tracking-[0.3em] block mb-4">
                    Overview Matrix
                  </span>
                  <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-black mb-4">
                    Channels Activated.
                  </h2>
                  <p className="text-xl text-neutral-600 font-light tracking-tight">
                    {project.channelsActivated.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
                  {project.channelsActivated.channels.map((chan, cIdx) => (
                    <div key={cIdx} className="bg-white p-6 rounded-2xl border-t-4 border-[#197C48] shadow-sm hover:shadow-md transition-shadow">
                      <h4 className="text-base font-black uppercase text-black mb-3">
                        {chan.title}
                      </h4>
                      <p className="text-xs text-neutral-500 leading-relaxed">
                        {chan.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="bg-neutral-900 text-white p-8 md:p-12 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#8CF2C6] uppercase tracking-widest block mb-1">Synergy</span>
                    <h4 className="text-2xl font-black uppercase tracking-tight">Layered Exposure</h4>
                  </div>
                  <p className="text-base md:text-lg text-[#8CF2C6] font-bold max-w-2xl text-left md:text-right leading-snug">
                    "{project.channelsActivated.layeredExposure}"
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* THE RESULTS */}
          {project.results && (
            <section className="bg-[#197C48] py-24 md:py-32 mb-20 rounded-[3rem] mx-4 md:mx-8 shadow-2xl text-white">
              <div className="px-6 md:px-12">
                <h3 className="text-[#8CF2C6] text-xs font-black uppercase tracking-[0.4em] mb-12 block">
                  Final Deliverable Output
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
                      className="border-l-2 border-[#8CF2C6]/30 pl-8"
                    >
                      <span className="text-6xl md:text-7xl font-black text-white block mb-4 tracking-tighter">
                        {result.val}
                      </span>
                      <p className="text-base md:text-lg text-[#8CF2C6] font-bold uppercase tracking-wider leading-tight">
                        {result.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

        </div>
      ) : (
        <>
          {/* Premium Light Hero */}
          <section className="bg-white pt-35 pb-24 text-black overflow-hidden border-b border-neutral-100">
            <div className="px-6 md:px-12 grid lg:grid-cols-12 gap-10 md:gap-16 items-center">
              <div className="lg:col-span-7">
                <h1 className="text-[10vw] lg:text-[8vw] font-[900] uppercase text-black leading-[0.75] tracking-tighter mb-0 w-full">
                  {project.title}
                </h1>
              </div>

              <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-[4/3] w-full rounded-[2.5rem] overflow-hidden shadow-2xl bg-neutral-100">
                {project.img.toLowerCase().endsWith('.mp4') ? (
                  <video src={project.img} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <img src={project.img} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
                )}
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
                {project.img.toLowerCase().endsWith('.mp4') ? (
                  <video src={project.img} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                ) : (
                  <motion.img 
                    initial={{ scale: 1.1, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src={project.img} 
                    alt="Project Showcase" 
                    className="w-full h-full object-cover"
                  />
                )}
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
                
                <div className="lg:col-span-1" />

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

                  <div className="relative min-h-[400px] lg:min-h-full overflow-hidden">
                    {(project.gallery && project.gallery[1] ? project.gallery[1] : project.img).toLowerCase().endsWith('.mp4') ? (
                      <video src={project.gallery && project.gallery[1] ? project.gallery[1] : project.img} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <img src={project.gallery && project.gallery[1] ? project.gallery[1] : project.img} alt="Strategic Solution" className="absolute inset-0 w-full h-full object-cover" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Results Section */}
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

            {/* 4. Identity Section */}
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
                  {(project.gallery && project.gallery[2] ? project.gallery[2] : project.img).toLowerCase().endsWith('.mp4') ? (
                    <video src={project.gallery && project.gallery[2] ? project.gallery[2] : project.img} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                  ) : (
                    <img src={project.gallery && project.gallery[2] ? project.gallery[2] : project.img} alt="Brand Asset" className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl md:mt-12">
                  {(project.gallery && project.gallery[3] ? project.gallery[3] : project.img).toLowerCase().endsWith('.mp4') ? (
                    <video src={project.gallery && project.gallery[3] ? project.gallery[3] : project.img} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                  ) : (
                    <img src={project.gallery && project.gallery[3] ? project.gallery[3] : project.img} alt="Typography" className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl lg:mt-24">
                  {(project.gallery && project.gallery[4] ? project.gallery[4] : project.img).toLowerCase().endsWith('.mp4') ? (
                    <video src={project.gallery && project.gallery[4] ? project.gallery[4] : project.img} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                  ) : (
                    <img src={project.gallery && project.gallery[4] ? project.gallery[4] : project.img} alt="Color Palette" className="w-full h-full object-cover" />
                  )}
                </div>
              </div>
            </div>
          </section>
        </>
      )}

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
                {p.img.toLowerCase().endsWith('.mp4') ? (
                  <video
                    src={p.img}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                  />
                ) : (
                  <img 
                    src={p.img} 
                    alt={p.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                  />
                )}
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
