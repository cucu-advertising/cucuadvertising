import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

import facebookIcon from "../assets/footbar/facebook-icon.svg";
import instagramIcon from "../assets/footbar/instagram-icon.svg";
import linkedinIcon from "../assets/footbar/linkedin-icon.svg";
import whatsappIcon from "../assets/footbar/whatsapp-icon.svg";

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61551579710039",
    icon: facebookIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/cucuadvertising/",
    icon: instagramIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/cucuadvertsing/",
    icon: linkedinIcon,
  },
  {
    label: "WhatsApp",
    href: "https://api.whatsapp.com/send?phone=919440417034",
    icon: whatsappIcon,
  },
];

const SocialLink = ({ href, label, icon }) => (
  <motion.div
    className="relative flex flex-col items-center"
    initial="initial"
    // whileHover="hover"
  >
    <motion.span
      variants={{
        initial: { opacity: 0, y: -10 },
        hover: { opacity: 1, y: 50 },
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="absolute pointer-events-none"
    >
      <img
        src={icon}
        alt={label}
        className="w-12 h-12 md:w-14 md:h-14 object-contain"
      />
    </motion.span>
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-bold text-lg md:text-xl uppercase tracking-widest hover:text-white transition-colors py-2"
    >
      {label}
    </a>
  </motion.div>
);

export const StandardFooterContent = () => (
  <div className="relative z-10 flex flex-col md:flex-row justify-between items-end border-t border-[#40F996]/30 pt-8 pb-12 w-full">
    <div className="flex flex-wrap gap-8 md:gap-12 mb-8 md:mb-0">
      {socialLinks.map((link) => (
        <SocialLink key={link.label} {...link} />
      ))}
    </div>
    <div className="text-right">
      <p className="font-mono text-sm uppercase font-bold text-inherit">
        © 2026 Cucu Advertising
      </p>
      <p className="font-mono text-sm uppercase opacity-70 text-inherit">
        Karnataka • Tamil Nadu • Kerala
      </p>
    </div>
  </div>
);

export const BigFooter = ({ setPage }) => {
  const handleScrollToTop = () => {
    gsap.to(window, { duration: 1.5, scrollTo: 0, ease: "power2.inOut" });
  };

  return (
    <section className="min-h-screen bg-[#050505] text-[#40F996] flex flex-col justify-between p-6 md:p-12 relative overflow-hidden z-20">
      <div className="relative z-10 flex justify-between items-start pt-12">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold uppercase">Start a Project</h2>
        </div>
        <motion.div
          onClick={handleScrollToTop}
          initial="initial"
          whileHover="hovered"
          className="flex flex-col items-end gap-2 cursor-pointer relative group"
        >
          {/* Tooltip */}
          <motion.div
            variants={{
              initial: { opacity: 0, y: 10, scale: 0.9 },
              hovered: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute -top-12 right-0 bg-[#40F996] text-[#050505] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap pointer-events-none shadow-xl shadow-[#40F996]/20 z-50"
          >
            Back to Top
            {/* Tooltip Arrow */}
            <div className="absolute -bottom-1 right-6 w-2 h-2 bg-[#40F996] rotate-45" />
          </motion.div>

          <span className="text-[10px] md:text-sm font-black uppercase tracking-[0.2em] text-[#40F996]/60 group-hover:text-[#40F996] transition-colors duration-500">
            We don't just deliver, we elevate.
          </span>
          <ArrowUpRight
            size={64}
            className="text-[#40F996] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500"
          />
        </motion.div>
      </div>

      <div className="relative z-10 text-center py-24">
        <button
          onClick={() => setPage("contact")}
          className="text-[18vw] font-black leading-none uppercase tracking-tighter text-[#40F996]/10 hover:text-[#197C48] transition-colors cursor-pointer"
        >
          Let's Talk
        </button>
      </div>

      <StandardFooterContent />
    </section>
  );
};
