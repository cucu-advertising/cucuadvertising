import React, { useRef } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { BigFooter } from "../components/Footer";

// Client Logos Imports
import logoArtboard39 from "../assets/client/Artboard 39 copy 6.png";
import logoArtboard4 from "../assets/client/Artboard 4.png";
import logoHappyEvents from "../assets/client/Happy events.png";
import logoJaspire from "../assets/client/Jaspire logo.png";
import logoLapwing from "../assets/client/Lapwing PNG.png";
import logoRavasa from "../assets/client/RavasaArtboard 1 copy.png";
import logoSecretPing from "../assets/client/SECRETPING.png";
import logoSannidhi from "../assets/client/Sannidhi-Logo.png";
import logoSplitbe from "../assets/client/Splitbe Transparent.png";
import logoEs from "../assets/client/es.png";
import logoFruitBandi from "../assets/client/fruit bandi.png";
import logoGlobusIT from "../assets/client/globus it.png";
import logoLogoPng from "../assets/client/logo png.png";
import logoOryza from "../assets/client/oryza.png";
import logoRemedi from "../assets/client/remedi.png";
import logoSvd from "../assets/client/svd.png";
import logoVarun from "../assets/client/varun.png";
import logoVihari from "../assets/client/vihari.png";
import logoZargold from "../assets/client/zargold.png";

const clients = [
  { id: 2, name: "Artboard 39", logo: logoArtboard39 },
  { id: 3, name: "Artboard 4", logo: logoArtboard4 },
  { id: 4, name: "Happy Events", logo: logoHappyEvents },
  { id: 5, name: "Jaspire", logo: logoJaspire },
  { id: 6, name: "Lapwing", logo: logoLapwing },
  { id: 7, name: "Ravasa", logo: logoRavasa },
  { id: 8, name: "Secret Ping", logo: logoSecretPing },
  { id: 9, name: "Sannidhi", logo: logoSannidhi },
  { id: 10, name: "Splitbe", logo: logoSplitbe },
  { id: 11, name: "ES", logo: logoEs },
  { id: 12, name: "Fruit Bandi", logo: logoFruitBandi },
  { id: 13, name: "Globus IT", logo: logoGlobusIT },
  { id: 14, name: "Logo PNG", logo: logoLogoPng },
  { id: 15, name: "Oryza", logo: logoOryza },
  { id: 16, name: "Remedi", logo: logoRemedi },
  { id: 17, name: "SVD", logo: logoSvd },
  { id: 18, name: "Varun", logo: logoVarun },
  { id: 19, name: "Vihari", logo: logoVihari },
  { id: 20, name: "Zargold", logo: logoZargold },
];

