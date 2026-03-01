import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import brandingImg from "../../assets/homepageservice/branding.png";
import socialImg from "../../assets/homepageservice/socialmediamarketing.png";
import uiuxImg from "../../assets/homepageservice/uiux.webp";
import videoImg from "../../assets/homepageservice/video.png";
import nocodeImg from "../../assets/homepageservice/nocode.png";
import fullstackImg from "../../assets/homepageservice/fullstack.jpg";
import performanceImg from "../../assets/homepageservice/performancemarketing.png";

const services = [
  {
    title: "Brand Identity & Strategy",
    desc: "Crafting distinctive brand identities that resonate with your audience and stand the test of time. From logo design to complete brand ecosystems.",
    tags: ["Logo Design", "Brand Guidelines", "Visual Identity"],
    image: brandingImg,
  },
  {
    title: "Social Media Marketing",
    desc: "Building powerful social media presences with data-driven content strategies that engage, grow, and convert your audience across all platforms.",
    tags: ["Instagram", "Facebook", "LinkedIn"],
    image: socialImg,
  },
  {
    title: "UI / UX Development",
    desc: "Designing intuitive and visually engaging digital experiences that enhance user experience and elevate your digital presence.",
    tags: ["Figma", "Canva", "Adobe"],
    image: uiuxImg,
  },
  {
    title: "Full Stack Development",
    desc: "End-to-end web application development with modern frameworks, scalable architecture, and seamless user experiences.",
    tags: ["React", "Node.js", "MongoDB"],
    image: fullstackImg,
  },
  {
    title: "Video & Motion Graphics",
    desc: "Producing compelling video content and dynamic motion graphics that tell your brand story and captivate viewers.",
    tags: ["After Effects", "Premiere Pro", "3D Animation"],
    image: videoImg,
  },
  {
    title: "Performance Marketing",
    desc: "Data-driven paid advertising strategies that maximize ROI across Google Ads, Meta Ads, and programmatic platforms.",
    tags: ["Google Ads", "Meta Ads", "Analytics"],
    image: performanceImg,
  },
  {
    title: "Shopify / No-Code Website",
    desc: "Building stunning, conversion-optimized online stores and websites without traditional coding using modern no-code platforms.",
    tags: ["Shopify", "Webflow", "WordPress"],
    image: nocodeImg,
  },
];

export const AreasOfExpertise = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const isTransitioning = useRef(false);
  const total = services.length;

  useEffect(() => {
    let wheelListener = null;

    const handleWheel = (e) => {
      const isScrollingDown = e.deltaY > 0;

      // Determine if we are at the boundaries
      const shouldLock =
        (isScrollingDown && currentIndex < total - 1) ||
        (!isScrollingDown && currentIndex > 0);

      if (shouldLock) {
        if (e.cancelable) e.preventDefault();

        if (isTransitioning.current) return;
        if (Math.abs(e.deltaY) < 15) return; // Solid threshold

        isTransitioning.current = true;

        if (isScrollingDown) {
          setCurrentIndex((prev) => Math.min(prev + 1, total - 1));
        } else {
          setCurrentIndex((prev) => Math.max(prev - 1, 0));
        }

        // Snap back to "ready" state after animation
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
      end: "+=2000", // Increased lock duration to force viewing every item
      pin: true,
      anticipatePin: 1,
      onEnter: attachListener,
      onEnterBack: attachListener,
      onLeave: detachListener,
      onLeaveBack: detachListener,
      invalidateOnRefresh: true,
    });

    return () => {
      st.kill();
      detachListener();
    };
  }, [currentIndex, total]);

  const service = services[currentIndex];

  return (
    <section
      ref={containerRef}
      className="h-screen w-full bg-[#0a0a0a] overflow-hidden flex items-start pt-32 px-6 md:px-12 z-20"
    >
      <div className="w-full max-w-[1800px] mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-12 md:gap-20 items-center">
        {/* Left Side - Static Heading & Active Image */}
        <div className="flex flex-col justify-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white/30 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase block mb-3"
          >
            What We Do
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-black uppercase text-white leading-[0.95] tracking-tighter mb-6"
          >
            Areas of <br />
            <span className="text-[#197C48]">Expertise</span>
          </motion.h2>

          {/* Preview image – crossfades as you step */}
          <div className="rounded-2xl overflow-hidden mb-6 w-full max-w-[280px] xl:max-w-[340px] aspect-[16/9] bg-white/5 relative">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={service.image}
                alt={service.title}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full object-cover absolute inset-0"
              />
            </AnimatePresence>

            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full px-2.5 py-1 text-[10px] font-bold font-mono text-white/60 tracking-widest">
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(services.length).padStart(2, "0")}
            </div>
          </div>

          <p className="text-white/50 text-xs md:text-sm leading-relaxed max-w-sm mb-6">
            Being a design studio at the forefront of digital transformation and
            product design, we take it upon ourselves to deliver excellence
            across every discipline we touch.
          </p>

          {/* Progress dots */}
          <div className="flex gap-2">
            {services.map((_, i) => (
              <div
                key={i}
                className="relative h-[3px] rounded-full overflow-hidden transition-all duration-300"
                style={{
                  width: i === currentIndex ? "28px" : "8px",
                  background: "rgba(255,255,255,0.12)",
                }}
              >
                {i === currentIndex && (
                  <motion.div
                    layoutId="progressFillAreas"
                    className="absolute inset-0 bg-[#197C48] rounded-full"
                  />
                )}
                {i < currentIndex && (
                  <div className="absolute inset-0 bg-[#197C48]/50 rounded-full" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Step Content Crossfade */}
        <div className="relative flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -40, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              {/* Large service number */}
              <div className="text-[120px] md:text-[160px] font-black leading-none text-white/[0.04] select-none mb-0 -mb-6 tracking-tighter">
                {String(currentIndex + 1).padStart(2, "0")}
              </div>

              {/* Thumbnail row */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl overflow-hidden border border-[#197C48] shrink-0">
                  <img
                    src={service.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-[#197C48] to-transparent" />
              </div>

              <h3 className="text-3xl md:text-5xl xl:text-6xl font-black uppercase tracking-tight text-[#40F996] leading-[0.95] mb-6">
                {service.title}
              </h3>

              <p className="text-white/70 text-sm md:text-base font-light leading-relaxed mb-8 max-w-lg">
                {service.desc}
              </p>

              <div className="flex flex-wrap gap-2 mb-10">
                {service.tags.map((tag, idx) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 + idx * 0.06, duration: 0.35 }}
                    className="px-4 py-1.5 border border-[#197C48]/40 text-[#40F996] rounded-full text-[10px] font-bold uppercase tracking-widest"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              {/* Scroll hint */}
              <div className="flex items-center gap-3 text-white/20">
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M6 2v8M6 10l-3-3M6 10l3-3"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em]">
                  {currentIndex < services.length - 1
                    ? `${services.length - 1 - currentIndex} more to explore`
                    : "End of expertise"}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
