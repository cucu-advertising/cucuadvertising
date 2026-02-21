import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { BarChart3, Video, Lightbulb, Rocket } from "lucide-react";

export const CreativeHouse = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="py-32 bg-[#40F996] text-[#050505] relative overflow-hidden flex items-center justify-center border-y-8 border-black group"
    >
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <motion.div
          style={{
            x: useTransform(mouseX, [0, 2000], [0, 50]),
            y: useTransform(mouseY, [0, 2000], [0, 50]),
          }}
          className="absolute top-20 left-[10%] drop-shadow-2xl"
        >
          <BarChart3 size={140} strokeWidth={1} />
        </motion.div>
        <motion.div
          style={{
            x: useTransform(mouseX, [0, 2000], [0, -40]),
            y: useTransform(mouseY, [0, 2000], [0, 60]),
          }}
          className="absolute bottom-20 right-[15%] drop-shadow-2xl"
        >
          <Video size={120} strokeWidth={1} />
        </motion.div>
        <motion.div
          style={{
            x: useTransform(mouseX, [0, 2000], [0, 80]),
            y: useTransform(mouseY, [0, 2000], [0, -30]),
          }}
          className="absolute top-1/2 left-[20%] -translate-y-1/2 rotate-12 drop-shadow-2xl"
        >
          <Lightbulb size={180} strokeWidth={0.5} />
        </motion.div>
        <motion.div
          style={{
            x: useTransform(mouseX, [0, 2000], [0, -60]),
            y: useTransform(mouseY, [0, 2000], [0, -40]),
          }}
          className="absolute top-1/3 right-[25%] -translate-y-1/2 -rotate-12 drop-shadow-2xl"
        >
          <Rocket size={160} strokeWidth={0.5} />
        </motion.div>
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="inline-block bg-[#197C48] text-[#197C48] px-6 py-2 font-black uppercase tracking-widest mb-10 border-4 border-black shadow-[8px_8px_0px_0px_rgba(140,242,198,1)]"
        >
          The Collective
        </motion.div>
        <h2 className="text-6xl md:text-[10vw] font-black uppercase tracking-tighter leading-none mb-4 pointer-events-none">
          welcome into our <br />
          <span className="text-[#0F5E3C] italic relative">
            house of creativity
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              className="absolute bottom-0 left-0 h-4 bg-[#40F996]/30 -z-10"
            />
          </span>
        </h2>
      </div>
    </section>
  );
};
