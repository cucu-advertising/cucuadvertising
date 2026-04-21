import React from "react";
// import ScrollExplosionCanvas from "../ScrollExplosionCanvas";
import desktopVideo from "../../assets/banner-desktop.mp4";
import mobileVideo from "../../assets/banner-mobile.mp4";
import { motion } from "framer-motion";

export const Hero = ({ setPage }) => {
  return (
    <section className="w-full h-screen relative bg-[#19463F] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full"
      >
        <div className="w-full h-full relative">
          {/* Desktop Video */}
          <video
            src={desktopVideo}
            autoPlay
            loop
            muted
            playsInline
            className="hidden md:block w-full h-full object-cover opacity-80"
          />
          {/* Mobile Video */}
          <video
            src={mobileVideo}
            autoPlay
            loop
            muted
            playsInline
            className="block md:hidden w-full h-full object-cover opacity-80"
          />
        </div>

        {/* Deep Gradient Overlay for Premium Look */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#19463F]/40 via-transparent to-[#19463F]/60" />
      </motion.div>

      {/* Optional: Add a subtle overlay or branding if needed, but keeping it clean for now */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-white text-center"
        >
          {/* You can add hero text here if it was previously part of the canvas, 
              but based on ScrollExplosionCanvas, it was likely just the visuals */}
        </motion.div>
      </div>
    </section>
  );
};
