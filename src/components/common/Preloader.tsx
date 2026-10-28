import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity } from 'lucide-react';
import { NexmedoraLogo } from './NexmedoraLogo';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    // Check if session already loaded
    const hasLoaded = sessionStorage.getItem('nexmedora_loaded');
    if (hasLoaded) {
      setLoading(false);
      onComplete?.();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem('nexmedora_loaded', 'true');
            onComplete?.();
          }, 350);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20 + 15);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader-curtain"
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050d1a] text-white"
        >
          {/* Background Ambient Glow */}
          <div className="absolute w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />

          <div className="relative flex flex-col items-center">
            {/* Nexmedora Logo */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="mb-6 flex items-center justify-center"
            >
              <NexmedoraLogo variant="preloader" />
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-6"
            >
              <p className="text-xs text-slate-400 tracking-widest uppercase">
                US Healthcare Revenue Acceleration
              </p>
            </motion.div>

            {/* Progress Bar */}
            <div className="w-56 h-1.5 bg-slate-800 rounded-full overflow-hidden mb-3 border border-slate-700/50">
              <motion.div
                className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: 'easeOut', duration: 0.2 }}
              />
            </div>

            {/* Percentage & Subtitle */}
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <Activity className="w-3.5 h-3.5 text-teal-400 animate-spin" />
              <span>Initializing 24/7 Operations ({Math.min(progress, 100)}%)</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