export const ClientsPage = ({ setPage }) => {
  const x = useMotionValue(0);
  const containerRef = useRef(null);
  const isPaused = useRef(false);

  useAnimationFrame((t, delta) => {
    if (isPaused.current) return;

    // Increased speed slightly for cinematic effect
    const moveBy = -0.75 * (delta / 16);
    let currentX = x.get();

    // We assume the duplicated set starts at -4000px roughly
    // Resetting to 0 when it reaches the end of the first set
    if (currentX <= -4000) {
      x.set(0);
    } else {
      x.set(currentX + moveBy);
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#197C48] min-h-screen font-sans selection:bg-[#FFD200] selection:text-black"
    >
      {/* Navbar Spacer */}
      <div className="h-[100px] md:h-[30px]" />

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-black mb-6">
              Our Clients <span className="text-white">💛</span>
            </h1>
            <p className="text-black text-lg md:text-xl font-medium tracking-wide uppercase opacity-70">
              Partnering with visionaries across the globe.
            </p>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-24 h-0 bg-[#197C48] mx-auto mt-12 opacity-30"
          />
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 md:gap-20 items-center">
          {clients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1 + index * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { duration: 0.3 },
              }}
              className="group relative flex items-center justify-center p-8 min-h-[160px] md:min-h-[220px] transition-all duration-700 cursor-pointer bg-white rounded-[2.5rem] hover:shadow-[0_45px_100px_-20px_rgba(0,0,0,0.15)]"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="w-full h-full max-w-[140px] max-h-[80px] md:max-w-[200px] md:max-h-[110px] object-contain filter grayscale-0 group-hover:grayscale transition-all duration-500"
              />

              {/* Subtle accent line on hover */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-[#197C48] group-hover:w-1/4 transition-all duration-500 rounded-full" />
            </motion.div>
          ))}
        </div>
      </main>

      {/* Our Work Section - Horizontal Draggable Marquee */}
      <section className="py-32 bg-[#050505] overflow-hidden relative select-none">
        <div className="relative py-12">
          {/* Marquee Container - Duplicated items for truly infinite scroll */}
          <motion.div
            ref={containerRef}
            className="flex gap-8 flex-nowrap px-6 md:px-12"
            style={{ x }}
            drag="x"
            dragConstraints={{ left: -4000, right: 0 }}
            onDragStart={() => {
              isPaused.current = true;
            }}
            onDragEnd={() => {
              isPaused.current = false;
            }}
            onMouseEnter={() => {
              isPaused.current = true;
            }}
            onMouseLeave={() => {
              isPaused.current = false;
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
              (item, i) => (
                <div
                  key={i}
                  className="w-[240px] md:w-[340px] aspect-[4/5] bg-[#111111] rounded-[3rem] overflow-hidden flex-shrink-0 relative group border border-white/5 transition-all duration-500 hover:border-white/10"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 transition-opacity group-hover:opacity-70" />

                  {/* Visual Label */}
                  <div className="absolute top-8 left-8">
                    <span className="px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full text-[#197C48] text-[9px] font-black uppercase tracking-[0.2em] border border-white/5">
                      Case Study
                    </span>
                  </div>

                  <div className="absolute bottom-10 left-10 right-10">
                    <p className="text-white/40 font-black text-[9px] uppercase tracking-[0.3em] mb-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      Production • 2024
                    </p>
                    <h3 className="text-white text-3xl font-black uppercase tracking-tight leading-none group-hover:text-[#197C48] transition-colors duration-500">
                      Project {item}
                    </h3>
                  </div>

                  {/* Large Background Item Number */}
                  <div className="w-full h-full flex items-center justify-center text-white/[0.02] font-black text-[12rem] select-none group-hover:text-white/[0.05] transition-all duration-700 group-hover:scale-110">
                    {item}
                  </div>
                </div>
              ),
            )}
          </motion.div>
        </div>

        {/* Custom scroll support indicator - very subtle */}
        <div className="text-center mt-12 opacity-20 hover:opacity-100 transition-opacity">
          <p className="text-white text-[8px] font-black uppercase tracking-[0.5em] flex items-center justify-center gap-6">
            <span className="w-12 h-[1px] bg-white" />
            DRAG OR SCROLL TO EXPLORE
            <span className="w-12 h-[1px] bg-white" />
          </p>
        </div>
      </section>

      {/* Philosophy Section (Cinematic Quote) */}
      <section className="bg-white py-32 md:py-56 text-center px-8 relative overflow-hidden">
        {/* Subtle background number/text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
          <span className="text-[30vw] font-black text-black select-none">
            CUCU
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto relative z-10"
        >
          <h2 className="text-3xl md:text-6xl font-normal leading-tight text-black tracking-tight mb-16">
            "We don’t just work for clients. We work{" "}
            <span className="font-black italic text-[#197C48]">
              with partners
            </span>{" "}
            to create brands that last."
          </h2>
          <button
            onClick={() => setPage("contact")}
            className="group relative px-12 py-5 overflow-hidden rounded-full transition-all"
          >
            <div className="absolute inset-0 bg-[#197C48] transition-transform duration-500 translate-y-[100%] group-hover:translate-y-0" />
            <div className="absolute inset-0 border-2 border-[#197C48] rounded-full" />
            <span className="relative z-10 text-xs font-black uppercase tracking-[0.3em] text-[#197C48] group-hover:text-white transition-colors duration-500">
              BECOME A PARTNER
            </span>
          </button>
        </motion.div>
      </section>

      <BigFooter setPage={setPage} />
    </motion.div>
  );
};
