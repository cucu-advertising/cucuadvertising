import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, X, ArrowRight, ArrowUpRight, Globe, Zap, Layers,
  Smartphone, Mail, Instagram, Linkedin, Twitter, MoveRight,
  CheckCircle, Loader2, MapPin, Phone, Plus, Users, Target, PenTool,
  Lightbulb, Rocket, BarChart3, MessageSquare, Video, Search, Code,
  Megaphone, Pen, ChevronLeft
} from 'lucide-react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
  useMotionValue,
  useVelocity
} from 'framer-motion';

/* --- THEME & CONFIG --- */
const COLORS = {
  primary: '#0F5E3C', // Deep Forest Green
  accent: '#8CF2C6',  // Mint Green
  black: '#050505',
  white: '#F0F0F0',
};

const TRANSITION = { duration: 0.7, ease: [0.22, 1, 0.36, 1] };

/* --- MOTION PRIMITIVES --- */

const Cursor = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springConfig = { damping: 20, stiffness: 400 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-[#8CF2C6] rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{ x: cursorX, y: cursorY }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#8CF2C6] rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{ x: cursorX, y: cursorY, translateX: 12, translateY: 12 }}
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
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(baseX, (v) => `${v}%`);
  const directionFactor = useRef(1);

  useEffect(() => {
    let lastTime = performance.now();
    const update = (time) => {
      const delta = time - lastTime;
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
      if (velocityFactor.get() < 0) { directionFactor.current = -1; }
      else if (velocityFactor.get() > 0) { directionFactor.current = 1; }
      moveBy += directionFactor.current * moveBy * velocityFactor.get();

      // Wrap the value between -25 and 0 to prevent overflow while keeping it seamless
      let nextBaseX = baseX.get() + moveBy;
      if (nextBaseX <= -25) nextBaseX = 0;
      if (nextBaseX > 0) nextBaseX = -25;
      baseX.set(nextBaseX);

      lastTime = time;
      requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }, []);

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap">
      <motion.div className="flex whitespace-nowrap text-[15vw] font-black uppercase leading-none tracking-tighter text-[#8CF2C6]/20" style={{ x }}>
        {[...Array(4)].map((_, i) => <span key={i} className="block mr-12">{children} </span>)}
      </motion.div>
    </div>
  );
};

/* --- GLOBAL COMPONENTS --- */

const Navbar = ({ activePage, setPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const links = ['home', 'work', 'services', 'about', 'contact'];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] py-4 md:py-6 px-8 md:px-12 flex justify-between items-center transition-all duration-500 ${scrolled ? 'bg-[#050505] border-b border-white/10 shadow-2xl' : 'bg-transparent'
          }`}
      >
        <button
          onClick={() => setPage('home')}
          className="text-2xl font-black tracking-tighter hover:text-[#8CF2C6] transition-colors pointer-events-auto text-[#F0F0F0]"
        >
          CUCU<span className="text-[#8CF2C6]">.</span>
        </button>
        <div className="hidden md:flex gap-12 items-center">
          {links.filter(l => l !== 'home').map(link => (
            <button
              key={link}
              onClick={() => setPage(link)}
              className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors ${activePage === link ? 'text-[#8CF2C6]' : 'text-white/60 hover:text-white'}`}
            >
              {link}
            </button>
          ))}
        </div>
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
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
            <button className="absolute top-8 right-8 text-white" onClick={() => setIsOpen(false)}><X size={32} /></button>
            {links.map(link => (
              <button
                key={link}
                onClick={() => { setPage(link); setIsOpen(false); }}
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
    { q: "What is your typical project timeline?", a: "Project timelines vary by scope. A typical comprehensive brand and web overhaul takes 8-12 weeks from discovery to launch." },
    { q: "Do you work with startups?", a: "Yes. We partner with ambitious startups (Series A+) that understand the value of brand capital and scalable infrastructure." },
    { q: "What is your pricing model?", a: "We operate on a project-fee basis for clear deliverables, or monthly retainers for ongoing growth partnerships. Minimum engagement starts at $15k." },
    { q: "Do you handle hosting and maintenance?", a: "We deploy on enterprise-grade infrastructure (Vercel/AWS) and offer maintenance packages to keep your digital estate secure." }
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-[#050505] border-t border-white/10 relative z-10">
      <div className="max-w-[1800px] mx-auto grid lg:grid-cols-2 gap-16">
        <div className="sticky top-32 h-fit">
          <span className="text-[#8CF2C6] font-mono text-sm tracking-widest uppercase block mb-8">Common Queries</span>
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
                <span className="text-xl md:text-2xl font-bold text-white group-hover:text-[#8CF2C6] transition-colors pr-8">{faq.q}</span>
                <span className={`text-[#8CF2C6] transition-transform duration-300 ${openIndex === i ? 'rotate-45' : ''}`}>
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
                    <p className="pb-10 text-neutral-400 text-lg leading-relaxed max-w-2xl">{faq.a}</p>
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
      <a href="https://www.facebook.com/profile.php?id=61551579710039" target="_blank" rel="noopener noreferrer" className="font-bold text-lg md:text-xl uppercase tracking-widest hover:text-white transition-colors">Facebook</a>
      <a href="https://www.instagram.com/cucuadvertising/" target="_blank" rel="noopener noreferrer" className="font-bold text-lg md:text-xl uppercase tracking-widest hover:text-white transition-colors">Instagram</a>
      <a href="https://www.linkedin.com/company/cucuadvertsing/" target="_blank" rel="noopener noreferrer" className="font-bold text-lg md:text-xl uppercase tracking-widest hover:text-white transition-colors">LinkedIn</a>
      <a href="https://api.whatsapp.com/send?phone=919440417034" target="_blank" rel="noopener noreferrer" className="font-bold text-lg md:text-xl uppercase tracking-widest hover:text-white transition-colors">WhatsApp</a>
    </div>
    <div className="text-right">
      <p className="font-mono text-sm uppercase font-bold text-[#050505] md:text-[#050505]">© 2023 Cucu Advertising</p>
      <p className="font-mono text-sm uppercase opacity-70 text-[#050505] md:text-[#050505]">Karnataka • Tamil Nadu • Kerala</p>
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
          onClick={() => setPage('contact')}
          className="text-[18vw] font-black leading-none uppercase tracking-tighter text-white/10 hover:text-[#8CF2C6] transition-colors cursor-pointer"
        >
          Let's Talk
        </button>
      </div>

      <StandardFooterContent />
    </section>
  )
}

/* --- PAGE SECTIONS (HOME) --- */

const Hero = ({ setPage }) => (
  <section className="relative h-screen bg-[#050505] text-[#F0F0F0] overflow-hidden flex flex-col justify-center pt-32 pb-12 md:pb-24">
    <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[#0F5E3C]/10 rounded-full blur-[40px] pointer-events-none" />
    <div className="relative z-10 px-6 md:px-12 w-full max-w-[1800px] mx-auto">
      <h1 className="text-[12vw] lg:text-[11vw] leading-[0.85] font-black tracking-tighter uppercase mb-20 md:mb-24">
        <span className="block" style={{ marginLeft: '-0.5vw' }}>Intelligent</span>
        <span className="block text-[#0F5E3C] opacity-90" style={{ marginLeft: '10vw' }}>Digital</span>
        <span className="block text-transparent" style={{ marginLeft: '20vw', WebkitTextStroke: '1px rgba(140, 242, 198, 0.3)' }}>Growth</span>
      </h1>
      <div className="flex flex-col md:flex-row justify-between items-end gap-12">
        <div className="flex gap-6">
          <button onClick={() => setPage('work')} className="group relative px-8 py-4 bg-[#8CF2C6] text-black font-bold uppercase tracking-widest overflow-hidden transition-all hover:scale-105 active:scale-95">
            <span className="relative z-10 flex items-center gap-2">View Work <ArrowRight size={18} /></span>
          </button>
          <button onClick={() => setPage('services')} className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">Services</button>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-[#8CF2C6] font-mono text-sm tracking-widest uppercase mb-1">Est. 2023</p>
          <p className="text-white/40 font-mono text-xs uppercase tracking-widest">Global Creative Intelligence</p>
        </div>
      </div>
    </div>
  </section>
);

const Marquee = () => (
  <div className="py-24 bg-[#0F5E3C] text-[#050505] overflow-hidden relative z-10">
    <ParallaxText baseVelocity={-2}>Strategy Design Development Motion Branding</ParallaxText>
  </div>
);

const Mission = () => (
  <section className="py-32 md:py-48 px-6 md:px-12 bg-[#050505] text-[#F0F0F0] border-b border-white/10 relative z-10">
    <div className="max-w-[1800px] mx-auto grid md:grid-cols-2 gap-24">
      <div>
        <span className="text-[#8CF2C6] font-mono text-sm tracking-widest uppercase block mb-8">The Philosophy</span>
        <h2 className="text-5xl md:text-7xl font-bold leading-[1.1] uppercase tracking-tight">
          We eliminate the <span className="text-[#0F5E3C]">unnecessary</span> to amplify the <span className="italic text-[#8CF2C6]">essential</span>.
        </h2>
      </div>
      <div className="flex flex-col justify-end">
        <p className="text-xl md:text-2xl text-neutral-400 font-light leading-relaxed mb-12">
          In an era of digital noise, clarity is power. We build brands that speak less but say more, utilizing eco-conscious code and brutalist design principles to dominate markets.
        </p>
        <div className="flex gap-12">
          <div className="flex flex-col">
            <span className="text-4xl font-bold text-white mb-2">50+</span>
            <span className="text-[#8CF2C6] text-xs uppercase tracking-widest">Global Clients</span>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-bold text-white mb-2">200%</span>
            <span className="text-[#8CF2C6] text-xs uppercase tracking-widest">Avg ROI Increase</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const StickyProject = ({ title, category, img, index, onClick }) => (
  <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden border-t border-white/10 bg-[#050505] z-0 cursor-pointer" onClick={onClick}>
    <div className="absolute inset-0 z-0">
      <img src={img} alt={title} className="w-full h-full object-cover opacity-40 hover:scale-105 transition-transform duration-[1.5s]" />
    </div>
    <div className="relative z-10 w-full max-w-[1800px] px-6 md:px-12 flex flex-col md:flex-row justify-between items-end h-full pb-24 pointer-events-none">
      <div className="mb-12 md:mb-0">
        <span className="text-[#8CF2C6] font-mono text-xl mb-4 block">0{index + 1} / Case Study</span>
        <h2 className="text-[12vw] leading-[0.8] font-black text-white uppercase tracking-tighter opacity-40">{title}</h2>
      </div>
      <div className="pointer-events-auto">
        <button className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#8CF2C6] text-[#050505] font-bold flex items-center justify-center hover:scale-110 transition-transform shadow-2xl shadow-[#8CF2C6]/20">
          <ArrowUpRight size={48} />
        </button>
      </div>
    </div>
  </div>
);

const ServiceRow = ({ title, items, setModal, isExpanded, toggleExpand }) => (
  <div
    className="group relative border-t border-[#F0F0F0]/20 py-16 px-6 md:px-12 transition-colors duration-500 cursor-pointer"
    onMouseEnter={(e) => setModal && setModal({ active: true, index: title })}
    onMouseLeave={(e) => setModal && setModal({ active: false, index: null })}
    onClick={toggleExpand}
  >
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
      <h3 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4 md:mb-0 group-hover:text-[#8CF2C6] transition-colors">{title}</h3>
      <div className="flex flex-wrap gap-4 md:gap-8 opacity-50 group-hover:opacity-100 transition-opacity">
        {items.slice(0, 3).map(i => (
          <span key={i} className="font-mono text-xs md:text-sm uppercase tracking-widest border border-current px-3 py-1 rounded-full">{i}</span>
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
                Detailed breakdown of {title}. We bring deep expertise to ensure every aspect is covered, from initial strategy to final execution.
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
              <span className="text-[#8CF2C6] font-mono text-sm uppercase">Service Showcase Image</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

/* --- FULL PAGES --- */

const ProjectDetailPage = ({ project, onBack, setPage }) => (
  <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="pt-32 bg-[#050505] min-h-screen">
    <div className="px-6 md:px-12 mb-12">
      <button onClick={onBack} className="flex items-center gap-2 text-[#8CF2C6] uppercase tracking-widest font-bold text-sm hover:text-white transition-colors mb-8">
        <ChevronLeft size={16} /> Back to Work
      </button>
      <h1 className="text-[10vw] font-black uppercase text-[#F0F0F0] leading-[0.85] mb-8">{project.title}</h1>
      <div className="flex flex-wrap gap-4 mb-12">
        <span className="px-4 py-1 border border-[#8CF2C6] rounded-full text-[#8CF2C6] text-sm uppercase font-bold tracking-widest">{project.category}</span>
        <span className="px-4 py-1 border border-white/20 rounded-full text-white text-sm uppercase font-bold tracking-widest">2023</span>
        <span className="px-4 py-1 border border-white/20 rounded-full text-white text-sm uppercase font-bold tracking-widest">Case Study</span>
      </div>
    </div>

    <div className="w-full h-[60vh] md:h-[80vh] bg-neutral-800 mb-24 relative overflow-hidden">
      <img src={project.img} alt={project.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/20"></div>
    </div>

    <div className="max-w-[1800px] mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-16 mb-32">
      <div className="md:col-span-1">
        <h3 className="text-[#8CF2C6] font-mono uppercase tracking-widest mb-6">The Challenge</h3>
        <p className="text-neutral-400 text-lg leading-relaxed">
          To redefine the digital presence of {project.title} by merging brutalist aesthetics with high-conversion functionality. The goal was to create an immersive experience that stands out in a saturated market.
        </p>
      </div>
      <div className="md:col-span-1">
        <h3 className="text-[#8CF2C6] font-mono uppercase tracking-widest mb-6">The Solution</h3>
        <p className="text-neutral-400 text-lg leading-relaxed">
          We implemented a headless architecture using React and WebGL to ensure lightning-fast performance while delivering rich visual interactions. The design system focuses on bold typography and strategic negative space.
        </p>
      </div>
      <div className="md:col-span-1">
        <h3 className="text-[#8CF2C6] font-mono uppercase tracking-widest mb-6">Services</h3>
        <ul className="space-y-2 text-white text-lg">
          <li>Strategy & Positioning</li>
          <li>UI/UX Design</li>
          <li>Full-Stack Development</li>
          <li>Motion Graphics</li>
        </ul>
      </div>
    </div>

    <div className="w-full bg-[#0F5E3C] py-32 px-6 md:px-12 text-center">
      <h2 className="text-4xl md:text-6xl font-black uppercase text-[#050505] mb-8">Ready to Build?</h2>
      <button onClick={() => setPage('contact')} className="px-12 py-4 bg-[#050505] text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">Start Your Project</button>
    </div>

    <StandardFooterContent />
  </motion.div>
);

const HomePage = ({ setPage, setSelectedProject }) => {
  const [modal, setModal] = useState({ active: false, index: null });
  const modalContainer = useRef(null);
  const projects = [
    { title: "Neon Bank", category: "Fintech", img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=1600" },
    { title: "Vortex", category: "Web3", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600" },
    { title: "Ascend", category: "Fashion", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1600" }
  ];
  // Expanded Services for Home Page
  const services = [
    { title: "Strategy", items: ["Brand Identity", "Content", "SEO", "Market Research"] },
    { title: "Design", items: ["UI/UX", "Motion", "3D", "Art Direction"] },
    { title: "Tech", items: ["React", "WebGL", "Native Apps", "E-Commerce"] },
  ];

  useEffect(() => {
    const moveContainerX = (x) => { if (modalContainer.current) modalContainer.current.style.left = `${x}px`; }
    const moveContainerY = (y) => { if (modalContainer.current) modalContainer.current.style.top = `${y}px`; }
    const handleMove = (e) => { moveContainerX(e.clientX); moveContainerY(e.clientY); };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const [expandedService, setExpandedService] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setPage('project-detail');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Hero setPage={setPage} />
      <Mission />
      <Marquee />
      <div className="bg-[#050505]">
        {projects.map((p, i) => (
          <StickyProject key={i} index={i} {...p} onClick={() => handleProjectClick(p)} />
        ))}
      </div>
      <section className="bg-[#050505] text-[#F0F0F0] py-32 relative z-20">
        <div className="px-6 md:px-12 mb-20">
          <span className="text-[#8CF2C6] font-mono text-sm tracking-widest uppercase block mb-4">Capabilities</span>
          <h2 className="text-4xl font-bold uppercase tracking-tight">Full Spectrum<br /> Digital Engineering</h2>
        </div>
        {services.map((s, i) => (
          <ServiceRow
            key={i}
            title={s.title}
            items={s.items}
            setModal={setModal}
            isExpanded={expandedService === i}
            toggleExpand={() => setExpandedService(expandedService === i ? null : i)}
          />
        ))}
        <motion.div
          ref={modalContainer}
          variants={{
            open: { scale: 1, opacity: 1 },
            closed: { scale: 0, opacity: 0 }
          }}
          animate={modal.active ? "open" : "closed"}
          className="fixed top-0 left-0 w-[140px] h-[140px] pointer-events-none overflow-hidden z-30 hidden md:flex items-center justify-center bg-[#8CF2C6] rounded-full"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <span className="text-black font-black uppercase text-lg">Click View</span>
        </motion.div>
      </section>
      <FAQ />
      <BigFooter setPage={setPage} />
    </motion.div>
  );
}

const WorkPage = ({ setPage, setSelectedProject }) => {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Fintech", "Web3", "Fashion", "Tech", "Branding"];
  const allProjects = [
    { title: "Neon Bank", category: "Fintech", img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=1600" },
    { title: "Vortex", category: "Web3", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600" },
    { title: "Ascend", category: "Fashion", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1600" },
    { title: "Onyx", category: "Tech", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600" },
    { title: "Flux", category: "Web3", img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1600" },
    { title: "Velvet", category: "Fashion", img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=1600" },
    { title: "Lumina", category: "Branding", img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1600" },
  ];

  const filtered = filter === "All" ? allProjects : allProjects.filter(p => p.category === filter);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setPage('project-detail');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-32 bg-[#050505] min-h-screen">
      <div className="px-6 md:px-12 mb-20">
        <h1 className="text-[12vw] font-black uppercase text-[#F0F0F0] leading-none mb-12">Archive</h1>
        <div className="flex flex-wrap gap-4">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-full border border-white/20 uppercase tracking-widest text-sm font-bold transition-all ${filter === f ? 'bg-[#8CF2C6] text-black border-[#8CF2C6]' : 'text-white hover:bg-white/10'}`}
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
            <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <h3 className="text-3xl font-black text-white uppercase">{p.title}</h3>
              <p className="text-[#8CF2C6] font-mono text-sm">{p.category}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <BigFooter setPage={setPage} />
    </motion.div>
  );
}

const ServicesPage = ({ setPage }) => {
  // Full Comprehensive Services List
  const fullServices = [
    { icon: PenTool, title: "Branding", desc: "Crafting distinct visual identities.", items: ["Logo Design", "Visual Identity", "Brand Guidelines", "Rebranding", "Tone of Voice", "Print Design"] },
    { icon: Layers, title: "UI/UX Design", desc: "User-centric digital experiences.", items: ["User Research", "Wireframing", "Prototyping", "Design Systems", "App Design", "Web Design"] },
    { icon: Code, title: "Development", desc: "Robust, scalable code.", items: ["React/Next.js", "Headless CMS", "E-commerce (Shopify)", "Mobile Apps (iOS/Android)", "API Integration", "WebGL"] },
    { icon: Megaphone, title: "Digital Marketing", desc: "Growth and performance.", items: ["SEO", "PPC/SEM", "Social Media Strategy", "Email Marketing", "Influencer Campaigns", "Analytics"] },
    { icon: Pen, title: "Content", desc: "Storytelling that sells.", items: ["Copywriting", "Blog Writing", "Scriptwriting", "Video Production", "Photography", "Motion Graphics"] },
    { icon: Search, title: "Consultancy", desc: "Strategic digital transformation.", items: ["Tech Audit", "Digital Strategy", "Market Analysis", "Product Roadmap"] }
  ];

  const [expandedService, setExpandedService] = useState(null);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-32 bg-[#050505] min-h-screen">
      <div className="px-6 md:px-12 mb-24">
        <h1 className="text-[12vw] font-black uppercase text-[#F0F0F0] leading-none mb-8">Offerings</h1>
        <p className="text-2xl text-neutral-400 max-w-2xl font-light">We provide a comprehensive suite of digital services designed to scale ambitious brands, from identity to infrastructure.</p>
      </div>
      <div className="w-full border-t border-white/20">
        {fullServices.map((s, i) => (
          <div
            key={i}
            className="px-6 md:px-12 py-16 border-b border-white/20 hover:bg-[#0F5E3C] transition-colors group cursor-pointer"
            onClick={() => setExpandedService(expandedService === i ? null : i)}
          >
            <div className="flex flex-col md:flex-row md:items-start gap-8">
              <s.icon size={48} className="text-[#8CF2C6] mb-4 md:mb-0" strokeWidth={1} />
              <div className="w-full">
                <div className="flex justify-between items-center w-full">
                  <h2 className="text-4xl md:text-6xl font-black uppercase text-white mb-6 group-hover:translate-x-4 transition-transform">{s.title}</h2>
                  <Plus className={`text-[#8CF2C6] transition-transform duration-300 ${expandedService === i ? 'rotate-45' : ''}`} size={48} />
                </div>
                <p className="text-xl text-neutral-400 group-hover:text-[#8CF2C6] max-w-3xl leading-relaxed">{s.desc}</p>

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
                          <div key={idx} className="flex items-center gap-3 text-white text-lg">
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
}

const AboutPage = ({ setPage }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-32 bg-[#050505] min-h-screen">
      <div className="px-6 md:px-12 mb-24">
        <h1 className="text-[12vw] font-black uppercase text-[#F0F0F0] leading-none mb-12">Agency</h1>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="text-[#8CF2C6] font-mono uppercase tracking-widest">Who We Are</h3>
            <p className="text-2xl text-neutral-300 leading-relaxed">
              CUCU is a new-age digital advertising agency born in the intersection of <span className="text-white font-bold">brutalism and functionality</span>. We believe that design is not just decoration—it is a tool for revenue.
            </p>
          </div>
          <div className="space-y-8">
            <h3 className="text-[#8CF2C6] font-mono uppercase tracking-widest">Our Vision</h3>
            <p className="text-xl text-neutral-500 leading-relaxed">
              Founded in 2023, we operate globally with a decentralized team of elite creatives, engineers, and strategists. Our mission is to eliminate digital clutter and deliver pure, potent experiences that cut through the noise.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#0F5E3C] py-24 px-6 md:px-12">
        <h2 className="text-4xl font-black uppercase text-[#050505] mb-12">Leadership</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Arjun Mehta", role: "Creative Director" },
            { name: "Priya Sharma", role: "Head of Strategy" },
            { name: "Vikram Singh", role: "Lead Engineer" }
          ].map((m, i) => (
            <div key={i} className="border-t border-black pt-4">
              <h3 className="text-2xl font-bold text-white uppercase">{m.name}</h3>
              <p className="text-[#8CF2C6] font-mono">{m.role}</p>
            </div>
          ))}
        </div>
      </div>
      <BigFooter setPage={setPage} />
    </motion.div>
  );
}

const ContactPage = ({ setPage }) => {
  const [status, setStatus] = useState('idle'); // idle, submitting, success
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => setStatus('success'), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-32 bg-[#050505] min-h-screen flex flex-col">
      <div className="px-6 md:px-12 flex-grow grid lg:grid-cols-2 gap-24 pb-24">
        <div>
          <h1 className="text-[10vw] font-black uppercase text-[#F0F0F0] leading-none mb-12">Contact</h1>
          <div className="space-y-12 text-xl text-neutral-400">
            <div className="space-y-2">
              <p className="text-[#8CF2C6] font-mono text-sm uppercase tracking-widest">Email Us</p>
              <div className="flex items-center gap-4 text-white text-2xl font-bold hover:text-[#8CF2C6] transition-colors cursor-pointer">
                <Mail className="text-[#8CF2C6]" />
                <span>hello@cucuadvertising.com</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[#8CF2C6] font-mono text-sm uppercase tracking-widest">Call Us</p>
              <div className="flex items-center gap-4 text-white text-2xl font-bold hover:text-[#8CF2C6] transition-colors cursor-pointer">
                <Phone className="text-[#8CF2C6]" />
                <span>+91 94404 17034</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[#8CF2C6] font-mono text-sm uppercase tracking-widest">Visit Us</p>
              <div className="flex items-center gap-4 text-white text-2xl font-bold">
                <MapPin className="text-[#8CF2C6]" />
                <span>123 Digital Ave, Bangalore, KA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 p-8 md:p-12 border border-white/10 relative overflow-hidden">
          {status === 'success' ? (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="h-full flex flex-col items-center justify-center text-center relative z-10">
              <CheckCircle size={64} className="text-[#8CF2C6] mb-6" />
              <h3 className="text-3xl font-black text-white uppercase mb-4">Message Sent</h3>
              <p className="text-neutral-400 mb-8">We'll get back to you within 24 hours.</p>
              <button onClick={() => setStatus('idle')} className="text-[#8CF2C6] underline">Send another</button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#8CF2C6]">Name</label>
                  <input required type="text" className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:border-[#8CF2C6] outline-none transition-colors" placeholder="Rahul Verma" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#8CF2C6]">Email</label>
                  <input required type="email" className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:border-[#8CF2C6] outline-none transition-colors" placeholder="rahul@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#8CF2C6]">Project Details</label>
                <textarea required rows="4" className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:border-[#8CF2C6] outline-none transition-colors" placeholder="Tell us about your goals..."></textarea>
              </div>
              <button disabled={status === 'submitting'} type="submit" className="w-full py-6 bg-[#0F5E3C] text-white font-bold uppercase tracking-widest hover:bg-[#8CF2C6] hover:text-black transition-colors flex items-center justify-center gap-4">
                {status === 'submitting' ? <Loader2 className="animate-spin" /> : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Standard Footer for Contact Page */}
      <div className="bg-[#050505] p-6 md:p-12 border-t border-white/10">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-end w-full">
          <div className="flex gap-12 mb-8 md:mb-0">
            <a href="https://www.facebook.com/profile.php?id=61551579710039" target="_blank" rel="noopener noreferrer" className="font-bold text-lg md:text-xl uppercase tracking-widest hover:text-white transition-colors">Facebook</a>
            <a href="https://www.instagram.com/cucuadvertising/" target="_blank" rel="noopener noreferrer" className="font-bold text-lg md:text-xl uppercase tracking-widest hover:text-white transition-colors">Instagram</a>
            <a href="https://www.linkedin.com/company/cucuadvertsing/" target="_blank" rel="noopener noreferrer" className="font-bold text-lg md:text-xl uppercase tracking-widest hover:text-white transition-colors">LinkedIn</a>
            <a href="https://api.whatsapp.com/send?phone=919440417034" target="_blank" rel="noopener noreferrer" className="font-bold text-lg md:text-xl uppercase tracking-widest hover:text-white transition-colors">WhatsApp</a>
          </div>
          <div className="text-right">
            <p className="font-mono text-sm uppercase font-bold text-[#F0F0F0]">© 2023 Cucu Advertising</p>
            <p className="font-mono text-sm uppercase opacity-70 text-[#F0F0F0]">Bangalore • Mumbai • Hyderabad</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* --- MAIN APP --- */

export default function App() {
  const [page, setPage] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="font-sans bg-[#050505] min-h-screen text-[#F0F0F0] selection:bg-[#8CF2C6] selection:text-[#050505] overflow-x-hidden">
      <Navbar activePage={page} setPage={setPage} />

      <AnimatePresence mode="wait">
        {page === 'home' && <HomePage key="home" setPage={setPage} setSelectedProject={setSelectedProject} />}
        {page === 'work' && <WorkPage key="work" setPage={setPage} setSelectedProject={setSelectedProject} />}
        {page === 'services' && <ServicesPage key="services" setPage={setPage} />}
        {page === 'about' && <AboutPage key="about" setPage={setPage} />}
        {page === 'contact' && <ContactPage key="contact" setPage={setPage} />}
        {page === 'project-detail' && selectedProject && (
          <ProjectDetailPage key="project-detail" project={selectedProject} onBack={() => setPage('work')} setPage={setPage} />
        )}
      </AnimatePresence>
    </div>
  );
}