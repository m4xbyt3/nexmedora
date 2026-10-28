import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
  Wand2,
  FileText,
  ShieldCheck,
  Calendar,
  Coins,
  FileCheck,
  Plus,
  Pause,
  Play,
  TrendingDown,
  UserCheck,
  Zap,
} from 'lucide-react';
import { SlotCounter } from './SlotCounter';

interface PlayfulGoogleHeroProps {
  onOpenAudit: () => void;
}

// Messages cycling in the assistant card
interface AssistantMessage {
  id: number;
  badge: string;
  badgeColor: string;
  badgeBg: string;
  text: string;
  metric: string;
  metricLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

const MESSAGES: AssistantMessage[] = [
  {
    id: 1,
    badge: 'Approved',
    badgeColor: 'text-emerald-700',
    badgeBg: 'bg-emerald-50 border-emerald-200',
    text: 'Claim #48213 was approved. $1,240 received.',
    metric: '+$1,240.00',
    metricLabel: 'Posted to Practice Bank',
    icon: CheckCircle2,
  },
  {
    id: 2,
    badge: 'Eligibility',
    badgeColor: 'text-sky-700',
    badgeBg: 'bg-sky-50 border-sky-200',
    text: 'Eligibility verified for 18 patients today.',
    metric: '18 of 18',
    metricLabel: 'Pre-Authorizations Cleared',
    icon: UserCheck,
  },
  {
    id: 3,
    badge: 'Appealed',
    badgeColor: 'text-indigo-700',
    badgeBg: 'bg-indigo-50 border-indigo-200',
    text: '3 denials resolved and appealed.',
    metric: '87.4% Rate',
    metricLabel: 'Root-Cause Overturned',
    icon: ShieldCheck,
  },
  {
    id: 4,
    badge: 'Performance',
    badgeColor: 'text-teal-700',
    badgeBg: 'bg-teal-50 border-teal-200',
    text: 'AR days are down to 27.',
    metric: '26.8 Days',
    metricLabel: 'MGMA Top Decile',
    icon: TrendingDown,
  },
];

// Floating Chips around the Central Card
interface FloatingChip {
  id: number;
  name: string;
  iconType: string;
  color: string;
  bg: string;
  size: number;
  initialX: number; // percentage in animation container
  initialY: number; // percentage in animation container
  duration: number;
  delay: number;
  floatY: number;
}

const FLOATING_CHIPS: FloatingChip[] = [
  { id: 1, name: 'Mail', iconType: 'mail', color: 'text-rose-500', bg: 'bg-white', size: 44, initialX: 6, initialY: 8, duration: 6, delay: 0.8, floatY: 10 },
  { id: 2, name: 'Star', iconType: 'star-blue', color: 'text-white', bg: 'bg-blue-600', size: 46, initialX: 42, initialY: 2, duration: 5.5, delay: 0.9, floatY: 8 },
  { id: 3, name: 'Wand', iconType: 'wand', color: 'text-indigo-600', bg: 'bg-white', size: 40, initialX: 84, initialY: 10, duration: 6.5, delay: 1.0, floatY: 9 },
  { id: 4, name: 'Avatar', iconType: 'avatar', color: 'text-teal-600', bg: 'bg-white', size: 52, initialX: 92, initialY: 38, duration: 7, delay: 1.1, floatY: 12 },
  { id: 5, name: 'Calendar', iconType: 'calendar', color: 'text-amber-500', bg: 'bg-white', size: 44, initialX: 86, initialY: 74, duration: 6, delay: 1.2, floatY: 10 },
  { id: 6, name: 'Doc', iconType: 'document', color: 'text-teal-600', bg: 'bg-white', size: 42, initialX: 60, initialY: 92, duration: 5.8, delay: 1.3, floatY: 8 },
  { id: 7, name: 'Coins', iconType: 'coins', color: 'text-amber-600', bg: 'bg-white', size: 46, initialX: 20, initialY: 90, duration: 6.8, delay: 1.4, floatY: 11 },
  { id: 8, name: 'Shield', iconType: 'shield', color: 'text-emerald-600', bg: 'bg-white', size: 48, initialX: 2, initialY: 66, duration: 6.2, delay: 1.5, floatY: 9 },
  { id: 9, name: 'Cross', iconType: 'cross', color: 'text-sky-600', bg: 'bg-white', size: 38, initialX: 4, initialY: 36, duration: 5.2, delay: 1.6, floatY: 8 },
  { id: 10, name: 'Claim', iconType: 'claim', color: 'text-cyan-600', bg: 'bg-white', size: 42, initialX: 72, initialY: 22, duration: 6.4, delay: 1.7, floatY: 9 },
];

export const PlayfulGoogleHero: React.FC<PlayfulGoogleHeroProps> = ({ onOpenAudit }) => {
  const heroRef = useRef<HTMLElement>(null);
  const animAreaRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Assistant Card state
  const [activeMessageIndex, setActiveMessageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cycleProgress, setCycleProgress] = useState(0); // 0 to 100
  const [displayedText, setDisplayedText] = useState('');
  const [poppedChipId, setPoppedChipId] = useState<number | null>(null);

  // Mouse offset in animation area for subtle chip drift
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const activeMsg = MESSAGES[activeMessageIndex];

  // 4-second cycle timer with progress ring
  useEffect(() => {
    if (isPaused || shouldReduceMotion) return;

    const intervalTime = 50; // update progress every 50ms
    const totalCycle = 4000; // 4 seconds total cycle
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += intervalTime;
      const progressPercent = Math.min(100, (elapsed / totalCycle) * 100);
      setCycleProgress(progressPercent);

      if (elapsed >= totalCycle) {
        elapsed = 0;
        setCycleProgress(0);
        setActiveMessageIndex((prev) => (prev + 1) % MESSAGES.length);

        // Randomly pick one chip to give a soft pop animation
        const randomChipId = Math.floor(Math.random() * FLOATING_CHIPS.length) + 1;
        setPoppedChipId(randomChipId);
        setTimeout(() => setPoppedChipId(null), 700);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused, shouldReduceMotion, activeMessageIndex]);

  // Smooth typewriter effect for the active message text
  useEffect(() => {
    const fullText = activeMsg.text;
    if (shouldReduceMotion) {
      setDisplayedText(fullText);
      return;
    }

    setDisplayedText('');
    let currentIndex = 0;
    const typeSpeed = Math.floor(1200 / fullText.length); // type entire line in ~1.2s

    const typeTimer = setInterval(() => {
      currentIndex++;
      setDisplayedText(fullText.slice(0, currentIndex));
      if (currentIndex >= fullText.length) {
        clearInterval(typeTimer);
      }
    }, typeSpeed);

    return () => clearInterval(typeTimer);
  }, [activeMessageIndex, shouldReduceMotion]);

  // Mouse parallax inside animation area
  const handleAnimMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    if (animAreaRef.current) {
      const rect = animAreaRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      setMouseOffset({
        x: (e.clientX - centerX) / (rect.width / 2),
        y: (e.clientY - centerY) / (rect.height / 2),
      });
    }
  };

  const handleAnimMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  // Button ripple click effect
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, callback?: () => void) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    if (callback) {
      callback();
    }
  };

  // Progress ring dimensions
  const circleRadius = 16;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (cycleProgress / 100) * circumference;

  return (
    <section
      ref={heroRef}
      className="relative min-h-[88vh] flex flex-col justify-center pt-8 pb-16 lg:pt-14 lg:pb-22 overflow-hidden bg-white text-slate-900"
    >
      {/* ----------------- CLEAN AIRY BACKGROUND WITH FAINT SOFT GRADIENT & GLOWS ----------------- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle light blue & teal glow in lower right corner */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-teal-50/70 via-sky-50/50 to-transparent rounded-full blur-[100px]" />
        <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-blue-50/40 rounded-full blur-[120px]" />
        <div className="absolute top-10 left-10 w-[350px] h-[350px] bg-teal-50/30 rounded-full blur-[90px]" />

        {/* Faint clean dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1.5px 1.5px, #0B1F3A 1.5px, transparent 0)`,
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* ===================== LEFT COLUMN: HEADLINE & ACTIONS ===================== */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            {/* 1. Confident Big Headline (Take Control of Your Revenue Cycle) */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-[#0B1F3A] font-heading leading-[1.12]">
              {[
                { text: 'Take', isGrad: false },
                { text: 'Control', isGrad: false },
                { text: 'of', isGrad: false },
                { text: 'Your', isGrad: false },
                { text: 'Revenue', isGrad: true },
                { text: 'Cycle', isGrad: true },
              ].map((token, idx) => (
                <span key={idx} className="inline-block overflow-hidden pb-1 align-top mr-2.5 sm:mr-3.5">
                  <motion.span
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.08 + idx * 0.07,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`inline-block ${
                      token.isGrad
                        ? 'bg-gradient-to-r from-teal-600 via-sky-600 to-teal-600 bg-clip-text text-transparent font-black'
                        : ''
                    }`}
                  >
                    {token.text}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* 2. Comprehensive Sub-headline Paragraph with Key Phrases in Bold */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-[17px] text-slate-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              Nexmedora delivers comprehensive medical billing solutions designed to simplify your revenue cycle and strengthen your financial performance. We manage the complexities of claims, billing, denials, and accounts receivable with precision and consistency. Our streamlined approach helps <strong className="text-[#0B1F3A] font-bold">reduce errors</strong>, <strong className="text-[#0B1F3A] font-bold">minimize claim denials</strong>, and <strong className="text-[#0B1F3A] font-bold">accelerate reimbursements</strong>. With dedicated support and transparent processes, we help healthcare providers improve collections while reducing administrative burdens. Let Nexmedora manage your revenue cycle, so you can focus on what matters most—your patients.
            </motion.p>
          </div>

          {/* ===================== RIGHT COLUMN: MODERN GOOGLE WORKSPACE HERO ANIMATION ===================== */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center">
            <div
              ref={animAreaRef}
              onMouseMove={handleAnimMouseMove}
              onMouseLeave={handleAnimMouseLeave}
              className="relative w-full max-w-[440px] sm:max-w-[480px] h-[380px] sm:h-[400px] flex items-center justify-center select-none"
            >
              {/* Soft ambient halo behind central card */}
              <div className="absolute inset-8 bg-gradient-to-tr from-teal-200/30 via-sky-100/40 to-blue-200/25 rounded-full blur-2xl pointer-events-none" />

              {/* ---------------- 1. CENTRAL AI ASSISTANT CARD ---------------- */}
              <motion.div
                initial={{ opacity: 0, y: 22, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-20 w-[90%] sm:w-[86%] h-[260px] bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/60 p-6 flex flex-col justify-between overflow-hidden backdrop-blur-xs"
              >
                {/* Card Top: Small Sparkle Icon & Label */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-blue-500 to-teal-400 flex items-center justify-center text-white shadow-xs">
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs font-semibold text-slate-500 tracking-wide font-sans">
                        Nexmedora Assistant
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-mono text-emerald-700 font-semibold">Live Feed</span>
                    </div>
                  </div>

                  {/* Greeting in large blue gradient name */}
                  <h2 className="text-2xl sm:text-[26px] font-extrabold font-heading tracking-tight leading-none bg-gradient-to-r from-blue-600 via-sky-600 to-teal-600 bg-clip-text text-transparent">
                    Hello, Dr. Smith
                  </h2>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 mt-1">
                    Your claims update is ready.
                  </p>
                </div>

                {/* Card Dynamic Body: Fixed Height Cycling Message with Smooth Fade & Slide */}
                <div className="relative h-[86px] flex flex-col justify-end">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeMsg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="p-3 bg-slate-50/90 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-3 shadow-2xs"
                    >
                      <div className="flex items-start gap-2.5 min-w-0">
                        <div className={`p-1.5 rounded-lg ${activeMsg.badgeBg} shrink-0 mt-0.5`}>
                          <activeMsg.icon className={`w-4 h-4 ${activeMsg.badgeColor}`} />
                        </div>
                        <div className="min-w-0">
                          <span className={`inline-block px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider mb-0.5 ${activeMsg.badgeColor} ${activeMsg.badgeBg}`}>
                            {activeMsg.badge}
                          </span>
                          <p className="text-xs font-semibold text-slate-800 truncate leading-snug">
                            {displayedText}
                            <span className="inline-block w-1 h-3 bg-blue-500 ml-0.5 animate-pulse align-middle" />
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold font-mono text-[#0B1F3A] block">
                          {activeMsg.metric}
                        </span>
                        <span className="text-[9px] text-slate-500 block font-medium">
                          {activeMsg.metricLabel}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* ---------------- 2. FLOATING ICON CHIPS (8 to 10 around the card) ---------------- */}
              {FLOATING_CHIPS.map((chip, index) => {
                const isPopped = poppedChipId === chip.id;

                // Chip drift calculation with mouse offset
                const driftFactor = 12;
                const offsetX = mouseOffset.x * (index % 2 === 0 ? driftFactor : -driftFactor);
                const offsetY = mouseOffset.y * (index % 2 === 0 ? driftFactor : -driftFactor);

                return (
                  <motion.div
                    key={chip.id}
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={{
                      opacity: 1,
                      scale: isPopped ? 1.2 : 1,
                      x: offsetX,
                      y: offsetY,
                    }}
                    transition={{
                      opacity: { duration: 0.45, delay: chip.delay, ease: [0.16, 1, 0.3, 1] },
                      scale: { duration: 0.35, delay: isPopped ? 0 : chip.delay, ease: [0.16, 1, 0.3, 1] },
                      x: { type: 'spring', damping: 20, stiffness: 60 },
                      y: { type: 'spring', damping: 20, stiffness: 60 },
                    }}
                    className={`absolute z-30 ${chip.id > 7 ? 'hidden sm:flex' : 'flex'}`}
                    style={{
                      left: `${chip.initialX}%`,
                      top: `${chip.initialY}%`,
                    }}
                  >
                    {/* Slow gentle bobbing drift motion */}
                    <motion.div
                      animate={
                        shouldReduceMotion || isPaused
                          ? {}
                          : {
                              y: [-chip.floatY, chip.floatY, -chip.floatY],
                            }
                      }
                      transition={{
                        duration: chip.duration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      style={{
                        width: chip.size,
                        height: chip.size,
                      }}
                      className={`${chip.bg} rounded-full shadow-md shadow-slate-200/90 border border-slate-200/90 flex items-center justify-center transition-transform hover:scale-110 cursor-pointer`}
                    >
                      {chip.iconType === 'mail' && <Mail className={`w-5 h-5 ${chip.color}`} />}
                      {chip.iconType === 'star-blue' && <Sparkles className={`w-5 h-5 ${chip.color}`} />}
                      {chip.iconType === 'wand' && <Wand2 className={`w-4 h-4 ${chip.color}`} />}
                      {chip.iconType === 'avatar' && (
                        <div className="w-full h-full rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-teal-400 to-blue-500">
                          <svg viewBox="0 0 40 40" className="w-full h-full rounded-full bg-white">
                            <circle cx="20" cy="15" r="7" fill="#3B82F6" />
                            <path d="M8 36 C8 28, 14 24, 20 24 C26 24, 32 28, 32 36 Z" fill="#0D9488" />
                            <circle cx="20" cy="14" r="5" fill="#FED7AA" />
                            <circle cx="18" cy="13" r="1" fill="#1E293B" />
                            <circle cx="22" cy="13" r="1" fill="#1E293B" />
                          </svg>
                        </div>
                      )}
                      {chip.iconType === 'calendar' && <Calendar className={`w-4 h-4 ${chip.color}`} />}
                      {chip.iconType === 'document' && <FileText className={`w-4 h-4 ${chip.color}`} />}
                      {chip.iconType === 'coins' && <Coins className={`w-5 h-5 ${chip.color}`} />}
                      {chip.iconType === 'shield' && <ShieldCheck className={`w-5 h-5 ${chip.color}`} />}
                      {chip.iconType === 'cross' && <Plus className={`w-5 h-5 ${chip.color}`} strokeWidth={3} />}
                      {chip.iconType === 'claim' && <FileCheck className={`w-4 h-4 ${chip.color}`} />}
                    </motion.div>
                  </motion.div>
                );
              })}

              {/* ---------------- 3. PAUSE / PLAY CONTROL WITH PROGRESS RING ---------------- */}
              <div className="absolute bottom-2 right-4 z-40">
                <button
                  onClick={() => setIsPaused((prev) => !prev)}
                  title={isPaused ? 'Resume animation' : 'Pause animation'}
                  aria-label={isPaused ? 'Resume animation' : 'Pause animation'}
                  className="relative w-10 h-10 rounded-full bg-white shadow-md shadow-slate-200/80 border border-slate-200/90 flex items-center justify-center hover:scale-105 active:scale-95 transition-all text-blue-600 cursor-pointer"
                >
                  {/* SVG Progress Ring */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                    {/* Background track */}
                    <circle
                      cx="20"
                      cy="20"
                      r={circleRadius}
                      stroke="#E2E8F0"
                      strokeWidth="2.5"
                      fill="none"
                    />
                    {/* Active progress */}
                    <circle
                      cx="20"
                      cy="20"
                      r={circleRadius}
                      stroke="#2563EB"
                      strokeWidth="2.5"
                      fill="none"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      style={{ transition: isPaused ? 'none' : 'stroke-dashoffset 0.08s linear' }}
                    />
                  </svg>

                  {/* Icon */}
                  {isPaused ? (
                    <Play className="w-3.5 h-3.5 fill-blue-600 text-blue-600 ml-0.5" />
                  ) : (
                    <Pause className="w-3.5 h-3.5 fill-blue-600 text-blue-600" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------- STATS COUNTERS (Rolling Slot Machine on In-View) ----------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 relative z-20 w-full">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 bg-slate-50/80 backdrop-blur-md border border-slate-200/80 rounded-2xl p-5 sm:p-7 shadow-xs">
          {/* Stat 1 */}
          <div className="text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-teal-700 font-heading">
              <SlotCounter value="98.4%" />
            </div>
            <div className="text-xs sm:text-sm text-[#0B1F3A] font-bold">Clean Claim Rate</div>
            <div className="text-[10px] text-slate-500 font-medium">First-pass acceptance</div>
          </div>

          {/* Stat 2 */}
          <div className="text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-sky-700 font-heading">
              <SlotCounter value="< 28d" />
            </div>
            <div className="text-xs sm:text-sm text-[#0B1F3A] font-bold">Average Days in AR</div>
            <div className="text-[10px] text-slate-500 font-medium">Industry avg 45-55d</div>
          </div>

          {/* Stat 3 */}
          <div className="text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-700 font-heading">
              <SlotCounter value="87.4%" />
            </div>
            <div className="text-xs sm:text-sm text-[#0B1F3A] font-bold">Denial Overturn Rate</div>
            <div className="text-[10px] text-slate-500 font-medium">Root-cause appeals</div>
          </div>

          {/* Stat 4 */}
          <div className="text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] font-heading">
              <SlotCounter value="24h" />
            </div>
            <div className="text-xs sm:text-sm text-[#0B1F3A] font-bold">Superbill Turnaround</div>
            <div className="text-[10px] text-slate-500 font-medium">Overnight submission</div>
          </div>

          {/* Stat 5 */}
          <div className="col-span-2 md:col-span-1 text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-600 font-heading">
              <SlotCounter value="60-70%" />
            </div>
            <div className="text-xs sm:text-sm text-[#0B1F3A] font-bold">Operational Cost Cut</div>
            <div className="text-[10px] text-slate-500 font-medium">vs In-house US billing</div>
          </div>
        </div>
      </div>
    </section>
  );
};
