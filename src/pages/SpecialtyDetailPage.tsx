import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
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
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  FileCode,
  ShieldCheck,
  HelpCircle
} from 'lucide-react';
import { specialtiesData } from '../data/specialtiesData';

interface SpecialtyDetailPageProps {
  onOpenAudit: () => void;
}

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

export const SpecialtyDetailPage: React.FC<SpecialtyDetailPageProps> = ({ onOpenAudit }) => {
  const { slug } = useParams<{ slug: string }>();

  // If old Dental Billing or removed routes are requested, redirect to specialties page
  if (slug === 'dental-billing' || slug === 'dental' || slug === 'pathology' || slug === 'anesthesia') {
    return <Navigate to="/specialties" replace />;
  }

  // Support both slug and behavioral-health alias
  const specialty = specialtiesData.find(
    (s) => s.slug === slug || (slug === 'behavioral-health' && s.slug === 'psychiatry-and-behavioral-health')
  );

  if (!specialty) {
    return <Navigate to="/specialties" replace />;
  }

  const IconComponent = getSpecialtyIcon(specialty.iconName);

  return (
    <div className="py-12 sm:py-16 bg-white text-slate-900">
      {/* Back Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link
          to="/specialties"
          className="inline-flex items-center gap-1.5 text-xs text-teal-700 hover:text-teal-800 transition font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Clinical Specialties</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider">
              <IconComponent className="w-3.5 h-3.5 text-teal-600" />
              <span>Specialty Billing Playbook</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B1F3A] font-heading tracking-tight">
              {specialty.name} Medical Billing & RCM
            </h1>

            {/* Introductory text: reuses the same description as the listing page */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              {specialty.shortDesc}
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={onOpenAudit}
                className="px-6 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm shadow-md shadow-teal-700/20 transition cursor-pointer flex items-center gap-2"
              >
                <span>Request {specialty.name} Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Metrics Card */}
          <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-3xl p-6 shadow-md space-y-4">
            <h3 className="text-sm font-bold text-[#0B1F3A] font-heading uppercase tracking-wider border-b border-slate-200 pb-3">
              Specialty SLA Benchmarks
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[10px] uppercase font-semibold text-slate-500 block mb-1">
                  Denial Drop
                </span>
                <span className="text-2xl font-extrabold text-teal-700 font-heading">
                  {specialty.avgDenialReduction}
                </span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[10px] uppercase font-semibold text-slate-500 block mb-1">
                  Turnaround SLA
                </span>
                <span className="text-2xl font-extrabold text-cyan-700 font-heading">
                  {specialty.turnaroundSLA}
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Dedicated pod with specialty-credentialed coders working 24/7 in our operations center, aligned to US practice schedules.
            </p>
          </div>
        </div>
      </div>

      {/* Challenges & Solutions Grid */}
      <section className="bg-slate-50 border-y border-slate-200 py-16 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Common Billing Challenges */}
            <div className="p-8 bg-white border border-rose-200 rounded-3xl shadow-xs">
              <h3 className="text-xl font-bold text-rose-800 font-heading mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <span>Common {specialty.name} Billing Obstacles</span>
              </h3>
              <ul className="space-y-3">
                {specialty.commonChallenges.map((c, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Solutions */}
            <div className="p-8 bg-white border border-teal-200 rounded-3xl shadow-xs">
              <h3 className="text-xl font-bold text-teal-800 font-heading mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-teal-600" />
                <span>The Nexmedora Customized Solution</span>
              </h3>
              <ul className="space-y-3">
                {specialty.ourSolutions.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CPT & ICD-10 Focus Areas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F3A] font-heading mb-8">
          Frequent Code Sets & Coding Focus
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CPT Codes */}
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-teal-700 font-heading mb-4 flex items-center gap-2">
              <FileCode className="w-4 h-4 text-teal-600" />
              <span>Representative CPT / HCPCS Procedures</span>
            </h3>
            <div className="space-y-2">
              {specialty.cptCodes.map((code, idx) => (
                <div key={idx} className="p-2.5 bg-white rounded-xl text-xs text-slate-800 border border-slate-200 font-mono shadow-xs">
                  {code}
                </div>
              ))}
            </div>
          </div>

          {/* ICD-10 Codes */}
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-700 font-heading mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-600" />
              <span>High-Frequency Clinical Indications (ICD-10)</span>
            </h3>
            <div className="space-y-2">
              {specialty.icdCodes.map((code, idx) => (
                <div key={idx} className="p-2.5 bg-white rounded-xl text-xs text-slate-800 border border-slate-200 font-mono shadow-xs">
                  {code}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      {specialty.faqs && specialty.faqs.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center mb-10">
            <span className="px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-2 inline-block">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F3A] font-heading">
              {specialty.name} Billing FAQs
            </h2>
          </div>

          <div className="space-y-4">
            {specialty.faqs.map((faq, idx) => (
              <div key={idx} className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-[#0B1F3A] font-heading mb-2 flex items-start gap-2.5">
                  <HelpCircle className="w-4 h-4 text-teal-600 mt-1 shrink-0" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6.5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Call to Action */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-10 bg-[#0B1F3A] text-white rounded-3xl space-y-4 shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            Partner with Dedicated {specialty.name} Billing Specialists
          </h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Eliminate coding bottlenecks, accelerate insurance claims adjudication, and recover full reimbursement for your practice.
          </p>
          <button
            onClick={onOpenAudit}
            className="px-6 py-3.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-sm transition shadow-lg shadow-teal-500/25 cursor-pointer inline-flex items-center gap-2"
          >
            <span>Request Practice Billing Review</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
