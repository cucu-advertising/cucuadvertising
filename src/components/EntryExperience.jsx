import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ACCENT = "#FF6B35";

/**
 * EntryExperience
 * A premium, fullscreen, pure-white gate shown once per session on the
 * homepage only. No navigation, no scrolling — just the wordmark and an
 * ENTER button. Clicking ENTER plays a cinematic fade / slight-zoom / white
 * flash transition straight into the homepage.
 */
const EntryExperience = ({ onComplete }) => {
  const [leaving, setLeaving] = useState(false);

  const handleEnter = useCallback(() => {
    if (leaving) return;
    setLeaving(true);
    // Let the cinematic exit play, then hand off to the homepage
    setTimeout(() => onComplete?.(), 900);
  }, [leaving, onComplete]);

  return (
    <div className="fixed inset-0 z-[10000] bg-white overflow-hidden select-none">
      {/* Content: fades + zooms slightly as it leaves */}
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={leaving ? { opacity: 0, scale: 1.06 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.83, 0, 0.17, 1] }}
        className="w-full h-full flex flex-col items-center justify-center px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-[Manrope] text-black font-extralight tracking-[0.28em] text-[clamp(28px,5.5vw,58px)] leading-none">
            CUCU
          </h1>
          <h1 className="font-[Manrope] text-black font-black tracking-[0.14em] text-[clamp(28px,5.5vw,58px)] leading-none mt-2">
            ADVERTISING
          </h1>
        </motion.div>

        <motion.button
          onClick={handleEnter}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ letterSpacing: "0.5em", borderColor: ACCENT, color: ACCENT }}
          className="mt-14 text-black/70 text-xs font-medium uppercase tracking-[0.35em] border border-black/20 rounded-full px-9 py-3 transition-colors duration-300 cursor-pointer"
          style={{ transitionTimingFunction: "ease" }}
        >
          Enter
        </motion.button>
      </motion.div>

      {/* Cinematic white flash on exit */}
      <AnimatePresence>
        {leaving && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.7, times: [0, 0.4, 1], ease: "easeInOut" }}
            className="absolute inset-0 bg-white pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default EntryExperience;
