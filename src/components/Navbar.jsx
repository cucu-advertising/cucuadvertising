import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { TRANSITION } from "../constants/config";
import logo from "../assets/logo_cucu_nobg.webp";

export const Navbar = ({ activePage, setPage, navReady = true, homeMode = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // On the homepage, the nav is hidden completely until the visitor scrolls
  // past the hero — then it fades in from the top and becomes a sticky
  // glassmorphism bar. Every other page keeps the nav visible as normal.
  const [homeRevealed, setHomeRevealed] = useState(false);

  useEffect(() => {
    if (!homeMode) return;
    const handleHomeScroll = () => {
      setHomeRevealed(window.scrollY > 80);
    };
    handleHomeScroll();
    window.addEventListener("scroll", handleHomeScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleHomeScroll);
  }, [homeMode]);

  // Reset the reveal state whenever we leave home mode so the nav waits
  // for a fresh scroll the next time the homepage loads.
  useEffect(() => {
    if (!homeMode) setHomeRevealed(false);
  }, [homeMode]);

  const navHidden = !navReady || (homeMode && !homeRevealed);
  // The navbar always uses the light glassmorphism styling now (no more dark band).

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const navLinks = [
    { label: "Home", path: "home" },
    { label: "About", path: "about" },
    { label: "Services", path: "services" },
    { label: "Portfolio", path: "work" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLinkActive = (link) => {
    if (activePage === link.path) return true;
    if (link.children && link.children.some(child => activePage === child.path)) return true;
    return false;
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-[100] px-4 py-6 flex justify-center pointer-events-none`}
      >
        <motion.nav
          initial={false}
          animate={navHidden ? { opacity: 0, y: -24 } : { opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
          style={{ pointerEvents: navHidden ? "none" : "auto" }}
          className="h-14 px-6 flex items-center justify-between gap-8 rounded-2xl border shadow-2xl w-full max-w-5xl transition-colors duration-500 bg-white/70 backdrop-blur-xl border-black/5"
        >
          {/* Logo Section */}
          <button
            onClick={() => setPage("home")}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <img
              src={logo}
              alt="Cucu"
              className="h-8 w-auto object-contain"
            />
            <span className="hidden sm:block text-lg font-bold tracking-tight capitalize text-black">
              cucu advertising
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center rounded-xl p-1 gap-1 bg-black/5">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => setPage(link.path)}
                className={`relative px-5 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer rounded-lg ${
                  isLinkActive(link)
                    ? "text-black bg-[#31ee9c] shadow-sm"
                    : "text-black/50 hover:text-[#31ee9c]"
                }`}
                style={{ transitionTimingFunction: "ease" }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA Section */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setPage("contact")}
              className="hidden md:block px-6 py-2 text-sm font-semibold rounded-xl transition-colors duration-300 cursor-pointer border shadow-lg active:scale-95 whitespace-nowrap bg-black text-white border-black/10 hover:bg-[#31ee9c] hover:border-[#31ee9c] hover:text-black"
              style={{ transitionTimingFunction: "ease" }}
            >
              Let's Connect
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 cursor-pointer transition-colors duration-300 text-black/70 hover:text-[#31ee9c]"
              onClick={() => setIsOpen(!isOpen)}
              style={{ transitionTimingFunction: "ease" }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-[#1a1a1a]/95 backdrop-blur-xl z-[99] flex flex-col items-center justify-center p-8 pt-24"
          >
            <div className="flex flex-col gap-4 w-full max-w-xs">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => {
                    setPage(link.path);
                    setIsOpen(false);
                  }}
                  className={`w-full text-3xl font-bold tracking-tight py-4 flex items-center justify-center gap-3 transition-colors duration-300 ease-in-out ${
                    isLinkActive(link) ? "text-white" : "text-white/40 hover:text-[#31ee9c]"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setPage("contact");
                  setIsOpen(false);
                }}
                className={`text-3xl font-bold tracking-tight py-4 text-center transition-colors duration-300 ease-in-out ${
                  activePage === "contact" ? "text-white" : "text-white/40 hover:text-[#31ee9c]"
                }`}
              >
                Let's Connect
              </button>
            </div>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="mt-16 text-white/50 hover:text-[#31ee9c] transition-colors duration-300 ease-in-out"
            >
              Close Menu
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

