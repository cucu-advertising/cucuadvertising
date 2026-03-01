import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DesignStudioSection = () => {
  const sectionRef = useRef(null);
  const tlRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const images = [
    "/Clientwork/varun/varun%20engineers%201.webp",
    "/Clientwork/varun/varun%20engineers%203.webp",
    "/Clientwork/varun/varun%20engineers%205.webp",
    "/Clientwork/varun/varun%20engineers%20all.webp",
    "/Clientwork/varun/varun%20engineers%20truck.webp",
  ];

  const N = images.length;
  const finalRotations = [6, 3, 0, -3, -6];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=100%",
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          pinSpacing: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setProgress(self.progress);
          },
          onRefresh: (self) => {
            if (self.spacer) {
              self.spacer.style.background = "#f5f4f0";
              self.spacer.style.overflow = "visible";
            }
            if (self.pin) {
              self.pin.style.overflow = "visible";
            }
          },
        },
      });

      tlRef.current = tl;
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const getCardWidth = () => {
    if (typeof window === "undefined") return 200;
    return window.innerWidth < 768 ? 140 : 220;
  };

  const getSpread = () => {
    if (typeof window === "undefined") return 160;
    const vw = window.innerWidth;
    const cardW = getCardWidth();
    const available = vw - 64 - cardW;
    const gap = available / (N - 1);
    return Math.min(gap, cardW + 20);
  };

  const STEP = getSpread();

  const getRight = (index) => {
    const p = Math.max(0, Math.min(1, progress));
    const finalRight = (N - 1 - index) * STEP;
    return finalRight * p;
  };

  const getRotation = (index) => {
    const p = Math.max(0, Math.min(1, progress));
    return finalRotations[index] * p;
  };

  // Subtle scale effect — middle card stays biggest
  const getScale = (index) => {
    const p = Math.max(0, Math.min(1, progress));
    const scales = [0.92, 0.96, 1, 0.96, 0.92];
    return 1 + (scales[index] - 1) * p;
  };

  // Subtle vertical offset for depth
  const getY = (index) => {
    const p = Math.max(0, Math.min(1, progress));
    const offsets = [12, 4, 0, 4, 12];
    return offsets[index] * p;
  };

  const cardW = getCardWidth();
  const cardH =
    typeof window !== "undefined" && window.innerWidth < 768 ? 170 : 250;

  // Dynamic shadow based on spread progress
  const cardShadow = (idx) => {
    const p = Math.max(0, Math.min(1, progress));
    const blur = 20 + p * 40;
    const spread = p * 4;
    const opacity = 0.08 + p * 0.12;
    return `0 ${10 + p * 20}px ${blur}px ${spread}px rgba(0,0,0,${opacity})`;
  };

  return (
    <section
      ref={sectionRef}
      className="h-screen w-full overflow-visible pb-[10px]"
      style={{
        background: "linear-gradient(180deg, #f5f4f0 0%, #eceae4 100%)",
      }}
    >
      <div className="h-full w-full flex flex-col justify-start pt-[14vh] md:pt-[16vh] px-8 md:px-16 overflow-visible">
        <div className="max-w-7xl mx-auto w-full relative z-20">
          {/* Category Label */}
          <div className="mb-3 md:mb-4 flex items-center gap-3">
            <div className="w-8 h-[2px] bg-[#197C48]" />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-[#197C48]">
              Our Philosophy
            </span>
          </div>

          {/* Headline */}
          <h2 className="relative z-[100] text-[1.2rem] md:text-[1.8rem] lg:text-[2.4rem] font-normal leading-[1.25] tracking-tight text-[#1a1a1a] mb-4 md:mb-6 max-w-[95%] md:max-w-5xl">
            We are a{" "}
            <span className="font-black italic text-[#197C48]">
              design studio
            </span>{" "}
            that turns ideas into visual ecosystems. Rooted in culture and
            driven by insight, we merge{" "}
            <span className="font-semibold">strategy</span> and{" "}
            <span className="font-semibold">creativity</span> to design brands
            that perform, evolve and endure.
          </h2>

          {/* Decorative gradient line */}
          <div
            className="h-[2px] rounded-full mb-4 md:mb-6 origin-left"
            style={{
              width: `${Math.max(40, progress * 100)}%`,
              background:
                "linear-gradient(90deg, #197C48, #40F996, transparent)",
              transition: "width 0.3s ease-out",
              opacity: 0.6,
            }}
          />

          {/* Image Reveal Container */}
          <div className="relative z-10 w-full" style={{ height: cardH + 40 }}>
            {images.map((img, idx) => (
              <div
                key={idx}
                style={{
                  right: `${getRight(idx)}px`,
                  transform: `rotate(${getRotation(idx)}deg) scale(${getScale(idx)}) translateY(${getY(idx)}px)`,
                  zIndex: idx + 1,
                  position: "absolute",
                  top: 0,
                  width: cardW,
                  height: cardH,
                  willChange: "right, transform",
                  boxShadow: cardShadow(idx),
                  transition: "box-shadow 0.3s ease",
                }}
                className="rounded-2xl overflow-hidden bg-white border border-black/[0.03]"
              >
                <img
                  src={img}
                  alt={`Work ${idx + 1}`}
                  className="w-full h-full object-cover pointer-events-none"
                  loading="eager"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignStudioSection;
