import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  HeartPulse,
  Laptop,
  Workflow,
  Network,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface PracticeManagementSectionProps {
  onOpenAudit?: () => void;
}

const PLATFORMS = [
  {
    name: 'Therabill',
    desc: 'Specialized therapy and behavioral health billing & documentation workflows',
    icon: HeartPulse,
  },
  {
    name: 'eClinicalWorks (ECW)',
    desc: 'Enterprise multi-specialty charge capture, claims, and clearinghouse routing',
    icon: Laptop,
  },
  {
    name: 'Tebra',
    desc: 'Integrated cloud PM, patient engagement, and billing operating system',
    icon: Workflow,
  },
  {
    name: 'Athenahealth',
    desc: 'Network-enabled EHR and revenue cycle workflows for clinical practices',
    icon: Network,
  },
];

export const PracticeManagementSection: React.FC<PracticeManagementSectionProps> = ({
  onOpenAudit,
}) => {
  const isReduced = useReducedMotion();

  return (
    <section className="py-20 lg:py-28 bg-white border-t border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ===================== LEFT COLUMN: HEADINGS & CONTEXT ===================== */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero Workflow Disruption</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] font-heading tracking-tight leading-[1.15]">
              Experienced with Leading Practice Management Software
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Our team works inside the platforms your practice already uses, so there is no need to change your workflow.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                <span>Direct portal login with encrypted, role-based credentials</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                <span>No software migrations, third-party syncs, or setup fees</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                <span>Daily charge audit and claim posting directly within your charts</span>
              </div>
            </div>

            {onOpenAudit && (
              <div className="pt-4">
                <button
                  type="button"
                  onClick={onOpenAudit}
                  className="px-6 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs sm:text-sm transition shadow-md shadow-teal-700/20 cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Verify Your Software Integration</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* ===================== RIGHT COLUMN: 4 PLATFORM ROWS ===================== */}
          <div className="lg:col-span-7 bg-slate-50/70 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="divide-y divide-slate-200/80">
              {PLATFORMS.map((platform, idx) => {
                const IconComponent = platform.icon;

                return (
                  <motion.div
                    key={platform.name}
                    initial={isReduced ? { opacity: 1, x: 0 } : { opacity: 0, x: 28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.4,
                      delay: isReduced ? 0 : idx * 0.1,
                      ease: 'easeOut',
                    }}
                    className="group relative py-5 sm:py-6 px-4 rounded-2xl hover:bg-white hover:shadow-sm transition-all duration-200 cursor-pointer select-none"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 sm:gap-5">
                        {/* Simple Lucide Icon Tile with Small Pop */}
                        <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 text-teal-700 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-teal-50 group-hover:border-teal-300 transition-all duration-200 shadow-2xs">
                          <IconComponent className="w-6 h-6 text-teal-700" />
                        </div>

                        {/* Platform Name and Description */}
                        <div>
                          <div className="relative inline-block">
                            <h3 className="text-lg sm:text-xl font-bold text-[#0B1F3A] font-heading tracking-tight group-hover:text-teal-900 transition-colors">
                              {platform.name}
                            </h3>
                            {/* Teal underline that slides in on hover */}
                            <div className="h-[2px] w-full bg-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-250 rounded-full" />
                          </div>
                          <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-snug">
                            {platform.desc}
                          </p>
                        </div>
                      </div>

                      {/* Right Arrow indicator that slides in */}
                      <div className="shrink-0 flex items-center pr-2">
                        <ArrowRight className="w-5 h-5 text-teal-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Small Grey Legal Note */}
            <p className="text-[11px] text-slate-400 mt-4 pt-3 border-t border-slate-200/60 pl-2">
              Platform names are trademarks of their respective owners.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
