import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUp, FileText } from 'lucide-react';

const SECTIONS = [
  { id: 'section-1', title: '1. Introduction' },
  { id: 'section-2', title: '2. Eligibility and Permitted Use' },
  { id: 'section-3', title: '3. Description of Services' },
  { id: 'section-4', title: '4. No Guarantee of Results' },
  { id: 'section-5', title: '5. Healthcare and Professional Responsibility' },
  { id: 'section-6', title: '6. Client Engagements and Service Agreements' },
  { id: 'section-7', title: '7. Fees and Payments' },
  { id: 'section-8', title: '8. Website Information and Availability' },
  { id: 'section-9', title: '9. Intellectual Property Rights' },
  { id: 'section-10', title: '10. User Submissions and Communications' },
  { id: 'section-11', title: '11. Confidentiality and Data Protection' },
  { id: 'section-12', title: '12. HIPAA and Healthcare Compliance' },
  { id: 'section-13', title: '13. Third-Party Websites and Services' },
  { id: 'section-14', title: '14. Prohibited Activities' },
  { id: 'section-15', title: '15. Disclaimers' },
  { id: 'section-16', title: '16. Limitation of Liability' },
  { id: 'section-17', title: '17. Indemnification' },
  { id: 'section-18', title: '18. Suspension and Termination' },
  { id: 'section-19', title: '19. Governing Law and Dispute Resolution' },
  { id: 'section-20', title: '20. Changes to These Terms' },
  { id: 'section-21', title: '21. Severability' },
  { id: 'section-22', title: '22. No Waiver' },
  { id: 'section-23', title: '23. Entire Agreement' },
  { id: 'section-24', title: '24. Contact Nexmedora' },
];

