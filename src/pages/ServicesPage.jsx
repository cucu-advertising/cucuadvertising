import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BigFooter } from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "branding",
    title: "Branding",
    headlineHighlight: "Defining the foundation",
    headlineRest:
      " that gives every decision meaning: purpose, positioning and direction built for growth.",
    description:
      "Every service is a module.\nTogether, they form a system built to scale, connect and lead.",
    cta: "Know more",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
    thumb:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: "social",
    title: "Social Media Marketing",
    headlineHighlight: "Building digital communities",
    headlineRest:
      " through authentic conversations and data-driven engagement strategies.",
    description:
      "Content that sparks interaction.\nTurn casual followers into lifelong brand advocates.",
    cta: "Know more",
    image:
      "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1000&auto=format&fit=crop",
    thumb:
      "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: "performance",
    title: "Performance Marketing",
    headlineHighlight: "Measurable growth engines",
    headlineRest:
      " optimized at every touchpoint to maximize your return on investment.",
    description:
      "Data is our compass.\nWe scale your business with precision and targeted action.",
    cta: "Know more",
    image:
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1000&auto=format&fit=crop",
    thumb:
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: "seo",
    title: "Search Engine Optimization",
    headlineHighlight: "Dominating the search landscape",
    headlineRest:
      " with ethical strategies that ensure your brand is found by those who seek it.",
    description:
      "Visibility meets relevance.\nWe focus on building authority that converts organic traffic.",
    cta: "Know more",
    image:
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1000&auto=format&fit=crop",
    thumb:
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: "content",
    title: "Content Creation",
    headlineHighlight: "Storytelling that connects",
    headlineRest:
      " audiences to your brand on an emotional level and drives real action.",
    description:
      "From compelling copy to stunning visuals.\nWe craft narratives that people want to consume.",
    cta: "Know more",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1000&auto=format&fit=crop",
    thumb:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: "adfilms",
    title: "Ad Films",
    headlineHighlight: "Cinematic impact",
    headlineRest:
      " designed to tell your brand's story with flair and unforgettable visual power.",
    description:
      "High-end production meets strategic marketing.\nWe create visual experiences that leave a mark.",
    cta: "Know more",
    image:
      "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=1000&auto=format&fit=crop",
    thumb:
      "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: "webdev",
    title: "Web Development",
    headlineHighlight: "Robust digital infrastructure",
    headlineRest:
      " turning complex technical requirements into seamless, user-centric experiences.",
    description:
      "Performance, accessibility, and design.\nWe build platforms ready to scale with your ambition.",
    cta: "Know more",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop",
    thumb:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=150&auto=format&fit=crop",
  },
];

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
      }
    };

    const detachListener = () => {
      if (wheelListener) {
        window.removeEventListener("wheel", wheelListener);
        wheelListener = null;
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
            <div className="absolute top-8 left-8 z-20">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={activeService.title}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.5 }}
                  className="text-gray-400 font-black text-xs md:text-sm tracking-[0.4em] uppercase"
                >
                  {activeService.title}
                </motion.h2>
              </AnimatePresence>
            </div>

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
                <div className="w-full max-w-sm lg:max-w-md aspect-square rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] bg-white">
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
                  className="max-w-xl"
                >
                  {/* Headline */}
                  <h1 className="text-3xl lg:text-4xl xl:text-[3rem] leading-[1.1] font-normal tracking-tight text-black">
                    <span className="text-[#197C48] font-black">
                      {activeService.headlineHighlight}
                    </span>
                    {activeService.headlineRest}
                  </h1>

                  {/* Decorative Element */}
                  <div className="w-12 h-1 bg-[#197C48] rounded-full mt-10 lg:mt-14 opacity-20"></div>

                  {/* Description & CTA Container */}
                  <div className="mt-10 lg:mt-14">
                    <p className="text-gray-500 text-base md:text-lg leading-relaxed whitespace-pre-line mb-8 max-w-sm font-medium">
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
            <div className="w-16 lg:w-24 h-full flex flex-col justify-center items-center gap-4 bg-[#f8f9fa] border-l border-gray-100 relative z-20 py-8">
              {services.map((s, i) => (
                <div
                  key={s.id}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setCurrentIndex(i)}
                  className={`relative cursor-pointer w-10 h-10 lg:w-14 lg:h-14 transition-all duration-500 rounded-xl overflow-hidden shadow-sm ${displayedIndex === i ? "ring-2 ring-[#197C48] ring-offset-2" : "hover:scale-105"}`}
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
