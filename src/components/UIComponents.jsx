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
    <section className="py-16 md:py-24 px-6 md:px-12 bg-white relative z-10">
      <div className="max-w-[1800px] mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-12 md:gap-20">
        {/* Left Side - Heading + Image + Description */}
        <div className="sticky top-32 h-fit">
          <span className="text-slate-400 font-mono text-xs tracking-[0.3em] uppercase block mb-6">
            Common Queries
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase text-slate-900 leading-[0.95] tracking-tighter mb-10">
            Clarity in <br />
            <span className="text-[#197C48]">Process</span>
          </h2>

          {/* Image */}
          <div className="rounded-2xl overflow-hidden mb-8 w-full max-w-[280px] aspect-[16/9] border border-slate-100">
            <img
              src="/FAQ.jpg"
              alt="Creative Process"
              className="w-full h-auto object-cover"
            />
          </div>

          <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
            Being a design studio at the forefront of digital transformation and
            product design, we take it upon ourselves to drop some knowledge,
            share insights, and answer the questions you've always wanted to
            ask.
          </p>
        </div>

        {/* Right Side - FAQ Accordions */}
        <div className="space-y-0">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border-t border-slate-200 last:border-b last:border-slate-200"
              onMouseEnter={() => setOpenIndex(i)}
              onMouseLeave={() => setOpenIndex(null)}
            >
              <div className="w-full py-8 text-left flex justify-between items-center group cursor-default">
                <span
                  className={`text-lg md:text-xl font-bold transition-colors pr-8 ${openIndex === i ? "text-[#197C48]" : "text-slate-800"}`}
                >
                  {faq.q}
                </span>
                <span
                  className={`transition-all duration-300 shrink-0 ${openIndex === i ? "text-[#197C48] rotate-45" : "text-slate-300"}`}
                >
                  <Plus size={28} />
                </span>
              </div>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 text-slate-500 text-base leading-relaxed max-w-2xl">
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
