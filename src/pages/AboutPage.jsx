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

export const AboutPage = ({ setPage }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white text-slate-900 selection:bg-[#197C48] selection:text-white"
    >
      {/* Hero Section */}
      <section className="pt-28 md:pt-28 pb-12 px-6 md:px-12 bg-white relative overflow-hidden">
        {/* Background Motif */}
        <div className="absolute top-32 left-10 md:left-20 pointer-events-none select-none">
          <span className="text-[20vw] font-black text-[#197C48]/[0.06] leading-none uppercase">
            ABOUT
          </span>
        </div>

        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
          <div>
            <div className="overflow-hidden mb-4">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="block text-[#197C48] font-bold tracking-[0.3em] uppercase text-xs md:text-sm"
              >
                Our Story
              </motion.span>
            </div>

            <h1 className="text-[12vw] md:text-[6.5vw] lg:text-[80px] xl:text-[96px] font-black uppercase leading-[0.8] tracking-tighter text-[#197C48] mb-12">
              {["We're", "Cucu", "Advertising."].map((word, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                      delay: i * 0.1,
                    }}
                    className="block"
                  >
                    {word}
                  </motion.span>
                </div>
              ))}
            </h1>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex items-center gap-6 group"
            >
              <div className="h-[2px] w-12 bg-[#197C48]/30 group-hover:w-20 transition-all duration-500" />
              <p className="text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-tight text-[#000000]/60 max-w-md">
                Aka: Client to User with Creative Understanding
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="hidden md:block relative h-full flex items-center"
          >
            {/* Animated Glow/Shadow */}
            <div className="absolute -inset-20 bg-[#197C48]/5 blur-[120px] rounded-full -z-10 animate-pulse" />

            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10 w-full p-2 bg-white rounded-[4rem] shadow-[0_60px_120px_-30px_rgba(25,124,72,0.15)] ring-1 ring-[#197C48]/5"
            >
              <img
                src={aboutHeroImg}
                alt="Cucu Advertising About Us"
                className="w-full h-auto rounded-[3.5rem] grayscale-[5%] hover:grayscale-0 transition-all duration-700 shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <AboutStats />

      <NameStory />

      <AboutPlayground />

      <Clients />

      {/* Founder Section */}
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


      <BigFooter setPage={setPage} />
    </motion.div>
  );
};
