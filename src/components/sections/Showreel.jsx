import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import showreelDesktop from "../../assets/banner-desktop.mp4";
import showreelMobile from "../../assets/banner-mobile.mp4";

// Full-width rounded showreel that grows into place as it scrolls into view.
// To use a different video, swap the two imports above (or point `src` at a
// file in /public, e.g. "/videos/home/showreel.webm").
export const Showreel = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [64, 28]);

  return (
    <section ref={ref} className="bg-white px-6 md:px-12 pt-6 md:pt-10 pb-4 md:pb-6">
      {/* Sized to fit one screen below the fixed navbar (~120px tall). */}
      <motion.div
        style={{ scale, borderRadius: radius }}
        className="relative max-w-[1800px] mx-auto overflow-hidden bg-neutral-100 shadow-2xl h-[calc(100svh-140px)]"
      >
        <video
          src={showreelDesktop}
          autoPlay
          loop
          muted
          playsInline
          className="hidden md:block w-full h-full object-cover"
        />
        <video
          src={showreelMobile}
          autoPlay
          loop
          muted
          playsInline
          className="md:hidden w-full h-full object-cover"
        />
      </motion.div>
    </section>
  );
};
