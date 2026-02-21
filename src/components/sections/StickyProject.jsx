import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const StickyProject = ({ title, category, img, index, onClick }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start", "end start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.4, 1], [1.2, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{ scale, opacity }}
        onClick={onClick}
        className="relative w-full h-[80vh] bg-[#050505] overflow-hidden cursor-pointer group rounded-[3rem] mx-4 md:mx-12 shadow-2xl"
      >
        <motion.img
          src={img}
          alt={title}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-black/80 to-transparent">
          <span className="text-[#40F996] font-mono text-sm uppercase tracking-widest mb-4 block">
            {category}
          </span>
          <h3 className="text-5xl md:text-7xl font-black uppercase text-white tracking-tighter">
            {title}
          </h3>
        </div>
      </motion.div>
    </div>
  );
};