export const TermsPage: React.FC = () => {
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
            <FileText className="w-3.5 h-3.5" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] font-heading tracking-tight mb-2 uppercase">
            Terms and Conditions
          </h1>
          <p className="text-base sm:text-lg font-medium text-slate-700 mb-3">
            Nexmedora Healthcare Solutions LLC
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-mono">
            <span>Effective Date: October 15, 2026</span>
            <span>•</span>
            <span>Last Updated: October 15, 2026</span>
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
                Welcome to Nexmedora Healthcare Solutions LLC (“Nexmedora,” “Company,” “we,” “our,” or “us”).
              </p>
              <p>
                These Terms and Conditions (“Terms”) govern your access to and use of our website, https://nexmedora.com, and the information and services described on it.
              </p>
              <p>
                Nexmedora Healthcare Solutions LLC is a limited liability company formed in the State of Wyoming, United States. Our business focuses on medical billing, Revenue Cycle Management (RCM), and related administrative support services for healthcare organizations and providers.
              </p>
              <p>
                By accessing or using our website, you agree to these Terms. If you do not agree with these Terms, please discontinue use of the website.
              </p>
              <p>
                These Terms govern website use only. Specific services provided to clients may be subject to separate written agreements, service agreements, Business Associate Agreements (BAAs), or other applicable contracts.
              </p>
            </section>

            {/* 2. Eligibility and Permitted Use */}
            <section id="section-2" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                2. Eligibility and Permitted Use
              </h2>
              <p>
                You may use our website only for lawful purposes and in accordance with these Terms.
              </p>
              <p>By using our website, you represent that:</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>You are legally permitted to access and use the website.</li>
                <li>Any information you submit is accurate to the best of your knowledge.</li>
                <li>You will not use the website to engage in unlawful, fraudulent, misleading, or harmful activities.</li>
                <li>If you act on behalf of an organization, you are authorized to communicate with us on its behalf.</li>
              </ul>
              <p>
                You must not use our website in a manner that violates applicable laws or infringes the rights of Nexmedora or any other person.
              </p>
            </section>

            {/* 3. Description of Services */}
            <section id="section-3" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                3. Description of Services
              </h2>
              <p>
                Nexmedora focuses on medical billing, Revenue Cycle Management (RCM), and related administrative support for healthcare providers and organizations.
              </p>
              <p>
                Depending on the applicable service arrangement, our services may include administrative assistance relating to claims processing, billing workflows, payment follow-up, revenue cycle operations, and other agreed support functions.
              </p>
              <p>
                The specific scope, deliverables, fees, timelines, responsibilities, and service standards for any engagement will be determined by a separate written agreement where applicable.
              </p>
              <p>
                Information published on our website is provided for general informational and business purposes. The website does not guarantee that a particular service is available in every location or suitable for every healthcare organization.
              </p>
            </section>

            {/* 4. No Guarantee of Results */}
            <section id="section-4" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                4. No Guarantee of Results
              </h2>
              <p>
                Nexmedora aims to provide professional services in accordance with the applicable client agreement. However, we do not guarantee any specific financial, operational, or business outcome unless expressly agreed in a written contract.
              </p>
              <p>For example, we do not guarantee:</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>A particular increase in collections or revenue.</li>
                <li>A specific reduction in claim denials.</li>
                <li>Approval or payment of any insurance claim.</li>
                <li>A particular reimbursement amount or payment timeline.</li>
                <li>A specific level of business growth or financial performance.</li>
              </ul>
              <p>
                Insurance reimbursements and claim outcomes may depend on factors outside our control, including payer policies, provider documentation, eligibility requirements, coding accuracy, contractual terms, and applicable laws.
              </p>
            </section>

            {/* 5. Healthcare and Professional Responsibility */}
            <section id="section-5" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                5. Healthcare and Professional Responsibility
              </h2>
              <p>
                Nexmedora provides administrative and business support services related to medical billing and revenue cycle operations.
              </p>
              <p>
                Unless expressly agreed and legally authorized, Nexmedora does not provide medical diagnosis, treatment, clinical decision-making, legal advice, or tax advice.
              </p>
              <p>
                Healthcare providers remain responsible for their clinical decisions, patient care, medical documentation, professional licensing, and other responsibilities assigned to them by law and their applicable agreements.
              </p>
              <p>
                Each party must perform its obligations in accordance with applicable laws, regulations, professional standards, and contractual requirements.
              </p>
            </section>

            {/* 6. Client Engagements and Service Agreements */}
            <section id="section-6" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                6. Client Engagements and Service Agreements
              </h2>
              <p>
                Any client engagement may require a separate written agreement that specifies the services to be provided and the responsibilities of each party.
              </p>
              <p>Depending on the engagement, a separate agreement may address:</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Scope of services and deliverables.</li>
                <li>Service fees, payment terms, and invoicing.</li>
                <li>Client responsibilities and cooperation.</li>
                <li>Access to systems and information.</li>
                <li>Confidentiality and data protection.</li>
                <li>Service levels and reporting.</li>
                <li>Contract duration, renewal, and termination.</li>
                <li>Liability allocation and dispute resolution.</li>
                <li>Applicable healthcare privacy and security requirements.</li>
              </ul>
              <p>
                If a signed service agreement conflicts with these website Terms concerning the contracted services, the signed agreement will control to the extent specified in that agreement and permitted by applicable law.
              </p>
              <p>
                Nothing in these Terms requires Nexmedora to accept a service request or enter into a business relationship.
              </p>
            </section>

            {/* 7. Fees and Payments */}
            <section id="section-7" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                7. Fees and Payments
              </h2>
              <p>
                Fees, payment schedules, billing arrangements, and other commercial terms for Nexmedora's services will be communicated through an applicable proposal, invoice, or written service agreement.
              </p>
              <p>Unless otherwise agreed in writing:</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>All fees must be paid in accordance with the applicable invoice or contract.</li>
                <li>Applicable taxes, where required, may be charged in addition to the stated fees.</li>
                <li>Any disputed invoice should be raised promptly through the appropriate business contact.</li>
                <li>No fee, refund, cancellation, or payment policy is created solely by information that is not expressly included in the applicable agreement.</li>
              </ul>
              <p>
                Any refunds, credits, late fees, or other payment adjustments will be handled in accordance with the relevant contract and applicable law.
              </p>
            </section>

            {/* 8. Website Information and Availability */}
            <section id="section-8" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                8. Website Information and Availability
              </h2>
              <p>
                We make reasonable efforts to keep website information accurate and up to date. However, we do not guarantee that all website content will always be complete, accurate, current, or free from errors.
              </p>
              <p>
                We may update, modify, suspend, or discontinue any part of our website at any time, subject to applicable law.
              </p>
              <p>
                We do not guarantee that the website will always be available without interruption or that it will be free from technical errors, harmful components, or service disruptions.
              </p>
              <p>
                You are responsible for using appropriate security measures when accessing the website.
              </p>
            </section>

            {/* 9. Intellectual Property Rights */}
            <section id="section-9" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                9. Intellectual Property Rights
              </h2>
              <p>
                Unless otherwise stated, the website and its original content, including text, graphics, branding, logos, designs, layouts, and other materials, are owned by Nexmedora or used under appropriate authorization.
              </p>
              <p>These materials are protected by applicable intellectual property laws.</p>
              <p>
                You may access and view website content for personal, informational, or legitimate business evaluation purposes.
              </p>
              <p>
                Without our prior written permission or other applicable legal authorization, you must not:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Copy or republish substantial portions of our website content.</li>
                <li>Sell, license, or commercially exploit our website materials.</li>
                <li>Modify or distribute our branding or copyrighted materials.</li>
                <li>Use our name, logo, or branding in a manner that suggests an unauthorized affiliation.</li>
                <li>Remove copyright, trademark, or proprietary notices.</li>
              </ul>
              <p>Nothing in these Terms transfers ownership of intellectual property to you.</p>
            </section>

            {/* 10. User Submissions and Communications */}
            <section id="section-10" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                10. User Submissions and Communications
              </h2>
              <p>
                If you submit information through our website or communicate with Nexmedora, you are responsible for ensuring that the information is accurate, lawful, and appropriate to share.
              </p>
              <p>You must not submit information that:</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Violates another person's privacy or intellectual property rights.</li>
                <li>Contains unlawful, fraudulent, or misleading material.</li>
                <li>Contains malicious software or harmful code.</li>
                <li>Includes confidential or sensitive information that you are not authorized to disclose.</li>
              </ul>
              <p>
                Submitting an inquiry does not automatically create a client relationship, partnership, employment relationship, or other formal business arrangement.
              </p>
              <p>
                Any confidential information shared during a business engagement will be handled in accordance with applicable agreements and legal obligations.
              </p>
            </section>

            {/* 11. Confidentiality and Data Protection */}
            <section id="section-11" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                11. Confidentiality and Data Protection
              </h2>
              <p>
                Nexmedora recognizes that business and healthcare-related information may require confidentiality and appropriate safeguards.
              </p>
              <p>
                Information submitted through the website will be handled in accordance with our Privacy Policy and applicable law.
              </p>
              <p>
                If Nexmedora processes Protected Health Information (PHI) on behalf of a healthcare provider, such processing will be subject to applicable legal requirements and relevant contractual arrangements, including a Business Associate Agreement where required.
              </p>
              <p>
                Please do not submit patient medical records, Social Security numbers, insurance identification numbers, payment card details, or other sensitive information through a public website form or ordinary email unless an appropriate secure channel has been authorized.
              </p>
              <p>
                Our Privacy Policy is available on our website and explains our general information-handling practices.
              </p>
            </section>

            {/* 12. HIPAA and Healthcare Compliance */}
            <section id="section-12" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                12. HIPAA and Healthcare Compliance
              </h2>
              <p>
                Where applicable, Nexmedora and its clients must comply with relevant healthcare privacy, security, and data protection requirements.
              </p>
              <p>
                If Nexmedora acts as a business associate under the Health Insurance Portability and Accountability Act of 1996 (HIPAA), the applicable responsibilities will be governed by HIPAA requirements and the relevant Business Associate Agreement.
              </p>
              <p>
                Clients are responsible for ensuring that information they provide to Nexmedora may lawfully be disclosed for the agreed services.
              </p>
              <p>
                Nothing on this website constitutes a representation that Nexmedora has received a particular certification, accreditation, or regulatory approval unless that status is expressly confirmed and accurately described.
              </p>
              <p>
                These website Terms do not replace a BAA, security agreement, or other healthcare compliance documentation required for a particular engagement.
              </p>
            </section>

            {/* 13. Third-Party Websites and Services */}
            <section id="section-13" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                13. Third-Party Websites and Services
              </h2>
              <p>
                Our website may include links to third-party websites, platforms, or services for convenience or informational purposes.
              </p>
              <p>
                Nexmedora does not control independent third-party websites and is not responsible for their content, availability, security, terms, or privacy practices.
              </p>
              <p>
                Accessing a third-party website is at your own discretion and subject to that third party's applicable terms and policies.
              </p>
            </section>

            {/* 14. Prohibited Activities */}
            <section id="section-14" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                14. Prohibited Activities
              </h2>
              <p>When using our website, you must not:</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Attempt unauthorized access to our website, servers, accounts, or systems.</li>
                <li>Interfere with website security, performance, or availability.</li>
                <li>Use automated tools to scrape or collect website information in violation of applicable law or our reasonable access restrictions.</li>
                <li>Upload malware, viruses, or other harmful code.</li>
                <li>Impersonate another person or misrepresent your identity or affiliation.</li>
                <li>Use website content for unlawful, fraudulent, or misleading purposes.</li>
                <li>Attempt to reverse engineer or exploit website functionality except where such restriction is prohibited by law.</li>
                <li>Use the website in a way that infringes the rights of others.</li>
              </ul>
              <p>
                We may take reasonable measures to investigate suspected misuse, protect our systems, restrict access, and refer unlawful conduct to the appropriate authorities where necessary.
              </p>
            </section>

            {/* 15. Disclaimers */}
            <section id="section-15" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                15. Disclaimers
              </h2>
              <p>
                To the extent permitted by applicable law, the website and its general informational content are provided on an “as is” and “as available” basis.
              </p>
              <p>
                Nexmedora makes no guarantee that website content will be uninterrupted, error-free, complete, or suitable for every purpose.
              </p>
              <p>
                Nothing in this section excludes or limits any warranty, representation, or right that cannot lawfully be excluded or limited.
              </p>
              <p>
                Any warranties or service commitments specifically agreed in a signed client contract will be governed by that contract.
              </p>
            </section>

            {/* 16. Limitation of Liability */}
            <section id="section-16" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                16. Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by applicable law, Nexmedora will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages arising from or relating to your use of the website, including loss of profits, business opportunities, data, or goodwill.
              </p>
              <p>
                This limitation applies only to the extent permitted by applicable law and does not exclude liability that cannot lawfully be excluded or limited.
              </p>
              <p>
                Any liability arising from contracted medical billing or RCM services will be determined by the applicable written agreement and governing law.
              </p>
              <p>
                Nothing in these Terms limits liability for fraud, intentional misconduct, or any other matter where such limitation is prohibited by law.
              </p>
            </section>

            {/* 17. Indemnification */}
            <section id="section-17" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                17. Indemnification
              </h2>
              <p>
                To the extent permitted by applicable law, you agree to be responsible for losses, claims, liabilities, and reasonable expenses arising from your unlawful use of the website, your violation of these Terms, or your infringement of another person's rights.
              </p>
              <p>
                This provision does not apply to the extent a claim results from Nexmedora's own conduct or where applicable law prohibits such an allocation of responsibility.
              </p>
              <p>
                Any indemnification obligations between Nexmedora and a client under a separate written agreement will be governed by that agreement.
              </p>
            </section>

            {/* 18. Suspension and Termination */}
            <section id="section-18" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                18. Suspension and Termination
              </h2>
              <p>
                We may restrict or suspend access to our website where reasonably necessary to protect its security, prevent misuse, comply with law, or address a violation of these Terms.
              </p>
              <p>You may stop using the website at any time.</p>
              <p>
                Termination or suspension of website access does not automatically terminate a separate client agreement. Any termination of contracted services will be governed by the relevant written agreement and applicable law.
              </p>
            </section>

            {/* 19. Governing Law and Dispute Resolution */}
            <section id="section-19" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                19. Governing Law and Dispute Resolution
              </h2>
              <p>
                These Terms will be interpreted in accordance with applicable laws, subject to any mandatory legal requirements that apply.
              </p>
              <p>
                To the extent legally permitted, disputes arising from these website Terms will be subject to the jurisdiction of the courts determined under the applicable governing law.
              </p>
              <p>
                Any specific governing-law, jurisdiction, arbitration, or dispute-resolution provisions contained in a signed client agreement will apply to the extent provided in that agreement.
              </p>
            </section>

            {/* 20. Changes to These Terms */}
            <section id="section-20" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                20. Changes to These Terms
              </h2>
              <p>
                Nexmedora may revise these Terms from time to time to reflect changes in our website, services, business operations, or legal obligations.
              </p>
              <p>
                When changes are made, we will update the “Last Updated” date and publish the revised Terms on our website.
              </p>
              <p>
                Where applicable law requires additional notice or consent, we will provide it.
              </p>
              <p>
                Your continued use of the website after revised Terms become effective will be subject to applicable law.
              </p>
            </section>

            {/* 21. Severability */}
            <section id="section-21" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                21. Severability
              </h2>
              <p>
                If any provision of these Terms is found to be unlawful, invalid, or unenforceable, that provision will be limited or removed to the minimum extent necessary.
              </p>
              <p>
                The remaining provisions will continue to apply to the extent permitted by law.
              </p>
            </section>

            {/* 22. No Waiver */}
            <section id="section-22" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                22. No Waiver
              </h2>
              <p>
                If Nexmedora does not enforce a provision of these Terms on a particular occasion, that does not necessarily mean we waive our right to enforce it in the future.
              </p>
              <p>
                Any waiver must be established in accordance with applicable law and, where required, documented in writing.
              </p>
            </section>

            {/* 23. Entire Agreement */}
            <section id="section-23" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                23. Entire Agreement
              </h2>
              <p>
                These Terms govern your use of the Nexmedora website and, together with any policies expressly incorporated into them, represent the terms applicable to that website use.
              </p>
              <p>
                They do not replace or override a separate signed client agreement, Business Associate Agreement, or other contract governing specific services.
              </p>
            </section>

            {/* 24. Contact Nexmedora */}
            <section id="section-24" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                24. Contact Nexmedora
              </h2>
              <p>
                If you have questions about these Terms and Conditions or our website, please contact us using the details below.
              </p>
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-sm">
                <p>
                  <strong className="text-[#0B1F3A]">Company Name:</strong> Nexmedora Healthcare Solutions LLC
                </p>
                <p>
                  <strong className="text-[#0B1F3A]">State of Formation:</strong> Wyoming, United States
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
                <div className="pt-2">
                  <p className="font-semibold text-[#0B1F3A]">General Business Inquiries:</p>
                  <p>
                    <a
                      href="mailto:info@nexmedora.com"
                      className="text-teal-700 hover:underline"
                    >
                      info@nexmedora.com
                    </a>
                  </p>
                </div>
                <div className="pt-1">
                  <p className="font-semibold text-[#0B1F3A]">Legal and Terms-Related Inquiries:</p>
                  <p>
                    <a
                      href="mailto:privacy@nexmedora.com"
                      className="text-teal-700 hover:underline"
                    >
                      privacy@nexmedora.com
                    </a>
                  </p>
                </div>
              </div>
              <p>
                For business correspondence or to request the appropriate mailing address, please contact{' '}
                <a href="mailto:info@nexmedora.com" className="text-teal-700 hover:underline">
                  info@nexmedora.com
                </a>.
              </p>
              <p>
                Please do not send patient medical records, Social Security numbers, insurance identifiers, or other sensitive health information through ordinary email or a public website contact form.
              </p>
              <p>
                We will review inquiries and respond in accordance with applicable law and any relevant contractual obligations.
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
