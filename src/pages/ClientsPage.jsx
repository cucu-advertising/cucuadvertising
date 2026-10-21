import React, { useRef, useLayoutEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useScroll,
  useTransform,
} from "framer-motion";
import { BigFooter } from "../components/Footer";
import { optimizedSrc } from "../utils/optimizedImage";
import DesignStudioSection from "../components/DesignStudioSection";

// Client Logos Imports
import logoAre from "../assets/client/are.webp";
import logoDailyMed from "../assets/client/daily med.webp";
import logoEs from "../assets/client/es.webp";
import logoFb from "../assets/client/fb.webp";
import logoGlobus from "../assets/client/globus.webp";
import logoGn from "../assets/client/gn.webp";
import logoHe from "../assets/client/he.webp";
import logoJaspire from "../assets/client/jaspire.webp";
import logoNyra from "../assets/client/nyra.webp";
import logoOneEnt from "../assets/client/one ent.webp";
import logoOryza from "../assets/client/oryza.webp";
import logoRavasa from "../assets/client/ravasa.webp";
import logoRemedy from "../assets/client/remedy.webp";
import logoSannidi from "../assets/client/sannidi.webp";
import logoSecretping from "../assets/client/seccretping.webp";
import logoSplitBe from "../assets/client/split be.webp";
import logoSvd from "../assets/client/svd.webp";
import logoVarun from "../assets/client/varun.webp";
import logoVijari from "../assets/client/vijari.webp";
import logoZargold from "../assets/client/zargold.webp";

const clients = [
  { id: 1, name: "Are", logo: logoAre },
  { id: 2, name: "Daily Med", logo: logoDailyMed },
  { id: 3, name: "ES", logo: logoEs },
  { id: 4, name: "FB", logo: logoFb },
  { id: 5, name: "Globus", logo: logoGlobus },
  { id: 6, name: "GN", logo: logoGn },
  { id: 7, name: "Happy Events", logo: logoHe },
  { id: 8, name: "Jaspire", logo: logoJaspire },
  // { id: 9, name: "Nyra", logo: logoNyra },
  { id: 10, name: "One Ent", logo: logoOneEnt },
  { id: 11, name: "Oryza", logo: logoOryza },
  { id: 12, name: "Ravasa", logo: logoRavasa },
  { id: 13, name: "Remedy", logo: logoRemedy },
  { id: 14, name: "Sannidhi", logo: logoSannidi },
  { id: 15, name: "Secretping", logo: logoSecretping },
  { id: 16, name: "Splitbi", logo: logoSplitBe },
  { id: 17, name: "SVD", logo: logoSvd },
  { id: 18, name: "Varun", logo: logoVarun },
  { id: 19, name: "Vihari", logo: logoVijari },
  { id: 20, name: "Zargold", logo: logoZargold },
];

