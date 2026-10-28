import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, Variants } from 'motion/react';
import {
  ChevronDown,
  Menu,
  X,
  Receipt,
  FileCode2,
  UserCheck,
  ShieldCheck,
  Coins,
  CreditCard,
  FileX,
  TrendingUp,
  Award,
  HeartHandshake,
  HeartPulse,
  Bone,
  Scan,
  Sparkles,
  Activity,
  Brain,
  Stethoscope,
  Baby,
  Eye,
  Zap,
  ArrowRight,
} from 'lucide-react';
import { ScrollProgress } from './ScrollProgress';
import { NexmedoraLogo } from './NexmedoraLogo';

interface HeaderProps {
  onOpenAudit?: () => void;
}

interface DropdownItem {
  name: string;
  href: string;
  desc?: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SERVICES_ITEMS: DropdownItem[] = [
  { name: 'Medical Billing', href: '/services/medical-billing', desc: 'Full-cycle billing management & clean claims', icon: Receipt },
  { name: 'Credentialing & Compliance', href: '/services/credentialing-and-compliance', desc: 'Payer enrollment & CAQH profile management', icon: Award },
  { name: 'RCM Setup', href: '/services/rcm-setup', desc: 'Clearinghouse onboarding & workflow configuration', icon: ShieldCheck },
  { name: '15 Days Free Audit', href: '/services/15-days-free-audit', desc: 'Line-by-line EOB audit identifying revenue leaks', icon: TrendingUp },
];

const SPECIALTIES_ITEMS: DropdownItem[] = [
  { name: 'Cardiology', href: '/specialties/cardiology', desc: 'Cath, echo & hemodynamic coding', icon: HeartPulse },
  { name: 'Dermatology', href: '/specialties/dermatology', desc: 'Biopsies, Mohs & procedures', icon: Sparkles },
  { name: 'Psychiatry & Behavioral', href: '/specialties/psychiatry-and-behavioral-health', desc: 'Therapy, med management & telehealth', icon: Brain },
  { name: 'Orthopedics', href: '/specialties/orthopedics', desc: 'Surgeries, fracture care & rehab', icon: Bone },
  { name: 'Pediatrics', href: '/specialties/pediatrics', desc: 'Well-child exams & age-specific coding', icon: Baby },
  { name: 'Internal Medicine', href: '/specialties/internal-medicine', desc: 'Primary care & chronic condition visits', icon: Stethoscope },
  { name: 'Ophthalmology', href: '/specialties/ophthalmology', desc: 'Eye exams, surgeries & vision services', icon: Eye },
  { name: 'Radiology', href: '/specialties/radiology', desc: 'Imaging services, MRI, CT & scans', icon: Scan },
  { name: 'Urgent Care', href: '/specialties/urgent-care', desc: 'High-speed walk-in encounter billing', icon: Activity },
  { name: 'Physical Therapy', href: '/specialties/physical-therapy', desc: 'Rehabilitation & timed code billing', icon: Activity },
  { name: 'Neurology', href: '/specialties/neurology', desc: 'Consultations, diagnostic tests & EEG', icon: Zap },
  { name: 'Chiropractic', href: '/specialties/chiropractic', desc: 'Spinal adjustments & treatments', icon: Stethoscope },
];

const desktopNavVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const desktopNavItemVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

export const Header: React.FC<HeaderProps> = ({ onOpenAudit }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [specialtiesOpen, setSpecialtiesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileSpecialtiesOpen, setMobileSpecialtiesOpen] = useState(false);

  const location = useLocation();
  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const specialtiesTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setServicesOpen(false);
    setSpecialtiesOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle hover delay for Services
  const handleServicesEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setServicesOpen(true);
  };
  const handleServicesLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 180);
  };

  // Handle hover delay for Specialties
  const handleSpecialtiesEnter = () => {
    if (specialtiesTimeoutRef.current) clearTimeout(specialtiesTimeoutRef.current);
    setSpecialtiesOpen(true);
  };
  const handleSpecialtiesLeave = () => {
    specialtiesTimeoutRef.current = setTimeout(() => {
      setSpecialtiesOpen(false);
    }, 180);
  };

  const isCurrent = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Top Colorful Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Solid White Sticky Navigation Bar with subtle border & scroll shadow */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`sticky top-0 z-50 transition-all duration-300 border-b border-[#E5EAF2] ${
          isScrolled
            ? 'bg-white/95 py-3 shadow-md shadow-slate-200/60 backdrop-blur-md'
            : 'bg-white py-4.5 shadow-xs'
        }`}
        style={{
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : '#FFFFFF',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* ===================== LEFT: NEXMEDORA LOGO ===================== */}
            <Link
              to="/"
              className="flex items-center shrink-0 py-1 select-none"
              aria-label="Nexmedora Home"
            >
              <NexmedoraLogo variant="header" />
            </Link>

            {/* ===================== DESKTOP NAVIGATION ===================== */}
            <motion.nav
              variants={desktopNavVariants}
              initial="hidden"
              animate="visible"
              className="hidden lg:flex items-center gap-6 xl:gap-7"
              aria-label="Main Navigation"
            >
              {/* 0. Home */}
              <motion.div variants={desktopNavItemVariants}>
                <Link
                  to="/"
                  className={`group relative py-1 text-[15px] font-medium transition-all duration-200 block ${
                    isCurrent('/')
                      ? 'text-[#0F9D91] font-semibold'
                      : 'text-[#1F2A44] hover:text-[#0F9D91] hover:-translate-y-[1px]'
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <span>Home</span>
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 rounded-full transition-transform duration-300 origin-left ${
                      isCurrent('/')
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              </motion.div>

              {/* 1. Services Dropdown */}
              <motion.div
                variants={desktopNavItemVariants}
                className="relative"
                onMouseEnter={handleServicesEnter}
                onMouseLeave={handleServicesLeave}
              >
                <button
                  type="button"
                  onClick={() => setServicesOpen(!servicesOpen)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setServicesOpen(!servicesOpen);
                    }
                  }}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  className={`group relative flex items-center gap-1.5 py-1 text-[15px] font-medium transition-all duration-200 cursor-pointer ${
                    isCurrent('/services')
                      ? 'text-[#0F9D91] font-semibold'
                      : 'text-[#1F2A44] hover:text-[#0F9D91] hover:-translate-y-[1px]'
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform duration-200 group-hover:text-[#0F9D91] ${
                      servicesOpen ? 'rotate-180 text-[#0F9D91]' : ''
                    }`}
                  />

                  {/* Sliding Underline */}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 rounded-full transition-transform duration-300 origin-left ${
                      isCurrent('/services') || servicesOpen
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </button>

                {/* Animated Dropdown Menu for Services */}
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                      className="absolute top-full left-0 mt-3 w-[560px] bg-white/98 backdrop-blur-xl border border-[#E5EAF2] rounded-2xl p-4 shadow-xl shadow-slate-300/40 z-50"
                    >
                      {/* Top Header Link */}
                      <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#E5EAF2] px-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#0F9D91] font-mono">
                          Core RCM Services
                        </span>
                        <Link
                          to="/services"
                          className="text-xs text-slate-600 hover:text-[#0F9D91] font-medium flex items-center gap-1 transition"
                        >
                          <span>Explore Overview</span>
                          <ArrowRight className="w-3 h-3 text-[#0F9D91]" />
                        </Link>
                      </div>

                      {/* 2-Column Grid */}
                      <div className="grid grid-cols-2 gap-1.5">
                        {SERVICES_ITEMS.map((item, index) => {
                          const Icon = item.icon;
                          return (
                            <motion.div
                              key={item.href}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.025, duration: 0.2 }}
                            >
                              <Link
                                to={item.href}
                                className="group/item flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-teal-50/70 transition-all duration-150"
                              >
                                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 group-hover/item:border-teal-300 group-hover/item:bg-teal-50 text-[#0F9D91] transition-colors shrink-0 mt-0.5">
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-sm font-semibold text-[#1F2A44] group-hover/item:text-[#0F9D91] transition-colors truncate">
                                    {item.name}
                                  </div>
                                  <div className="text-[11px] text-slate-500 line-clamp-1 leading-tight mt-0.5">
                                    {item.desc}
                                  </div>
                                </div>
                              </Link>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* HIPAA */}
              <motion.div variants={desktopNavItemVariants}>
                <Link
                  to="/hipaa"
                  className={`group relative py-1 text-[15px] font-medium transition-all duration-200 block ${
                    isCurrent('/hipaa')
                      ? 'text-[#0F9D91] font-semibold'
                      : 'text-[#1F2A44] hover:text-[#0F9D91] hover:-translate-y-[1px]'
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <span>HIPAA</span>
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 rounded-full transition-transform duration-300 origin-left ${
                      isCurrent('/hipaa')
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              </motion.div>

              {/* 2. Specialties Dropdown */}
              <motion.div
                variants={desktopNavItemVariants}
                className="relative"
                onMouseEnter={handleSpecialtiesEnter}
                onMouseLeave={handleSpecialtiesLeave}
              >
                <button
                  type="button"
                  onClick={() => setSpecialtiesOpen(!specialtiesOpen)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSpecialtiesOpen(!specialtiesOpen);
                    }
                  }}
                  aria-expanded={specialtiesOpen}
                  aria-haspopup="true"
                  className={`group relative flex items-center gap-1.5 py-1 text-[15px] font-medium transition-all duration-200 cursor-pointer ${
                    isCurrent('/specialties')
                      ? 'text-[#0F9D91] font-semibold'
                      : 'text-[#1F2A44] hover:text-[#0F9D91] hover:-translate-y-[1px]'
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <span>Specialties</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform duration-200 group-hover:text-[#0F9D91] ${
                      specialtiesOpen ? 'rotate-180 text-[#0F9D91]' : ''
                    }`}
                  />

                  {/* Sliding Underline */}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 rounded-full transition-transform duration-300 origin-left ${
                      isCurrent('/specialties') || specialtiesOpen
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </button>

                {/* Animated Dropdown Menu for Specialties */}
                <AnimatePresence>
                  {specialtiesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                      className="absolute top-full left-0 mt-3 w-[560px] bg-white/98 backdrop-blur-xl border border-[#E5EAF2] rounded-2xl p-4 shadow-xl shadow-slate-300/40 z-50"
                    >
                      <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#E5EAF2] px-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#0F9D91] font-mono">
                          Clinical Practice Specialties
                        </span>
                        <Link
                          to="/specialties"
                          className="text-xs text-slate-600 hover:text-[#0F9D91] font-medium flex items-center gap-1 transition"
                        >
                          <span>Explore All</span>
                          <ArrowRight className="w-3 h-3 text-[#0F9D91]" />
                        </Link>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5">
                        {SPECIALTIES_ITEMS.map((item, index) => {
                          const Icon = item.icon;
                          return (
                            <motion.div
                              key={item.href}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.025, duration: 0.2 }}
                            >
                              <Link
                                to={item.href}
                                className="group/item flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-teal-50/70 transition-all duration-150"
                              >
                                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 group-hover/item:border-teal-300 group-hover/item:bg-teal-50 text-[#0F9D91] transition-colors shrink-0 mt-0.5">
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-sm font-semibold text-[#1F2A44] group-hover/item:text-[#0F9D91] transition-colors truncate">
                                    {item.name}
                                  </div>
                                  <div className="text-[11px] text-slate-500 line-clamp-1 leading-tight mt-0.5">
                                    {item.desc}
                                  </div>
                                </div>
                              </Link>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* 3. Our Process */}
              <motion.div variants={desktopNavItemVariants}>
                <Link
                  to="/process"
                  className={`group relative py-1 text-[15px] font-medium transition-all duration-200 block ${
                    isCurrent('/process')
                      ? 'text-[#0F9D91] font-semibold'
                      : 'text-[#1F2A44] hover:text-[#0F9D91] hover:-translate-y-[1px]'
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <span>Our Process</span>
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 rounded-full transition-transform duration-300 origin-left ${
                      isCurrent('/process')
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              </motion.div>

              {/* 5. About Us */}
              <motion.div variants={desktopNavItemVariants}>
                <Link
                  to="/about-us"
                  className={`group relative py-1 text-[15px] font-medium transition-all duration-200 block ${
                    isCurrent('/about-us') || isCurrent('/about')
                      ? 'text-[#0F9D91] font-semibold'
                      : 'text-[#1F2A44] hover:text-[#0F9D91] hover:-translate-y-[1px]'
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <span>About Us</span>
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 rounded-full transition-transform duration-300 origin-left ${
                      isCurrent('/about-us') || isCurrent('/about')
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              </motion.div>

              {/* 8. Contact */}
              <motion.div variants={desktopNavItemVariants}>
                <Link
                  to="/contact"
                  className={`group relative py-1 text-[15px] font-medium transition-all duration-200 block ${
                    isCurrent('/contact')
                      ? 'text-[#0F9D91] font-semibold'
                      : 'text-[#1F2A44] hover:text-[#0F9D91] hover:-translate-y-[1px]'
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <span>Contact</span>
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 rounded-full transition-transform duration-300 origin-left ${
                      isCurrent('/contact')
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              </motion.div>
            </motion.nav>

            {/* ===================== MOBILE HAMBURGER BUTTON ===================== */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-slate-100 text-[#1F2A44] hover:text-[#0F9D91] hover:bg-slate-200/80 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400"
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ===================== MOBILE FULL-HEIGHT SIDE DRAWER ===================== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[990] lg:hidden"
            />

            {/* Animated Side Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 h-full w-[340px] max-w-[88vw] bg-white border-l border-[#E5EAF2] text-[#1F2A44] z-[1000] p-6 flex flex-col justify-between overflow-y-auto lg:hidden shadow-2xl"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-5 mb-5 border-b border-[#E5EAF2]">
                  <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center">
                    <NexmedoraLogo variant="drawer" />
                  </Link>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-xl text-slate-500 hover:text-[#1F2A44] hover:bg-slate-100 transition"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Nav Links */}
                <div className="space-y-1">
                  {/* Home */}
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3.5 py-3 rounded-xl font-medium text-base transition ${
                      isCurrent('/')
                        ? 'text-[#0F9D91] font-semibold bg-teal-50/70'
                        : 'text-[#1F2A44] hover:text-[#0F9D91] hover:bg-teal-50/60'
                    }`}
                  >
                    Home
                  </Link>

                  {/* Services Accordion */}
                  <div>
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-[#1F2A44] hover:text-[#0F9D91] hover:bg-teal-50/60 font-medium text-base transition"
                    >
                      <span>Services</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 transition-transform ${
                          mobileServicesOpen ? 'rotate-180 text-[#0F9D91]' : ''
                        }`}
                      />
                    </button>
                    {mobileServicesOpen && (
                      <div className="pl-4 pr-1 py-1 space-y-1">
                        {SERVICES_ITEMS.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-3 py-2 rounded-lg text-sm text-slate-600 hover:text-[#0F9D91] hover:bg-teal-50/60 transition"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* HIPAA */}
                  <Link
                    to="/hipaa"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3.5 py-3 rounded-xl font-medium text-base transition ${
                      isCurrent('/hipaa')
                        ? 'text-[#0F9D91] font-semibold bg-teal-50/70'
                        : 'text-[#1F2A44] hover:text-[#0F9D91] hover:bg-teal-50/60'
                    }`}
                  >
                    HIPAA
                  </Link>

                  {/* Specialties Accordion */}
                  <div>
                    <button
                      onClick={() => setMobileSpecialtiesOpen(!mobileSpecialtiesOpen)}
                      className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-[#1F2A44] hover:text-[#0F9D91] hover:bg-teal-50/60 font-medium text-base transition"
                    >
                      <span>Specialties</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 transition-transform ${
                          mobileSpecialtiesOpen ? 'rotate-180 text-[#0F9D91]' : ''
                        }`}
                      />
                    </button>
                    {mobileSpecialtiesOpen && (
                      <div className="pl-4 pr-1 py-1 space-y-1">
                        {SPECIALTIES_ITEMS.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-3 py-2 rounded-lg text-sm text-slate-600 hover:text-[#0F9D91] hover:bg-teal-50/60 transition"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  <Link
                    to="/process"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3.5 py-3 rounded-xl text-[#1F2A44] hover:text-[#0F9D91] hover:bg-teal-50/60 font-medium text-base transition"
                  >
                    Our Process
                  </Link>

                  <Link
                    to="/about-us"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3.5 py-3 rounded-xl text-[#1F2A44] hover:text-[#0F9D91] hover:bg-teal-50/60 font-medium text-base transition"
                  >
                    About Us
                  </Link>

                  <Link
                    to="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3.5 py-3 rounded-xl text-[#1F2A44] hover:text-[#0F9D91] hover:bg-teal-50/60 font-medium text-base transition"
                  >
                    Contact
                  </Link>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="pt-6 border-t border-[#E5EAF2]">
                <div className="text-center text-xs text-slate-500 font-mono">
                  Ahmedabad 24/7 Delivery Center • HIPAA Compliant
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
