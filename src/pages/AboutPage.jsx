import React from "react";
import { motion } from "framer-motion";
import { BigFooter } from "../components/Footer";
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
      className="bg-[#050505] text-white selection:bg-[#197C48] selection:text-white"
    >
      {/* Hero Section */}
      <section className="pt-48 pb-32 px-6 md:px-12 bg-[#197C48]">
        <div className="max-w-[1400px] mx-auto">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[12vw] md:text-[8vw] font-black uppercase leading-[0.85] text-[#050505] mb-8"
          >
            We're <br /> CUCU <br /> Advertising.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-[#050505]/60"
          >
            Aka: Client to User with Creative Understanding
          </motion.p>
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
      <section className="py-32 px-6 md:px-12 bg-[#050505]">
        <div className="max-w-[1200px] mx-auto text-center">
          <FadeInView>
            <p className="text-2xl md:text-4xl font-light mb-16 opacity-70">
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
                <p className="mt-4 uppercase tracking-widest text-sm opacity-50">
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
                  className="text-[15vw] md:text-[10vw] font-black text-white leading-none"
                >
                  U
                </motion.div>
                <p className="mt-4 uppercase tracking-widest text-sm opacity-50">
                  Flip a U — it becomes a C
                </p>
              </div>
            </FadeInView>
          </div>

          <FadeInView delay={0.6}>
            <p className="text-2xl md:text-3xl max-w-3xl mx-auto leading-relaxed font-bold text-[#197C48]">
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
                <div className="aspect-[4/5] bg-[#197C48] rounded-[3rem] overflow-hidden relative group">
                  <div className="absolute inset-0 bg-[#050505]/10 group-hover:bg-transparent transition-colors duration-500" />
                  <div className="absolute bottom-8 left-8 text-white z-10">
                    <p className="text-2xl font-black uppercase">
                      Founder & Creative Head
                    </p>
                  </div>
                  {/* Image placeholder if needed later */}
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-8xl text-white opacity-20 font-black">
                      AA
                    </span>
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
