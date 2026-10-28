import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-teal-400 via-blue-500 via-amber-400 via-rose-500 to-emerald-400 origin-left z-[9999] shadow-xs pointer-events-none"
      style={{ scaleX }}
    />
  );
};
