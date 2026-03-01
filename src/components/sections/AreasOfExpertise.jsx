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
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [scrollActiveIndex, setScrollActiveIndex] = useState(0);
  const [isHeroReady, setIsHeroReady] = useState(false);

  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  // Create a ref array to store references to each service item
  const itemRefs = useRef([]);
  // Helper to accurately register each item in the ref array
  const setItemRef = (el, i) => {
    itemRefs.current[i] = el;
  };

  // Sync with Hero section loading
  useEffect(() => {
    if (window.__CUCU_HERO_READY__) {
      setIsHeroReady(true);
      return;
    }

    const handleHeroReady = () => setIsHeroReady(true);
    window.addEventListener("cucu:heroReady", handleHeroReady);
    return () => window.removeEventListener("cucu:heroReady", handleHeroReady);
  }, []);

  useEffect(() => {
    if (!isHeroReady) return;

    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // 1. PIN THE LEFT COLUMN
      const pinST = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: leftColRef.current,
        pinSpacing: false,
        anticipatePin: 1,
        // pinType: "fixed", // Removed to prevent premature viewport sticking
        invalidateOnRefresh: true,
      });

      // 2. TRACK SERVICE ITEMS FOR ACTIVE INDEX
      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        ScrollTrigger.create({
          trigger: item,
          start: "top 50%",
          end: "bottom 50%",
          onToggle: (self) => {
            if (self.isActive) setScrollActiveIndex(index);
          },
        });
      });

      // Essential: Refresh everything once the initial DOM/Images are likely settled.
      // We use multiple refreshes to account for the Hero canvas loading 192 frames asynchronously.
      // The Hero section adds a massive spacer (+300%) only AFTER frames are loaded.
      const refresh = () => {
        ScrollTrigger.refresh();
      };

      const timer1 = setTimeout(refresh, 1000);
      const timer2 = setTimeout(refresh, 2500);
      const timer3 = setTimeout(refresh, 5000);

      window.addEventListener("load", refresh);

      return () => {
        pinST.kill();
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        window.removeEventListener("load", refresh);
      };
    });

    // Mobile tracking
    mm.add("(max-width: 1023px)", () => {
      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        ScrollTrigger.create({
          trigger: item,
          start: "top 60%",
          end: "bottom 40%",
          onToggle: (self) => {
            if (self.isActive) setScrollActiveIndex(index);
          },
        });
      });
    });

    return () => mm.revert();
  }, []);

  // Determine what is currently visually active (Hover wins over scroll position)
  const activeIndex = hoveredIndex !== null ? hoveredIndex : scrollActiveIndex;

  return (
    <section
      ref={containerRef}
      className="py-16 md:py-24 px-6 md:px-12 bg-[#0a0a0a] relative z-20 overflow-visible"
    >
      <div className="max-w-[1800px] mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-12 md:gap-20 items-stretch">
        {/* Left Side - Heading + Image + Description */}
        <div className="w-full relative h-full">
          <div
            ref={leftColRef}
            className="w-full lg:h-screen lg:flex lg:flex-col lg:justify-center py-12 lg:py-0 z-30"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white/30 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase block mb-3 shrink-0"
            >
              What We Do
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-black uppercase text-white leading-[0.95] tracking-tighter mb-4 xl:mb-6 shrink-0"
            >
              Areas of <br />
              <span className="text-[#197C48]">Expertise</span>
            </motion.h2>

            {/* Hover Image Preview */}
            <div className="rounded-2xl overflow-hidden mb-4 xl:mb-6 w-full max-w-[260px] xl:max-w-[320px] aspect-[16/9] bg-white/5 relative shrink-0">
              <AnimatePresence mode="wait">
                {activeIndex !== null ? (
                  <motion.img
                    key={activeIndex}
                    src={services[activeIndex].image}
                    alt={services[activeIndex].title}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover absolute inset-0"
                  />
                ) : (
                  <motion.img
                    key="default"
                    src="/FAQ.jpg"
                    alt="Creative Expertise"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover absolute inset-0"
                  />
                )}
              </AnimatePresence>
            </div>

            <p className="text-white/50 text-xs md:text-sm leading-relaxed max-w-sm shrink">
              Being a design studio at the forefront of digital transformation
              and product design, we take it upon ourselves to deliver
              excellence across every discipline we touch.
            </p>
          </div>
        </div>

        {/* Right Side - Service Items */}
        <div ref={rightColRef} className="space-y-0 relative z-20">
          {services.map((service, i) => (
            <motion.div
              key={i}
              ref={(el) => setItemRef(el, i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.08,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
              className="border-t border-white/10 last:border-b last:border-white/10 py-8 group hover:bg-white/[0.02] transition-colors px-4 -mx-4 rounded-lg cursor-default"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex items-start gap-5">
                {/* Small hover icon */}
                <div
                  className={`w-12 h-12 rounded-xl overflow-hidden shrink-0 border transition-all duration-300 mt-1 ${
                    activeIndex === i
                      ? "opacity-100 border-[#197C48]/50 scale-100"
                      : "opacity-0 border-white/10 scale-90"
                  }`}
                >
                  <img
                    src={service.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3
                    className={`text-xl md:text-2xl font-black uppercase tracking-tight mb-3 transition-colors duration-300 ${
                      activeIndex === i ? "text-[#40F996]" : "text-white"
                    }`}
                  >
                    {service.title}
                  </h3>
                  <p className="text-white/40 text-sm font-light uppercase tracking-widest leading-relaxed mb-5 max-w-2xl">
                    {service.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`px-4 py-1.5 border rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                          activeIndex === i
                            ? "border-[#197C48]/40 text-[#40F996]"
                            : "border-white/10 text-white/50"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
