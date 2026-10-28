import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const WhatsAppButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const whatsappUrl =
    'https://wa.me/917041451969?text=Hello%20Nexmedora%2C%20I%20would%20like%20to%20know%20more%20about%20your%20medical%20billing%20services.';

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8, type: 'spring', damping: 20 }}
      className="fixed bottom-[92px] right-6 z-[700]"
    >
      <div
        className="relative flex items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Tooltip on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 8, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 8, scale: 0.95 }}
              transition={{ duration: 0.18 }}
              className="absolute right-full mr-3.5 px-3 py-1.5 bg-[#0B1F3A] text-white text-xs font-semibold rounded-xl shadow-lg whitespace-nowrap pointer-events-none flex items-center gap-1.5"
            >
              <span>Chat on WhatsApp</span>
              <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-[#0B1F3A] rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* WhatsApp Floating Round Button (56px) */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Nexmedora on WhatsApp"
          className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/30 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 cursor-pointer"
        >
          {/* Official WhatsApp Vector Glyph */}
          <svg
            viewBox="0 0 24 24"
            className="w-7 h-7 fill-white"
            aria-hidden="true"
          >
            <path d="M12.031 2c-5.518 0-9.998 4.48-9.998 9.998 0 1.761.458 3.479 1.33 4.992l-1.413 5.163 5.285-1.387c1.462.798 3.109 1.23 4.796 1.23 5.518 0 9.998-4.48 9.998-9.998 0-5.518-4.48-9.998-9.998-9.998zm0 18.286c-1.503 0-2.977-.404-4.265-1.168l-.306-.181-3.17.831.846-3.089-.199-.317c-.84-1.336-1.285-2.887-1.285-4.482 0-4.57 3.718-8.288 8.379-8.288 4.57 0 8.288 3.718 8.288 8.288 0 4.57-3.718 8.288-8.288 8.288zm4.542-6.196c-.249-.125-1.472-.727-1.7-.81-.229-.083-.395-.125-.561.125-.166.249-.643.81-.788.976-.145.166-.291.187-.54.062s-1.05-.387-2-1.234c-.739-.659-1.238-1.474-1.383-1.723-.145-.249-.015-.384.109-.508.112-.112.249-.291.374-.436.125-.145.166-.249.249-.415.083-.166.042-.312-.021-.436s-.561-1.35-.768-1.849c-.202-.486-.407-.42-.561-.428-.145-.008-.312-.01-.478-.01-.166 0-.436.062-.664.312-.229.249-.872.852-.872 2.078 0 1.226.893 2.41 1.018 2.576.125.166 1.758 2.684 4.258 3.764.595.257 1.06.411 1.423.526.598.19 1.142.163 1.572.099.479-.071 1.472-.602 1.68-1.184.208-.582.208-1.08.145-1.184-.062-.104-.229-.166-.478-.291z" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
};
