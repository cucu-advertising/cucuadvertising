import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo_cucu_nobg.webp";
import { optimizedSrc } from "../utils/optimizedImage";

// CUCU intro loader, played on every full page load.
//   Act 1 — clover logo + "CUCU / Advertising" rises in.
//   Act 2 — "Big ideas." · client-work card · "Bold brands." with a 0–100 count.
//   Act 3 — a green curtain sweeps up and lifts away to reveal the site.

const GREEN = "#197C48";
const MINT = "#8CF2C6";
const EASE = [0.76, 0, 0.24, 1];

const WORK = [
  "/Clientwork/One ent/ONEENT Brand Guidelines dress.webp",
  "/Clientwork/fruit bandi/01.  Sauce Jar Mockup.webp",
  "/Clientwork/happy events/Happy events bb.webp",
  "/Clientwork/varun/varun engineers truck.webp",
  "/Clientwork/secretping/sp cardb.webp",
];

// Timeline (ms)
const T_INTRO_OUT = 1900;
const T_SHOWCASE = 2400;
const T_CURTAIN = 5000;
const T_FINISH = 6100;

const Preloader = ({ onFinish }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [showShowcase, setShowShowcase] = useState(false);
  const [showCurtain, setShowCurtain] = useState(false);
  const [step, setStep] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    WORK.forEach((src) => {
      const img = new Image();
      img.src = optimizedSrc(src, 600);
    });

    document.body.style.overflow = "hidden";
    const timers = [
      setTimeout(() => setShowIntro(false), T_INTRO_OUT),
      setTimeout(() => setShowShowcase(true), T_SHOWCASE),
      setTimeout(() => setShowCurtain(true), T_CURTAIN),
      setTimeout(() => onFinish?.(), T_FINISH),
    ];
    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, [onFinish]);

  // Cycle client work + run the counter while the showcase is up.
  useEffect(() => {
    if (!showShowcase) return;
    const cycle = setInterval(() => setStep((s) => (s + 1) % WORK.length), 500);
    const start = performance.now();
    const duration = T_CURTAIN - T_SHOWCASE - 200;
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      clearInterval(cycle);
      cancelAnimationFrame(raf);
    };
  }, [showShowcase]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: 0.9, ease: EASE } }}
      className="fixed inset-0 z-[9999] overflow-hidden bg-[#F2F2F2] text-black"
    >
      {/* ACT 1 — logo intro */}
      <AnimatePresence>
        {showIntro && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.img
              src={logo}
              alt="Cucu"
              initial={{ scale: 0.4, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0, y: -60 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="w-20 md:w-28 h-auto mb-6"
            />
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                exit={{ y: "-110%" }}
                transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
                className="text-[64px] md:text-[128px] font-black uppercase leading-none tracking-tighter"
                style={{ color: GREEN }}
              >
                Cucu
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              animate={{ opacity: 1, letterSpacing: "0.6em" }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-2 text-[11px] md:text-sm font-bold uppercase text-black/60"
            >
              Advertising
            </motion.p>
          </div>
        )}
      </AnimatePresence>

      {/* ACT 2 — showcase */}
      {showShowcase && (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <div className="w-full flex items-center justify-between gap-6 md:gap-20">
            <motion.p
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.1, ease: EASE }}
              className="text-[22px] md:text-[48px] font-black uppercase leading-[0.9] tracking-tighter"
            >
              Big
              <br />
              <span style={{ color: GREEN }}>ideas.</span>
            </motion.p>

            <motion.div
              initial={{ scale: 0.6, opacity: 0, borderRadius: "50%" }}
              animate={{ scale: 1, opacity: 1, borderRadius: "2rem" }}
              transition={{ duration: 1, ease: EASE }}
              className="relative shrink-0 w-[160px] h-[200px] md:w-[360px] md:h-[440px] overflow-hidden bg-white shadow-2xl"
            >
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={step}
                  src={optimizedSrc(WORK[step], 600)}
                  alt=""
                  initial={{ opacity: 0, scale: 1.25 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <div
                className="absolute bottom-0 left-0 h-1.5"
                style={{ width: `${count}%`, background: MINT }}
              />
            </motion.div>

            <motion.p
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.1, ease: EASE }}
              className="text-[22px] md:text-[48px] font-black uppercase leading-[0.9] tracking-tighter text-right"
            >
              Bold
              <br />
              <span style={{ color: GREEN }}>brands.</span>
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute bottom-8 md:bottom-12 left-6 right-6 md:left-12 md:right-12 flex items-end justify-between"
          >
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-black/50">
              We don't just deliver, we elevate.
            </span>
            <span
              className="text-5xl md:text-8xl font-black leading-none tracking-tighter tabular-nums"
              style={{ color: GREEN }}
            >
              {count}
              <span className="text-2xl md:text-4xl align-top">%</span>
            </span>
          </motion.div>
        </div>
      )}

      {/* ACT 3 — green curtain sweep */}
      {showCurtain && (
        <>
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="absolute inset-0 z-10"
            style={{ background: MINT }}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
            className="absolute inset-0 z-20 flex items-center justify-center"
            style={{ background: GREEN }}
          >
            <motion.img
              src={logo}
              alt=""
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="w-16 md:w-20 h-auto brightness-0 invert"
            />
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default Preloader;
