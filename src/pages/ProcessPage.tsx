import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Clock,
  CheckCircle2,
  Award,
  Calendar,
  ShieldCheck,
  Key,
  Receipt,
  FileCode2,
  Coins,
  Send,
  RotateCcw,
  PhoneCall,
  Mail,
  HeartHandshake,
  BarChart3
} from 'lucide-react';
import { rcmProcessSteps, rcmPhases } from '../data/rcmProcessData';
import { RCMStep } from '../types';

interface ProcessPageProps {
  onOpenAudit: () => void;
}

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

export const ProcessPage: React.FC<ProcessPageProps> = ({ onOpenAudit }) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const isReduced = useReducedMotion();

  const handleToggle = (stepNumber: number) => {
    setActiveStep((prev) => (prev === stepNumber ? null : stepNumber));
  };

  return (
    <div className="py-12 sm:py-16 bg-white text-slate-900">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <span className="px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-3 inline-block">
          The {rcmProcessSteps.length}-Step Architecture
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B1F3A] font-heading tracking-tight mb-4">
          End-to-End <span className="text-teal-600">RCM Flow & SLA Guarantees</span>
        </h1>
        <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          Zero dropped claims. Zero expired timely filing windows. Every step of our revenue cycle protocol is engineered to maximize clean claims and protect provider cash flow.
        </p>
      </div>

      {/* ===================== 3 PHASES WITH GRID OF BOXES ===================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 space-y-16">
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

      {/* CTA Box */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 bg-[#0B1F3A] text-white rounded-3xl space-y-4 shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            Benchmark Your Practice Against the {rcmProcessSteps.length}-Step Standard
          </h3>
          <p className="text-slate-300 text-sm max-w-lg mx-auto leading-relaxed">
            In just 15 days, our RCM specialist will audit your EOBs line by line and uncover the revenue slipping through your fingers. Know your leaks before they cost you another month.
          </p>
          <div className="flex items-center justify-center pt-2">
            <button
              onClick={onOpenAudit}
              className="px-8 py-3.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-sm transition shadow-lg shadow-teal-500/25 cursor-pointer"
            >
              Claim Your Free Practice Process Audit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
