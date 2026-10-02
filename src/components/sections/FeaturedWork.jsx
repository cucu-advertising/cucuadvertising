import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { allProjects } from "../../constants/projects";
import { projectThumb } from "../../utils/optimizedImage";

// Projects shown on the home page, in order. Titles must match projects.js.
const FEATURED_TITLES = ["Arbor Road", "One ENT", "ARK Groups", "Varun Engineers"];

const featured = FEATURED_TITLES.map((t) => allProjects.find((p) => p.title === t)).filter(Boolean);

export const FeaturedWork = ({ setPage, setSelectedProject }) => {
  const openProject = (project) => {
    setSelectedProject(project);
    setPage("project-detail");
  };

  return (
    <section className="bg-white text-black px-6 md:px-12 py-20 md:py-28">
      <div className="max-w-[1800px] mx-auto">
      {/* Header */}
      <div className="flex flex-row items-end justify-between gap-4 md:gap-8">
        <div className="min-w-0">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-[15vw] md:text-[8vw] font-black uppercase leading-[0.85] tracking-tighter whitespace-nowrap"
          >
            Featured <br className="md:hidden" />
            <span className="text-[#197C48]">work</span>
          </motion.h2>
        </div>
        <button
          onClick={() => setPage("work")}
          className="shrink-0 mb-[calc(6.375vw-16px)] md:mb-0 px-4 py-2 md:px-7 md:py-3 rounded-full bg-black text-white text-xs md:text-sm font-semibold whitespace-nowrap hover:bg-[#31ee9c] hover:text-black transition-colors duration-300"
        >
          All projects
        </button>
      </div>

      <div className="h-px bg-black/80 mt-10 mb-12 md:mb-16" />

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 md:gap-y-20">
        {featured.map((project, idx) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: (idx % 2) * 0.12, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => openProject(project)}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-neutral-100">
              <img
                src={projectThumb(project, 1200)}
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
              <div className="absolute top-5 right-5 w-14 h-14 rounded-full bg-[#8CF2C6] text-black flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500">
                <ArrowUpRight size={26} />
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none group-hover:text-[#197C48] transition-colors duration-300">
                {project.title}
              </h3>
              <p className="mt-3 text-xs font-bold uppercase tracking-widest text-neutral-400">
                {project.industry || project.category}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
};
