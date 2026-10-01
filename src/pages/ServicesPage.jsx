import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BigFooter } from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

import { services } from "../constants/services";



export const ServicesPage = ({ setPage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const containerRef = useRef(null);
  const total = services.length;
  const isTransitioning = useRef(false);

  useEffect(() => {
    let wheelListener = null;

    const handleWheel = (e) => {
      const isScrollingDown = e.deltaY > 0;

      const shouldLock =
        (isScrollingDown && currentIndex < total - 1) ||
        (!isScrollingDown && currentIndex > 0);

      if (shouldLock) {
        if (e.cancelable) e.preventDefault();

        if (isTransitioning.current) return;
        if (Math.abs(e.deltaY) < 10) return;

        isTransitioning.current = true;

        if (isScrollingDown) {
          setCurrentIndex((prev) => Math.min(prev + 1, total - 1));
        } else {
          setCurrentIndex((prev) => Math.max(prev - 1, 0));
        }

        gsap.delayedCall(0.8, () => {
          isTransitioning.current = false;
        });
      }
    };

    const attachListener = () => {
      if (!wheelListener) {
        window.addEventListener("wheel", handleWheel, { passive: false });
        wheelListener = handleWheel;
        // Stop Lenis to allow full control over the wheel event
        if (window.lenis) window.lenis.stop();
      }
    };

    const detachListener = () => {
      if (wheelListener) {
        window.removeEventListener("wheel", wheelListener);
        wheelListener = null;
        // Resume Lenis
        if (window.lenis) window.lenis.start();
      }
    };

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=300", // Minimal pinned duration to allow quick release
      pin: true,
      anticipatePin: 1,
      onEnter: attachListener,
      onEnterBack: attachListener,
      onLeave: detachListener,
      onLeaveBack: detachListener,
    });

    return () => {
      st.kill();
      detachListener();
    };
  }, [currentIndex, total]);

  const displayedIndex = hoveredIndex !== null ? hoveredIndex : currentIndex;
  const activeService = services[displayedIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white font-sans"
    >
      <div
        ref={containerRef}
        className="h-screen w-full bg-white overflow-hidden"
      >
        {/* Internal Navbar Spacer - Increased for safe clearance */}
        <div className="h-[100px] md:h-[120px] w-full bg-white" />

        <div className="h-[calc(100vh-100px)] md:h-[calc(100vh-120px)] w-full flex flex-col md:flex-row overflow-hidden bg-white">
          {/* 1. Visual Panel (Left) */}
          <div className="w-full h-[35vh] md:w-[50%] md:h-full bg-[#f8f9fa] relative flex items-center justify-center p-6 lg:p-16 overflow-hidden">
            {/* Top Left Title */}


            {/* Image Render */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full flex items-center justify-center"
              >
                <div className="h-full w-auto max-w-full md:h-auto md:w-full md:max-w-sm lg:max-w-md aspect-square rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] bg-white">
                  <img
                    src={activeService.image}
                    alt={activeService.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 2. Content Panel (Right) */}
          <div className="w-full h-[65vh] md:w-[50%] md:h-full flex relative border-t md:border-t-0 md:border-l border-gray-100">
            {/* Main Text Content */}
            <div className="flex-1 flex flex-col justify-center px-8 md:px-12 lg:px-20 h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Badge Title */}
                  <div className="mb-6">
                    <AnimatePresence mode="wait">
                      <motion.h2
                        key={activeService.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block bg-[#197C48]/10 text-[#197C48] font-black text-sm md:text-base lg:text-lg tracking-[0.2em] uppercase px-4 py-2 rounded-lg"
                      >
                        {activeService.title}
                      </motion.h2>
                    </AnimatePresence>
                  </div>

                  {/* Headline */}
                  <h1 className="text-2xl lg:text-3xl xl:text-4xl 2xl:text-[2.75rem] leading-[1.1] font-normal tracking-tight text-black">
                    <span className="text-[#197C48] font-black">
                      {activeService.headlineHighlight}
                    </span>
                    {activeService.headlineRest}
                  </h1>

                  {/* Decorative Element */}
                  <div className="w-12 h-1 bg-[#197C48] rounded-full mt-6 lg:mt-8 opacity-20"></div>

                  {/* Description & CTA Container */}
                  <div className="mt-6 lg:mt-8">
                    <p className="text-gray-500 text-sm md:text-base lg:text-lg leading-relaxed whitespace-pre-line mb-6 lg:mb-8 max-w-sm font-medium">
                      {activeService.description}
                    </p>

                    <button
                      onClick={() => setPage("contact")}
                      className="group flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-black hover:text-[#197C48] transition-all"
                    >
                      <span>{activeService.cta}</span>
                      <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#197C48] group-hover:border-[#197C48] transition-all">
                        <span className="text-black group-hover:text-white transition-colors duration-300">
                          →
                        </span>
                      </div>
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right-Edge Visual Navigator */}
            <div className="w-16 lg:w-24 h-full flex flex-col justify-center items-center gap-2 lg:gap-4 bg-[#197C48] border-l border-gray-100 relative z-20 py-4 lg:py-8">
              {services.map((s, i) => (
                <div
                  key={s.id}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setCurrentIndex(i)}
                  className={`relative cursor-pointer w-8 h-8 lg:w-12 lg:h-12 2xl:w-14 2xl:h-14 transition-all duration-500 rounded-lg lg:rounded-xl overflow-hidden shadow-sm ${displayedIndex === i ? "ring-2 ring-[#197C48] ring-offset-1 lg:ring-offset-2" : "hover:scale-105"}`}
                >
                  <img
                    src={s.thumb}
                    alt={`Go to ${s.title}`}
                    className={`w-full h-full object-cover transition-all duration-500 ${displayedIndex === i ? "opacity-100 scale-110" : "opacity-40 grayscale hover:grayscale-0 hover:opacity-100"}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BigFooter setPage={setPage} />
    </motion.div>
  );
};
