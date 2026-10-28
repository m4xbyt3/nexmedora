import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

interface SlotCounterProps {
  value: string;
  className?: string;
}

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Single spinning slot column
const SlotDigit: React.FC<{
  digit: number;
  inView: boolean;
  delay: number;
  shouldReduceMotion: boolean | null;
}> = ({ digit, inView, delay, shouldReduceMotion }) => {
  // If reduced motion is requested, render static
  if (shouldReduceMotion) {
    return <span>{digit}</span>;
  }

  // Create an extended array so the reel spins through numbers before landing
  // 0 -> 9 -> 0 -> 9 -> target
  const extendedDigits = [...DIGITS, ...DIGITS, digit];
  const targetIndex = 20; // Index of the target at the bottom

  return (
    <span className="inline-block overflow-hidden h-[1.12em] align-top">
      <motion.span
        className="flex flex-col select-none"
        initial={{ y: '0%' }}
        animate={{ y: inView ? `-${(targetIndex / extendedDigits.length) * 100}%` : '0%' }}
        transition={{
          type: 'spring',
          stiffness: 45,
          damping: 14,
          delay: delay,
          mass: 0.8,
        }}
      >
        {extendedDigits.map((d, idx) => (
          <span key={idx} className="h-[1.12em] flex items-center justify-center leading-none">
            {d}
          </span>
        ))}
      </motion.span>
    </span>
  );
};

export const SlotCounter: React.FC<SlotCounterProps> = ({ value, className = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const shouldReduceMotion = useReducedMotion();

  let numericCount = 0;

  return (
    <span ref={ref} className={`inline-flex items-baseline font-heading tracking-tight ${className}`}>
      {value.split('').map((char, index) => {
        const isDigit = /^[0-9]$/.test(char);
        if (isDigit) {
          const delay = 0.15 + numericCount * 0.1;
          numericCount++;
          return (
            <SlotDigit
              key={index}
              digit={parseInt(char, 10)}
              inView={inView}
              delay={delay}
              shouldReduceMotion={shouldReduceMotion}
            />
          );
        }
        return (
          <span key={index} className="inline-block select-none leading-none">
            {char}
          </span>
        );
      })}
    </span>
  );
};
