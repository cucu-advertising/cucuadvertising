import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

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
    whileHover="hover"
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
        © 2023 Cucu Advertising
      </p>
      <p className="font-mono text-sm uppercase opacity-70 text-inherit">
        Karnataka • Tamil Nadu • Kerala
      </p>
    </div>
  </div>
);

export const BigFooter = ({ setPage }) => {
  return (
    <section className="min-h-screen bg-[#050505] text-[#40F996] flex flex-col justify-between p-6 md:p-12 relative overflow-hidden z-10">
      <div className="relative z-10 flex justify-between items-start pt-12">
        <h2 className="text-2xl font-bold uppercase">Start a Project</h2>
        <ArrowUpRight size={64} className="text-[#40F996]" />
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
