import React, { useState } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";

export const HeroHighlight = ({ children, className, containerClassName }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hover, setHover] = useState(false);

  function handleMouseMove(e) {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }

  return (
    <div
      className={`relative h-[40rem] flex items-center bg-white dark:bg-black justify-center w-full group ${containerClassName}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="absolute inset-0 bg-gray-200 dark:bg-gray-900 pointer-events-none" />

      {/* Instead of conditionally rendering, we keep motion.div always present */}
      <motion.div
        className="absolute inset-0 bg-indigo-500"
        style={{
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          opacity: hover ? 0.5 : 0, // Instead of removing, we set opacity
          transition: "opacity 0.3s ease-in-out",
        }}
      />

      <div className={`relative z-10 ${className}`}>{children}</div>
    </div>
  );
};

export const Highlight = ({ children, className }) => {
  return (
    <motion.span
      initial={{ backgroundSize: "0% 100%" }}
      animate={{ backgroundSize: "100% 100%" }}
      transition={{ duration: 2, ease: "linear", delay: 0.5 }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
      }}
      className={`relative inline-block pb-1 px-1 rounded-lg bg-gradient-to-r from-indigo-400 to-purple-400 dark:from-indigo-600 dark:to-purple-600 ${className}`}
    >
      {children}
    </motion.span>
  );
};
