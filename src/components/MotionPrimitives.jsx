import React, { useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useVelocity,
  useTransform,
} from "framer-motion";

export const Magnetic = ({ children }) => {
  const ref = useRef(null);
  const position = { x: useMotionValue(0), y: useMotionValue(0) };
  const { x, y } = position;

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.2);
    y.set(middleY * 0.2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

export const ParallaxText = ({ children, baseVelocity = 100 }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });
  const x = useTransform(baseX, (v) => `${v}%`);
  const directionFactor = useRef(1);

  useEffect(() => {
    let lastTime = performance.now();
    const update = (time) => {
      const delta = time - lastTime;
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }
      moveBy += directionFactor.current * moveBy * velocityFactor.get();

      // Wrap the value between -25 and 0 to prevent overflow while keeping it seamless
      let nextBaseX = baseX.get() + moveBy;
      if (nextBaseX <= -25) nextBaseX = 0;
      if (nextBaseX > 0) nextBaseX = -25;
      baseX.set(nextBaseX);

      lastTime = time;
      requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }, [baseVelocity, velocityFactor]);

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap">
      <motion.div
        className="flex whitespace-nowrap text-[15vw] font-black uppercase leading-none tracking-tighter text-[#197C48]/20"
        style={{ x }}
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} className="block mr-12">
            {children}{" "}
          </span>
        ))}
      </motion.div>
    </div>
  );
};
