import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { TRANSITION } from "../constants/config";
import logo from "../assets/logo_cucu_nobg.png";

import aboutIcon from "../assets/navbar/about-icon.png";
import servicesIcon from "../assets/navbar/services-icon.png";
import clientsIcon from "../assets/navbar/clients-icon.png";
import careerIcon from "../assets/navbar/career-icon.svg";
import contactIcon from "../assets/navbar/contact-icon.png";
import projectsIcon from "../assets/navbar/projects-icon.svg";
import awardsIcon from "../assets/navbar/awards-icon.svg";
import teamIcon from "../assets/navbar/team-icon.svg";

export const Navbar = ({ activePage, setPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const navLinks = [
    { label: "About Us", path: "about", icon: aboutIcon },
    { label: "Services", path: "services", icon: servicesIcon },
    // { label: "Our Work", path: "work", icon: projectsIcon },
    // { label: "Awards", path: "awards", icon: awardsIcon },
    { label: "Clients", path: "clients", icon: clientsIcon },
    // { label: "Our Team", path: "team", icon: teamIcon },
    { label: "Careers", path: "careers", icon: careerIcon },
    { label: "Contact Us", path: "contact", icon: contactIcon },
  ];

  useEffect(() => {
    // Check if we've already shown the intro animation in this session
    const shown = sessionStorage.getItem("logo_animated");
    if (shown) setHasAnimated(true);

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAnimationComplete = () => {
    sessionStorage.setItem("logo_animated", "true");
    setHasAnimated(true);
  };

  const logoVariants = {
    initial: { x: "280px", opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 2.5,
        ease: [0.45, 0, 0.55, 1], // Custom cubic-bezier for smooth writing feel
        delay: 0.5,
      },
    },
  };

  const textVariants = {
    initial: { clipPath: "inset(0 0 0 100%)", opacity: 0 },
    animate: {
      clipPath: "inset(0 0 0 0%)",
      opacity: 1,
      transition: {
        duration: 2.5,
        ease: [0.45, 0, 0.55, 1],
        delay: 0.5,
      },
    },
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-0.75 bg-white origin-left z-[102]"
      />

      <nav
        className={`fixed top-0 left-0 w-full z-[100] pt-[calc(1.5rem+6px)] pb-6 md:pt-[calc(0.75rem+6px)] md:pb-3 px-8 md:px-12 flex justify-between items-center transition-all duration-300 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 shadow-xl`}
      >
        <button
          onClick={() => setPage("home")}
          className="flex items-center group cursor-pointer"
        >
          <motion.div
            initial={!hasAnimated ? "initial" : false}
            animate={!hasAnimated ? "animate" : false}
            onAnimationComplete={handleAnimationComplete}
            className="flex items-center relative"
          >
            <motion.div className="flex items-center">
              <motion.img
                src={logo}
                alt="Cucu Advertising"
                variants={logoVariants}
                className="h-10 md:h-14 w-auto object-contain z-20"
              />
              <motion.span
                variants={textVariants}
                className="ml-3 text-2xl md:text-3xl font-black tracking-tighter text-white uppercase whitespace-nowrap"
              >
                CUCU <span className="text-white">Advertising</span>
              </motion.span>
            </motion.div>
          </motion.div>
        </button>

        <div className="hidden md:flex gap-8 lg:gap-10 items-center mt-8">
          {navLinks.map((link) => (
            <motion.div
              key={link.path}
              className="relative flex flex-col items-center"
              initial="initial"
              animate={activePage === link.path ? "hover" : "initial"}
              whileHover="hover"
            >
              <motion.span
                variants={{
                  initial: { opacity: 0, y: 10 },
                  hover: { opacity: 1, y: -35 },
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute pointer-events-none"
              >
                <img
                  src={link.icon}
                  alt={link.label}
                  className="w-10 h-10 object-contain"
                />
              </motion.span>
              <button
                onClick={() => setPage(link.path)}
                className={`text-[12px] lg:text-[13px] font-black uppercase tracking-[0.05em] transition-colors py-2 cursor-pointer ${
                  activePage === link.path
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            </motion.div>
          ))}
        </div>

        <button
          className="md:hidden text-white p-2 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={24} />
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={TRANSITION}
            className="fixed inset-0 bg-[#050505] z-[101] flex flex-col items-center justify-center gap-6 pointer-events-auto"
          >
            <button
              className="absolute top-8 right-8 text-white cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <X size={32} />
            </button>
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => {
                  setPage(link.path);
                  setIsOpen(false);
                }}
                className="text-2xl font-black uppercase tracking-tighter text-white hover:text-white/70 flex items-center gap-4 cursor-pointer"
              >
                <img
                  src={link.icon}
                  alt={link.label}
                  className="w-12 h-12 object-contain"
                />
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
