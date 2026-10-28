import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  SlidersHorizontal,
  Users2,
  TrendingUp,
  HeartPulse,
  Sparkles,
  Brain,
  Bone,
  Baby,
  Stethoscope,
  Eye,
  Scan,
  Activity,
  Zap,
  ArrowRight,
  PhoneCall
} from 'lucide-react';
import { specialtiesData } from '../data/specialtiesData';

interface AboutPageProps {
  onOpenAudit?: () => void;
}

const WHY_CHOOSE_US_POINTS = [
  {
    title: 'Privacy-First Workflows',
    description: 'Our processes are built around secure handling of patient information, with access limited to authorized team members.',
    icon: ShieldCheck,
  },
  {
    title: 'Credentialing Support',
    description: 'We help manage provider enrollment and credentialing from application to approval.',
    icon: Award,
  },
  {
    title: 'Eligibility and Prior Authorization',
    description: 'We verify coverage and handle authorizations before the visit to prevent avoidable denials.',
    icon: CheckCircle2,
  },
  {
    title: 'Tailored Billing Solutions',
    description: 'We adapt our workflows to your specialty, software and payer mix instead of forcing a one-size-fits-all process.',
    icon: SlidersHorizontal,
  },
  {
    title: 'Experienced RCM Professionals',
    description: 'Our team brings hands-on billing, coding and follow-up experience to every account.',
    icon: Users2,
  },
  {
    title: 'Fewer Denials, Stronger Revenue',
    description: 'We focus on clean claims and prompt follow-up so more of what you earn reaches your account.',
    icon: TrendingUp,
  },
];

const getSpecialtyIcon = (iconName: string) => {
  switch (iconName) {
    case 'HeartPulse':
      return HeartPulse;
    case 'Sparkles':
      return Sparkles;
    case 'Brain':
      return Brain;
    case 'Bone':
      return Bone;
    case 'Baby':
      return Baby;
    case 'Stethoscope':
      return Stethoscope;
    case 'Eye':
      return Eye;
    case 'Scan':
      return Scan;
    case 'Zap':
      return Zap;
    case 'Activity':
    default:
      return Activity;
  }
};

export const AboutPage: React.FC<AboutPageProps> = () => {
  const isReduced = useReducedMotion();

  return (
    <div className="py-12 sm:py-16 bg-white text-slate-900 font-sans">
      {/* ===================== SECTION 1: INTRO ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B1F3A] font-heading tracking-tight mb-6">
          About Nexmedora
        </h1>

        <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          Nexmedora Healthcare Solutions provides dependable medical billing and revenue cycle management for healthcare providers. We take care of the billing work behind the scenes, so your team can spend its time and energy on patients instead of paperwork.
        </p>
      </section>

      {/* ===================== SECTION 2: WHY CHOOSE US ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-3 inline-block">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] font-heading">
            Why Choose Us
          </h2>
        </div>

        {/* 3 cards per row on desktop (lg:grid-cols-3), 2 on tablet (sm:grid-cols-2), 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WHY_CHOOSE_US_POINTS.map((point, index) => {
            const IconComponent = point.icon;

            return (
              <motion.div
                key={point.title}
                initial={isReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: isReduced ? 0 : index * 0.08,
                  ease: 'easeOut',
                }}
                whileHover={isReduced ? {} : { y: -4 }}
                className="p-7 bg-white border border-slate-200 hover:border-teal-400 rounded-3xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 mb-5">
                    <IconComponent className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0B1F3A] font-heading mb-2.5">
                    {point.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ===================== SECTION 3: OUR EXPERTISE / SPECIALTIES WE SERVE ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-3 inline-block">
            Our Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] font-heading mb-4">
            Specialties We Serve
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Every specialty has its own coding rules, documentation needs and payer requirements. Our team follows specialty-specific workflows to support accurate claims, compliance and timely reimbursement.
          </p>
        </div>

        {/* 12 Specialty Cards: 4 per row on desktop (lg:grid-cols-4), 2 on tablet (sm:grid-cols-2), 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialtiesData.map((spec, index) => {
            const Icon = getSpecialtyIcon(spec.iconName);

            return (
              <motion.div
                key={spec.id}
                initial={isReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.4,
                  delay: isReduced ? 0 : (index % 4) * 0.06,
                  ease: 'easeOut',
                }}
                whileHover={isReduced ? {} : { y: -4 }}
                className="p-6 bg-white border border-slate-200 hover:border-teal-400 rounded-3xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 mb-4 group-hover:scale-110 group-hover:bg-teal-100/60 transition-transform">
                    <Icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0B1F3A] font-heading mb-2 group-hover:text-teal-700 transition-colors">
                    {spec.name}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed mb-4">
                    {spec.shortDesc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <Link
                    to={`/specialties/${spec.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 transition"
                  >
                    <span>View Specialty Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ===================== SECTION 4: CLOSING BANNER ===================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={isReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-8 sm:p-12 bg-[#0B1F3A] text-white rounded-3xl shadow-xl text-center space-y-6"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading">
            Ready to simplify your billing?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Let our experienced team manage your revenue cycle behind the scenes so you can focus entirely on patient care.
          </p>
          <div className="pt-2 flex justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-sm sm:text-base transition shadow-lg shadow-teal-500/25 inline-flex items-center gap-2.5 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
