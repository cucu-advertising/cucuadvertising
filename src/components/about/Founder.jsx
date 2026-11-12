import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";
import arvindProfile1 from "../../assets/arvind/Profile.webp";
import arvindProfile2 from "../../assets/arvind/Profile2.webp";
import { TRANSITION } from "../../constants/config";

// The founder section from the earlier About page, kept exactly as it was.
// It is not shown at the moment (it was already switched off). To bring it
// back, import { Founder } in pages/AboutPage.jsx and place <Founder /> there;
// it will want restyling to match the current page first.

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

export const Founder = () => (
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
);
