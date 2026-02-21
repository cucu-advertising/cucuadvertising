import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { TRANSITION } from "../../constants/config";

export const ServiceRow = ({
  title,
  items,
  setModal,
  isExpanded,
  toggleExpand,
}) => (
  <div
    className="group relative border-t border-[#40F996]/50 py-16 px-6 md:px-12 transition-all duration-500 cursor-pointer hover:bg-[#050505]/20 hover:pl-12 md:hover:pl-20 border-l-[0px] hover:border-l-[12px] hover:border-l-[#40F996]"
    onMouseEnter={() => setModal && setModal({ active: true, index: title })}
    onMouseLeave={() => setModal && setModal({ active: false, index: null })}
    onClick={toggleExpand}
  >
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
      <h3 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4 md:mb-0 group-hover:text-[#197C48] transition-colors">
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
              <p className="text-xl text-[#050505] leading-relaxed mb-6">
                Detailed breakdown of {title}. We bring deep expertise to ensure
                every aspect is covered, from initial strategy to final
                execution.
              </p>
              <ul className="space-y-4">
                {items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-[#40F996]"
                  >
                    <CheckCircle size={16} className="text-[#197C48]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="h-64 bg-neutral-900 rounded-lg border border-[#40F996]/50 flex items-center justify-center">
              <span className="text-[#197C48] font-mono text-sm uppercase">
                Service Showcase Image
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
