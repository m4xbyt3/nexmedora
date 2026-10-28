import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const HipaaPage: React.FC = () => {
  const isReduced = useReducedMotion();

  return (
    <div className="py-12 sm:py-16 bg-white text-slate-900">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-teal-700 hover:text-teal-800 transition font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        <motion.div
          initial={isReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="space-y-8"
        >
          {/* HIPAA Badge at the top using plain img tag */}
          <div className="flex justify-start">
            <div className="inline-block p-2 bg-slate-50 border border-slate-200 rounded-2xl shadow-xs">
              <img
                src="/assets/aistudio/HIPPA_db270a43.png"
                alt="HIPAA compliance badge"
                className="h-16 sm:h-20 w-auto object-contain"
              />
            </div>
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] font-heading tracking-tight mb-4">
              HIPAA & Data Protection at Nexmedora
            </h1>
            <div className="h-1 w-20 bg-teal-500 rounded-full" />
          </div>

          {/* Section: Our Approach */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
              Our Approach
            </h2>
            <p className="text-slate-700 text-base leading-relaxed">
              Nexmedora provides medical billing and revenue cycle management services for healthcare providers in the United States. We design our workflows to support the privacy and security requirements of the Health Insurance Portability and Accountability Act (HIPAA) when we handle protected health information (PHI) for our clients.
            </p>
          </section>

          {/* Section: Business Associate Agreements */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
              Business Associate Agreements
            </h2>
            <p className="text-slate-700 text-base leading-relaxed">
              Where we access PHI on behalf of a healthcare provider, we work under a signed Business Associate Agreement (BAA) that sets out each party's responsibilities.
            </p>
          </section>

          {/* Section: How We Protect Information */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
              How We Protect Information
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-slate-700 text-base leading-relaxed">
              <li>Access limited to authorized personnel</li>
              <li>Secure channels for sharing patient and billing information</li>
              <li>Confidentiality obligations for team members</li>
              <li>Regular reminders on privacy and security practices</li>
              <li>Prompt attention to any suspected privacy concern</li>
            </ul>
          </section>

          {/* Section: What Not to Send Us */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
              What Not to Send Us
            </h2>
            <p className="text-slate-700 text-base leading-relaxed">
              Please do not send patient records, Social Security numbers or insurance identifiers through the website contact form or ordinary email. We will arrange an approved secure channel when needed.
            </p>
          </section>

          {/* Section: Questions */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
              Questions
            </h2>
            <p className="text-slate-700 text-base leading-relaxed">
              For privacy questions, contact{' '}
              <a
                href="mailto:privacy@nexmedora.com"
                className="text-teal-700 hover:text-teal-800 font-semibold underline"
              >
                privacy@nexmedora.com
              </a>{' '}
              or{' '}
              <a
                href="mailto:info@nexmedora.com"
                className="text-teal-700 hover:text-teal-800 font-semibold underline"
              >
                info@nexmedora.com
              </a>
              .
            </p>
          </section>

          {/* Bottom Note */}
          <div className="pt-6 border-t border-slate-200">
            <p className="text-xs sm:text-sm text-slate-500 italic leading-relaxed">
              Compliance with HIPAA depends on the practices of both the provider and the business associate. This page is general information and does not replace a signed BAA.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
