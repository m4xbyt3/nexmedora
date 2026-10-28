import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUp, Shield } from 'lucide-react';

const SECTIONS = [
  { id: 'section-1', title: '1. Introduction' },
  { id: 'section-2', title: '2. Information We Collect' },
  { id: 'section-3', title: '3. How We Use Your Information' },
  { id: 'section-4', title: '4. Cookies and Website Analytics' },
  { id: 'section-5', title: '5. Information Sharing' },
  { id: 'section-6', title: '6. Data Security and Retention' },
  { id: 'section-7', title: '7. Healthcare Information and HIPAA' },
  { id: 'section-8', title: '8. Your Privacy Rights' },
  { id: 'section-9', title: '9. Third-Party Websites' },
  { id: 'section-10', title: "10. Children's Privacy" },
  { id: 'section-11', title: '11. Updates to This Policy' },
  { id: 'section-12', title: '12. Contact Us' },
];

export const PrivacyPolicyPage: React.FC = () => {
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
            <Shield className="w-3.5 h-3.5" />
            <span>Legal Notice</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] font-heading tracking-tight mb-2">
            Privacy Policy
          </h1>
          <p className="text-base sm:text-lg font-medium text-slate-700 mb-3">
            Nexmedora Healthcare Solutions LLC
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-mono">
            <span>Effective Date: October 15, 2026</span>
            <span>•</span>
            <span>Last Updated: October 27, 2026</span>
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
                Nexmedora Healthcare Solutions LLC (“Nexmedora,” “we,” “our,” or “us”) respects your privacy. This Privacy Policy explains how we collect, use, protect, and share information when you visit our website, www.nexmedora.com, or contact us about our services.
              </p>
              <p>
                Our services may include medical billing, Revenue Cycle Management (RCM), and related healthcare administrative services.
              </p>
            </section>

            {/* 2. Information We Collect */}
            <section id="section-2" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                2. Information We Collect
              </h2>
              <p>We may collect the following information:</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Name, email address, phone number, and business address.</li>
                <li>Company, clinic, hospital, or healthcare practice details.</li>
                <li>Information submitted through contact forms, emails, and business inquiries.</li>
                <li>Website usage information, IP address, browser details, and cookies.</li>
                <li>Patient, billing, insurance, or claims information when required to provide authorized healthcare services.</li>
              </ul>
              <p>
                Please do not submit sensitive medical information through ordinary website forms unless the channel is specifically approved for that purpose.
              </p>
            </section>

            {/* 3. How We Use Your Information */}
            <section id="section-3" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                3. How We Use Your Information
              </h2>
              <p>We may use your information to:</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Respond to inquiries and provide our services.</li>
                <li>Communicate with clients and business partners.</li>
                <li>Manage contracts, billing operations, and client requests.</li>
                <li>Improve website performance and security.</li>
                <li>Prevent fraud and comply with applicable laws.</li>
                <li>Send business updates or marketing communications where permitted.</li>
              </ul>
              <p>
                We will handle healthcare information according to applicable laws and relevant client agreements.
              </p>
            </section>

            {/* 4. Cookies and Website Analytics */}
            <section id="section-4" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                4. Cookies and Website Analytics
              </h2>
              <p>
                Our website may use cookies and analytics tools to improve website functionality, understand visitor activity, and protect against security risks.
              </p>
              <p>
                You can manage cookies through your browser settings or any cookie preference controls available on our website. Some website features may not work properly if cookies are disabled.
              </p>
              <p>
                Where required by law, we will obtain consent before using non-essential cookies.
              </p>
            </section>

            {/* 5. Information Sharing */}
            <section id="section-5" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                5. Information Sharing
              </h2>
              <p>
                We do not sell personal information for monetary consideration as part of our ordinary business practices.
              </p>
              <p>
                We may share information with authorized service providers, healthcare clients, professional advisers, or other parties when necessary to provide services, comply with the law, protect our business, or complete a business transaction.
              </p>
              <p>
                We will handle Protected Health Information (PHI) according to applicable HIPAA requirements and relevant agreements when those requirements apply.
              </p>
            </section>

            {/* 6. Data Security and Retention */}
            <section id="section-6" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                6. Data Security and Retention
              </h2>
              <p>
                We use reasonable security measures to protect information against unauthorized access, loss, misuse, or disclosure.
              </p>
              <p>
                We retain information only as long as reasonably necessary for business, service delivery, legal, contractual, and recordkeeping purposes.
              </p>
              <p>
                No method of electronic storage or transmission is completely secure. We cannot guarantee absolute security.
              </p>
            </section>

            {/* 7. Healthcare Information and HIPAA */}
            <section id="section-7" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                7. Healthcare Information and HIPAA
              </h2>
              <p>
                When applicable, Nexmedora follows relevant HIPAA requirements for handling Protected Health Information (PHI) as a healthcare business associate.
              </p>
              <p>
                Our responsibilities may include protecting information, limiting access to authorized personnel, and following applicable contractual and legal requirements.
              </p>
              <p>
                This website Privacy Policy does not replace a separate Business Associate Agreement (BAA) or other required HIPAA documentation.
              </p>
            </section>

            {/* 8. Your Privacy Rights */}
            <section id="section-8" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                8. Your Privacy Rights
              </h2>
              <p>
                Depending on applicable law and your location, you may have the right to request access to, correction of, or deletion of your personal information, or to opt out of certain data uses.
              </p>
              <p>
                You may also opt out of marketing emails by using the unsubscribe link or contacting us.
              </p>
              <p>
                We may need to verify your identity before processing a privacy request. Certain legal exceptions may apply.
              </p>
            </section>

            {/* 9. Third-Party Websites */}
            <section id="section-9" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                9. Third-Party Websites
              </h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for their privacy practices. Please review their privacy policies before sharing information with them.
              </p>
            </section>

            {/* 10. Children's Privacy */}
            <section id="section-10" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                10. Children's Privacy
              </h2>
              <p>
                Our website is intended primarily for businesses, healthcare professionals, and adults. We do not knowingly collect children's personal information through our public website in violation of applicable law.
              </p>
            </section>

            {/* 11. Updates to This Policy */}
            <section id="section-11" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                11. Updates to This Policy
              </h2>
              <p>
                We may update this Privacy Policy when our services, business practices, or legal requirements change. Updates will be posted on our website with a revised “Last Updated” date. Additional notice or consent will be provided where required by law.
              </p>
            </section>

            {/* 12. Contact Us */}
            <section id="section-12" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                12. Contact Us
              </h2>
              <p>For questions, concerns, or privacy requests, please contact:</p>
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-sm">
                <p className="font-bold text-[#0B1F3A]">
                  Nexmedora Healthcare Solutions LLC
                </p>
                <p>
                  Website:{' '}
                  <a
                    href="https://www.nexmedora.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-700 hover:underline"
                  >
                    https://www.nexmedora.com
                  </a>
                </p>
                <p>
                  General Email:{' '}
                  <a
                    href="mailto:info@nexmedora.com"
                    className="text-teal-700 hover:underline font-semibold"
                  >
                    info@nexmedora.com
                  </a>
                </p>
                <p>
                  Privacy Email:{' '}
                  <a
                    href="mailto:Privacy@nexmedora.com"
                    className="text-teal-700 hover:underline font-semibold"
                  >
                    Privacy@nexmedora.com
                  </a>
                </p>
                <p>
                  Phone:{' '}
                  <a
                    href="tel:+13073810358"
                    className="text-teal-700 hover:underline font-semibold"
                  >
                    +1 (307) 381-0358
                  </a>
                </p>
              </div>
              <p className="text-xs text-slate-500 italic">
                Please use “Privacy Request” as the subject line for privacy-related emails.
              </p>
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
