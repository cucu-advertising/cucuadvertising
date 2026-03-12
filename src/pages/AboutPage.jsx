import React from "react";
import { motion } from "framer-motion";
import { BigFooter } from "../components/Footer";
import aboutHeroImg from "../assets/NEW/about us big.png";
import arvindProfile1 from "../assets/arvind/Profile1.jpeg";
import arvindProfile2 from "../assets/arvind/Profile2.jpeg";
import { TRANSITION } from "../constants/config";

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
      <section className="pt-48 pb-16 px-6 md:px-12 bg-white relative overflow-hidden">
        {/* Background Motif */}
        <div className="absolute top-32 left-10 md:left-20 pointer-events-none select-none">
          <span className="text-[20vw] font-black text-[#197C48]/3 leading-none uppercase">
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
                      delay: i * 0.1 
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
                ease: "easeInOut" 
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

      {/* Brand Story Section */}
      <section className="py-32 px-6 md:px-12 bg-white text-black">
        <div className="max-w-[1200px] mx-auto">
          <FadeInView>
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-16 leading-tight">
              Here’s how we got here:
            </h2>
          </FadeInView>

          <div className="grid md:grid-cols-2 gap-16 md:gap-32">
            <FadeInView delay={0.2}>
              <div className="space-y-8">
                <p className="text-xl md:text-2xl leading-relaxed">
                  Advertising is a bridge between Client to User. That's the
                  connection we build every single day. So we took the prefix:{" "}
                  <span className="font-black text-[#197C48]">CU</span>.
                </p>
                <p className="text-xl md:text-2xl leading-relaxed">
                  But we don't just connect, we do it with the{" "}
                  <span className="font-bold italic">
                    Creative Understanding
                  </span>{" "}
                  of the brand. Again we took this prefix:{" "}
                  <span className="font-black text-[#197C48]">CU</span>.
                </p>
              </div>
            </FadeInView>

            <FadeInView delay={0.4}>
              <div className="relative p-12 bg-[#F5F5F5] rounded-[2rem] overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#197C48] rounded-bl-full opacity-10 group-hover:scale-150 transition-transform duration-700" />
                <p className="text-lg md:text-xl font-medium leading-relaxed italic relative z-10">
                  "It wasn't just about combining words; it was about defining
                  our purpose. The connection and the creativity."
                </p>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* Visual Symmetry Section */}
      <section className="py-32 px-6 md:px-12 bg-white border-t border-slate-100">
        <div className="max-w-[1200px] mx-auto text-center">
          <FadeInView>
            <p className="text-2xl md:text-4xl font-light mb-16 text-slate-400">
              Then came the part that made it perfect:
            </p>
          </FadeInView>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 mb-16">
            <FadeInView delay={0.2}>
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{ rotateY: [0, 180, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-[15vw] md:text-[10vw] font-black text-[#197C48] leading-none"
                >
                  C
                </motion.div>
                <p className="mt-4 uppercase tracking-widest text-sm font-bold text-slate-400">
                  Flip a C — it becomes a U
                </p>
              </div>
            </FadeInView>

            <FadeInView delay={0.4}>
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{ rotateX: [0, 180, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                  }}
                  className="text-[15vw] md:text-[10vw] font-black text-slate-900 leading-none"
                >
                  U
                </motion.div>
                <p className="mt-4 uppercase tracking-widest text-sm font-bold text-slate-400">
                  Flip a U — it becomes a C
                </p>
              </div>
            </FadeInView>
          </div>

          <FadeInView delay={0.6}>
            <p className="text-2xl md:text-3xl max-w-3xl mx-auto leading-relaxed font-black text-[#197C48] uppercase tracking-tighter">
              Now that’s visual symmetry. The connection, right there in the
              letters.
            </p>
          </FadeInView>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-32 px-6 md:px-12 bg-[#F5F5F5] text-black">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-7">
              <FadeInView>
                <span className="inline-block px-4 py-1 bg-[#197C48] text-white text-xs font-bold uppercase tracking-widest rounded-full mb-6">
                  The Brain Behind
                </span>
                <h2 className="text-5xl md:text-7xl font-black uppercase mb-8 leading-tight">
                  Arvind Arandkar
                </h2>
                <div className="space-y-6 text-lg md:text-xl opacity-80 leading-relaxed">
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
                  <p className="font-bold text-black opacity-100 italic">
                    That's the energy behind CUCU. That's who you're working
                    with.
                  </p>
                </div>
              </FadeInView>
            </div>
            <div className="md:col-span-5 relative">
              <FadeInView delay={0.3}>
                <div className="aspect-[4/5] bg-[#197C48] rounded-[3rem] overflow-hidden relative group shadow-2xl">
                  {/* Default Image */}
                  <img
                    src={arvindProfile1}
                    alt="Arvind Arandkar"
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                  />
                  {/* Hover Image */}
                  <img
                    src={arvindProfile2}
                    alt="Arvind Arandkar - Creative Mode"
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                  
                  <div className="absolute bottom-8 left-8 text-white z-10">
                    <p className="text-xl md:text-2xl font-black uppercase tracking-tight">
                      Founder & Creative Head
                    </p>
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
