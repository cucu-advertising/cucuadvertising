import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ArrowRight,
  ArrowUpRight,
  Globe,
  Zap,
  Layers,
  Smartphone,
  Mail,
  Instagram,
  Linkedin,
  Twitter,
  MoveRight,
  CheckCircle,
  Loader2,
  MapPin,
  Phone,
  Plus,
  Users,
  Target,
  PenTool,
  Lightbulb,
  Rocket,
  BarChart3,
  MessageSquare,
  Video,
  Search,
  Code,
  Megaphone,
  Pen,
  ChevronLeft,
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
  useMotionValue,
  useVelocity,
} from "framer-motion";

/* --- THEME & CONFIG --- */
const COLORS = {
  primary: "#0F5E3C", // Deep Forest Green
  accent: "#8CF2C6", // Mint Green
  black: "#050505",
  white: "#F0F0F0",
};

const TRANSITION = { duration: 0.7, ease: [0.22, 1, 0.36, 1] };

/* --- MOTION PRIMITIVES --- */

const Cursor = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const cursorScale = useMotionValue(1);
  const cursorOpacity = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 450, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  const scaleSpring = useSpring(cursorScale, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
      cursorOpacity.set(1);

      // Check for hoverable elements (links, buttons)
      const target = e.target;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".hover-cursor")
      ) {
        cursorScale.set(2.5);
      } else {
        cursorScale.set(1);
      }
    };

    const handleMouseLeave = () => cursorOpacity.set(0);
    const handleMouseEnter = () => cursorOpacity.set(1);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-[#8CF2C6] rounded-full pointer-events-none z-[9999] hidden md:block mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          scale: scaleSpring,
          opacity: cursorOpacity,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#8CF2C6] rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: 13,
          translateY: 13,
          opacity: cursorOpacity,
        }}
      />
    </>
  );
};

const Magnetic = ({ children }) => {
  const ref = useRef(null);
  const position = { x: useMotionValue(0), y: useMotionValue(0) };
  const { x, y } = position;

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.2);
    y.set(middleY * 0.2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

const ParallaxText = ({ children, baseVelocity = 100 }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });
  const x = useTransform(baseX, (v) => `${v}%`);
  const directionFactor = useRef(1);

  useEffect(() => {
    let lastTime = performance.now();
    const update = (time) => {
      const delta = time - lastTime;
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }
      moveBy += directionFactor.current * moveBy * velocityFactor.get();

      // Wrap the value between -25 and 0 to prevent overflow while keeping it seamless
      let nextBaseX = baseX.get() + moveBy;
      if (nextBaseX <= -25) nextBaseX = 0;
      if (nextBaseX > 0) nextBaseX = -25;
      baseX.set(nextBaseX);

      lastTime = time;
      requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }, []);

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap">
      <motion.div
        className="flex whitespace-nowrap text-[15vw] font-black uppercase leading-none tracking-tighter text-[#8CF2C6]/20"
        style={{ x }}
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} className="block mr-12">
            {children}{" "}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

/* --- GLOBAL COMPONENTS --- */

