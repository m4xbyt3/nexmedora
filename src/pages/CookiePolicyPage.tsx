import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUp, Cookie } from 'lucide-react';

const SECTIONS = [
  { id: 'section-1', title: '1. Introduction' },
  { id: 'section-2', title: '2. What Are Cookies?' },
  { id: 'section-3', title: '3. Types of Cookies We May Use' },
  { id: 'section-4', title: '4. How We Use Cookies' },
  { id: 'section-5', title: '5. Third-Party Cookies and Services' },
  { id: 'section-6', title: '6. Cookie Consent and Your Choices' },
  { id: 'section-7', title: '7. Managing Cookies Through Your Browser' },
  { id: 'section-8', title: '8. Healthcare Information and Privacy' },
  { id: 'section-9', title: '9. Data Security' },
  { id: 'section-10', title: '10. Cookie Duration and Data Retention' },
  { id: 'section-11', title: '11. Your Privacy Rights' },
  { id: 'section-12', title: '12. Do Not Track and Privacy Signals' },
  { id: 'section-13', title: '13. Changes to This Cookie Policy' },
  { id: 'section-14', title: '14. Contact Us' },
];

export const CookiePolicyPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('section-1');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const isReduced = useReducedMotion();

  // Scroll detection for active TOC link and Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      const sectionEls = SECTIONS.map((s) => document.getElementById(s.id));
      const scrollPos = window.scrollY + 180;

      for (let i = sectionEls.length - 1; i >= 0; i--) {
        const el = sectionEls[i];
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 100;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: isReduced ? 'auto' : 'smooth',
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: isReduced ? 'auto' : 'smooth',
    });
  };

  return (
    <motion.div
      initial={isReduced ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="py-12 sm:py-16 lg:py-20 bg-white text-slate-800 min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Cookie className="w-3.5 h-3.5" />
            <span>Transparency Notice</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] font-heading tracking-tight mb-2 uppercase">
            Cookie Policy
          </h1>
          <p className="text-base sm:text-lg font-medium text-slate-700 mb-3">
            Nexmedora Healthcare Solutions LLC
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-mono">
            <span>Effective Date: October 15, 2026</span>
          </div>
        </header>

        {/* Content Layout with Sticky TOC */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Sticky Table of Contents (Desktop) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-28 self-start">
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl max-h-[calc(100vh-140px)] overflow-y-auto">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 font-heading">
                Table of Contents
              </h2>
              <nav className="space-y-1 text-xs font-medium">
                {SECTIONS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollToSection(s.id)}
                    className={`block w-full text-left px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      activeSection === s.id
                        ? 'text-teal-700 bg-teal-50/80 font-bold border-l-2 border-teal-600'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {s.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Document Content (Readable 800px Column) */}
          <main className="lg:col-span-8 max-w-[800px] space-y-10 text-slate-700 text-sm sm:text-base leading-relaxed">
            {/* 1. Introduction */}
            <section id="section-1" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                1. Introduction
              </h2>
              <p>
                Nexmedora Healthcare Solutions LLC (“Nexmedora,” “we,” “our,” or “us”) provides medical billing, Revenue Cycle Management (RCM), and related healthcare administrative services to healthcare providers in the United States.
              </p>
              <p>
                This Cookie Policy explains how cookies and similar technologies may be used when you visit our website, https://nexmedora.com, or interact with our online services.
              </p>
              <p>
                We are committed to maintaining transparency regarding website technologies and protecting the privacy of our website visitors.
              </p>
            </section>

            {/* 2. What Are Cookies? */}
            <section id="section-2" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                2. What Are Cookies?
              </h2>
              <p>
                Cookies are small text files stored on your computer, mobile device, or web browser when you visit a website. They help websites function properly, remember preferences, improve security, and understand how visitors interact with website content.
              </p>
              <p>
                We may also use similar technologies, including pixels, tags, and local storage, depending on the features implemented on our website.
              </p>
            </section>

            {/* 3. Types of Cookies We May Use */}
            <section id="section-3" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                3. Types of Cookies We May Use
              </h2>
              <p>
                Depending on the technologies and services implemented on our website, we may use the following categories of cookies.
              </p>

              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-[#0B1F3A]">
                  3.1 Strictly Necessary Cookies
                </h3>
                <p>
                  These cookies are required for essential website functionality, security, navigation, and remembering cookie consent preferences.
                </p>
                <p>
                  They help ensure that the website operates correctly. Where permitted by applicable law, strictly necessary cookies may operate without separate consent.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-[#0B1F3A]">
                  3.2 Functional Cookies
                </h3>
                <p>
                  Functional cookies may remember user preferences and settings to improve website usability and provide a more personalized experience.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-[#0B1F3A]">
                  3.3 Analytics Cookies
                </h3>
                <p>
                  Analytics cookies may help us understand website traffic, visitor engagement, page performance, and general website usage.
                </p>
                <p>
                  This information may be used to improve website performance and user experience. Where required by applicable law, these cookies will only be activated after obtaining the appropriate consent.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-[#0B1F3A]">
                  3.4 Marketing and Advertising Cookies
                </h3>
                <p>
                  If marketing or advertising technologies are implemented, these cookies may help measure advertising performance, understand campaign effectiveness, and support relevant marketing activities.
                </p>
                <p>
                  Where required by applicable law, non-essential marketing cookies and similar technologies will remain disabled until the required consent is obtained.
                </p>
                <p>
                  We will disclose the categories and technologies actually used on our website through our cookie settings or other appropriate notices.
                </p>
              </div>
            </section>

            {/* 4. How We Use Cookies */}
            <section id="section-4" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                4. How We Use Cookies
              </h2>
              <p>
                Nexmedora may use cookies and similar technologies for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>To maintain essential website functionality and security.</li>
                <li>To remember cookie consent choices and user preferences.</li>
                <li>To understand website traffic and visitor engagement.</li>
                <li>To improve website content, performance, and usability.</li>
                <li>To measure marketing and advertising effectiveness, where applicable.</li>
                <li>To identify and troubleshoot technical issues.</li>
              </ul>
              <p>
                We do not intend to use cookies for purposes beyond those disclosed and permitted under applicable law.
              </p>
            </section>

            {/* 5. Third-Party Cookies and Services */}
            <section id="section-5" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                5. Third-Party Cookies and Services
              </h2>
              <p>
                Our website may use third-party services for analytics, security, embedded content, website performance, or marketing, depending on the tools implemented.
              </p>
              <p>
                These third-party providers may process information in accordance with their own privacy policies and applicable terms.
              </p>
              <p>
                Where required by applicable law, we will obtain consent before enabling non-essential third-party cookies or similar tracking technologies.
              </p>
              <p>
                Visitors should review the relevant third-party privacy notices for additional information about their data practices.
              </p>
            </section>

            {/* 6. Cookie Consent and Your Choices */}
            <section id="section-6" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                6. Cookie Consent and Your Choices
              </h2>
              <p>
                Depending on your location and applicable legal requirements, our website may provide a cookie consent banner or preference management tool.
              </p>
              <p>You may be given the following options:</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Accept All Cookies: Allow all cookie categories presented in the consent banner.</li>
                <li>Reject Non-Essential Cookies: Allow strictly necessary cookies while rejecting optional categories.</li>
                <li>Customize Preferences: Select which optional cookie categories you wish to allow.</li>
              </ul>
              <p>
                Where consent is required, non-essential cookies and similar technologies will not be activated before the appropriate consent is obtained.
              </p>
              <p>
                You may change or withdraw your consent at any time through the available cookie preference settings.
              </p>
              <p>
                Withdrawing consent does not affect the lawfulness of processing carried out before the withdrawal.
              </p>
            </section>

            {/* 7. Managing Cookies Through Your Browser */}
            <section id="section-7" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                7. Managing Cookies Through Your Browser
              </h2>
              <p>
                Most web browsers allow users to view, block, restrict, or delete cookies through their settings.
              </p>
              <p>
                You can manage cookies through the privacy or security settings of your browser.
              </p>
              <p>
                Please note that blocking certain cookies may affect website functionality, preferences, or other features.
              </p>
              <p>
                Browser controls may not automatically disable every type of tracking technology.
              </p>
            </section>

            {/* 8. Healthcare Information and Privacy */}
            <section id="section-8" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                8. Healthcare Information and Privacy
              </h2>
              <p>
                Nexmedora Healthcare Solutions LLC provides medical billing and Revenue Cycle Management services to healthcare organizations in the United States.
              </p>
              <p>
                We recognize the importance of protecting sensitive healthcare information and maintaining appropriate privacy and security safeguards.
              </p>
              <p>
                Our general marketing website is not intended to collect Protected Health Information (PHI) through ordinary website forms or advertising technologies.
              </p>
              <p>
                We do not intentionally use cookies or advertising technologies to disclose patient medical information to advertising platforms.
              </p>
              <p>
                Where applicable, healthcare information will be handled in accordance with relevant contractual obligations and applicable privacy and security laws, including the Health Insurance Portability and Accountability Act (HIPAA) when applicable.
              </p>
              <p>
                Cookies and cookie consent alone do not establish HIPAA compliance.
              </p>
            </section>

            {/* 9. Data Security */}
            <section id="section-9" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                9. Data Security
              </h2>
              <p>
                We take reasonable administrative, technical, and organizational measures to protect information collected through our website.
              </p>
              <p>
                The safeguards implemented depend on the nature of the information collected, the technologies used, and applicable legal requirements.
              </p>
              <p>
                However, no website, electronic transmission, or storage system can be guaranteed to be completely secure.
              </p>
            </section>

            {/* 10. Cookie Duration and Data Retention */}
            <section id="section-10" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                10. Cookie Duration and Data Retention
              </h2>
              <p>
                Cookies may remain on your device for the duration of your browsing session or for a longer period, depending on their purpose and configuration.
              </p>
              <p>
                Session cookies generally expire when the browser session ends, while persistent cookies may remain until their expiration date or until they are deleted.
              </p>
              <p>
                We retain cookie consent records and related information for periods appropriate to the purposes for which they are collected and as required by applicable law.
              </p>
              <p>
                Specific cookie names, providers, purposes, and expiration periods may be disclosed through our cookie settings or other relevant notices.
              </p>
            </section>

            {/* 11. Your Privacy Rights */}
            <section id="section-11" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                11. Your Privacy Rights
              </h2>
              <p>
                Depending on your location and applicable law, you may have rights concerning your personal information, including the right to request access, correction, or deletion, or to opt out of certain processing activities.
              </p>
              <p>
                Where applicable, you may exercise your choices through our cookie preference settings or by contacting us.
              </p>
              <p>
                We will review and respond to privacy requests in accordance with applicable legal requirements.
              </p>
            </section>

            {/* 12. Do Not Track and Privacy Signals */}
            <section id="section-12" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                12. Do Not Track and Privacy Signals
              </h2>
              <p>
                Some browsers and devices provide privacy signals or settings intended to communicate a user's tracking preferences.
              </p>
              <p>
                The treatment of these signals may depend on the technologies implemented on our website and the legal requirements applicable to the visitor.
              </p>
              <p>
                Where required by applicable law, we will honor recognized opt-out preference signals, including Global Privacy Control (GPC), as applicable to the relevant processing activities.
              </p>
            </section>

            {/* 13. Changes to This Cookie Policy */}
            <section id="section-13" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                13. Changes to This Cookie Policy
              </h2>
              <p>
                We may update this Cookie Policy from time to time to reflect changes in our website technologies, business operations, third-party services, or applicable legal requirements.
              </p>
              <p>
                Any revised version will be published on this page with an updated effective date.
              </p>
              <p>
                We encourage visitors to review this page periodically to remain informed about our use of cookies and similar technologies.
              </p>
            </section>

            {/* 14. Contact Us */}
            <section id="section-14" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                14. Contact Us
              </h2>
              <p>
                If you have questions, concerns, or requests regarding this Cookie Policy or our website privacy practices, please contact us using the following details:
              </p>
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-sm">
                <p>
                  <strong className="text-[#0B1F3A]">Company Name:</strong> Nexmedora Healthcare Solutions LLC
                </p>
                <p>
                  <strong className="text-[#0B1F3A]">Website:</strong>{' '}
                  <a
                    href="https://nexmedora.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-700 hover:underline"
                  >
                    https://nexmedora.com
                  </a>
                </p>
                <p>
                  <strong className="text-[#0B1F3A]">General Inquiries:</strong>{' '}
                  <a
                    href="mailto:info@nexmedora.com"
                    className="text-teal-700 hover:underline"
                  >
                    info@nexmedora.com
                  </a>
                </p>
                <p>
                  <strong className="text-[#0B1F3A]">Privacy Inquiries:</strong>{' '}
                  <a
                    href="mailto:Privacy@nexmedora.com"
                    className="text-teal-700 hover:underline"
                  >
                    Privacy@nexmedora.com
                  </a>
                </p>
                <p>
                  <strong className="text-[#0B1F3A]">Business Mailing Address:</strong>{' '}
                  <a
                    href="mailto:info@nexmedora.com"
                    className="text-teal-700 hover:underline"
                  >
                    info@nexmedora.com
                  </a>
                </p>
              </div>
            </section>
          </main>
        </div>

        {/* Back to top floating button */}
        {showBackToTop && (
          <button
            type="button"
            onClick={scrollToTop}
            className="fixed bottom-6 right-24 sm:right-28 z-40 p-3 rounded-full bg-[#0B1F3A] text-white hover:bg-slate-800 shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center"
            aria-label="Back to top"
            title="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>
    </motion.div>
  );
};
