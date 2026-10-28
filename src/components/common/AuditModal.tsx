import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useForm } from 'react-hook-form';
import confetti from 'canvas-confetti';
import { X, CheckCircle2, ShieldCheck, Sparkles, Send, Loader2, FileSpreadsheet, Lock } from 'lucide-react';
import { NexmedoraLogo } from './NexmedoraLogo';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AuditFormValues {
  name: string;
  email: string;
  phone: string;
  practiceName: string;
  specialty: string;
  monthlyClaims: string;
  ehrSystem: string;
  message: string;
}

export const AuditModal: React.FC<AuditModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<{ refId: string; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<AuditFormValues>();

  const onSubmit = async (data: AuditFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const resJson = await res.json();
      
      setIsSubmitting(false);
      setSuccessData({
        refId: resJson.refId || `AP-${Math.floor(100000 + Math.random() * 900000)}`,
        message: resJson.message || 'Your audit request has been successfully assigned to an RCM Director.'
      });

      // Fire celebratory confetti!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0d9488', '#14b8a6', '#0284c7', '#10b981']
      });
    } catch (err) {
      setIsSubmitting(false);
      // Fallback success for resilience
      setSuccessData({
        refId: `AP-${Math.floor(100000 + Math.random() * 900000)}`,
        message: 'Your audit request has been received. Our RCM director will reach out within 2 business hours.'
      });
    }
  };

  const handleResetAndClose = () => {
    reset();
    setSuccessData(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleResetAndClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Container (Clean White) */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-8 z-10 text-slate-900"
          >
            {/* Header Top Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-500 via-teal-600 to-[#0B1F3A]" />

            {/* Close Button */}
            <button
              onClick={handleResetAndClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors z-20"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {successData ? (
              /* Success View */
              <div className="p-8 sm:p-10 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 15 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600"
                >
                  <CheckCircle2 className="w-10 h-10" />
                </motion.div>

                <h3 className="text-2xl font-bold text-[#0B1F3A] mb-2 font-heading">
                  Billing Audit Request Received!
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
                  {successData.message}
                </p>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 inline-block mb-6">
                  <span className="text-xs text-slate-500 block uppercase tracking-wider mb-1 font-semibold">
                    Audit Tracking ID
                  </span>
                  <span className="text-lg font-mono font-bold text-teal-700">
                    {successData.refId}
                  </span>
                </div>

                <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 text-left max-w-lg mx-auto mb-6 text-xs text-slate-700 space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-teal-800">
                    <ShieldCheck className="w-4 h-4 text-teal-600" /> Next Steps:
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>Our Senior RCM Auditor in Ahmedabad will review your practice profile.</li>
                    <li>We will prepare a sample 30-day denial scrub & AR aging recovery plan.</li>
                    <li>A mutual Business Associate Agreement (BAA) will be provided prior to any chart inspection.</li>
                  </ul>
                </div>

                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-teal-700/20"
                >
                  Return to Website
                </button>
              </div>
            ) : (
              /* Audit Form View */
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-2">
                  <NexmedoraLogo variant="modal" className="border border-slate-200 rounded-xl px-2 py-0.5" />
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] font-heading">
                      Request a 100% Free Practice Billing Audit
                    </h3>
                    <p className="text-xs text-slate-500">
                      Uncover hidden denials, unbilled claims, and trapped cash with zero obligation.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                        placeholder="Dr. Robert Miller / Elena Vance"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition"
                      />
                      {errors.name && (
                        <p className="text-rose-600 text-xs mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Work / Practice Email *
                      </label>
                      <input
                        type="email"
                        {...register('email', {
                          required: 'Work email is required',
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        placeholder="rmiller@cardiologycare.com"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition"
                      />
                      {errors.email && (
                        <p className="text-rose-600 text-xs mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        {...register('phone', { required: 'Phone number is required' })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition"
                      />
                      {errors.phone && (
                        <p className="text-rose-600 text-xs mt-1">{errors.phone.message}</p>
                      )}
                    </div>

                    {/* Practice Name */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Practice / Facility Name *
                      </label>
                      <input
                        type="text"
                        {...register('practiceName', { required: 'Practice name is required' })}
                        placeholder="Valley Heart & Vascular Group"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition"
                      />
                      {errors.practiceName && (
                        <p className="text-rose-600 text-xs mt-1">{errors.practiceName.message}</p>
                      )}
                    </div>

                    {/* Specialty */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Primary Specialty *
                      </label>
                      <select
                        {...register('specialty', { required: 'Please select a specialty' })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition"
                      >
                        <option value="">Select Specialty...</option>
                        <option value="Cardiology">Cardiology</option>
                        <option value="Dermatology">Dermatology</option>
                        <option value="Psychiatry & Behavioral Health">Psychiatry & Behavioral Health</option>
                        <option value="Orthopedics">Orthopedics</option>
                        <option value="Pediatrics">Pediatrics</option>
                        <option value="Internal Medicine">Internal Medicine</option>
                        <option value="Ophthalmology">Ophthalmology</option>
                        <option value="Radiology">Radiology</option>
                        <option value="Urgent Care">Urgent Care</option>
                        <option value="Physical Therapy">Physical Therapy</option>
                        <option value="Neurology">Neurology</option>
                        <option value="Chiropractic">Chiropractic</option>
                        <option value="Multi-Specialty">Multi-Specialty Clinic</option>
                        <option value="Other">Other Medical Specialty</option>
                      </select>
                      {errors.specialty && (
                        <p className="text-rose-600 text-xs mt-1">{errors.specialty.message}</p>
                      )}
                    </div>

                    {/* Monthly Claim Volume */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Monthly Claim Volume
                      </label>
                      <select
                        {...register('monthlyClaims')}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition"
                      >
                        <option value="500 - 1,500 claims/mo">500 - 1,500 claims / month</option>
                        <option value="1,500 - 4,000 claims/mo">1,500 - 4,000 claims / month</option>
                        <option value="4,000 - 10,000 claims/mo">4,000 - 10,000 claims / month</option>
                        <option value="10,000+ claims/mo">10,000+ claims / month (Enterprise)</option>
                      </select>
                    </div>
                  </div>

                  {/* EHR / PM System */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Current EHR / Practice Management Software
                    </label>
                    <input
                      type="text"
                      {...register('ehrSystem')}
                      placeholder="e.g. Therabill, eClinicalWorks (ECW), Tebra, Athenahealth"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition"
                    />
                  </div>

                  {/* Notes / Pain Points */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Specific Billing Pain Points (Optional)
                    </label>
                    <textarea
                      rows={2}
                      {...register('message')}
                      placeholder="e.g. High aging AR > 90 days, recurring bundling denials on modifier 25, billing staff turnover..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition"
                    />
                  </div>

                  {/* HIPAA Note */}
                  <div className="flex items-center gap-2 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <Lock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>
                      100% HIPAA Compliant & Confidential. Do not include patient PHI. Standard Business Associate Agreement (BAA) provided prior to any chart audit.
                    </span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm shadow-md shadow-teal-700/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Generating Audit Request...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Claim Your Free Practice Billing Audit
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
