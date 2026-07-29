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

  
};
