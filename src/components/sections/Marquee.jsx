import React from "react";
import { ParallaxText } from "../MotionPrimitives";

export const Marquee = () => (
  <div className="py-24 bg-[#050505] text-[#050505] overflow-hidden relative z-10">
    <ParallaxText baseVelocity={-2}>
      Strategy Design Development Motion Branding
    </ParallaxText>
  </div>
);
