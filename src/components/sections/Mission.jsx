import React from "react";
import folksImg from "../../assets/folks.webp";

export const Mission = () => (
  <section className="py-16 md:py-24 px-6 md:px-12 bg-white text-[#197C48] border-b border-[#197C48]/10 relative z-10">
    <div className="max-w-[1800px] mx-auto grid md:grid-cols-2 gap-16 md:gap-24">
      {/* Left - Heading */}
      <div>
        <span className="text-[#050505] font-mono text-sm tracking-widest uppercase block mb-8">
          Wait, what do you guys actually do??
        </span>
        <h2 className="text-5xl md:text-7xl font-bold leading-[1.1] uppercase tracking-tight text-[#050505]">
          We're not your <span className="text-[#197C48]">typical</span> marketing
          agency.
        </h2>
      </div>

      {/* Right - Image + Text */}
      <div className="flex flex-col justify-end">
        {/* Half-cropped image with black sidebar */}
        <div
          className="flex mb-8 rounded-2xl overflow-hidden border-2 border-[#197C48]/10"
          style={{ maxHeight: "180px" }}
        >
          {/* Black vertical sidebar with rotated text */}
          <div className="bg-black flex items-center justify-center shrink-0 w-8 md:w-10 relative">
            <span
              className="text-white text-[8px] md:text-[9px] font-black uppercase tracking-[0.25em] whitespace-nowrap"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              For Brands - CUCU
              {/* · For Enterprise */}
            </span>
          </div>
          {/* Cropped image */}
          <div className="flex-1 overflow-hidden">
            <img
              src={folksImg}
              alt="Our Creative Team"
              className="w-full h-auto object-cover object-top"
            />
          </div>
        </div>

        <p className="text-xl md:text-2xl text-[#050505] font-light leading-relaxed mb-12">
          We're folks madly in love with design, storytelling, strategy, and
          production. We are building brands that don't just exist, but actually
          connect.
        </p>
        <div className="flex gap-12">
          <div className="flex flex-col">
            <span className="text-4xl font-bold text-[#197C48] mb-2">50+</span>
            <span className="text-[#050505] text-xs uppercase tracking-widest">
              Global Clients
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-bold text-[#197C48] mb-2">200%</span>
            <span className="text-[#050505] text-xs uppercase tracking-widest">
              Avg ROI Increase
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
);
