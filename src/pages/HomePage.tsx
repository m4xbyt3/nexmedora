import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  FileCode2,
  UserCheck,
  Clock,
  Award,
  ChevronRight,
  Star,
  Activity,
  Layers,
  Building2,
  Zap,
  BarChart3,
  Flame,
  ArrowUpRight
} from 'lucide-react';
import { specialtiesData } from '../data/specialtiesData';
import { rcmProcessSteps } from '../data/rcmProcessData';
import { reviewsData, SHOW_SAMPLE_TAG } from '../data/reviewsData';
import { DenialCodeExplainer } from '../components/ai/DenialCodeExplainer';
import { PlayfulGoogleHero } from '../components/home/PlayfulGoogleHero';
import { WelcomeNexmedora } from '../components/home/WelcomeNexmedora';
import { RcmProcessTimeline } from '../components/home/RcmProcessTimeline';
import { PracticeManagementSection } from '../components/home/PracticeManagementSection';

interface HomePageProps {
  onOpenAudit: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenAudit }) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Auto-playing testimonial carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % reviewsData.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden bg-white text-slate-900">
      {/* ===================== HERO SECTION ===================== */}
      <PlayfulGoogleHero onOpenAudit={onOpenAudit} />

      {/* ===================== WELCOME TO NEXMEDORA ===================== */}
      <WelcomeNexmedora />

      {/* ===================== 14-STEP SCROLL-DRIVEN PROCESS TIMELINE ===================== */}
      <RcmProcessTimeline />

      {/* ===================== PRACTICE MANAGEMENT SOFTWARE SECTION ===================== */}
      <PracticeManagementSection onOpenAudit={onOpenAudit} />

      {/* ===================== INFINITE SPECIALTIES MARQUEE ===================== */}
      <section className="py-14 bg-white border-y border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-6 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-2">
          <div>
            <span className="text-xs font-bold text-teal-700 uppercase tracking-widest font-heading">
              Clinical Domain Expertise
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0B1F3A]">
              Specialties We Power Daily
            </h3>
          </div>
          <Link
            to="/specialties"
            className="text-xs text-teal-700 hover:text-teal-900 font-semibold flex items-center gap-1"
          >
            All Specialty Playbooks <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Marquee Track */}
        <div className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee flex gap-4 py-2">
            {[...specialtiesData, ...specialtiesData].map((spec, idx) => (
              <Link
                key={`${spec.id}-${idx}`}
                to={`/specialties/${spec.slug}`}
                className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-teal-400 hover:bg-teal-50/40 transition shrink-0 group shadow-xs"
              >
                <div className="w-8 h-8 rounded-lg bg-teal-100/60 border border-teal-200 flex items-center justify-center text-teal-700 group-hover:scale-110 transition-transform">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 group-hover:text-teal-700 transition block">
                    {spec.name}
                  </span>
                  <span className="text-[10px] text-slate-500 block font-mono">
                    {spec.avgDenialReduction} Denial Drop
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== GEMINI DENIAL TOOL TEASER SECTION ===================== */}
      <section className="py-20 lg:py-28 bg-slate-50 relative border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <DenialCodeExplainer onOpenAudit={onOpenAudit} />
        </div>
      </section>

      {/* ===================== TESTIMONIALS CAROUSEL ===================== */}
      <section className="py-20 lg:py-28 bg-slate-50 border-y border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="px-3 py-1 rounded-full bg-teal-100 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-3 inline-block">
              Proven Results Across 50 States
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] font-heading tracking-tight mb-4">
              Trusted by US Doctors & Practice Administrators
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Read how clinics like yours compressed days in AR, overturned chronic denials, and restored positive cash flow with Nexmedora.
            </p>
          </div>

          {/* Testimonial Active Card */}
          <div className="max-w-4xl mx-auto">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xl relative"
            >
              {/* Star Rating & Sample Tag */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(reviewsData[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-500" />
                  ))}
                </div>
                {SHOW_SAMPLE_TAG && reviewsData[activeTestimonial].isSample && (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                    Sample review
                  </span>
                )}
              </div>

              {/* Quote */}
              <blockquote className="text-base sm:text-xl text-slate-800 font-medium leading-relaxed mb-8 italic">
                "{reviewsData[activeTestimonial].reviewText}"
              </blockquote>

              {/* Author & Specialty Row (No hospital names) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-100">
                <div>
                  <h4 className="text-base font-bold text-[#0B1F3A] font-heading">
                    {reviewsData[activeTestimonial].doctorName}
                  </h4>
                  <p className="text-xs text-teal-700 font-medium">
                    {reviewsData[activeTestimonial].specialty}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {reviewsData[activeTestimonial].city && reviewsData[activeTestimonial].state
                      ? `${reviewsData[activeTestimonial].city}, ${reviewsData[activeTestimonial].state}`
                      : 'United States'}
                  </p>
                </div>

                <Link
                  to="/reviews"
                  className="px-4 py-2 bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 text-teal-700 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <span>Read All 12 Reviews</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>

            {/* Testimonial Selector Indicators */}
            <div className="flex justify-center items-center gap-2 mt-6">
              {reviewsData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeTestimonial === idx
                      ? 'w-8 bg-teal-600'
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FINAL CALL TO ACTION (Deep Authority Navy Accent Anchor) ===================== */}
      <section className="py-20 lg:py-28 relative overflow-hidden bg-[#0B1F3A] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Zero-Risk Practice Trial Available</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight">
            Ready to Collect More and Worry Less?
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            In just 15 days, our RCM specialist will audit your EOBs line by line and uncover the revenue slipping through your fingers. Know your leaks before they cost you another month.
          </p>

          <div className="flex items-center justify-center pt-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-2xl text-base border border-white/20 transition flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-xs text-slate-400 pt-2">
            Strictly HIPAA & HITECH Compliant • No setup fees • Standard BAA executed prior to onboarding
          </p>
        </div>
      </section>
    </div>
  );
};
