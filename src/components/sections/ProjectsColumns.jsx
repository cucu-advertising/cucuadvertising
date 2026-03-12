import React, { useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useVelocity,
  useTransform,
} from "framer-motion";

const projects = [
  {
    title: "Calentify",
    category: "SaaS Product",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    height: "h-[280px]",
  },
  {
    title: "Collabify",
    category: "Agency Tool",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    height: "h-[360px]",
  },
  {
    title: "Nike Air Max",
    category: "E-Commerce",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
    height: "h-[220px]",
  },
  //   {
  //     title: "Dual Sense",
  //     category: "Hardware",
  //     image:
  //       "https://images.unsplash.com/photo-1605906302484-3c672e10df2e?q=80&w=1000&auto=format&fit=crop",
  //     height: "h-[320px]",
  //   },
  {
    title: "Calorie Tracker",
    category: "Health App",
    image:
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1000&auto=format&fit=crop",
    height: "h-[260px]",
  },
  {
    title: "Lazaroy",
    category: "Portfolio",
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop",
    height: "h-[200px]",
  },
  {
    title: "Fintech App",
    category: "Mobile App",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop",
    height: "h-[300px]",
  },
  {
    title: "Crypto Dashboard",
    category: "Dashboard",
    image:
      "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=1000&auto=format&fit=crop",
    height: "h-[240px]",
  },
  {
    title: "Vortex Gaming",
    category: "Web3",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop",
    height: "h-[340px]",
  },
];

const VerticalMarquee = ({ items, baseVelocity = 100, direction = 1 }) => {
  const baseY = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const y = useTransform(baseY, (v) => `${v}%`);

  const directionFactor = useRef(direction);
  useEffect(() => {
    let lastTime = performance.now();
    const update = (time) => {
      const delta = time - lastTime;
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

      if (velocityFactor.get() < 0) {
        directionFactor.current = -1 * direction;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1 * direction;
      }

      moveBy += directionFactor.current * moveBy * velocityFactor.get();

      // Wrap logically based on item count. -50% because we duplicate once.
      let nextBaseY = baseY.get() + moveBy;
      if (nextBaseY <= -50) nextBaseY = 0;
      if (nextBaseY > 0) nextBaseY = -50;

      baseY.set(nextBaseY);

      lastTime = time;
      requestAnimationFrame(update);
    };
    const requestId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(requestId);
  }, [baseVelocity, velocityFactor, direction]);

  return (
    <div className="flex flex-col gap-4 md:gap-5 overflow-hidden">
      <motion.div className="flex flex-col gap-4 md:gap-5" style={{ y }}>
        {/* Duplicate items for seamless loop */}
        {[...items, ...items].map((p, i) => (
          <ProjectCard key={i} project={p} index={i} />
        ))}
      </motion.div>
    </div>
  );
};

const ProjectCard = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.5, delay: (index % projects.length) * 0.05 }}
    className={`group relative ${project.height} w-full rounded-2xl overflow-hidden bg-white/5 cursor-pointer flex-shrink-0`}
    style={{ borderRadius: "18px" }}
  >
    <img
      src={project.image}
      alt={project.title}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
      <span className="block text-[10px] font-mono uppercase tracking-[0.25em] text-[#C8F135] mb-1">
        {project.category}
      </span>
      <h3 className="text-lg md:text-xl font-black uppercase text-white tracking-tight leading-none">
        {project.title}
      </h3>
    </div>
  </motion.div>
);

export const ProjectsColumns = () => {
  const column1 = projects.slice(0, 3);
  const column2 = projects.slice(3, 6);
  const column3 = projects.slice(6, 9);

  return (
    <section className="bg-white py-20 px-6 md:px-12 overflow-hidden relative">
      {/* Header */}
      <div className="max-w-[1800px] mx-auto mb-16 flex flex-col md:flex-row justify-between items-start gap-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-start lg:items-start"
        >
          <h1 className="monigue-font text-slate-900 text-5xl md:text-6xl font-bold uppercase leading-[0.8] tracking-tight">
            OUR
          </h1>
          <h1
            className="monigue-font text-6xl md:text-[9rem] font-black uppercase leading-[0.8] tracking-tight"
            style={{
              color: "#197C48",
            }}
          >
            PROJECTS
          </h1>
        </motion.div>

        {/* Right: Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="md:text-right mt-4 md:mt-8"
        >
          <h1 className="anton-sc-regular text-2xl md:text-3xl text-slate-800 leading-tight">
            " COOL WAY TO SHOW PROJECTS " <br />
            <span className="text-[#197C48] opacity-80 italic">~ Anshu Singh</span>
          </h1>
        </motion.div>
      </div>

      {/* Vertical Marquee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 items-start max-w-[1800px] mx-auto h-[600px] md:h-[800px] overflow-hidden rounded-[2rem] border border-slate-900/10 bg-slate-950 relative shadow-2xl">
        <VerticalMarquee items={column1} baseVelocity={-2} direction={1} />
        <VerticalMarquee items={column2} baseVelocity={2} direction={-1} />
        <VerticalMarquee items={column3} baseVelocity={-2.5} direction={1} />

        {/* Soft radial overlay for depth */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-slate-950 via-transparent to-slate-950 opacity-90 z-20" />
        
        {/* Subtle inner glow */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-950 to-transparent pointer-events-none z-30" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-30" />
      </div>
    </section>
  );
};
