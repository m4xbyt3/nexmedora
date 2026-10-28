import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Receipt,
  Award,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  RefreshCw,
  FileText,
  UserCheck
} from 'lucide-react';
import { servicesData } from '../data/servicesData';

interface ServicesPageProps {
  onOpenAudit: () => void;
}

const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Receipt,
  Award,
  ShieldCheck,
  TrendingUp
};

const credentialingCards = [
  {
    title: 'Payer Enrollment',
    desc: 'Initial commercial, Medicare, and Medicaid panel applications with continuous committee follow-up until provider numbers are issued.',
    icon: UserCheck
  },
  {
    title: 'CAQH Profile Management',
    desc: 'Creation, proactive maintenance, and scheduled quarterly attestations keeping all clinician profiles in continuous active compliance.',
    icon: FileCheck2
  },
  {
    title: 'Re-Credentialing & Renewals',
    desc: 'Timely re-attestations, hospital privilege renewals, and state medical license tracking before any expiration cutoff.',
    icon: RefreshCw
  },
  {
    title: 'Compliance Support',
    desc: 'Strict adherence to HIPAA, HITECH, and federal standards ensuring secure documentation handling across all clinical operations.',
    icon: ShieldCheck
  }
];

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenAudit }) => {
  return (
    <div className="py-12 sm:py-16 bg-white text-slate-900">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <span className="px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-3 inline-block">
          Core RCM Solutions
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B1F3A] font-heading tracking-tight mb-4">
          Our <span className="text-teal-600">Services</span>
        </h1>
        <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          From full-cycle medical billing to dedicated credentialing and line-by-line financial audits, our team provides dependable revenue cycle solutions tailored to healthcare providers.
        </p>
      </div>

      {/* 4 Steps Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service, idx) => {
            const Icon = serviceIcons[service.iconName] || Receipt;
            const stepNum = service.stepNumber || idx + 1;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white border border-slate-200 hover:border-teal-400 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl flex flex-col justify-between group"
              >
                <div>
                  {/* Top Step Number & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 font-mono font-bold text-sm flex items-center justify-center">
                      0{stepNum}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#0B1F3A] font-heading mb-2.5 group-hover:text-teal-700 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>

                  {/* Stat badge if available */}
                  {service.statNumber && (
                    <div className="mb-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-teal-800 font-mono text-xs font-bold">
                      <span>{service.statNumber}</span>
                      <span className="text-slate-500 font-sans font-normal text-[11px]">{service.statLabel}</span>
                    </div>
                  )}

                  {/* Key Benefits Teaser */}
                  {service.keyBenefits && (
                    <div className="space-y-2 mb-6">
                      {service.keyBenefits.slice(0, 2).map((b, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{b}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    to="/contact"
                    className="text-[11px] font-semibold text-slate-500 hover:text-slate-900 transition"
                  >
                    Contact Us
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Standalone Credentialing & Compliance Section */}
      <section className="bg-slate-50 border-y border-slate-200 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-900 border border-teal-200 text-xs font-semibold uppercase tracking-wider mb-3 inline-block">
              Standalone Capability
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] font-heading tracking-tight mb-4">
              Specialized Credentialing & Compliance Services
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Not looking for full billing support? We also offer credentialing and compliance as a standalone service for providers who only need help in this area.
            </p>
          </div>

          {/* 4 Small Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {credentialingCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md transition hover:-translate-y-0.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#0B1F3A] font-heading mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Contact Us Button */}
          <div className="text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm transition shadow-md shadow-teal-700/20"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
