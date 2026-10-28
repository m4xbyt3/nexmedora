import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import {
  Zap,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  Plus,
  ClipboardList,
  FileText,
  CreditCard,
  Coins,
  CheckCircle2,
  ChevronDown,
  Activity,
  Receipt,
  Sparkles,
  Lock,
} from 'lucide-react';

export const WelcomeNexmedora: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Mouse parallax state
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion) return;
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      setMouseOffset({
        x: (e.clientX - centerX) / (rect.width / 2), // range -1 to 1
        y: (e.clientY - centerY) / (rect.height / 2),
      });
    }
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const headlineWords = [
    { text: 'Welcome', isGradient: false },
    { text: 'to', isGradient: false },
    { text: 'Nexmedora', isGradient: true },
  ];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col justify-center items-center py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-[#030914] via-[#07172c] to-[#040e1d] text-white selection:bg-teal-500 selection:text-white"
    >
      {/* ----------------- LAYERED MEDICAL BILLING BACKGROUND SCENE ----------------- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft radial background depth glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-tr from-teal-500/10 via-cyan-500/10 to-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />

        {/* 1. Thin Glowing Connecting Process Lines with Traveling Data Pulses */}
        <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="glowPulseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#818CF8" stopOpacity="0.8" />
            </linearGradient>
            <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Flow Line 1: Patient Registration (top left) to Center Verification */}
          <path
            d="M 120 180 Q 280 140 450 260"
            fill="none"
            stroke="url(#glowPulseGrad)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          {/* Flow Line 2: Verification to CMS-1500 Claim Scrubbing */}
          <path
            d="M 450 260 Q 600 380 320 540"
            fill="none"
            stroke="url(#glowPulseGrad)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          {/* Flow Line 3: Claim to Clearinghouse EDI Submission */}
          <path
            d="M 320 540 Q 650 620 880 320"
            fill="none"
            stroke="url(#glowPulseGrad)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          {/* Flow Line 4: Clearinghouse to ERA Payment Posting */}
          <path
            d="M 880 320 Q 980 480 1150 640"
            fill="none"
            stroke="url(#glowPulseGrad)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />

          {/* Traveling Data Pulse Dots along the lines */}
          <circle r="4" fill="#2DD4BF" filter="url(#cyanGlow)">
            <animateMotion
              path="M 120 180 Q 280 140 450 260"
              dur="6s"
              repeatCount="indefinite"
            />
          </circle>
          <circle r="3.5" fill="#38BDF8" filter="url(#cyanGlow)">
            <animateMotion
              path="M 450 260 Q 600 380 320 540"
              dur="7s"
              begin="1.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle r="4" fill="#14B8A6" filter="url(#cyanGlow)">
            <animateMotion
              path="M 320 540 Q 650 620 880 320"
              dur="8s"
              begin="3s"
              repeatCount="indefinite"
            />
          </circle>
          <circle r="3.5" fill="#60A5FA" filter="url(#cyanGlow)">
            <animateMotion
              path="M 880 320 Q 980 480 1150 640"
              dur="6.5s"
              begin="2s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>

        {/* ---------------- DEPTH LAYER 1: DEEP BACKGROUND (Slow Parallax) ---------------- */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: mouseOffset.x * -16,
                  y: mouseOffset.y * -16,
                }
          }
          transition={{ type: 'spring', damping: 20, stiffness: 60 }}
          className="absolute inset-0"
        >
          {/* Floating Medical Cross */}
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [-15, 15, -15], rotate: [0, 45, 90, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-16 left-[18%] opacity-30 text-teal-400"
          >
            <Plus className="w-10 h-10" strokeWidth={3} />
          </motion.div>

          {/* Floating Patient Chart Card */}
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [12, -14, 12] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-24 left-[12%] hidden lg:block"
          >
            <div className="p-3 bg-slate-900/60 border border-slate-700/60 rounded-xl backdrop-blur-md shadow-xl flex items-center gap-2.5 opacity-60">
              <ClipboardList className="w-4 h-4 text-sky-400" />
              <div>
                <span className="text-[10px] font-mono text-slate-300 block">EHR Patient Chart</span>
                <span className="text-[9px] text-teal-300 font-semibold">Active Encounter</span>
              </div>
            </div>
          </motion.div>

          {/* Floating Stethoscope Icon */}
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [-18, 14, -18], rotate: [-8, 8, -8] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-28 right-[15%] opacity-40 text-cyan-400"
          >
            <Stethoscope className="w-12 h-12" />
          </motion.div>

          {/* Floating Medical Cross #2 */}
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [14, -16, 14] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-32 right-[20%] opacity-25 text-blue-400"
          >
            <Activity className="w-10 h-10" />
          </motion.div>
        </motion.div>

        {/* ---------------- DEPTH LAYER 2: MIDGROUND (Interactive Parallax) ---------------- */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: mouseOffset.x * 24,
                  y: mouseOffset.y * 24,
                }
          }
          transition={{ type: 'spring', damping: 20, stiffness: 60 }}
          className="absolute inset-0"
        >
          {/* CMS-1500 Claim Form Miniature Card (Top Left) */}
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [-12, 16, -12], rotate: [-3, 3, -3] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-20 left-4 sm:left-12 lg:left-20 max-w-[210px] hidden sm:block"
          >
            <div className="p-3 bg-slate-950/80 border border-teal-500/40 rounded-2xl backdrop-blur-xl shadow-2xl shadow-teal-950/60">
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-800">
                <span className="text-[9px] font-mono font-bold text-rose-400 uppercase tracking-wider">
                  CMS-1500 CLAIM
                </span>
                <span className="text-[8px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                  EDI 837P
                </span>
              </div>
              <div className="space-y-1 text-[10px]">
                <div className="text-slate-300 font-medium">Box 24D: CPT 99213</div>
                <div className="flex justify-between text-slate-400 text-[9px] font-mono">
                  <span>Charge: $480.00</span>
                  <span className="text-teal-400 font-semibold">100% Scrubbed</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Insurance Card Miniature (Mid Left) */}
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [14, -14, 14], rotate: [2, -2, 2] }}
            transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[48%] left-2 sm:left-8 lg:left-16 hidden md:block"
          >
            <div className="p-3 bg-gradient-to-br from-blue-950/90 to-slate-900/90 border border-blue-500/30 rounded-2xl backdrop-blur-xl shadow-2xl w-48">
              <div className="flex items-center gap-1.5 mb-1.5">
                <CreditCard className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-[10px] font-bold text-blue-200">MEDICARE ADVANTAGE</span>
              </div>
              <div className="text-[9px] font-mono text-slate-400">ID: AP-8841920-01</div>
              <div className="text-[8px] text-teal-300 font-semibold mt-1">Copay $20 • Payer #00431</div>
            </div>
          </motion.div>

          {/* Floating CPT / ICD-10 Code Tags */}
          {/* Tag 1: 99213 */}
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [-10, 10, -10] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-40 left-[26%] hidden lg:block"
          >
            <span className="px-3 py-1 rounded-lg bg-teal-900/70 border border-teal-400/50 text-teal-300 text-xs font-mono font-bold shadow-lg shadow-teal-950/40">
              CPT 99213
            </span>
          </motion.div>

          {/* Tag 2: E11.9 */}
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [12, -12, 12] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-40 left-[28%] hidden lg:block"
          >
            <span className="px-3 py-1 rounded-lg bg-blue-900/70 border border-blue-400/50 text-blue-300 text-xs font-mono font-bold shadow-lg shadow-blue-950/40">
              ICD-10 E11.9
            </span>
          </motion.div>

          {/* Tag 3: J45.909 */}
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [-14, 14, -14] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-36 right-[26%] hidden lg:block"
          >
            <span className="px-3 py-1 rounded-lg bg-emerald-900/70 border border-emerald-400/50 text-emerald-300 text-xs font-mono font-bold shadow-lg shadow-emerald-950/40">
              ICD-10 J45.909
            </span>
          </motion.div>

          {/* Tag 4: 93000 */}
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [10, -10, 10] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-36 right-[28%] hidden lg:block"
          >
            <span className="px-3 py-1 rounded-lg bg-cyan-900/70 border border-cyan-400/50 text-cyan-300 text-xs font-mono font-bold shadow-lg shadow-cyan-950/40">
              CPT 93000
            </span>
          </motion.div>

          {/* Security Shield Badge (Top Right) */}
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [-15, 12, -15], rotate: [2, -2, 2] }}
            transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-20 right-4 sm:right-12 lg:right-20 hidden sm:block"
          >
            <div className="p-3 bg-slate-950/80 border border-teal-400/50 rounded-2xl backdrop-blur-xl shadow-2xl flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-white block">100% HIPAA SECURE</span>
                <span className="text-[9px] text-teal-300 font-mono">SOC 2 Type II Campus</span>
              </div>
            </div>
          </motion.div>

          {/* ERA 835 Payment Check / Remittance Card (Bottom Right) */}
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [16, -14, 16], rotate: [-2, 2, -2] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-20 right-4 sm:right-12 lg:right-16 hidden sm:block max-w-[210px]"
          >
            <div className="p-3.5 bg-slate-950/90 border border-emerald-500/40 rounded-2xl backdrop-blur-xl shadow-2xl shadow-emerald-950/50">
              <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-800">
                <div className="flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[10px] font-bold text-emerald-300">ERA 835 POSTED</span>
                </div>
              </div>
              <div className="text-[11px] font-mono text-white font-black mt-1">Paid: $3,450.00</div>
              <div className="text-[8px] text-slate-400 font-mono mt-0.5">EFT Direct to Clinic Bank</div>
            </div>
          </motion.div>
        </motion.div>

        {/* ---------------- DEPTH LAYER 3: FOREGROUND STATUS CHIPS ---------------- */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: mouseOffset.x * 40,
                  y: mouseOffset.y * 40,
                }
          }
          transition={{ type: 'spring', damping: 20, stiffness: 60 }}
          className="absolute inset-0"
        >
          {/* Status Chip 1: Eligibility Verified */}
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [-8, 8, -8] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[28%] left-[6%] sm:left-[10%] hidden md:block"
          >
            <div className="px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-400/60 text-emerald-300 text-xs font-semibold backdrop-blur-md shadow-lg shadow-emerald-950/50 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Eligibility Verified</span>
            </div>
          </motion.div>

          {/* Status Chip 2: Claim Submitted */}
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [8, -8, 8] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[32%] right-[6%] sm:right-[10%] hidden md:block"
          >
            <div className="px-3.5 py-1.5 rounded-full bg-sky-950/80 border border-sky-400/60 text-sky-300 text-xs font-semibold backdrop-blur-md shadow-lg shadow-sky-950/50 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-sky-400" />
              <span>Claim Submitted</span>
            </div>
          </motion.div>

          {/* Status Chip 3: Payment Posted */}
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [-10, 10, -10] }}
            transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-[28%] right-[8%] sm:right-[12%] hidden md:block"
          >
            <div className="px-3.5 py-1.5 rounded-full bg-teal-950/80 border border-teal-400/60 text-teal-300 text-xs font-semibold backdrop-blur-md shadow-lg shadow-teal-950/50 flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              <span>Payment Posted</span>
            </div>
          </motion.div>

          {/* Status Chip 4: Denial Appealed */}
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [10, -10, 10] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-[26%] left-[8%] sm:left-[12%] hidden md:block"
          >
            <div className="px-3.5 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-400/60 text-indigo-300 text-xs font-semibold backdrop-blur-md shadow-lg shadow-indigo-950/50 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Denial Appealed</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Dark Vignette Overlay for maximum foreground text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030914]/85 via-[#030914]/60 to-[#030914]/90 backdrop-blur-[1px]" />
      </div>

      {/* ----------------- CENTERED FOREGROUND CONTENT ----------------- */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center w-full">
        {/* 1. Small Label "Welcome" */}
        <motion.div
          initial={{ opacity: 0, y: -15, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-400/30 text-teal-300 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-6 shadow-sm shadow-teal-950"
        >
          <Sparkles className="w-3.5 h-3.5 text-teal-400" />
          <span>Welcome</span>
        </motion.div>

        {/* 2. Headline: "Welcome to Nexmedora" with words fading and rising one by one */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight text-white mb-6 leading-tight">
          {headlineWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.15 + i * 0.12,
                duration: 0.55,
                ease: 'easeOut',
              }}
              className={`inline-block mr-3 ${
                word.isGradient
                  ? 'bg-gradient-to-r from-teal-300 via-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-sm font-black'
                  : ''
              }`}
            >
              {word.text}
            </motion.span>
          ))}
        </h2>

        {/* 3. Mission Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-[800px] mx-auto leading-relaxed font-normal mb-10 sm:mb-12"
        >
          Nexmedora is a trusted Medical Billing and Revenue Cycle Management partner dedicated to helping healthcare providers simplify their billing operations and strengthen their financial performance. Our team delivers end-to-end RCM solutions covering eligibility verification, coding, claims management, payment posting, denial management, and A/R follow-up. We combine experienced professionals, efficient processes, and technology-driven solutions to help providers improve collections, reduce administrative burden, and focus more on delivering quality patient care.
        </motion.p>

        {/* 4. "Explore Our Services" Button with Sliding Arrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex justify-center"
        >
          <Link
            to="/services"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-teal-500 via-teal-400 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold text-sm sm:text-base shadow-xl shadow-teal-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span>Explore Our Services</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </motion.div>

        {/* 6. Scroll-Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.35, duration: 0.6 }}
          className="mt-14 sm:mt-18 flex flex-col items-center justify-center gap-2 text-slate-500"
        >
          <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">
            Scroll to Explore
          </span>
          <div className="w-5 h-8 rounded-full border-2 border-slate-600 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-teal-400"
            />
          </div>
          <ChevronDown className="w-4 h-4 animate-bounce text-slate-400" />
        </motion.div>
      </div>
    </section>
  );
};
