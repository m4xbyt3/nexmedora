import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  ArrowRight,
  Search,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { specialtiesData } from '../data/specialtiesData';

interface SpecialtiesPageProps {
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

export const SpecialtiesPage: React.FC<SpecialtiesPageProps> = ({ onOpenAudit }) => {
  const [search, setSearch] = useState('');

  const filteredSpecialties = specialtiesData.filter(
    (sp) =>
      sp.name.toLowerCase().includes(search.toLowerCase()) ||
      sp.shortDesc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-12 sm:py-16 bg-white text-slate-900">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <span className="px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-3 inline-block">
          Specialty-Specific Billing Protocols
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B1F3A] font-heading tracking-tight mb-4">
          Specialties We Serve
        </h1>
        <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mb-8">
          Every specialty has its own coding rules, documentation needs and payer requirements. Our team follows specialty-specific workflows to support accurate claims, compliance and timely reimbursement.
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${specialtiesData.length} specialties (e.g. Cardiology, Ortho, Pediatrics)...`}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition shadow-xs"
          />
        </div>
      </div>

      {/* Specialties Grid: 4 per row on desktop for even 12-item layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSpecialties.map((specialty, idx) => {
            const IconComponent = getSpecialtyIcon(specialty.iconName);

            return (
              <motion.div
                key={specialty.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04, duration: 0.35 }}
                className="bg-white border border-slate-200 hover:border-teal-400 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 group-hover:scale-110 group-hover:bg-teal-100/60 transition-transform">
                      <IconComponent className="w-6 h-6 text-teal-600" />
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-teal-800 font-mono text-xs font-bold">
                      {specialty.avgDenialReduction} Drop
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0B1F3A] font-heading mb-2 group-hover:text-teal-700 transition-colors">
                    {specialty.name}
                  </h3>

                  <p className="text-slate-600 text-xs leading-relaxed mb-5">
                    {specialty.shortDesc}
                  </p>

                  {/* Core CPT Codes Badge */}
                  <div className="mb-4">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1.5 tracking-wider">
                      Core CPT Codes:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {specialty.cptCodes.slice(0, 2).map((c, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-mono text-[10px]"
                        >
                          {c.split(' ')[0]}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/specialties/${specialty.slug}`}
                    className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    <span>View Playbook</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-[11px] text-slate-500 font-mono font-medium">
                    {specialty.turnaroundSLA}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CTA Box */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-10 bg-[#0B1F3A] text-white rounded-3xl space-y-4 shadow-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-900/60 border border-teal-500/40 text-teal-300 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Dedicated Specialty Pods</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            Do You Practice a Unique Sub-Specialty?
          </h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            We adapt our workflows to your clinical requirements, software and payer mix. Request an audit to see how our certified coders will tailor a customized workflow for your practice.
          </p>
          <button
            onClick={onOpenAudit}
            className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-sm transition shadow-lg shadow-teal-500/25 cursor-pointer"
          >
            Request Specialty Billing Consultation
          </button>
        </div>
      </div>
    </div>
  );
};
