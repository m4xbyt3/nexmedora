import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import {
  Clock,
  ArrowRight,
  Shield,
  FileText,
  Coins,
  Plus,
  Award,
  Calendar,
  ShieldCheck,
  Key,
  Receipt,
  FileCode2,
  Send,
  RotateCcw,
  PhoneCall,
  Mail,
  HeartHandshake,
  BarChart3,
  CheckCircle2
} from 'lucide-react';
import { rcmProcessSteps, rcmPhases } from '../../data/rcmProcessData';
import { RCMStep } from '../../types';

const getStepIcon = (stepNumber: number) => {
  switch (stepNumber) {
    case 1:
      return Award;
    case 2:
      return Calendar;
    case 3:
      return ShieldCheck;
    case 4:
      return Key;
    case 5:
      return Receipt;
    case 6:
      return FileCode2;
    case 7:
      return Coins;
    case 8:
      return Send;
    case 9:
      return CheckCircle2;
    case 10:
      return RotateCcw;
    case 11:
      return PhoneCall;
    case 12:
      return Mail;
    case 13:
      return HeartHandshake;
    case 14:
    default:
      return BarChart3;
  }
};

interface StepBoxProps {
  step: RCMStep;
  isActive: boolean;
  onToggle: () => void;
  isReduced: boolean;
}

