import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { TRANSITION } from "../constants/config";
import logo from "../assets/logo_cucu_nobg.png";

export const Navbar = ({ activePage, setPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);

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
    { 
      label: "Portfolio", 
      path: "portfolio", 
      children: [
        { label: "Work", path: "work" },
        { label: "Clients", path: "clients" }
      ]
    },
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
      <div className="fixed top-0 left-0 w-full z-[100] px-4 py-10 pointer-events-none flex justify-center">
        <nav
          className={`pointer-events-auto h-14 px-6 flex items-center justify-between gap-8 bg-[#2d2d2d]/90 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl transition-all duration-500 w-full max-w-5xl`}
        >
          {/* Logo Section */}
          <button
            onClick={() => setPage("home")}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <img
              src={logo}
              alt="Cucu"
              className="h-8 w-auto object-contain brightness-0 invert"
            />
            <span className="hidden sm:block text-lg font-bold tracking-tight text-white capitalize">
              cucu advertising
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center bg-[#252525] rounded-xl p-1 gap-1">
            {navLinks.map((link) => (
              <div 
                key={link.label}
                className="relative"
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <button
                  onClick={() => !link.children && setPage(link.path)}
                  className={`relative px-5 py-2 text-sm font-medium transition-all duration-300 cursor-pointer rounded-lg flex items-center gap-1.5 ${
                    isLinkActive(link)
                      ? "text-black bg-white shadow-sm"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.label}
                  {link.children && (
                    <ChevronDown size={14} className={`transition-transform duration-300 ${hoveredLink === link.label ? 'rotate-180' : ''}`} />
                  )}
                </button>

                {/* Hover trigger for Portfolio submenu is handled by the parent div */}
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setPage("contact")}
              className="hidden md:block px-6 py-2 bg-black text-white text-sm font-semibold rounded-xl hover:bg-white hover:text-black transition-all duration-300 cursor-pointer border border-white/5 shadow-lg active:scale-95 whitespace-nowrap"
            >
              Get Started
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-white/80 p-2 cursor-pointer hover:text-white transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Dropdown Menu - Truly Full-Screen Typographic Style */}
      <AnimatePresence>
        {hoveredLink === "Portfolio" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 w-screen h-screen bg-[#050505]/90 backdrop-blur-3xl z-[150] flex items-center justify-start px-12 md:px-32 pointer-events-auto"
            onMouseEnter={() => setHoveredLink("Portfolio")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <motion.div 
              className="flex flex-col items-start gap-4"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  }
                }
              }}
            >
              {navLinks.find(l => l.label === "Portfolio")?.children?.map((child) => (
                <motion.button
                  key={child.path}
                  onClick={() => {
                    setPage(child.path);
                    setHoveredLink(null);
                  }}
                  variants={{
                    hidden: { opacity: 0, x: -50 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight text-white hover:text-[#40f996] transition-colors cursor-pointer group text-left"
                >
                  <span className="inline-block group-hover:translate-x-6 transition-transform duration-500">
                    {child.label}
                  </span>
                </motion.button>
              ))}
              
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => setHoveredLink(null)}
                className="mt-16 text-white/40 hover:text-white transition-colors cursor-pointer text-xs font-medium uppercase tracking-[0.3em] pl-1"
              >
                Close Portfolio
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                <div key={link.label} className="w-full flex flex-col items-center">
                  <button
                    onClick={() => {
                      if (link.children) {
                        setMobileExpanded(mobileExpanded === link.label ? null : link.label);
                      } else {
                        setPage(link.path);
                        setIsOpen(false);
                      }
                    }}
                    className={`w-full text-3xl font-bold tracking-tight py-4 flex items-center justify-center gap-3 transition-all ${
                      isLinkActive(link) ? "text-white" : "text-white/40 hover:text-white"
                    }`}
                  >
                    {link.label}
                    {link.children && (
                      <ChevronDown size={24} className={`transition-transform duration-300 ${mobileExpanded === link.label ? 'rotate-180' : ''}`} />
                    )}
                  </button>
                  
                  {link.children && mobileExpanded === link.label && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className="flex flex-col items-center gap-4 py-4 w-full"
                    >
                      {link.children.map(child => (
                        <button
                          key={child.path}
                          onClick={() => {
                            setPage(child.path);
                            setIsOpen(false);
                          }}
                          className={`text-xl font-semibold tracking-tight transition-all ${
                            activePage === child.path ? "text-white" : "text-white/30 hover:text-white"
                          }`}
                        >
                          {child.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
              <button
                onClick={() => {
                  setPage("contact");
                  setIsOpen(false);
                }}
                className={`text-3xl font-bold tracking-tight py-4 text-center transition-all ${
                  activePage === "contact" ? "text-white" : "text-white/40 hover:text-white"
                }`}
              >
                Get Started
              </button>
            </div>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="mt-16 text-white/50 hover:text-white transition-colors"
            >
              Close Menu
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

