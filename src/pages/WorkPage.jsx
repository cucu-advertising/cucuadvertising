import React, { useState } from "react";
import { motion } from "framer-motion";
import { BigFooter } from "../components/Footer";

export const WorkPage = ({ setPage, setSelectedProject }) => {
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
      className="pt-32 bg-[#197C48] min-h-screen"
    >
      <div className="px-6 md:px-12 mb-20">
        <h1 className="text-[12vw] font-black uppercase text-[#40F996] leading-none mb-12">
          Archive
        </h1>
        <div className="flex flex-wrap gap-4">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-full border border-[#40F996]/50 uppercase tracking-widest text-sm font-bold transition-all ${filter === f ? "bg-[#40F996] text-black border-[#40F996]" : "text-[#40F996] hover:bg-white/10"}`}
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
              <h3 className="text-3xl font-black text-[#40F996] uppercase">
                {p.title}
              </h3>
              <p className="text-[#197C48] font-mono text-sm">{p.category}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <BigFooter setPage={setPage} />
    </motion.div>
  );
};