const clientWork = [
  // Fruit Bandi
  {
    client: "Fruit Bandi",
    image: "/Clientwork/fruit bandi/01.  Sauce Jar Mockup.webp",
  },
  { client: "Fruit Bandi", image: "/Clientwork/fruit bandi/02.webp" },
  // { client: "Fruit Bandi", image: "/Clientwork/fruit bandi/03.webp" },
  // { client: "Fruit Bandi", image: "/Clientwork/fruit bandi/5.webp" },
  // { client: "Fruit Bandi", image: "/Clientwork/fruit bandi/board.webp" },
  // { client: "Fruit Bandi", image: "/Clientwork/fruit bandi/cap.webp" },
  // { client: "Fruit Bandi", image: "/Clientwork/fruit bandi/fd 3.webp" },
  // { client: "Fruit Bandi", image: "/Clientwork/fruit bandi/FRUIT COLOR.webp" },
  // { client: "Fruit Bandi", image: "/Clientwork/fruit bandi/logo.webp" },
  // Happy Events
  {
    client: "Happy Events",
    image: "/Clientwork/happy events/Happy events badge.webp",
  },
  {
    client: "Happy Events",
    image: "/Clientwork/happy events/Happy events bands.webp",
  },
  // {
  //   client: "Happy Events",
  //   image: "/Clientwork/happy events/Happy events bb.webp",
  // },
  // {
  //   client: "Happy Events",
  //   image: "/Clientwork/happy events/Happy events colors.webp",
  // },
  // {
  //   client: "Happy Events",
  //   image: "/Clientwork/happy events/Happy events id.webp",
  // },
  // {
  //   client: "Happy Events",
  //   image: "/Clientwork/happy events/Happy events letter.webp",
  // },
  // {
  //   client: "Happy Events",
  //   image: "/Clientwork/happy events/Happy events logos 1.webp",
  // },
  // {
  //   client: "Happy Events",
  //   image: "/Clientwork/happy events/Happy events logos.webp",
  // },
  // {
  //   client: "Happy Events",
  //   image: "/Clientwork/happy events/Happy events menu 1.webp",
  // },
  // {
  //   client: "Happy Events",
  //   image: "/Clientwork/happy events/Happy events menu.webp",
  // },
  // {
  //   client: "Happy Events",
  //   image: "/Clientwork/happy events/Happy events paper.webp",
  // },
  // {
  //   client: "Happy Events",
  //   image: "/Clientwork/happy events/Happy events stamp.webp",
  // },
  // One Ent
  {
    client: "One Ent",
    image: "/Clientwork/One ent/ONEENT Brand Guidelines bands.webp",
  },
  {
    client: "One Ent",
    image: "/Clientwork/One ent/ONEENT Brand Guidelines colors.webp",
  },
  // {
  //   client: "One Ent",
  //   image: "/Clientwork/One ent/ONEENT Brand Guidelines dress.webp",
  // },
  // {
  //   client: "One Ent",
  //   image: "/Clientwork/One ent/ONEENT Brand Guidelines hooarding.webp",
  // },
  // {
  //   client: "One Ent",
  //   image: "/Clientwork/One ent/ONEENT Brand Guidelines mask.webp",
  // },
  // {
  //   client: "One Ent",
  //   image: "/Clientwork/One ent/ONEENT Brand Guidelines sticker.webp",
  // },
  // {
  //   client: "One Ent",
  //   image: "/Clientwork/One ent/ONEENT Brand Guidelines-12 banner.webp",
  // },
  // {
  //   client: "One Ent",
  //   image: "/Clientwork/One ent/ONEENT Brand Guideslines.webp",
  // },
  // Secretping
  {
    client: "Secretping",
    image: "/Clientwork/secretping/Secretping Logo Concept_page-0002.webp",
  },
  {
    client: "Secretping",
    image: "/Clientwork/secretping/Secretping Logo Concept_page-0005.webp",
  },
  // {
  //   client: "Secretping",
  //   image: "/Clientwork/secretping/Secretping Logo Concept_page-0007.webp",
  // },
  // {
  //   client: "Secretping",
  //   image: "/Clientwork/secretping/Secretping Logo.webp",
  // },
  // { client: "Secretping", image: "/Clientwork/secretping/sp cardb.webp" },
  // { client: "Secretping", image: "/Clientwork/secretping/sp webiste.webp" },
  // Varun
  { client: "Varun", image: "/Clientwork/varun/varun engineers 1.webp" },
  { client: "Varun", image: "/Clientwork/varun/varun engineers 2.webp" },
  // { client: "Varun", image: "/Clientwork/varun/varun engineers 3.webp" },
  // { client: "Varun", image: "/Clientwork/varun/varun engineers 4.webp" },
  // { client: "Varun", image: "/Clientwork/varun/varun engineers 5.webp" },
  // { client: "Varun", image: "/Clientwork/varun/varun engineers 6.webp" },
  // { client: "Varun", image: "/Clientwork/varun/varun engineers 7.webp" },
  // { client: "Varun", image: "/Clientwork/varun/varun engineers all.webp" },
  // {
  //   client: "Varun",
  //   image: "/Clientwork/varun/varun engineers business card.webp",
  // },
  // { client: "Varun", image: "/Clientwork/varun/varun engineers entry.webp" },
  // {
  //   client: "Varun",
  //   image: "/Clientwork/varun/varun engineers logo and jacket.webp",
  // },
  // { client: "Varun", image: "/Clientwork/varun/varun engineers plaster.webp" },
  // { client: "Varun", image: "/Clientwork/varun/varun engineers stamp.webp" },
  // { client: "Varun", image: "/Clientwork/varun/varun engineers truck.webp" },
];

