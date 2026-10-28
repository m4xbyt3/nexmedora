import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Lock,
  Linkedin,
  Instagram,
  Youtube,
} from 'lucide-react';
import { servicesData } from '../../data/servicesData';
import { specialtiesData } from '../../data/specialtiesData';
import { NexmedoraLogo } from './NexmedoraLogo';

interface FooterProps {
  onOpenAudit?: () => void;
}

// TODO: add Nexmedora YouTube channel URL
const YOUTUBE_URL = '#';

const socialMediaLinks = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/nexmedora/',
    ariaLabel: 'Nexmedora on LinkedIn',
    hoverClass: 'hover:text-[#0A66C2]',
    icon: Linkedin,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://www.instagram.com/nexmedora/',
    ariaLabel: 'Nexmedora on Instagram',
    hoverClass: 'hover:text-[#E1306C]',
    icon: Instagram,
  },
  {
    id: 'youtube',
    name: 'YouTube',
    url: YOUTUBE_URL,
    ariaLabel: 'Nexmedora on YouTube',
    hoverClass: 'hover:text-[#FF0000]',
    icon: Youtube,
  },
].filter((item) => {
  // If no YouTube link is provided (empty or placeholder '#'), hide this icon rather than linking to a dead page
  if (item.id === 'youtube') {
    return Boolean(item.url && item.url.trim() !== '' && item.url !== '#');
  }
  return Boolean(item.url && item.url.trim() !== '');
});

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-[#050d1a] border-t border-slate-800 text-slate-400 text-xs relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 mb-12">
          {/* Col 1: Brand & Overview */}
          <div className="lg:col-span-2 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex justify-center sm:justify-start"
            >
              <Link to="/" className="inline-flex items-center" aria-label="Nexmedora Home">
                <NexmedoraLogo variant="footer" />
              </Link>
            </motion.div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm text-center sm:text-left">
              Nexmedora is the premier US medical billing and revenue cycle management partner with our 24/7 offshore operations center in Ahmedabad, India. We empower US clinics, radiology groups, surgery centers, and healthcare providers to achieve 98.4% clean claims and sub-28-day AR.
            </p>

            {/* HIPAA Compliance Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="pt-1 flex justify-center sm:justify-start"
            >
              <div className="bg-white rounded-xl p-2 sm:p-2.5 shadow-sm inline-flex items-center justify-center">
                <img
                  src="/assets/aistudio/HIPPA_db270a43.png"
                  alt="HIPAA compliance badge"
                  className="h-[48px] md:h-[56px] w-auto max-h-[48px] md:max-h-[56px] object-contain pointer-events-none"
                />
              </div>
            </motion.div>

            {/* Social Media Links Row */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.12,
                  },
                },
              }}
              className="flex items-center justify-center sm:justify-start gap-[28px] py-1"
            >
              {socialMediaLinks.map((item) => {
                const IconComponent = item.icon;
                return (
                  <motion.a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.ariaLabel}
                    variants={{
                      hidden: { opacity: 0, y: 8 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
                    }}
                    className={`text-white transition-all duration-200 ease-out hover:-translate-y-[3px] hover:scale-[1.15] ${item.hoverClass}`}
                  >
                    <IconComponent className="w-[22px] h-[22px] transition-colors duration-200" />
                  </motion.a>
                );
              })}
            </motion.div>

            {/* Certifications Row */}
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                Compliance & Accreditations
              </span>
              <div className="flex flex-wrap gap-2">
                {['AAPC Member', '100% HIPAA', 'ISO 27001', 'SOC 2 Type II', 'AHIMA'].map((cert) => (
                  <span
                    key={cert}
                    className="px-2 py-1 bg-slate-800/80 border border-slate-700/60 rounded text-[10px] font-medium text-teal-300 flex items-center gap-1"
                  >
                    <ShieldCheck className="w-3 h-3 text-teal-400" />
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-sm font-bold text-white font-heading mb-4 uppercase tracking-wider">
              Core RCM Services
            </h4>
            <ul className="space-y-2">
              {servicesData.map((s) => (
                <li key={s.id}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="text-slate-400 hover:text-teal-300 transition block hover:translate-x-0.5 duration-150"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/services"
                  className="text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1 pt-1"
                >
                  View All Services <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Specialties */}
          <div>
            <h4 className="text-sm font-bold text-white font-heading mb-4 uppercase tracking-wider">
              Specialties
            </h4>
            <ul className="space-y-2">
              {specialtiesData.slice(0, 7).map((sp) => (
                <li key={sp.id}>
                  <Link
                    to={`/specialties/${sp.slug}`}
                    className="text-slate-400 hover:text-cyan-300 transition block hover:translate-x-0.5 duration-150"
                  >
                    {sp.name} Billing
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/specialties"
                  className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 pt-1"
                >
                  All {specialtiesData.length} Specialties <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Operations Center */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white font-heading uppercase tracking-wider">
              Headquarters & Operations
            </h4>

            {/* Ahmedabad Facility */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-teal-300 font-semibold text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Ahmedabad Operations Facility</span>
              </div>
              <p className="text-slate-400 text-[11px] pl-5 leading-relaxed">
                Block-A/711, Devaurum Commercial Complex, Nr. Deer Circle, Anand Nagar Road, Ahmedabad, Gujarat 380015
              </p>
            </div>

            {/* Direct Connect */}
            <div className="pt-2 border-t border-slate-800/80 space-y-2 text-[11px]">
              <div className="flex items-center gap-2 text-slate-300 flex-wrap">
                <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <a
                  href="tel:+917041451969"
                  className="hover:text-teal-300 transition underline decoration-slate-600"
                >
                  7041451969
                </a>
                <span className="text-slate-600">/</span>
                <a
                  href="tel:+919919917345"
                  className="hover:text-teal-300 transition underline decoration-slate-600"
                >
                  9919917345
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-300 flex-wrap">
                <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <a
                  href="mailto:info@nexmedora.com"
                  className="hover:text-teal-300 transition underline decoration-slate-600"
                >
                  info@nexmedora.com
                </a>
                <span className="text-slate-600">•</span>
                <a
                  href="mailto:support@nexmedora.com"
                  className="hover:text-teal-300 transition underline decoration-slate-600"
                >
                  support@nexmedora.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-teal-400" />
                <span>24/7/365 Continuous Shift Operations</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col items-center justify-center gap-3.5 text-xs text-center">
          {/* Legal & Navigation Links Bar */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-slate-400">
            <Link to="/about-us" className="hover:text-teal-300 transition">
              About Us
            </Link>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <Link to="/hipaa" className="hover:text-teal-300 transition">
              HIPAA
            </Link>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <Link to="/privacy-policy" className="hover:text-teal-300 transition">
              Privacy Policy
            </Link>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <Link to="/terms-and-conditions" className="hover:text-teal-300 transition">
              Terms and Conditions
            </Link>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <Link to="/cookie-policy" className="hover:text-teal-300 transition">
              Cookie Policy
            </Link>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <Link to="/reviews" className="hover:text-teal-300 transition">
              Doctor Reviews
            </Link>
          </div>

          {/* Copyright Line Below Links */}
          <p className="text-slate-400 text-xs">
            &copy; {new Date().getFullYear()} Nexmedora. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-0.5">
            <Lock className="w-3.5 h-3.5 text-teal-400" />
            <span>256-Bit SSL Encrypted • Zero PHI Stored Locally</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
