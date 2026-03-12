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
    // whileHover="hover" // This was commented out in original, but removed in instruction. Keeping it removed.
  >
    {/* The motion.span for the icon was removed in the instruction's SocialLink definition */}
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-bold text-lg md:text-xl uppercase tracking-widest text-[#197C48] hover:text-[#050505] transition-colors py-2"
    >
      {label}
    </a>
  </motion.div>
);

export const StandardFooterContent = () => (
  <div className="relative z-10 flex flex-col md:flex-row justify-between items-end border-t border-[#197C48]/20 pt-8 pb-12 w-full">
    <div className="flex flex-wrap gap-8 md:gap-12 mb-8 md:mb-0">
      {socialLinks.map((link) => (
        <SocialLink key={link.label} {...link} />
      ))}
    </div>
    <div className="text-right">
      <p className="font-mono text-sm uppercase font-bold text-slate-950">
        © 2026 Cucu Advertising
      </p>
      <p className="font-mono text-sm uppercase text-slate-500">
        Hyderabad • Mumbai
      </p>
    </div>
  </div>
);

export const BigFooter = ({ setPage }) => {
  const handleScrollToTop = () => {
    gsap.to(window, { duration: 1.5, scrollTo: 0, ease: "power2.inOut" });
  };

  return (
    <section className="min-h-[80vh] bg-white text-slate-950 flex flex-col justify-between p-6 md:p-12 relative overflow-hidden z-20">
      <div className="relative z-10 flex justify-between items-start pt-12">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-black uppercase text-slate-950">Start a Project</h2>
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
            className="absolute -top-12 right-0 bg-[#197C48] text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap pointer-events-none shadow-xl shadow-[#197C48]/20 z-50"
          >
            Back to Top
            {/* Tooltip Arrow */}
            <div className="absolute -bottom-1 right-6 w-2 h-2 bg-[#197C48] rotate-45" />
          </motion.div>

          <span className="text-[10px] md:text-sm font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-[#197C48] transition-colors duration-500">
            We don't just deliver, we elevate.
          </span>
          <ArrowUpRight
            size={64}
            className="text-[#197C48] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500"
          />
        </motion.div>
      </div>

      <div className="relative z-10 text-center py-20">
        <motion.button
          onClick={() => setPage("contact")}
          style={{ 
            "--blink-color": "#e2e8f0",
            WebkitTextStroke: "1px rgba(25, 124, 72, 0.05)",
          }}
          animate={{ 
            "--blink-color": ["#e2e8f0", "#197C48", "#e2e8f0"],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-[18vw] font-black leading-none uppercase tracking-tighter cursor-pointer transition-all duration-700 bg-clip-text text-transparent bg-gradient-to-r from-[#197C48] from-50% to-[var(--blink-color)] to-50% bg-[length:200%_100%] bg-[position:100%_0] hover:bg-[position:0_0]"
        >
          Let's Talk
        </motion.button>
      </div>

      <StandardFooterContent />
    </section>
  );
};