export const ClientsPage = ({ setPage }) => {
  const x = useMotionValue(0);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [contentWidth, setContentWidth] = useState(0);
  const isPaused = useRef(false);

  useLayoutEffect(() => {
    if (contentRef.current) {
      // Measure the actual width of a single set of items
      const width = contentRef.current.offsetWidth;
      setContentWidth(width);
    }

    const handleResize = () => {
      if (contentRef.current) {
        setContentWidth(contentRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useAnimationFrame((t, delta) => {
    if (isPaused.current || contentWidth === 0) return;

    const moveBy = -0.75 * (delta / 16);
    let currentX = x.get();

    // Loop point is exactly the width of one set
    if (currentX <= -contentWidth) {
      x.set(0);
    } else {
      x.set(currentX + moveBy);
    }
  });

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-[#FFD200] selection:text-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Navbar Spacer */}
        <div className="h-[100px] md:h-[30px]" />

        <main className="w-full py-12 md:py-24">
          {/* Header Section */}
          <div className="text-center mb-5 md:mb-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-black mb-4">
                Our Clients
              </h1>
            </motion.div>
          </div>

          {/* Clients Marquee Rows */}
          <div className="flex flex-col gap-0 overflow-hidden py-8 w-full max-w-[100vw] select-none">
            {/* Row 1 - Left to Right */}
            <div className="flex gap-2 md:gap-4 w-full group overflow-hidden items-center">
              <div className="flex shrink-0 gap-2 md:gap-4 items-center w-max animate-marquee-r group-hover:[animation-play-state:paused]">
                {clients.slice(0, 10).map((client) => (
                  <div
                    key={client.id}
                    className="relative flex items-center justify-center w-[200px] md:w-[300px] hover:scale-105 transition-all duration-300 shrink-0 cursor-pointer"
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="w-full h-auto max-h-[150px] md:max-h-[200px] object-contain transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
              {/* Duplicate for infinite loop */}
              <div
                className="flex shrink-0 gap-2 md:gap-4 items-center w-max animate-marquee-r group-hover:[animation-play-state:paused]"
                aria-hidden="true"
              >
                {clients.slice(0, 10).map((client) => (
                  <div
                    key={`${client.id}-dup`}
                    className="relative flex items-center justify-center w-[200px] md:w-[300px] hover:scale-105 transition-all duration-300 shrink-0 cursor-pointer"
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="w-full h-auto max-h-[150px] md:max-h-[200px] object-contain transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 - Right to Left */}
            <div className="flex gap-2 md:gap-4 w-full group overflow-hidden items-center">
              <div className="flex shrink-0 gap-2 md:gap-4 items-center w-max animate-marquee-l group-hover:[animation-play-state:paused]">
                {clients.slice(10).map((client) => (
                  <div
                    key={client.id}
                    className="relative flex items-center justify-center w-[200px] md:w-[300px] hover:scale-105 transition-all duration-300 shrink-0 cursor-pointer"
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="w-full h-auto max-h-[150px] md:max-h-[200px] object-contain transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
              {/* Duplicate for infinite loop */}
              <div
                className="flex shrink-0 gap-2 md:gap-4 items-center w-max animate-marquee-l group-hover:[animation-play-state:paused]"
                aria-hidden="true"
              >
                {clients.slice(10).map((client) => (
                  <div
                    key={`${client.id}-dup`}
                    className="relative flex items-center justify-center w-[200px] md:w-[300px] hover:scale-105 transition-all duration-300 shrink-0 cursor-pointer"
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="w-full h-auto max-h-[150px] md:max-h-[200px] object-contain transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Our Work Section - Horizontal Draggable Marquee */}
        <section className="py-12 bg-[#050505] overflow-hidden relative select-none">
          <div className="relative py-4">
            {/* Marquee Container - Duplicated items for truly infinite scroll */}
            <motion.div
              ref={containerRef}
              className="flex gap-8 flex-nowrap px-6 md:px-12 will-change-transform"
              style={{ x }}
              drag="x"
              dragConstraints={{ left: -contentWidth, right: 0 }}
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
              {/* Wrapper for measurement */}
              <div ref={contentRef} className="flex gap-8 flex-nowrap shrink-0">
                {clientWork.map((item, i) => (
                  <div
                    key={i}
                    className="w-[240px] md:w-[340px] aspect-[4/5] bg-[#111111] rounded-[3rem] overflow-hidden flex-shrink-0 relative group border border-white/5 transition-all duration-500 hover:border-white/10"
                  >
                    <img
                      src={optimizedSrc(item.image, 600)}
                      decoding="async"
                      alt={`${item.client} work`}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 transition-opacity group-hover:opacity-60" />

                    <div className="absolute top-8 left-8">
                      <span className="px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full text-[#197C48] text-[9px] font-black uppercase tracking-[0.2em] border border-white/5">
                        Case Study
                      </span>
                    </div>

                    <div className="absolute bottom-10 left-10 right-10">
                      <p className="text-white/40 font-black text-[9px] uppercase tracking-[0.3em] mb-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        Brand Identity • {item.client}
                      </p>
                      <h3 className="text-white text-3xl font-black uppercase tracking-tight leading-none group-hover:text-[#197C48] transition-colors duration-500">
                        {item.client}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>

              {/* Duplicate for infinite loop */}
              <div
                className="flex gap-8 flex-nowrap shrink-0"
                aria-hidden="true"
              >
                {clientWork.map((item, i) => (
                  <div
                    key={`${i}-dup`}
                    className="w-[240px] md:w-[340px] aspect-[4/5] bg-[#111111] rounded-[3rem] overflow-hidden flex-shrink-0 relative group border border-white/5 transition-all duration-500 hover:border-white/10"
                  >
                    <img
                      src={optimizedSrc(item.image, 600)}
                      decoding="async"
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 transition-opacity group-hover:opacity-60" />

                    <div className="absolute top-8 left-8">
                      <span className="px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full text-[#197C48] text-[9px] font-black uppercase tracking-[0.2em] border border-white/5">
                        Case Study
                      </span>
                    </div>

                    <div className="absolute bottom-10 left-10 right-10">
                      <p className="text-white/40 font-black text-[9px] uppercase tracking-[0.3em] mb-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        Brand Identity • {item.client}
                      </p>
                      <h3 className="text-white text-3xl font-black uppercase tracking-tight leading-none group-hover:text-[#197C48] transition-colors duration-500">
                        {item.client}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
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
      </motion.div>

      {/* Design Studio Section - OUTSIDE motion.div for proper sticky behavior */}
      {/* <DesignStudioSection /> */}

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
    </div>
  );
};