const Navbar = ({ activePage, setPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const links = ["home", "work", "services", "about", "contact"];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] py-4 md:py-6 px-8 md:px-12 flex justify-between items-center transition-all duration-500 ${
          scrolled
            ? "bg-[#050505] border-b border-white/10 shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <button
          onClick={() => setPage("home")}
          className="text-2xl font-black tracking-tighter hover:text-[#8CF2C6] transition-colors pointer-events-auto text-[#F0F0F0]"
        >
          CUCU Advertising<span className="text-[#8CF2C6]">.</span>
        </button>
        <div className="hidden md:flex gap-12 items-center">
          {links
            .filter((l) => l !== "home")
            .map((link) => (
              <button
                key={link}
                onClick={() => setPage(link)}
                className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors ${activePage === link ? "text-[#8CF2C6]" : "text-white/60 hover:text-white"}`}
              >
                {link}
              </button>
            ))}
        </div>
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={24} />
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={TRANSITION}
            className="fixed inset-0 bg-[#050505] z-[101] flex flex-col items-center justify-center gap-8 pointer-events-auto"
          >
            <button
              className="absolute top-8 right-8 text-white"
              onClick={() => setIsOpen(false)}
            >
              <X size={32} />
            </button>
            {links.map((link) => (
              <button
                key={link}
                onClick={() => {
                  setPage(link);
                  setIsOpen(false);
                }}
                className="text-4xl font-black uppercase tracking-tighter text-white hover:text-[#8CF2C6]"
              >
                {link}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [
    {
      q: "What is your typical project timeline?",
      a: "Project timelines vary by scope. A typical comprehensive brand and web overhaul takes 8-12 weeks from discovery to launch.",
    },
    {
      q: "Do you work with startups?",
      a: "Yes. We partner with ambitious startups (Series A+) that understand the value of brand capital and scalable infrastructure.",
    },
    {
      q: "What is your pricing model?",
      a: "We operate on a project-fee basis for clear deliverables, or monthly retainers for ongoing growth partnerships. Minimum engagement starts at $15k.",
    },
    {
      q: "Do you handle hosting and maintenance?",
      a: "We deploy on enterprise-grade infrastructure (Vercel/AWS) and offer maintenance packages to keep your digital estate secure.",
    },
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-[#050505] border-t border-white/10 relative z-10">
      <div className="max-w-[1800px] mx-auto grid lg:grid-cols-2 gap-16">
        <div className="sticky top-32 h-fit">
          <span className="text-[#8CF2C6] font-mono text-sm tracking-widest uppercase block mb-8">
            Common Queries
          </span>
          <h2 className="text-4xl md:text-6xl font-black uppercase text-white leading-tight">
            Clarity in <br /> Process
          </h2>
        </div>
        <div className="space-y-0">
          {faqs.map((faq, i) => (
            <div key={i} className="border-t border-white/20">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full py-10 text-left flex justify-between items-start group"
              >
                <span className="text-xl md:text-2xl font-bold text-white group-hover:text-[#8CF2C6] transition-colors pr-8">
                  {faq.q}
                </span>
                <span
                  className={`text-[#8CF2C6] transition-transform duration-300 ${openIndex === i ? "rotate-45" : ""}`}
                >
                  <Plus size={32} />
                </span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-10 text-neutral-400 text-lg leading-relaxed max-w-2xl">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Reusable standard footer content
const StandardFooterContent = () => (
  <div className="relative z-10 flex flex-col md:flex-row justify-between items-end border-t border-[#050505]/20 pt-8 pb-8 w-full">
    <div className="flex gap-12 mb-8 md:mb-0">
      <a
        href="https://www.facebook.com/profile.php?id=61551579710039"
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-lg md:text-xl uppercase tracking-widest hover:text-white transition-colors"
      >
        Facebook
      </a>
      <a
        href="https://www.instagram.com/cucuadvertising/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-lg md:text-xl uppercase tracking-widest hover:text-white transition-colors"
      >
        Instagram
      </a>
      <a
        href="https://www.linkedin.com/company/cucuadvertsing/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-lg md:text-xl uppercase tracking-widest hover:text-white transition-colors"
      >
        LinkedIn
      </a>
      <a
        href="https://api.whatsapp.com/send?phone=919440417034"
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-lg md:text-xl uppercase tracking-widest hover:text-white transition-colors"
      >
        WhatsApp
      </a>
    </div>
    <div className="text-right">
      <p className="font-mono text-sm uppercase font-bold text-[#050505] md:text-[#050505]">
        © 2023 Cucu Advertising
      </p>
      <p className="font-mono text-sm uppercase opacity-70 text-[#050505] md:text-[#050505]">
        Karnataka • Tamil Nadu • Kerala
      </p>
    </div>
  </div>
);

const BigFooter = ({ setPage }) => {
  return (
    <section className="min-h-screen bg-[#0F5E3C] text-[#050505] flex flex-col justify-between p-6 md:p-12 relative overflow-hidden z-10">
      <div className="relative z-10 flex justify-between items-start pt-12">
        <h2 className="text-2xl font-bold uppercase">Start a Project</h2>
        <ArrowUpRight size={64} className="text-[#8CF2C6]" />
      </div>

      <div className="relative z-10 text-center py-24">
        <button
          onClick={() => setPage("contact")}
          className="text-[18vw] font-black leading-none uppercase tracking-tighter text-white/10 hover:text-[#8CF2C6] transition-colors cursor-pointer"
        >
          Let's Talk
        </button>
      </div>

      <StandardFooterContent />
    </section>
  );
};

/* --- PAGE SECTIONS (HOME) --- */

const Hero = ({ setPage }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const words = [
    { text: "Your brand", indent: "0vw", color: "text-white" },
    { text: "should make", indent: "10vw", color: "text-[#0F5E3C]" },
    { text: "People feel good.", indent: "20vw", color: "text-transparent" },
    { text: "Really good.", indent: "10vw", color: "text-[#8CF2C6]" },
  ];

  return (
    <section
      ref={container}
      className="h-screen relative flex items-center px-6 md:px-12 overflow-hidden bg-[#050505]"
    >
      {/* Background Decorative Element */}
      <motion.div
        style={{ y, opacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[#0F5E3C]/10 rounded-full blur-[120px] pointer-events-none"
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
                    ? "1px rgba(140, 242, 198, 0.4)"
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
            className="group relative px-12 py-6 bg-[#8CF2C6] text-[#050505] font-black uppercase tracking-widest text-xl hover:bg-[#0F5E3C] hover:text-white transition-all overflow-hidden"
          >
            <span className="relative z-10">Let's make it happen</span>
          </button>
          <div className="flex gap-8 items-center text-sm font-bold uppercase tracking-widest text-[#8CF2C6]/60">
            <div className="w-12 h-[1px] bg-[#8CF2C6]/30" />
            <span>Bangalore • Mumbai • Hyderabad</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Marquee = () => (
  <div className="py-24 bg-[#0F5E3C] text-[#050505] overflow-hidden relative z-10">
    <ParallaxText baseVelocity={-2}>
      Strategy Design Development Motion Branding
    </ParallaxText>
  </div>
);

const CreativeHouse = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="py-32 bg-[#F0F0F0] text-[#050505] relative overflow-hidden flex items-center justify-center border-y-8 border-black group"
    >
      {/* Dynamic Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Re-using icons for techy feel */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <motion.div
          style={{
            x: useTransform(mouseX, [0, 2000], [0, 50]),
            y: useTransform(mouseY, [0, 2000], [0, 50]),
          }}
          className="absolute top-20 left-[10%] drop-shadow-2xl"
        >
          <BarChart3 size={140} strokeWidth={1} />
        </motion.div>
        <motion.div
          style={{
            x: useTransform(mouseX, [0, 2000], [0, -40]),
            y: useTransform(mouseY, [0, 2000], [0, 60]),
          }}
          className="absolute bottom-20 right-[15%] drop-shadow-2xl"
        >
          <Video size={120} strokeWidth={1} />
        </motion.div>
        <motion.div
          style={{
            x: useTransform(mouseX, [0, 2000], [0, 80]),
            y: useTransform(mouseY, [0, 2000], [0, -30]),
          }}
          className="absolute top-1/2 left-[20%] -translate-y-1/2 rotate-12 drop-shadow-2xl"
        >
          <Lightbulb size={180} strokeWidth={0.5} />
        </motion.div>
        <motion.div
          style={{
            x: useTransform(mouseX, [0, 2000], [0, -60]),
            y: useTransform(mouseY, [0, 2000], [0, -40]),
          }}
          className="absolute top-1/3 right-[25%] -translate-y-1/2 -rotate-12 drop-shadow-2xl"
        >
          <Rocket size={160} strokeWidth={0.5} />
        </motion.div>
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="inline-block bg-[#050505] text-[#8CF2C6] px-6 py-2 font-black uppercase tracking-widest mb-10 border-4 border-black shadow-[8px_8px_0px_0px_rgba(140,242,198,1)]"
        >
          The Collective
        </motion.div>
        <h2 className="text-6xl md:text-[10vw] font-black uppercase tracking-tighter leading-none mb-4 pointer-events-none">
          welcome into our <br />
          <span className="text-[#0F5E3C] italic relative">
            house of creativity
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              className="absolute bottom-0 left-0 h-4 bg-[#8CF2C6]/30 -z-10"
            />
          </span>
        </h2>
      </div>
    </section>
  );
};

const ProcessSection = () => {
  const steps = [
    {
      id: "01",
      title: "Create",
      accent: "CREATIVE",
      items: [
        {
          label: "Personalized Content",
          desc: "We create customised creative solutions for all of our clients, and visuals that are aligned to their specific needs.",
        },
        {
          label: "Storytelling",
          desc: "Every great creative campaign has a compelling story at its core. We build narratives that engage emotions and connect with the audience in meaningful ways.",
        },
        {
          label: "Consistency in Branding",
          desc: "We ensure that the branding you create is consistent across all platforms, whether it's for social media, print, or digital experiences.",
        },
      ],
    },
    {
      id: "02",
      title: "Connect",
      accent: "STRATEGIC",
      items: [
        {
          label: "Who is your audience?",
          desc: "We dive deep into audience insights. What are their pain points? What excites them? Develop campaigns accordingly that speak directly to their hearts & needs.",
        },
        {
          label: "Collaboration & Partnerships",
          desc: "We try to network and collaborate with other professionals, influencers, and brands that share your values. This expands your reach and fosters opportunities for mutual growth.",
        },
        {
          label: "Multi-channel Strategy",
          desc: "Don't limit your connection to one platform. Utilize various channels (social media, email, content marketing, paid ads, etc.) to build a broader network and connect with different types of audiences.",
        },
      ],
    },
    {
      id: "03",
      title: "Convert",
      accent: "DATA-DRIVEN",
      items: [
        {
          label: "Clear Call-to-Action (CTA)",
          desc: "Whether it's a sign-up button, a product purchase, or downloading a free resource, we always include a direct and clear CTA that encourages users to take the next step.",
        },
        {
          label: "Optimize User Experience (UX)",
          desc: "Ensuring websites, landing pages, and social media profiles are user-friendly, easy to navigate, and optimized for mobile devices.",
        },
        {
          label: "Data-Driven Decisions",
          desc: "We use analytics to measure the success of campaigns and adjust strategies accordingly. Tracking conversions (sales, leads, sign-ups) will help refine your approach for better results.",
        },
      ],
    },
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-[#050505] text-[#F0F0F0] relative z-20 overflow-hidden">
      <div className="max-w-[1800px] mx-auto text-center mb-32">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-[#8CF2C6] font-mono text-xs uppercase tracking-[0.3em] mb-4 block"
        >
          Workflow
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-[8vw] font-black uppercase tracking-tighter leading-none"
        >
          Our Process
        </motion.h2>
      </div>

      <div className="max-w-[1700px] mx-auto grid lg:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: i * 0.15,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
            className="group relative border border-white/10 p-12 hover:border-[#8CF2C6]/50 transition-colors bg-white/[0.02] hover:bg-white/[0.04] rounded-[2rem] overflow-hidden backdrop-blur-sm"
          >
            <div className="absolute top-8 right-8 text-6xl font-black text-white/[0.03] group-hover:text-[#8CF2C6]/5 transition-colors">
              {step.id}
            </div>

            <div className="relative z-10 h-full flex flex-col">
              <span className="text-[#8CF2C6] font-mono text-[10px] tracking-widest uppercase mb-6 px-3 py-1 border border-[#8CF2C6]/30 w-fit rounded-full group-hover:bg-[#8CF2C6] group-hover:text-black transition-all">
                {step.accent}
              </span>
              <h3 className="text-5xl font-black uppercase tracking-tighter mb-16 group-hover:translate-x-2 transition-transform">
                {step.title}
              </h3>

              <div className="space-y-12 flex-grow">
                {step.items.map((item, idx) => (
                  <div key={idx} className="space-y-3">
                    <h4 className="text-lg font-bold text-white uppercase flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-[#8CF2C6] rounded-full shadow-[0_0_10px_#8CF2C6]" />
                      {item.label}
                    </h4>
                    <p className="text-neutral-500 leading-relaxed font-light text-sm group-hover:text-neutral-300 transition-colors">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Mission = () => (
  <section className="py-32 md:py-48 px-6 md:px-12 bg-[#050505] text-[#F0F0F0] border-b border-white/10 relative z-10">
    <div className="max-w-[1800px] mx-auto grid md:grid-cols-2 gap-24">
      <div>
        <span className="text-[#8CF2C6] font-mono text-sm tracking-widest uppercase block mb-8">
          Wait, what do you guys actually do??
        </span>
        <h2 className="text-5xl md:text-7xl font-bold leading-[1.1] uppercase tracking-tight">
          We're not your <span className="text-[#0F5E3C]">typical</span>{" "}
          marketing agency.
        </h2>
      </div>
      <div className="flex flex-col justify-end">
        <p className="text-xl md:text-2xl text-neutral-400 font-light leading-relaxed mb-12">
          We're folks madly in love with design, storytelling, strategy, and
          production. We are building brands that don't just exist, but actually
          connect.
        </p>
        <div className="flex gap-12">
          <div className="flex flex-col">
            <span className="text-4xl font-bold text-white mb-2">50+</span>
            <span className="text-[#8CF2C6] text-xs uppercase tracking-widest">
              Global Clients
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-bold text-white mb-2">200%</span>
            <span className="text-[#8CF2C6] text-xs uppercase tracking-widest">
              Avg ROI Increase
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const StickyProject = ({ title, category, img, index, onClick }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start", "end start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.4, 1], [1.2, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <motion.div
      ref={container}
      style={{ opacity }}
      className="sticky top-0 h-screen flex items-center justify-center overflow-hidden border-t border-white/5 bg-[#050505] z-0 cursor-pointer group"
      onClick={onClick}
    >
      <motion.div style={{ scale, y }} className="absolute inset-0 z-0">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover opacity-30 grayscale hover:grayscale-0 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50" />
      </motion.div>

      <div className="relative z-10 w-full max-w-[1800px] px-6 md:px-12 flex flex-col md:flex-row justify-between items-center h-full pt-32 pb-24 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-[#8CF2C6] font-mono text-xl mb-4 block"
          >
            0{index + 1} / {category}
          </motion.span>
          <h2 className="text-[12vw] leading-[0.8] font-black text-white uppercase tracking-tighter mix-blend-difference group-hover:scale-[1.02] transition-transform duration-700">
            {title}
          </h2>
        </div>

        <div className="mt-12 md:mt-0">
          <button className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/20 text-white font-bold flex flex-col items-center justify-center hover:bg-[#8CF2C6] hover:text-black hover:border-[#8CF2C6] transition-all duration-500 overflow-hidden relative group/btn">
            <span className="relative z-10 text-xs uppercase tracking-widest mb-1">
              View
            </span>
            <ArrowUpRight size={32} className="relative z-10" />
            <motion.div className="absolute inset-0 bg-[#8CF2C6] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ServiceRow = ({ title, items, setModal, isExpanded, toggleExpand }) => (
  <div
    className="group relative border-t border-[#F0F0F0]/20 py-16 px-6 md:px-12 transition-colors duration-500 cursor-pointer"
    onMouseEnter={(e) => setModal && setModal({ active: true, index: title })}
    onMouseLeave={(e) => setModal && setModal({ active: false, index: null })}
    onClick={toggleExpand}
  >
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
      <h3 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4 md:mb-0 group-hover:text-[#8CF2C6] transition-colors">
        {title}
      </h3>
      <div className="flex flex-wrap gap-4 md:gap-8 opacity-50 group-hover:opacity-100 transition-opacity">
        {items.slice(0, 3).map((i) => (
          <span
            key={i}
            className="font-mono text-xs md:text-sm uppercase tracking-widest border border-current px-3 py-1 rounded-full"
          >
            {i}
          </span>
        ))}
      </div>
    </div>

    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={TRANSITION}
          className="overflow-hidden"
        >
          <div className="pt-12 grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-xl text-neutral-400 leading-relaxed mb-6">
                Detailed breakdown of {title}. We bring deep expertise to ensure
                every aspect is covered, from initial strategy to final
                execution.
              </p>
              <ul className="space-y-4">
                {items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white">
                    <CheckCircle size={16} className="text-[#8CF2C6]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="h-64 bg-neutral-900 rounded-lg border border-white/10 flex items-center justify-center">
              <span className="text-[#8CF2C6] font-mono text-sm uppercase">
                Service Showcase Image
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const ClientsListing = () => {
  const clients = [
    "Ravasa Retreat",
    "Varun Engineers",
    "Anand Om Prakash Jewellers",
    "Thakitha Thakitha",
    "Vihari Projects",
    "Oryza Farmlands",
    "Globus IT",
    "Arbor Rd Estate",
    "Voxela",
    "Happy Events",
    "GN Caters",
    "Es Enterprises",
    "SVD",
    "Jaspire Foreign Education",
    "Zargold",
    "One ENT",
    "Remedy Hospitals",
    "DailyMed",
    "Nyra Farms",
    "Troika",
    "Fruit Bandi",
    "Sannidi Emerald",
    "Secret Ping",
    "Terracoat",
    "Gruham",
    "Split Be",
  ];

  return (
    <section className="bg-[#050505] text-[#F0F0F0] py-32 border-t border-white/10 relative z-10">
      <div className="px-6 md:px-12 mb-20 max-w-[1800px] mx-auto">
        <span className="text-[#8CF2C6] font-mono text-sm tracking-widest uppercase block mb-4">
          Network
        </span>
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
          Clients who <br />
          loved us
        </h2>
      </div>
      <div className="px-6 md:px-12 max-w-[1800px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-0 border-l border-t border-white/10">
          {clients.map((client, i) => (
            <div
              key={i}
              className="border-r border-b border-white/10 p-8 md:p-12 hover:bg-[#0F5E3C] transition-colors group"
            >
              <p className="text-lg md:text-xl font-bold uppercase tracking-tighter text-white/40 group-hover:text-white transition-colors">
                {client}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* --- FULL PAGES --- */

const ProjectDetailPage = ({ project, onBack, setPage }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
    className="pt-32 bg-[#050505] min-h-screen"
  >
    <div className="px-6 md:px-12 mb-12">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#8CF2C6] uppercase tracking-widest font-bold text-sm hover:text-white transition-colors mb-8"
      >
        <ChevronLeft size={16} /> Back to Work
      </button>
      <h1 className="text-[10vw] font-black uppercase text-[#F0F0F0] leading-[0.85] mb-8">
        {project.title}
      </h1>
      <div className="flex flex-wrap gap-4 mb-12">
        <span className="px-4 py-1 border border-[#8CF2C6] rounded-full text-[#8CF2C6] text-sm uppercase font-bold tracking-widest">
          {project.category}
        </span>
        <span className="px-4 py-1 border border-white/20 rounded-full text-white text-sm uppercase font-bold tracking-widest">
          2023
        </span>
        <span className="px-4 py-1 border border-white/20 rounded-full text-white text-sm uppercase font-bold tracking-widest">
          Case Study
        </span>
      </div>
    </div>

    <div className="w-full h-[60vh] md:h-[80vh] bg-neutral-800 mb-24 relative overflow-hidden">
      <img
        src={project.img}
        alt={project.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20"></div>
    </div>

    <div className="max-w-[1800px] mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-16 mb-32">
      <div className="md:col-span-1">
        <h3 className="text-[#8CF2C6] font-mono uppercase tracking-widest mb-6">
          The Challenge
        </h3>
        <p className="text-neutral-400 text-lg leading-relaxed">
          To redefine the digital presence of {project.title} by merging
          brutalist aesthetics with high-conversion functionality. The goal was
          to create an immersive experience that stands out in a saturated
          market.
        </p>
      </div>
      <div className="md:col-span-1">
        <h3 className="text-[#8CF2C6] font-mono uppercase tracking-widest mb-6">
          The Solution
        </h3>
        <p className="text-neutral-400 text-lg leading-relaxed">
          We implemented a headless architecture using React and WebGL to ensure
          lightning-fast performance while delivering rich visual interactions.
          The design system focuses on bold typography and strategic negative
          space.
        </p>
      </div>
      <div className="md:col-span-1">
        <h3 className="text-[#8CF2C6] font-mono uppercase tracking-widest mb-6">
          Services
        </h3>
        <ul className="space-y-2 text-white text-lg">
          <li>Strategy & Positioning</li>
          <li>UI/UX Design</li>
          <li>Full-Stack Development</li>
          <li>Motion Graphics</li>
        </ul>
      </div>
    </div>

    <div className="w-full bg-[#0F5E3C] py-32 px-6 md:px-12 text-center">
      <h2 className="text-4xl md:text-6xl font-black uppercase text-[#050505] mb-8">
        Ready to Build?
      </h2>
      <button
        onClick={() => setPage("contact")}
        className="px-12 py-4 bg-[#050505] text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
      >
        Start Your Project
      </button>
    </div>

    <StandardFooterContent />
  </motion.div>
);

const HomePage = ({ setPage, setSelectedProject }) => {
  const [modal, setModal] = useState({ active: false, index: null });
  const modalContainer = useRef(null);
  const projects = [
    {
      title: "Neon Bank",
      category: "Fintech",
      img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=1600",
    },
    {
      title: "Vortex",
      category: "Web3",
      img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600",
    },
    {
      title: "Ascend",
      category: "Fashion",
      img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1600",
    },
  ];
  // Expanded Services for Home Page
  const services = [
    {
      title: "Strategy",
      items: ["Brand Identity", "Content", "SEO", "Market Research"],
    },
    { title: "Design", items: ["UI/UX", "Motion", "3D", "Art Direction"] },
    { title: "Tech", items: ["React", "WebGL", "Native Apps", "E-Commerce"] },
  ];

  useEffect(() => {
    const moveContainerX = (x) => {
      if (modalContainer.current) modalContainer.current.style.left = `${x}px`;
    };
    const moveContainerY = (y) => {
      if (modalContainer.current) modalContainer.current.style.top = `${y}px`;
    };
    const handleMove = (e) => {
      moveContainerX(e.clientX);
      moveContainerY(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const [expandedService, setExpandedService] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setPage("project-detail");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero setPage={setPage} />
      <Mission />
      <Marquee />
      <CreativeHouse />
      <ProcessSection />
      <div className="bg-[#050505]">
        {projects.map((p, i) => (
          <StickyProject
            key={i}
            index={i}
            {...p}
            onClick={() => handleProjectClick(p)}
          />
        ))}
      </div>
      <section className="bg-[#050505] text-[#F0F0F0] py-32 relative z-20">
        <div className="px-6 md:px-12 mb-20">
          <span className="text-[#8CF2C6] font-mono text-sm tracking-widest uppercase block mb-4">
            Capabilities
          </span>
          <h2 className="text-4xl font-bold uppercase tracking-tight">
            Full Spectrum
            <br /> Digital Engineering
          </h2>
        </div>
        {services.map((s, i) => (
          <ServiceRow
            key={i}
            title={s.title}
            items={s.items}
            setModal={setModal}
            isExpanded={expandedService === i}
            toggleExpand={() =>
              setExpandedService(expandedService === i ? null : i)
            }
          />
        ))}
        <motion.div
          ref={modalContainer}
          variants={{
            open: { scale: 1, opacity: 1 },
            closed: { scale: 0, opacity: 0 },
          }}
          animate={modal.active ? "open" : "closed"}
          className="fixed top-0 left-0 w-[140px] h-[140px] pointer-events-none overflow-hidden z-30 hidden md:flex items-center justify-center bg-[#8CF2C6] rounded-full"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <span className="text-black font-black uppercase text-lg">
            Click View
          </span>
        </motion.div>
      </section>
      <ClientsListing />
      <FAQ />
      <BigFooter setPage={setPage} />
    </motion.div>
  );
};

const WorkPage = ({ setPage, setSelectedProject }) => {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Fintech", "Web3", "Fashion", "Tech", "Branding"];
  const allProjects = [
    {
      title: "Neon Bank",
      category: "Fintech",
      img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=1600",
    },
    {
      title: "Vortex",
      category: "Web3",
      img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600",
    },
    {
      title: "Ascend",
      category: "Fashion",
      img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1600",
    },
    {
      title: "Onyx",
      category: "Tech",
      img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600",
    },
    {
      title: "Flux",
      category: "Web3",
      img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1600",
    },
    {
      title: "Velvet",
      category: "Fashion",
      img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=1600",
    },
    {
      title: "Lumina",
      category: "Branding",
      img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1600",
    },
  ];

  const filtered =
    filter === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === filter);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setPage("project-detail");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 bg-[#050505] min-h-screen"
    >
      <div className="px-6 md:px-12 mb-20">
        <h1 className="text-[12vw] font-black uppercase text-[#F0F0F0] leading-none mb-12">
          Archive
        </h1>
        <div className="flex flex-wrap gap-4">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-full border border-white/20 uppercase tracking-widest text-sm font-bold transition-all ${filter === f ? "bg-[#8CF2C6] text-black border-[#8CF2C6]" : "text-white hover:bg-white/10"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8 px-6 md:px-12 pb-32">
        {filtered.map((p, i) => (
          <motion.div
            layout
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            key={i}
            className="group relative aspect-[4/3] overflow-hidden bg-neutral-900 cursor-pointer"
            onClick={() => handleProjectClick(p)}
          >
            <img
              src={p.img}
              alt={p.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
            />
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <h3 className="text-3xl font-black text-white uppercase">
                {p.title}
              </h3>
              <p className="text-[#8CF2C6] font-mono text-sm">{p.category}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <BigFooter setPage={setPage} />
    </motion.div>
  );
};

const ServicesPage = ({ setPage }) => {
  // Full Comprehensive Services List
  const fullServices = [
    {
      icon: PenTool,
      title: "Branding",
      desc: "Crafting distinct visual identities.",
      items: [
        "Logo Design",
        "Visual Identity",
        "Brand Guidelines",
        "Rebranding",
        "Tone of Voice",
        "Print Design",
      ],
    },
    {
      icon: Layers,
      title: "UI/UX Design",
      desc: "User-centric digital experiences.",
      items: [
        "User Research",
        "Wireframing",
        "Prototyping",
        "Design Systems",
        "App Design",
        "Web Design",
      ],
    },
    {
      icon: Code,
      title: "Development",
      desc: "Robust, scalable code.",
      items: [
        "React/Next.js",
        "Headless CMS",
        "E-commerce (Shopify)",
        "Mobile Apps (iOS/Android)",
        "API Integration",
        "WebGL",
      ],
    },
    {
      icon: Megaphone,
      title: "Digital Marketing",
      desc: "Growth and performance.",
      items: [
        "SEO",
        "PPC/SEM",
        "Social Media Strategy",
        "Email Marketing",
        "Influencer Campaigns",
        "Analytics",
      ],
    },
    {
      icon: Pen,
      title: "Content",
      desc: "Storytelling that sells.",
      items: [
        "Copywriting",
        "Blog Writing",
        "Scriptwriting",
        "Video Production",
        "Photography",
        "Motion Graphics",
      ],
    },
    {
      icon: Search,
      title: "Consultancy",
      desc: "Strategic digital transformation.",
      items: [
        "Tech Audit",
        "Digital Strategy",
        "Market Analysis",
        "Product Roadmap",
      ],
    },
  ];

  const [expandedService, setExpandedService] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 bg-[#050505] min-h-screen"
    >
      <div className="px-6 md:px-12 mb-24">
        <h1 className="text-[12vw] font-black uppercase text-[#F0F0F0] leading-none mb-8">
          Offerings
        </h1>
        <p className="text-2xl text-neutral-400 max-w-2xl font-light">
          We provide a comprehensive suite of digital services designed to scale
          ambitious brands, from identity to infrastructure.
        </p>
      </div>
      <div className="w-full border-t border-white/20">
        {fullServices.map((s, i) => (
          <div
            key={i}
            className="px-6 md:px-12 py-16 border-b border-white/20 hover:bg-[#0F5E3C] transition-colors group cursor-pointer"
            onClick={() => setExpandedService(expandedService === i ? null : i)}
          >
            <div className="flex flex-col md:flex-row md:items-start gap-8">
              <s.icon
                size={48}
                className="text-[#8CF2C6] mb-4 md:mb-0"
                strokeWidth={1}
              />
              <div className="w-full">
                <div className="flex justify-between items-center w-full">
                  <h2 className="text-4xl md:text-6xl font-black uppercase text-white mb-6 group-hover:translate-x-4 transition-transform">
                    {s.title}
                  </h2>
                  <Plus
                    className={`text-[#8CF2C6] transition-transform duration-300 ${expandedService === i ? "rotate-45" : ""}`}
                    size={48}
                  />
                </div>
                <p className="text-xl text-neutral-400 group-hover:text-[#8CF2C6] max-w-3xl leading-relaxed">
                  {s.desc}
                </p>

                <AnimatePresence>
                  {expandedService === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={TRANSITION}
                      className="overflow-hidden mt-8 pt-8 border-t border-white/10"
                    >
                      <div className="grid md:grid-cols-2 gap-4">
                        {s.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 text-white text-lg"
                          >
                            <CheckCircle size={20} className="text-[#8CF2C6]" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        ))}
      </div>
      <FAQ />
      <BigFooter setPage={setPage} />
    </motion.div>
  );
};

const AboutPage = ({ setPage }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 bg-[#050505] min-h-screen"
    >
      <div className="px-6 md:px-12 mb-24">
        <h1 className="text-[12vw] font-black uppercase text-[#F0F0F0] leading-none mb-12">
          About Us
        </h1>
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div>
              <h3 className="text-[#8CF2C6] font-mono uppercase tracking-widest mb-6">
                The Origin
              </h3>
              <p className="text-3xl text-white font-bold leading-tight mb-8">
                We're CUCU Advertising. <br />
                <span className="text-[#8CF2C6] text-xl font-mono uppercase">
                  Client to User with Creative Understanding
                </span>
              </p>
              <p className="text-xl text-neutral-400 leading-relaxed space-y-4">
                Advertising is a bridge between Client to User. That's the
                connection we build every single day. So we took the prefix:{" "}
                <span className="text-white font-bold">CU</span>.
                <br />
                <br />
                But we don't just connect, we do it with the Creative
                Understanding of the brand. Again we took this prefix:{" "}
                <span className="text-white font-bold">CU</span>.
              </p>
            </div>
            <div className="p-8 border border-white/10 bg-white/5 rounded-2xl">
              <h3 className="text-[#8CF2C6] font-mono uppercase tracking-widest mb-6">
                Visual Symmetry
              </h3>
              <div className="flex items-center gap-12 mb-8">
                <div className="text-6xl font-black text-white flex flex-col items-center">
                  <span>C</span>
                  <ArrowRight className="rotate-90 text-[#8CF2C6] my-2" />
                  <span className="scale-y-[-1]">U</span>
                </div>
                <div className="text-6xl font-black text-white flex flex-col items-center">
                  <span>U</span>
                  <ArrowRight className="rotate-90 text-[#8CF2C6] my-2" />
                  <span className="scale-y-[-1]">C</span>
                </div>
              </div>
              <p className="text-lg text-neutral-400 italic">
                Flip a C—it becomes a U. Flip a U—it becomes a C. <br />
                Now that’s visual symmetry. The connection, right there in the
                letters.
              </p>
            </div>
          </div>

          <div className="space-y-12 flex flex-col justify-center">
            <div className="relative">
              <div className="absolute -left-8 top-0 w-1 h-full bg-[#0F5E3C]" />
              <h3 className="text-[#8CF2C6] font-mono uppercase tracking-widest mb-6 pl-8">
                The Visionary
              </h3>
              <p className="text-2xl text-neutral-300 leading-relaxed pl-8 mb-12">
                "Talking to Arvind feels less like a pitch meeting and more like
                grabbing coffee with someone who genuinely gets it."
              </p>
              <div className="pl-8 space-y-6">
                <p className="text-lg text-neutral-500 leading-relaxed">
                  All of this was from the head of{" "}
                  <span className="text-white font-bold">Arvind Arandkar</span>,
                  our founder. He listens. He connects dots you didn't even know
                  existed and he's always up for a good conversation about
                  pretty much anything creative.
                </p>
                <p className="text-lg text-neutral-500 leading-relaxed">
                  That's the energy behind CUCU. That's who you're working with.
                </p>
              </div>
            </div>

            <div className="bg-[#0F5E3C] p-12 rounded-3xl mt-12">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-16 h-16 bg-[#8CF2C6] rounded-full flex items-center justify-center">
                  <Users className="text-[#050505]" size={32} />
                </div>
                <h4 className="text-2xl font-black uppercase text-[#050505]">
                  Work with us
                </h4>
              </div>
              <p className="text-[#050505] text-lg font-bold mb-8">
                Ready to build that bridge between your brand and your users?
              </p>
              <button
                onClick={() => setPage("contact")}
                className="w-full py-4 bg-[#050505] text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </div>

      <BigFooter setPage={setPage} />
    </motion.div>
  );
};

const ContactPage = ({ setPage }) => {
  const [status, setStatus] = useState("idle"); // idle, submitting, success
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 bg-[#050505] min-h-screen flex flex-col"
    >
      <div className="px-6 md:px-12 flex-grow flex flex-col items-center pb-24">
        <div className="max-w-6xl w-full">
          <div className="mb-20 text-center md:text-left">
            <h1 className="text-4xl md:text-7xl font-black uppercase text-white leading-tight mb-8">
              Tired of agencies that talk <br className="hidden md:block" />
              big but deliver small?
            </h1>
            <p className="text-xl md:text-2xl text-[#8CF2C6] font-bold">
              We're here to make your brand actually connect.
            </p>
          </div>

          <div className="bg-[#FFBD12] p-8 md:p-16 border-[4px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden mb-24">
            {status === "success" ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center relative z-10 py-12"
              >
                <CheckCircle size={80} className="text-black mb-6" />
                <h3 className="text-4xl font-black text-black uppercase mb-4">
                  Message Sent
                </h3>
                <p className="text-black/80 font-bold mb-8 text-xl">
                  We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-black font-black underline uppercase tracking-widest"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <input
                      required
                      type="text"
                      className="w-full bg-transparent border-2 border-black p-4 text-black placeholder:text-black/60 font-bold outline-none focus:bg-white/10 transition-colors"
                      placeholder="Name*"
                    />
                  </div>
                  <div className="space-y-2">
                    <input
                      required
                      type="email"
                      className="w-full bg-transparent border-2 border-black p-4 text-black placeholder:text-black/60 font-bold outline-none focus:bg-white/10 transition-colors"
                      placeholder="Email*"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <input
                      required
                      type="tel"
                      className="w-full bg-transparent border-2 border-black p-4 text-black placeholder:text-black/60 font-bold outline-none focus:bg-white/10 transition-colors"
                      placeholder="Phone Number*"
                    />
                  </div>
                  <div className="space-y-2">
                    <input
                      type="text"
                      className="w-full bg-transparent border-2 border-black p-4 text-black placeholder:text-black/60 font-bold outline-none focus:bg-white/10 transition-colors"
                      placeholder="Location"
                    />
                  </div>
                </div>
                <div className="space-y-2 relative">
                  <textarea
                    required
                    rows="4"
                    className="w-full bg-transparent border-2 border-black p-4 text-black placeholder:text-black/60 font-bold outline-none focus:bg-white/10 transition-colors resize-none"
                    placeholder="How can we help?"
                  ></textarea>
                  <button
                    disabled={status === "submitting"}
                    type="submit"
                    className="absolute -bottom-10 -right-10 md:-right-20 w-32 h-32 bg-neutral-200 border-[4px] border-black rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group"
                  >
                    {status === "submitting" ? (
                      <Loader2 className="animate-spin text-black" size={48} />
                    ) : (
                      <ArrowRight
                        className="text-black transition-transform group-hover:translate-x-2"
                        size={48}
                      />
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-12 mt-32 border-t border-white/10 pt-16">
            <div className="flex flex-col md:flex-row gap-8 md:items-center">
              <div className="w-1 h-16 bg-[#FFBD12] hidden md:block" />
              <div>
                <h4 className="text-black md:text-white font-black uppercase tracking-widest mb-2 bg-[#FFBD12] md:bg-transparent px-4 md:px-0 py-1 inline-block">
                  Business Enquiries
                </h4>
                <p className="text-2xl text-white font-bold hover:text-[#FFBD12] transition-colors cursor-pointer">
                  hello@cucuadvertising.com
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8 md:items-center">
              <div className="w-1 h-16 bg-[#FFBD12] hidden md:block" />
              <div>
                <h4 className="text-black md:text-white font-black uppercase tracking-widest mb-2 bg-[#FFBD12] md:bg-transparent px-4 md:px-0 py-1 inline-block">
                  Career Opportunities
                </h4>
                <p className="text-2xl text-white font-bold hover:text-[#FFBD12] transition-colors cursor-pointer">
                  coffee@cucuadvertising.com
                </p>
              </div>
            </div>
          </div>

          <div className="mt-24 text-center">
            <h2 className="text-3xl md:text-5xl font-black uppercase text-white leading-tight">
              Ready to start? <br />
              <span className="text-[#FFBD12]">
                Because once we do, there's no looking back.
              </span>
            </h2>
          </div>
        </div>
      </div>

      {/* Standard Footer for Contact Page */}
      <div className="bg-[#050505] p-6 md:p-12 border-t border-white/10">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-end w-full">
          <div className="flex gap-12 mb-8 md:mb-0">
            <a
              href="https://www.facebook.com/profile.php?id=61551579710039"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-lg md:text-xl uppercase tracking-widest hover:text-white transition-colors"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/cucuadvertising/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-lg md:text-xl uppercase tracking-widest hover:text-white transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/company/cucuadvertsing/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-lg md:text-xl uppercase tracking-widest hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=919440417034"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-lg md:text-xl uppercase tracking-widest hover:text-white transition-colors"
            >
              WhatsApp
            </a>
          </div>
          <div className="text-right">
            <p className="font-mono text-sm uppercase font-bold text-[#F0F0F0]">
              © 2023 Cucu Advertising
            </p>
            <p className="font-mono text-sm uppercase opacity-70 text-[#F0F0F0]">
              Bangalore • Mumbai • Hyderabad
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* --- MAIN APP --- */

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="font-sans bg-[#050505] min-h-screen text-[#F0F0F0] selection:bg-[#8CF2C6] selection:text-[#050505] overflow-x-hidden noise">
      <Cursor />
      <Navbar activePage={page} setPage={setPage} />

      <AnimatePresence mode="wait">
        {page === "home" && (
          <HomePage
            key="home"
            setPage={setPage}
            setSelectedProject={setSelectedProject}
          />
        )}
        {page === "work" && (
          <WorkPage
            key="work"
            setPage={setPage}
            setSelectedProject={setSelectedProject}
          />
        )}
        {page === "services" && (
          <ServicesPage key="services" setPage={setPage} />
        )}
        {page === "about" && <AboutPage key="about" setPage={setPage} />}
        {page === "contact" && <ContactPage key="contact" setPage={setPage} />}
        {page === "project-detail" && selectedProject && (
          <ProjectDetailPage
            key="project-detail"
            project={selectedProject}
            onBack={() => setPage("work")}
            setPage={setPage}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
