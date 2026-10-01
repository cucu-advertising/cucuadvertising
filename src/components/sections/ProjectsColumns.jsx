import React, { useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useVelocity,
  useTransform,
} from "framer-motion";
import { allProjects } from "../../constants/projects"; // 👈 update this path to match where your project.js actually lives

// Fixed height variations to keep the staggered masonry look
const HEIGHTS = [
  "h-[280px]", "h-[360px]", "h-[220px]", "h-[260px]",
  "h-[200px]", "h-[300px]", "h-[240px]", "h-[340px]",
];

// Pull from the SAME data used by your Portfolio page
const projects = allProjects.map((p, i) => ({
  title: p.title,
  category: p.category,
  image: p.img,
  height: HEIGHTS[i % HEIGHTS.length],
}));

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
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-400" />
    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5 opacity-100 md:opacity-0 md:translate-y-2 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-400">
      <span className="block text-[10px] font-mono uppercase tracking-[0.25em] text-[#C8F135] mb-1">
        {project.category}
      </span>
      <h3 className="text-sm md:text-xl font-black uppercase text-white tracking-tight leading-none">
        {project.title}
      </h3>
    </div>
  </motion.div>
);

export const ProjectsColumns = () => {
  // Round-robin split so it auto-balances no matter how many projects you add later
  const column1 = [];
  const column2 = [];
  const column3 = [];
  projects.forEach((p, i) => {
    if (i % 3 === 0) column1.push(p);
    else if (i % 3 === 1) column2.push(p);
    else column3.push(p);
  });

  return (
    <section className="bg-white py-12 md:py-20 px-6 md:px-12 overflow-hidden relative">
      <div className="max-w-[1800px] mx-auto mb-8 md:mb-16 flex flex-col md:flex-row justify-between items-start gap-4 md:gap-8">
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
            style={{ color: "#197C48" }}
          >
            PROJECTS
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="md:text-right mt-4 md:mt-8"
        >
          <h1 className="anton-sc-regular text-2xl md:text-3xl text-slate-800 leading-tight">
            " COOL WAY TO SHOW PROJECTS " <br />
            
          </h1>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 items-start max-w-[1800px] mx-auto h-[520px] md:h-[800px] overflow-hidden rounded-[2rem] border border-slate-900/10 bg-slate-950 relative shadow-2xl">
        <VerticalMarquee items={column1} baseVelocity={-2} direction={1} />
        <VerticalMarquee items={column2} baseVelocity={2} direction={-1} />
        <div className="hidden md:block">
          <VerticalMarquee items={column3} baseVelocity={-2.5} direction={1} />
        </div>

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-slate-950 via-transparent to-slate-950 opacity-50 md:opacity-90 z-20" />
        <div className="absolute inset-x-0 top-0 h-16 md:h-32 bg-gradient-to-b from-slate-950 to-transparent pointer-events-none z-30" />
        <div className="absolute inset-x-0 bottom-0 h-16 md:h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-30" />
      </div>
    </section>
  );
};