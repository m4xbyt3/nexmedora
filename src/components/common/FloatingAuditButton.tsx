import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail } from 'lucide-react';

export const FloatingAuditButton: React.FC = () => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: 'spring' }}
      className="fixed bottom-6 left-6 z-[700] hidden sm:block"
    >
      <Link
        to="/contact"
        className="relative group flex items-center gap-2.5 px-4 py-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-full shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer text-left"
        aria-label="Contact Us"
      >
        {/* Pulsing halo */}
        <span className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-sky-500 rounded-full blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse" />

        <span className="relative p-1.5 rounded-full bg-teal-50 text-teal-700 border border-teal-100">
          <Mail className="w-4 h-4 text-teal-600" />
        </span>
        <div className="relative pr-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-[#0B1F3A] tracking-wide">
              Contact Us
            </span>
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
          </div>
          <span className="text-[10px] text-teal-700 font-semibold block">
            Zero Obligation • 24h Turnaround
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

