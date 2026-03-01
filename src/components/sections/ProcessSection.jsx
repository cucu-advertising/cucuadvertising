import React from "react";
import { motion } from "framer-motion";

export const ProcessSection = () => {
  const steps = [
    {
      id: "01",
      title: "Create",
      accent: "CREATIVE",
      items: [
        {
          label: "Personalized Content",
          desc: "We create customised creative solutions for all of our clients, and visuals that are aligned to their specific needs.",
        },
        {
          label: "Storytelling",
          desc: "Every great creative campaign has a compelling story at its core. We build narratives that engage emotions and connect with the audience in meaningful ways.",
        },
        {
          label: "Consistency in Branding",
          desc: "We ensure that the branding you create is consistent across all platforms, whether it's for social media, print, or digital experiences.",
        },
      ],
    },
    {
      id: "02",
      title: "Connect",
      accent: "STRATEGIC",
      items: [
        {
          label: "Who is your audience?",
          desc: "We dive deep into audience insights. What are their pain points? What excites them? Develop campaigns accordingly that speak directly to their hearts & needs.",
        },
        {
          label: "Collaboration & Partnerships",
          desc: "We try to network and collaborate with other professionals, influencers, and brands that share your values. This expands your reach and fosters opportunities for mutual growth.",
        },
        {
          label: "Multi-channel Strategy",
          desc: "Don't limit your connection to one platform. Utilize various channels (social media, email, content marketing, paid ads, etc.) to build a broader network and connect with different types of audiences.",
        },
      ],
    },
    {
      id: "03",
      title: "Convert",
      accent: "DATA-DRIVEN",
      items: [
        {
          label: "Clear Call-to-Action (CTA)",
          desc: "Whether it's a sign-up button, a product purchase, or downloading a free resource, we always include a direct and clear CTA that encourages users to take the next step.",
        },
        {
          label: "Optimize User Experience (UX)",
          desc: "Ensuring websites, landing pages, and social media profiles are user-friendly, easy to navigate, and optimized for mobile devices.",
        },
        {
          label: "Data-Driven Decisions",
          desc: "We use analytics to measure the success of campaigns and adjust strategies accordingly. Tracking conversions (sales, leads, sign-ups) will help refine your approach for better results.",
        },
      ],
    },
  ];

  return (
    <section className="py-16 px-6 md:px-12 bg-white text-[#111] relative z-20 overflow-hidden">
      <div className="max-w-[1800px] mx-auto text-center mb-12">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-black/40 font-mono text-xs uppercase tracking-[0.3em] mb-4 block"
        >
          Workflow
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-[8vw] font-black uppercase tracking-tighter leading-none text-[#111]"
        >
          Our Process
        </motion.h2>
      </div>

      <div className="max-w-[1700px] mx-auto grid lg:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: i * 0.15,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
            className="group relative border border-black/10 p-12 hover:border-[#197C48]/30 transition-colors bg-white hover:bg-gray-50 rounded-[2rem] overflow-hidden shadow-lg"
          >
            <div className="absolute top-8 right-8 text-6xl font-black text-black/10 group-hover:text-black/20 transition-colors">
              {step.id}
            </div>

            <div className="relative z-10 h-full flex flex-col">
              <span className="text-[#197C48] font-mono text-[10px] tracking-widest uppercase mb-6 px-3 py-1 border border-[#197C48]/30 w-fit rounded-full group-hover:bg-[#197C48] group-hover:text-white transition-all">
                {step.accent}
              </span>
              <h3 className="text-5xl font-black uppercase tracking-tighter mb-16 text-[#111] group-hover:translate-x-2 transition-transform">
                {step.title}
              </h3>

              <div className="space-y-12 flex-grow">
                {step.items.map((item, idx) => (
                  <div key={idx} className="space-y-3">
                    <h4 className="text-lg font-bold text-[#197C48] uppercase flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-[#197C48] rounded-full" />
                      {item.label}
                    </h4>
                    <p className="text-black/60 leading-relaxed font-light text-sm group-hover:text-black/80 transition-colors">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
