import React, { useRef, useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Placeholder storytelling copy — swap this out once final content is ready.
const PANELS = [
  {
    index: "01",
    eyebrow: "Philosophy",
    title: "We Make The World Believe In Your Brand",
    body: "We don't create advertisements. We create conversations.",
    bg: "#FF6B35",
    text: "#0A0A0A",
    blob: "rgba(10,10,10,0.12)",
  },
  {
    index: "02",
    eyebrow: "Approach",
    title: "Creative Strategy",
    body: "Creativity meets strategy — ideas built to be remembered.",
    bg: "#6C5CE7",
    text: "#FFFFFF",
    blob: "rgba(255,255,255,0.14)",
  },
  {
    index: "03",
    eyebrow: "Identity",
    title: "Branding",
    body: "Brands built to stand out, designed to last.",
    bg: "#2E86FF",
    text: "#FFFFFF",
    blob: "rgba(255,255,255,0.14)",
  },
  {
    index: "04",
    eyebrow: "Channels",
    title: "Digital Marketing",
    body: "Stories that sell, wherever your audience is looking.",
    bg: "#FF3E80",
    text: "#FFFFFF",
    blob: "rgba(255,255,255,0.14)",
  },
  {
    index: "05",
    eyebrow: "Growth",
    title: "Performance Marketing",
    body: "Ideas that people remember, results you can measure.",
    bg: "#FFD23F",
    text: "#0A0A0A",
    blob: "rgba(10,10,10,0.1)",
  },
  {
    index: "06",
    eyebrow: "Next",
    title: "Let's Build Something Extraordinary",
    body: "Your brand's next chapter starts with a conversation.",
    bg: "#0A0A0A",
    text: "#FFFFFF",
    blob: "rgba(255,107,53,0.25)",
    cta: true,
  },
];

export const LandscapeScroll = ({ setPage }) => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const dotsRef = useRef([]);
  const orbRef = useRef(null);

  // Decorative cursor-follow orb (desktop only, purely visual)
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const section = sectionRef.current;
    const orb = orbRef.current;
    if (!section || !orb) return;

    let raf = null;
    const handleMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        orb.style.transform = `translate(${x}px, ${y}px)`;
      });
    };
    section.addEventListener("mousemove", handleMove);
    return () => {
      section.removeEventListener("mousemove", handleMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const active = Math.round(self.progress * (PANELS.length - 1));
            dotsRef.current.forEach((dot, i) => {
              if (!dot) return;
              dot.style.width = i === active ? "28px" : "8px";
              dot.style.opacity = i === active ? "1" : "0.4";
            });
          },
        },
      });

      const panels = gsap.utils.toArray(".landscape-panel", track);
      panels.forEach((panel) => {
        gsap.fromTo(
          panel.querySelectorAll(".reveal"),
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: "left 78%",
              toggleActions: "play none none reverse",
            },
          }
        );
        gsap.fromTo(
          panel.querySelectorAll(".ghost-number"),
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: "left 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      return () => tween.scrollTrigger?.kill();
    });

    // Mobile: vertical stack, no horizontal pin
    mm.add("(max-width: 767px)", () => {
      const panels = gsap.utils.toArray(".landscape-panel", track);
      const triggers = panels.map((panel) =>
        gsap.fromTo(
          panel.querySelectorAll(".reveal"),
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.06,
            scrollTrigger: {
              trigger: panel,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        )
      );
      return () => triggers.forEach((t) => t.scrollTrigger?.kill());
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-[#0A0A0A]">
      {/* Cursor-follow orb — desktop only, purely decorative */}
      <div
        ref={orbRef}
        className="hidden md:block absolute top-0 left-0 w-24 h-24 rounded-full pointer-events-none z-20 mix-blend-difference"
        style={{
          background: "white",
          transform: "translate(-9999px,-9999px)",
          filter: "blur(2px)",
          marginLeft: "-48px",
          marginTop: "-48px",
        }}
      />

      {/* Progress dots */}
      <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-30 gap-2 items-center">
        {PANELS.map((_, i) => (
          <div
            key={i}
            ref={(el) => (dotsRef.current[i] = el)}
            className="h-2 rounded-full bg-white transition-all duration-300"
            style={{ width: "8px", opacity: 0.4 }}
          />
        ))}
      </div>

      <div
        ref={trackRef}
        className="flex flex-col md:flex-row md:h-screen md:w-max will-change-transform"
      >
        {PANELS.map((panel) => (
          <div
            key={panel.index}
            className="landscape-panel relative flex flex-col justify-center shrink-0 px-8 md:px-20 py-28 md:py-0 md:h-full w-full md:w-[min(94vw,920px)] overflow-hidden"
            style={{ backgroundColor: panel.bg }}
          >
            {/* Floating blob shapes for graphic depth */}
            <div
              className="absolute -top-16 -right-16 w-72 h-72 rounded-full blur-2xl animate-[float_8s_ease-in-out_infinite]"
              style={{ background: panel.blob }}
            />
            <div
              className="absolute -bottom-24 -left-10 w-56 h-56 rounded-full blur-2xl animate-[float_10s_ease-in-out_infinite_reverse]"
              style={{ background: panel.blob }}
            />

            {/* Giant ghost number */}
            <span
              className="ghost-number absolute top-6 left-6 md:top-10 md:left-10 font-black leading-none select-none pointer-events-none"
              style={{
                fontSize: "clamp(90px, 18vw, 220px)",
                color: panel.text,
                opacity: 0.08,
              }}
            >
              {panel.index}
            </span>

            {/* Main content */}
            <div className="relative z-10">
              <span
                className="reveal inline-block font-mono text-xs md:text-sm tracking-[0.35em] uppercase mb-6 px-4 py-1.5 rounded-full border"
                style={{ color: panel.text, borderColor: `${panel.text}33` }}
              >
                {panel.index} — {panel.eyebrow}
              </span>
              <h3
                className="reveal text-[clamp(32px,5.4vw,64px)] font-black leading-[1.05] tracking-tight mb-6 max-w-2xl"
                style={{ color: panel.text }}
              >
                {panel.title}
              </h3>
              <p
                className="reveal text-lg md:text-xl font-light leading-relaxed max-w-lg"
                style={{ color: panel.text, opacity: 0.75 }}
              >
                {panel.body}
              </p>

              {panel.cta && (
                <button
                  onClick={() => setPage?.("contact")}
                  className="reveal mt-10 inline-flex w-fit items-center gap-3 font-semibold text-sm uppercase tracking-[0.2em] border-b-2 pb-2 hover:opacity-70 transition-opacity duration-300"
                  style={{ color: "#FF6B35", borderColor: "#FF6B35" }}
                >
                  Get In Touch →
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-24px) scale(1.06); }
        }
      `}</style>
    </section>
  );
};
