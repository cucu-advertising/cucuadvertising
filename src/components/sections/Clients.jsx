import React from "react";
import { motion } from "framer-motion";

// Every logo in src/assets/client-logos is picked up automatically. These are
// copies of src/assets/client with the empty square padding trimmed off, so the
// name sits right under the mark.
const logoFiles = import.meta.glob("../../assets/client-logos/*.{webp,png,jpg,svg}", {
  eager: true,
  import: "default",
});

// Display names for logo files (file name without extension -> label).
const NAMES = {
  are: "ARE",
  ark: "ARK Group",
  "ministry of interiors": "Ministry of Interiors",
  "daily med": "Daily Med",
  es: "ES Enterprises",
  fb: "Fruit Bandi",
  globus: "Globus IT",
  gn: "GN Caters",
  he: "Happy Events",
  jaspire: "Jaspire",
  nyra: "Nyra",
  "one ent": "One ENT",
  oryza: "Oryza",
  ravasa: "Ravasa",
  remedy: "Remedy",
  sannidi: "Sannidhi",
  seccretping: "Secret Ping",
  "split be": "Split Be",
  svd: "SVD",
  varun: "Varun Engineers",
  vijari: "Vihari",
  zargold: "Zargold",
};

const clients = Object.entries(logoFiles).map(([path, logo]) => {
  const file = path.split("/").pop().replace(/\.[^.]+$/, "");
  return { name: NAMES[file] || file, logo };
});

const ClientCard = ({ client, copy = false }) => (
  <div className={"shrink-0 w-[180px] md:w-[240px] flex flex-col items-center gap-2 group" + (copy ? " client-copy" : "")} aria-hidden={copy || undefined}>
    <div className="h-14 md:h-16 w-full flex items-center justify-center">
      <img
        src={client.logo}
        alt={client.name}
        loading="lazy"
        decoding="async"
        className="max-h-full !max-w-[150px] object-contain"
      />
    </div>
    <span className="text-base md:text-lg font-bold text-black/80 group-hover:text-[#197C48] transition-colors">
      {client.name}
    </span>
  </div>
);

// Infinite logo marquee — pauses on hover. Shared with the homepage.
export const ClientMarquee = () => (
  <>
    <div className="group/marquee relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-white to-transparent z-10" />
      <div className="client-track flex w-max gap-10 md:gap-16 animate-[clientsMarquee_50s_linear_infinite] group-hover/marquee:[animation-play-state:paused]">
        {[...clients, ...clients].map((client, idx) => (
          <ClientCard key={idx} client={client} copy={idx >= clients.length} />
        ))}
      </div>
    </div>

    <style>{`
      @keyframes clientsMarquee {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }
      /* The second copy only exists to make the loop seamless. With motion
         reduced, the logos sit still in rows and the copy is hidden. */
      .client-track { will-change: transform; }
      @media (prefers-reduced-motion: reduce) {
        .client-track { animation: none !important; width: auto !important; flex-wrap: wrap; justify-content: center; row-gap: 36px; padding: 0 5%; }
        .client-copy { display: none !important; }
      }
    `}</style>
  </>
);

export const Clients = () => (
  <section className="bg-white text-black py-12 md:py-16 overflow-hidden">
    <div className="px-6 md:px-12 max-w-[1800px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-[14vw] md:text-[8vw] font-black uppercase leading-[0.85] tracking-tighter"
        >
          Clients
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="md:text-right"
        >
          <p className="anton-sc-regular text-2xl md:text-3xl text-slate-800 leading-tight">
            The brands that are part of our story.
          </p>
        </motion.div>
      </div>
      <div className="h-px bg-black/80 mt-10 mb-14" />
    </div>

    <ClientMarquee />
  </section>
);