const StepBox: React.FC<StepBoxProps> = ({
  step,
  isActive,
  onToggle,
  isReduced,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = getStepIcon(step.stepNumber);
  const formattedNumber = step.stepNumber < 10 ? `0${step.stepNumber}` : `${step.stepNumber}`;

  return (
    <motion.div
      initial={isReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.4,
        ease: 'easeOut',
      }}
      animate={
        isReduced
          ? {}
          : {
              y: isActive ? -12 : isHovered ? -4 : 0,
              scale: isActive ? 1.04 : 1,
            }
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onToggle}
      className={`relative group rounded-2xl cursor-pointer select-none text-left p-5 flex flex-col justify-between overflow-hidden transition-colors duration-350 border ${
        isActive
          ? 'bg-[#0B1F3A] text-white border-teal-500/50 shadow-2xl shadow-[#0B1F3A]/35 z-20'
          : 'bg-white text-slate-800 border-slate-200/90 hover:border-teal-300 shadow-sm hover:shadow-md z-1'
      }`}
      style={{
        transition:
          'background-color 350ms ease, border-color 350ms ease, box-shadow 350ms ease',
      }}
    >
      {/* Top Edge Accent Bar (grows left-to-right 400ms on active) */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden rounded-t-2xl pointer-events-none h-1.5">
        <motion.div
          initial={false}
          animate={{
            scaleX: isActive ? 1 : 0,
            opacity: isActive ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'left' }}
          className="h-full w-full bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500"
        />

        {/* Hover preview thin line (2px) */}
        {!isActive && isHovered && !isReduced && (
          <div className="h-[2px] w-full bg-teal-400/80 transition-opacity duration-200" />
        )}
      </div>

      <div className="relative z-10">
        {/* Step Header: Number Chip + Icon */}
        <div className="flex items-center justify-between gap-2 mb-3.5 pt-0.5">
          <span
            className={`font-mono text-[11px] font-extrabold px-2.5 py-0.5 rounded-md transition-colors duration-300 ${
              isActive
                ? 'text-[#5EEAD4] bg-[#12305A] border border-teal-400/40'
                : 'text-teal-800 bg-teal-50 border border-teal-200/80'
            }`}
          >
            Step {formattedNumber}
          </span>

          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-colors duration-300 ${
              isActive
                ? 'bg-teal-950/70 border-teal-500/40 shadow-sm shadow-teal-500/20 text-[#5EEAD4]'
                : 'bg-teal-50/70 border-teal-100 group-hover:bg-teal-100/60 text-teal-700'
            }`}
          >
            <IconComponent className="w-5 h-5" />
          </div>
        </div>

        {/* Step Title */}
        <h3
          className={`text-sm sm:text-base font-bold font-heading leading-snug mb-2 transition-colors duration-300 ${
            isActive ? 'text-white' : 'text-[#0B1F3A]'
          }`}
        >
          {step.title}
        </h3>

        {/* Step Description */}
        <p
          className={`text-xs leading-relaxed transition-colors duration-300 ${
            isActive ? 'text-[#C7D4E8]' : 'text-slate-600'
          }`}
        >
          {step.description}
        </p>

        {/* Result Chip (shown only on steps that have one) */}
        {step.result && (
          <div className="mt-3.5">
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-colors duration-300 ${
                isActive
                  ? 'bg-teal-400/15 text-[#5EEAD4] border border-teal-400/30'
                  : 'bg-teal-50 text-teal-800 border border-teal-200/80'
              }`}
            >
              <span className="font-bold">Result:</span>
              <span>{step.result}</span>
            </span>
          </div>
        )}
      </div>

      {/* Box Footer: Phase Tag & SLA */}
      <div
        className={`relative z-10 pt-3.5 mt-4 border-t flex items-center justify-between text-[11px] transition-colors duration-300 ${
          isActive ? 'border-white/10' : 'border-slate-100'
        }`}
      >
        <span
          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider transition-colors duration-300 ${
            isActive
              ? 'text-[#5EEAD4] bg-teal-950/60 border border-teal-400/30'
              : 'text-teal-700 bg-teal-50'
          }`}
        >
          {step.category}
        </span>

        {step.turnaroundTime && (
          <span
            className={`flex items-center gap-1 font-mono text-[10px] transition-colors duration-300 ${
              isActive ? 'text-slate-300' : 'text-slate-500'
            }`}
          >
            <Clock className="w-3 h-3 text-teal-500 shrink-0" />
            <span>{step.turnaroundTime}</span>
          </span>
        )}
      </div>
    </motion.div>
  );
};

export const RcmProcessTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const isReduced = useReducedMotion();

  const handleToggle = (stepNumber: number) => {
    setActiveStep((prev) => (prev === stepNumber ? null : stepNumber));
  };

  return (
    <section className="py-20 lg:py-28 bg-white border-t border-slate-200 relative overflow-hidden">
      {/* Background Subtle Drifting Ambient Light & Dotted Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#0F9D91_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.035] pointer-events-none" />

      {!isReduced && (
        <div className="hidden md:block absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-teal-400/10 blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <motion.div
            className="absolute top-1/2 -right-20 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"
            animate={{
              x: [0, -35, 0],
              y: [0, 25, 0],
            }}
            transition={{
              duration: 26,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Faint Floating Background Icons */}
          <motion.div
            className="absolute top-16 left-12 text-teal-700/8 pointer-events-none"
            animate={{
              y: [0, -18, 0],
              x: [0, 8, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Plus className="w-16 h-16" />
          </motion.div>

          <motion.div
            className="absolute top-24 right-16 text-cyan-700/8 pointer-events-none"
            animate={{
              y: [0, 20, 0],
              x: [0, -12, 0],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Coins className="w-14 h-14" />
          </motion.div>

          <motion.div
            className="absolute bottom-20 left-20 text-teal-800/8 pointer-events-none"
            animate={{
              y: [0, -15, 0],
              x: [0, -10, 0],
            }}
            transition={{
              duration: 24,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Shield className="w-16 h-16" />
          </motion.div>

          <motion.div
            className="absolute bottom-24 right-24 text-blue-800/8 pointer-events-none"
            animate={{
              y: [0, 16, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <FileText className="w-14 h-14" />
          </motion.div>
        </div>
      )}

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-3 inline-block">
            End-to-End Operational Lifecycle
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] font-heading tracking-tight mb-4">
            Our {rcmProcessSteps.length}-Step Revenue Cycle Process
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            From initial provider credentialing to final reporting and analytics, our {rcmProcessSteps.length}-step protocol guarantees zero missed revenue. Click any box to inspect details.
          </p>
        </div>

        {/* ===================== 3 PHASES WITH GRID OF BOXES ===================== */}
        <div className="space-y-16 mb-14">
          {rcmPhases.map((phase) => (
            <div key={phase.phaseNumber} className="space-y-6">
              {/* Phase Heading Row with Thin Divider */}
              <div className="flex items-center gap-4">
                <div className="flex items-baseline gap-2.5 shrink-0">
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#0B1F3A] font-heading tracking-tight">
                    {phase.title}
                  </h3>
                  <span className="text-xs sm:text-sm font-medium text-teal-700">
                    ({phase.tagline})
                  </span>
                </div>
                <div className="h-px bg-slate-200 flex-1" />
              </div>

              {/* 4 boxes per row on large screens, 2 on tablets, 1 on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {phase.steps.map((step) => (
                  <StepBox
                    key={step.stepNumber}
                    step={step}
                    isActive={activeStep === step.stepNumber}
                    onToggle={() => handleToggle(step.stepNumber)}
                    isReduced={Boolean(isReduced)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Section Footer Callout Link */}
        <div className="text-center pt-4">
          <Link
            to="/process"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition shadow-md shadow-teal-700/20"
          >
            <span>Explore Full {rcmProcessSteps.length}-Step Architecture & SLAs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
