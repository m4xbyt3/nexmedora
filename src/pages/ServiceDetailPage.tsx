import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Clock,
  HelpCircle,
  Receipt,
  Award,
  TrendingUp,
  Mail
} from 'lucide-react';
import { servicesData } from '../data/servicesData';

interface ServiceDetailPageProps {
  onOpenAudit: () => void;
}

const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Receipt,
  Award,
  ShieldCheck,
  TrendingUp
};

// Aliases for old service routes to cleanly redirect
const SLUG_REDIRECTS: Record<string, string> = {
  'provider-credentialing': 'credentialing-and-compliance',
  'credentialing': 'credentialing-and-compliance',
  'free-audit': '15-days-free-audit',
  'audit': '15-days-free-audit',
  'medical-coding': 'medical-billing',
  'eligibility-verification': 'medical-billing',
  'prior-authorization': 'medical-billing',
  'charge-entry': 'medical-billing',
  'payment-posting': 'medical-billing',
  'denial-management': 'medical-billing',
  'ar-follow-up': 'medical-billing',
  'patient-billing': 'medical-billing',
};

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ onOpenAudit }) => {
  const { slug } = useParams<{ slug: string }>();

  if (slug && SLUG_REDIRECTS[slug]) {
    return <Navigate to={`/services/${SLUG_REDIRECTS[slug]}`} replace />;
  }

  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const Icon = serviceIcons[service.iconName] || Receipt;

  return (
    <div className="py-12 sm:py-16 bg-white text-slate-900">
      {/* Back Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link
          to="/services"
          className="inline-flex items-center gap-1.5 text-xs text-teal-700 hover:text-teal-800 transition font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Services</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider inline-block">
                Step 0{service.stepNumber || 1} • Core Service
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B1F3A] font-heading tracking-tight">
              {service.title}
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              {service.overview}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="px-6 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm shadow-md shadow-teal-700/20 transition flex items-center gap-2"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={onOpenAudit}
                className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-[#0B1F3A] font-bold rounded-xl text-sm transition cursor-pointer"
              >
                Request Free Audit
              </button>
            </div>
          </div>

          {/* Metric Highlights Sidebar */}
          {service.metrics && service.metrics.length > 0 && (
            <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-3xl p-6 shadow-md space-y-4">
              <h3 className="text-sm font-bold text-[#0B1F3A] font-heading uppercase tracking-wider border-b border-slate-200 pb-3">
                Key Highlights
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {service.metrics.map((m, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                    <span className="text-[10px] uppercase font-semibold text-slate-500 block mb-1">
                      {m.label}
                    </span>
                    <span className="text-xl font-extrabold text-teal-700 font-heading">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-2 text-[11px] text-slate-500 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Strictly HIPAA compliant processes and dedicated support.</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Key Benefits */}
      {service.keyBenefits && service.keyBenefits.length > 0 && (
        <section className="bg-slate-50 border-y border-slate-200 py-16 mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F3A] font-heading mb-8 text-center sm:text-left">
              Key Practice Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.keyBenefits.map((b, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-white border border-slate-200 rounded-2xl flex items-start gap-3 shadow-xs"
                >
                  <div className="p-1.5 rounded-lg bg-teal-50 text-teal-600 shrink-0 mt-0.5 border border-teal-100">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {b}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Step-by-Step Workflow */}
      {service.processSteps && service.processSteps.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F3A] font-heading mb-8 text-center sm:text-left">
            How We Execute This Service
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.processSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-6 bg-white border border-slate-200 rounded-2xl flex flex-col justify-between shadow-xs hover:shadow-md transition"
              >
                <div>
                  <span className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 font-mono font-bold text-xs flex items-center justify-center mb-4">
                    0{idx + 1}
                  </span>
                  <h3 className="text-base font-bold text-[#0B1F3A] font-heading mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQs Section */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F3A] font-heading mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {service.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 bg-slate-50 border border-slate-200 rounded-2xl shadow-xs"
              >
                <h3 className="text-sm sm:text-base font-bold text-[#0B1F3A] font-heading mb-2 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 shrink-0 mt-0.5 text-teal-600" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Bottom CTA Banner */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 bg-[#0B1F3A] text-white rounded-3xl space-y-4 shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            Get Started with {service.title}
          </h3>
          <p className="text-slate-300 text-sm max-w-lg mx-auto leading-relaxed">
            Reach out to our team to discover how our specialists can streamline your practice operations and secure every dollar you earn.
          </p>
          <div className="flex items-center justify-center pt-2">
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-sm transition shadow-lg shadow-teal-500/25 inline-flex items-center gap-2"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
