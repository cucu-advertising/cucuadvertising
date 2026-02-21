import React from "react";

export const Mission = () => (
  <section className="py-32 md:py-48 px-6 md:px-12 bg-[#197C48] text-[#40F996] border-b border-[#40F996]/50 relative z-10">
    <div className="max-w-[1800px] mx-auto grid md:grid-cols-2 gap-24">
      <div>
        <span className="text-[#050505] font-mono text-sm tracking-widest uppercase block mb-8">
          Wait, what do you guys actually do??
        </span>
        <h2 className="text-5xl md:text-7xl font-bold leading-[1.1] uppercase tracking-tight text-[#050505]">
          We're not your <span className="text-white">typical</span> marketing
          agency.
        </h2>
      </div>
      <div className="flex flex-col justify-end">
        <p className="text-xl md:text-2xl text-[#050505] font-light leading-relaxed mb-12">
          We're folks madly in love with design, storytelling, strategy, and
          production. We are building brands that don't just exist, but actually
          connect.
        </p>
        <div className="flex gap-12">
          <div className="flex flex-col">
            <span className="text-4xl font-bold text-[#050505] mb-2">50+</span>
            <span className="text-[#050505] text-xs uppercase tracking-widest">
              Global Clients
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-bold text-[#050505] mb-2">200%</span>
            <span className="text-[#050505] text-xs uppercase tracking-widest">
              Avg ROI Increase
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
);
