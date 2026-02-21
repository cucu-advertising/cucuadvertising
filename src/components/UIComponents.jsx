import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

export const ComingSoon = ({ title, onBack }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="min-h-screen pt-40 px-6 bg-[#197C48] flex flex-col items-center justify-center text-center"
  >
    <h1 className="text-6xl md:text-8xl font-black uppercase text-[#40F996] mb-8">
      {title}
    </h1>
    <p className="text-xl text-black font-bold uppercase tracking-widest mb-12">
      We're cooking something amazing. Stay tuned!
    </p>
    <button
      onClick={onBack}
      className="px-12 py-6 bg-black text-[#40F996] font-black uppercase tracking-widest text-xl hover:bg-[#40F996] hover:text-black transition-all cursor-pointer"
    >
      Take me back home
    </button>
  </motion.div>
);

export const FAQ = () => {
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
    <section className="py-32 px-6 md:px-12 bg-[#197C48] border-t border-[#40F996]/50 relative z-10">
      <div className="max-w-[1800px] mx-auto grid lg:grid-cols-2 gap-16">
        <div className="sticky top-32 h-fit">
          <span className="text-black/40 font-mono text-sm tracking-widest uppercase block mb-8">
            Common Queries
          </span>
          <h2 className="text-4xl md:text-6xl font-black uppercase text-white leading-tight">
            Clarity in <br /> Process
          </h2>
        </div>
        <div className="space-y-0">
          {faqs.map((faq, i) => (
            <div key={i} className="border-t border-[#40F996]/50">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full py-10 text-left flex justify-between items-start group"
              >
                <span className="text-xl md:text-2xl font-bold text-[#40F996] group-hover:text-white transition-colors pr-8">
                  {faq.q}
                </span>
                <span
                  className={`text-black/40 transition-transform duration-300 ${openIndex === i ? "rotate-45" : ""}`}
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
                    <p className="pb-10 text-[#050505] text-lg leading-relaxed max-w-2xl">
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
