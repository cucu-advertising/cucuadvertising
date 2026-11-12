import React from "react";
import { motion } from "framer-motion";
import { SiteFooter } from "../components/SiteFooter";
import { CaseStudy, NextProject } from "./CaseStudy";
import { optimizedSrc } from "../utils/optimizedImage";

export const ProjectDetailPage = ({ project: rawProject }) => {
  // Same project, but pointing at right-sized image copies: 2000px for the
  // full-width hero, 1200px for gallery tiles. Videos/remote URLs unchanged.
  const project = {
    ...rawProject,
    img: optimizedSrc(rawProject.img, 2000),
    gallery: rawProject.gallery?.map((g) => optimizedSrc(g, 1200)),
  };
  const isAdvanced = project.goalObj !== undefined;

  // Every project uses the shared case-study layout. The one long-form
  // strategy study (it has `goalObj`) keeps its own structure below.
  if (!isAdvanced) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <CaseStudy project={rawProject} />
      </motion.div>
    );
  }

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
      ) : null}

      <div className="cucu-site pg cs cs-legacy-next">
        <NextProject project={rawProject} />
      </div>
      <SiteFooter />
    </motion.div>
  );
};
