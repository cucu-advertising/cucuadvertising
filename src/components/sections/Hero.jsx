import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const Hero = ({ setPage }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const words = [
    { text: "Your brand", indent: "0vw", color: "text-[#40F996]" },
    { text: "should make", indent: "10vw", color: "text-[#050505]" },
    { text: "People feel good.", indent: "20vw", color: "text-transparent" },
    { text: "Really good.", indent: "10vw", color: "text-[#050505]" },
  ];

  return (
    <section
      ref={container}
      className="h-screen relative flex items-center px-6 md:px-12 overflow-hidden bg-[#197C48]"
    >
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 bg-gradient-to-b from-[#050505]/20 to-transparent pointer-events-none"
      />
      <motion.div
        style={{ y, opacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[#050505]/5 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 w-full mt-24">
        <div className="space-y-[-1vw]">
          {words.map((word, i) => (
            <div key={i} className="overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                  delay: i * 0.1,
                }}
                className={`block text-[11vw] md:text-[8vw] font-black uppercase leading-[0.9] tracking-tighter ${word.color}`}
                style={{
                  marginLeft: word.indent,
                  WebkitTextStroke: word.color.includes("text-transparent")
                    ? "2px #40F996"
                    : "none",
                }}
              >
                {word.text}
              </motion.span>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1 }}
          className="mt-16 md:mt-12 flex flex-col md:flex-row md:items-center gap-12"
        >
          <button
            onClick={() => setPage("contact")}
            className="group relative px-12 py-6 bg-[#40F996] text-[#050505] font-black uppercase tracking-widest text-xl hover:bg-[#050505] hover:text-[#40F996] transition-all overflow-hidden"
          >
            <span className="relative z-10">Let's make it happen</span>
          </button>
          <div className="flex gap-8 items-center text-sm font-bold uppercase tracking-widest text-[#197C48]/60">
            <div className="w-12 h-[1px] bg-[#40F996]/30" />
            <span>Bangalore • Mumbai • Hyderabad</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
