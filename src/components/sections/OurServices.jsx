import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowUpRight } from "lucide-react";
import { services } from "../../constants/services";

// Home-page services accordion. Content comes from the Services page list.
export const OurServices = ({ setPage }) => {
  const [open, setOpen] = useState(null);

  return (
    <section className="bg-white text-black px-6 md:px-12 py-20 md:py-28">
      <div className="max-w-[1800px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-[12vw] md:text-[8vw] font-black uppercase leading-[0.85] tracking-tighter whitespace-nowrap shrink-0"
        >
          Our <span className="text-[#197C48]">services.</span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="md:text-right"
        >
          <p className="anton-sc-regular text-2xl md:text-3xl text-slate-800 leading-tight">
            " Everything Your Brands
            <br />
            Needs to Grow "
          </p>
        </motion.div>
      </div>
      <div className="h-px bg-black/80 mt-10 mb-12" />

      <div className="flex flex-col gap-5">
        {services.map((service, idx) => {
          const isOpen = open === idx;
          return (
            <div
              key={service.id}
              className={`rounded-[1.75rem] transition-colors duration-500 ${
                isOpen ? "bg-[#197C48] text-white" : "bg-[#F2F2F2] hover:bg-[#8CF2C6]/40"
              }`}
            >
              <button
                onClick={() => setOpen(isOpen ? null : idx)}
                className="w-full flex items-center justify-between gap-6 px-6 md:px-12 py-7 md:py-10 text-left"
              >
                <span className="text-2xl md:text-5xl font-black uppercase tracking-tighter leading-none">
                  {service.title}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0"
                >
                  <Plus className="w-9 h-9 md:w-12 md:h-12" strokeWidth={3} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-12 pb-10 grid md:grid-cols-12 gap-8 items-center">
                      <div className="md:col-span-7">
                        <p className="text-xl md:text-3xl font-bold leading-snug mb-5">
                          <span className="text-[#8CF2C6]">{service.headlineHighlight}</span>
                          {service.headlineRest}
                        </p>
                        <p className="text-base md:text-lg text-white/75 whitespace-pre-line leading-relaxed mb-8">
                          {service.description}
                        </p>
                        <button
                          onClick={() => setPage("services")}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-bold uppercase tracking-widest hover:bg-[#8CF2C6] transition-colors"
                        >
                          {service.cta} <ArrowUpRight size={18} />
                        </button>
                      </div>
                      <div className="md:col-span-5">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full aspect-[4/3] object-contain rounded-2xl bg-white"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
};
