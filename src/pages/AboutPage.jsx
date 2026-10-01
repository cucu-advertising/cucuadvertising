import React from "react";
import { motion } from "framer-motion";
import { BigFooter } from "../components/Footer";
import aboutHeroImg from "../assets/NEW/about us big.webp";
import arvindProfile1 from "../assets/arvind/Profile.webp";
import arvindProfile2 from "../assets/arvind/Profile2.webp";
import { TRANSITION } from "../constants/config";
import { Sparkles, Zap } from "lucide-react";
import { NameStory } from "../components/about/NameStory";
import { AboutStats, AboutPlayground } from "../components/about/AboutExtras";
import { Clients } from "../components/sections/Clients";

const FadeInView = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ ...TRANSITION, delay }}
  >
    {children}
  </motion.div>
);

const SHOW_FOUNDER = false;

export const AboutPage = ({ setPage }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white text-slate-900 selection:bg-[#197C48] selection:text-white"
    >
      {/* Hero Section */}
      <section className="pt-28 md:pt-32 pb-10 md:pb-14 px-6 md:px-12 bg-white relative overflow-hidden">
        <div className="max-w-[1800px] mx-auto">
          {/* Label row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between border-b border-black/10 pb-4 text-xs md:text-sm font-bold uppercase tracking-[0.25em]"
          >
            <span className="text-[#197C48]">Our Story</span>
            <span className="text-black/40">Hyderabad · Mumbai</span>
          </motion.div>

          <div className="mt-10 md:mt-14 grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            {/* Headline */}
            <h1 className="min-w-0 lg:col-span-7 text-[12.5vw] md:text-[11vw] lg:text-[8.2vw] font-black uppercase leading-[0.82] tracking-tighter text-[#050505]">
              {["We're", "Cucu"].map((word, i) => (
                <span key={word} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: "105%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
              <span className="block overflow-hidden pb-[0.14em]">
                <motion.span
                  className="relative inline-block text-[#197C48]"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                >
                  Advertising.
                  {/* Mint underline swoosh */}
                  <motion.span
                    aria-hidden
                    className="absolute left-[2%] right-0 -bottom-[0.08em] h-[0.12em] rounded-full bg-[#8CF2C6] -z-10 origin-left"
                    style={{ rotate: "-1deg" }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  />
                </motion.span>
              </span>
            </h1>

            {/* Illustration */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="min-w-0 lg:col-span-5 group relative aspect-[4/3] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-[#f4f6f3] ring-1 ring-black/5"
            >
              <img
                src={aboutHeroImg}
                alt="Cucu Advertising"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </motion.div>
          </div>

          {/* Bottom row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 md:mt-14 pt-8 border-t border-black/10 grid md:grid-cols-12 gap-8 items-end"
          >
            <p className="md:col-span-4 text-xl md:text-2xl font-black uppercase tracking-tight leading-tight text-[#050505]">
              <span className="text-[#197C48]">C</span>lient to <span className="text-[#197C48]">U</span>ser, with{" "}
              <span className="text-[#197C48]">C</span>reative <span className="text-[#197C48]">U</span>nderstanding.
            </p>
            <p className="md:col-span-5 text-base md:text-lg leading-relaxed text-black/60">
              A Hyderabad-born creative and growth studio. Strategy, branding, content,
              films and performance, brought together so ambitious brands feel sharper,
              clearer and impossible to ignore.
            </p>
            <div className="md:col-span-3 flex flex-wrap md:justify-end gap-3">
              <button
                onClick={() => setPage("work")}
                className="px-6 py-3 rounded-full bg-[#050505] text-white text-sm font-semibold hover:bg-[#197C48] transition-colors"
              >
                See our work ↗
              </button>
              <button
                onClick={() => setPage("contact")}
                className="px-6 py-3 rounded-full border border-[#050505] text-[#050505] text-sm font-semibold hover:bg-[#8CF2C6] hover:border-[#8CF2C6] transition-colors"
              >
                Start a project ↗
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <AboutStats />

      <NameStory />

      <AboutPlayground />

      <Clients />

      {/* Founder Section — hidden for now. Change SHOW_FOUNDER to true to bring it back. */}
      {SHOW_FOUNDER && (
      <section className="py-12 md:py-16 px-6 md:px-12 bg-white text-black">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-12 lg:col-span-7">
              <FadeInView>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-[2px] bg-[#197C48]" />
                  <span className="text-[#197C48] text-sm font-black uppercase tracking-widest">
                    The Brain Behind
                  </span>
                </div>
                <h2 className="text-6xl md:text-[90px] font-black uppercase mb-12 leading-[0.85] tracking-tighter">
                  Arvind Arandkar
                </h2>
                <div className="space-y-8 text-xl md:text-2xl opacity-70 leading-relaxed max-w-2xl">
                  <p>
                    Now, all of this was from the head of Arvind Arandkar, the
                    founder. Talking to Arvind feels less like a pitch meeting
                    and more like grabbing coffee with someone who genuinely
                    gets it.
                  </p>
                  <p>
                    He listens. He connects dots you didn't even know existed
                    and he's always up for a good conversation about pretty much
                    anything creative.
                  </p>
                </div>
                <blockquote className="mt-12 border-l-4 border-[#197C48] pl-6 md:pl-8 text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[0.95] text-black max-w-2xl">
                  "That's the energy behind CUCU.{" "}
                  <span className="text-[#197C48]">That's who you're working with."</span>
                </blockquote>
                <div>
                </div>
              </FadeInView>
            </div>
            
            <div className="md:col-span-12 lg:col-span-5 relative mt-12 lg:mt-0">
              <FadeInView delay={0.3}>
                <div className="relative group">
                  {/* Decorative Elements */}
                  <div className="absolute -inset-4 bg-[#197C48]/5 rounded-[4.5rem] blur-2xl group-hover:bg-[#197C48]/10 transition-colors duration-700" />
                  
                  <div className="relative aspect-[4/5] bg-slate-50 rounded-[4rem] overflow-hidden shadow-2xl border border-slate-100">
                    <img
                      src={arvindProfile1}
                      alt="Arvind Arandkar"
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:opacity-0"
                    />
                    {/* Second portrait fades in on hover */}
                    <img
                      src={arvindProfile2}
                      alt=""
                      aria-hidden
                      className="absolute inset-0 w-full h-full object-cover opacity-0 scale-105 transition-all duration-1000 group-hover:opacity-100 group-hover:scale-100"
                    />
                    
                    {/* Floating Info Card */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="absolute bottom-8 left-8 right-8 p-6 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-white/20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-[10px] font-black text-[#197C48] uppercase tracking-[0.2em] mb-1">The Founder</p>
                          <h4 className="text-xl font-black uppercase text-slate-900 leading-none">Arvind Arandkar</h4>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#197C48] flex items-center justify-center shadow-lg shadow-[#197C48]/20">
                          <Zap className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-white rounded-3xl shadow-lg border border-slate-50 flex items-center justify-center p-4 rotate-12 group-hover:rotate-0 transition-transform duration-500 z-20">
                    <Sparkles className="w-8 h-8 text-[#197C48]" />
                  </div>
                </div>
              </FadeInView>
            </div>
          </div>
        </div>
      </section>
      )}


      <BigFooter setPage={setPage} />
    </motion.div>
  );
};
