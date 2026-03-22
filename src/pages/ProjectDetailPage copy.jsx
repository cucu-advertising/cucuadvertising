import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { BigFooter } from "../components/Footer";

export const ProjectDetailPage = ({ project, onBack, setPage }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen pt-32 text-black"
    >
      <div className="px-6 md:px-12 mb-20">
        <button
          onClick={onBack}
          className="flex items-center gap-4 text-[#197C48] font-bold uppercase tracking-widest hover:pl-4 transition-all"
        >
          <ChevronLeft size={24} /> Back to projects
        </button>
      </div>

      <div className="px-6 md:px-12 mb-32">
        <span className="text-neutral-400 font-mono text-sm uppercase tracking-widest mb-4 block">
          {project.category}
        </span>
        <h1 className="text-[12vw] font-black uppercase text-black leading-[0.85] tracking-tighter mb-20">
          {project.title}
        </h1>

        <div className="grid lg:grid-cols-2 gap-24">
          <div className="aspect-[4/5] overflow-hidden rounded-[3rem]">
            <img
              src={project.img}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-bold uppercase text-black mb-12">
              The Objective
            </h2>
            <p className="text-2xl text-neutral-600 font-light leading-relaxed mb-12">
              Transforming {project.title} from a vision into a dominant digital
              force. We implemented a comprehensive strategy covering design,
              development, and go-to-market execution.
            </p>

            <div className="grid grid-cols-2 gap-12 border-t border-neutral-100 pt-12">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest opacity-50 mb-4">
                  Services
                </h4>
                <ul className="text-lg font-bold uppercase space-y-2">
                  <li>UX Design</li>
                  <li>Frontend</li>
                  <li>Motion</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest opacity-50 mb-4">
                  Timeline
                </h4>
                <p className="text-lg font-bold uppercase">12 Weeks</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="py-32 bg-[#197C48] text-white">
        <div className="px-6 md:px-12">
          <h2 className="text-6xl md:text-[10vw] font-black uppercase tracking-tighter leading-none mb-12">
            The Result.
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { val: "200%", label: "User Engagement Increase" },
              { val: "15k+", label: "Daily Active Users" },
              { val: "AARRR", label: "Optimized Funnel" },
            ].map((stat, i) => (
              <div key={i}>
                <span className="text-6xl font-black block mb-4">
                  {stat.val}
                </span>
                <p className="text-xl font-bold uppercase opacity-60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BigFooter setPage={setPage} />
    </motion.div>
  );
};
