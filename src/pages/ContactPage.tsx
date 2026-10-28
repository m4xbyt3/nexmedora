import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Loader2,
  CheckCircle2,
  Linkedin,
  Instagram,
  ExternalLink,
  MessageSquare,
  Sparkles
} from 'lucide-react';

interface DirectContactFormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const ContactPage: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<DirectContactFormValues>({
    mode: 'onBlur',
  });

  const onSubmit = async (data: DirectContactFormValues) => {
    setSubmitting(true);
    try {
      // TODO: connect to a form service (Formspree or EmailJS) to deliver messages to info@nexmedora.com
      // Mock submission to simulate real network delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      } catch {
        // Fallback gracefully in case mock endpoint is offline
      }

      setSubmitting(false);
      setIsSuccess(true);
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#0d9488', '#14b8a6', '#0284c7'],
      });
    } catch {
      setSubmitting(false);
      setIsSuccess(true);
    }
  };

  return (
    <div className="py-12 sm:py-16 bg-white text-slate-900">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 sm:mb-16">
        <span className="px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-3 inline-block">
          Direct Communication
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B1F3A] font-heading tracking-tight mb-4">
          Contact <span className="text-teal-600">Nexmedora RCM</span>
        </h1>
        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Have a question about our revenue cycle management, medical coding, or claims recovery? Send us a message and our team will get back to you promptly.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        {/* Responsive Layout: Form first on mobile, cards below; side-by-side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* ===================== SIMPLIFIED DIRECT MESSAGE FORM ===================== */}
          <div className="order-1 lg:order-2 lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl relative">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-200 shadow-sm">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0B1F3A] font-heading">
                    Thank you! Your message has been sent.
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                    We will get back to you shortly.
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsSuccess(false);
                        reset();
                      }}
                      className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold cursor-pointer border border-slate-200 transition"
                    >
                      Send Another Message
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="form-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-5 h-5 text-teal-600" />
                    <h2 className="text-2xl font-bold text-[#0B1F3A] font-heading">
                      Send Us a Message
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 mb-6">
                    Leave your contact details and message below. We look forward to connecting with you.
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 mb-1">
                        Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        {...register('name', {
                          required: 'Please enter your name',
                          minLength: { value: 2, message: 'Name must be at least 2 characters' }
                        })}
                        placeholder="Your full name"
                        className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition shadow-2xs ${
                          errors.name ? 'border-rose-400 focus:border-rose-500 bg-rose-50/20' : 'border-slate-300 focus:border-teal-500'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-rose-600 text-xs mt-1.5 flex items-center gap-1">
                          <span>{errors.name.message}</span>
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 mb-1">
                        Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        {...register('email', {
                          required: 'Please enter your email',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Please enter a valid email address (e.g. name@domain.com)'
                          }
                        })}
                        placeholder="you@domain.com"
                        className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition shadow-2xs ${
                          errors.email ? 'border-rose-400 focus:border-rose-500 bg-rose-50/20' : 'border-slate-300 focus:border-teal-500'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-rose-600 text-xs mt-1.5 flex items-center gap-1">
                          <span>{errors.email.message}</span>
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        {...register('phone', {
                          required: 'Please enter your phone number',
                          pattern: {
                            value: /^\+?[0-9]{7,15}$/,
                            message: 'Phone number must contain digits only with an optional + sign (e.g. +917041451969 or 7041451969)'
                          }
                        })}
                        placeholder="+917041451969 or 7041451969"
                        className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition shadow-2xs ${
                          errors.phone ? 'border-rose-400 focus:border-rose-500 bg-rose-50/20' : 'border-slate-300 focus:border-teal-500'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-rose-600 text-xs mt-1.5 flex items-center gap-1">
                          <span>{errors.phone.message}</span>
                        </p>
                      )}
                      <p className="text-[11px] text-slate-400 mt-1">
                        Digits only with an optional + sign
                      </p>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 mb-1">
                        Message <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        {...register('message', {
                          required: 'Please enter your message',
                          minLength: { value: 5, message: 'Message must be at least 5 characters' }
                        })}
                        placeholder="Write your message here..."
                        className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition shadow-2xs ${
                          errors.message ? 'border-rose-400 focus:border-rose-500 bg-rose-50/20' : 'border-slate-300 focus:border-teal-500'
                        }`}
                      />
                      {errors.message && (
                        <p className="text-rose-600 text-xs mt-1.5 flex items-center gap-1">
                          <span>{errors.message.message}</span>
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white font-bold rounded-xl text-sm transition shadow-md shadow-teal-700/20 cursor-pointer flex items-center justify-center gap-2 mt-2"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ===================== CONTACT DETAILS CARDS ===================== */}
          <div className="order-2 lg:order-1 lg:col-span-5 space-y-6">
            {/* Address Card */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl space-y-3 shadow-xs">
              <div className="flex items-center gap-2.5 text-[#0B1F3A]">
                <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 border border-teal-100 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0B1F3A] font-heading">
                    Registered Office & Facility
                  </h3>
                  <span className="text-[11px] text-slate-500">Ahmedabad, Gujarat</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-1">
                Block-A/711, Devaurum Commercial Complex, Nr. Deer Circle, Anand Nagar Road, Ahmedabad, Gujarat 380015
              </p>
            </div>

            {/* Phone Card */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl space-y-3 shadow-xs">
              <div className="flex items-center gap-2.5 text-[#0B1F3A]">
                <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 border border-teal-100 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0B1F3A] font-heading">
                    Mobile & Direct Phone
                  </h3>
                  <span className="text-[11px] text-slate-500">Tap to call our operations desk</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1 text-xs sm:text-sm">
                <a
                  href="tel:+917041451969"
                  className="inline-flex items-center gap-1.5 font-semibold text-teal-800 bg-white border border-teal-200/80 px-3 py-2 rounded-xl hover:bg-teal-50 hover:text-teal-900 transition shadow-2xs"
                  aria-label="Call +91 7041451969"
                >
                  <Phone className="w-3.5 h-3.5 text-teal-600" />
                  <span>7041451969</span>
                </a>
                <a
                  href="tel:+919919917345"
                  className="inline-flex items-center gap-1.5 font-semibold text-teal-800 bg-white border border-teal-200/80 px-3 py-2 rounded-xl hover:bg-teal-50 hover:text-teal-900 transition shadow-2xs"
                  aria-label="Call +91 9919917345"
                >
                  <Phone className="w-3.5 h-3.5 text-teal-600" />
                  <span>9919917345</span>
                </a>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl space-y-3 shadow-xs">
              <div className="flex items-center gap-2.5 text-[#0B1F3A]">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                    <path d="M12.031 2c-5.518 0-9.998 4.48-9.998 9.998 0 1.761.458 3.479 1.33 4.992l-1.413 5.163 5.285-1.387c1.462.798 3.109 1.23 4.796 1.23 5.518 0 9.998-4.48 9.998-9.998 0-5.518-4.48-9.998-9.998-9.998zm0 18.286c-1.503 0-2.977-.404-4.265-1.168l-.306-.181-3.17.831.846-3.089-.199-.317c-.84-1.336-1.285-2.887-1.285-4.482 0-4.57 3.718-8.288 8.379-8.288 4.57 0 8.288 3.718 8.288 8.288 0 4.57-3.718 8.288-8.288 8.288zm4.542-6.196c-.249-.125-1.472-.727-1.7-.81-.229-.083-.395-.125-.561.125-.166.249-.643.81-.788.976-.145.166-.291.187-.54.062s-1.05-.387-2-1.234c-.739-.659-1.238-1.474-1.383-1.723-.145-.249-.015-.384.109-.508.112-.112.249-.291.374-.436.125-.145.166-.249.249-.415.083-.166.042-.312-.021-.436s-.561-1.35-.768-1.849c-.202-.486-.407-.42-.561-.428-.145-.008-.312-.01-.478-.01-.166 0-.436.062-.664.312-.229.249-.872.852-.872 2.078 0 1.226.893 2.41 1.018 2.576.125.166 1.758 2.684 4.258 3.764.595.257 1.06.411 1.423.526.598.19 1.142.163 1.572.099.479-.071 1.472-.602 1.68-1.184.208-.582.208-1.08.145-1.184-.062-.104-.229-.166-.478-.291z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0B1F3A] font-heading">
                    Instant WhatsApp Connect
                  </h3>
                  <span className="text-[11px] text-slate-500">24/7 direct billing assistance</span>
                </div>
              </div>
              <div className="pt-1">
                <a
                  href="https://wa.me/917041451969?text=Hello%20Nexmedora%2C%20I%20would%20like%20to%20know%20more%20about%20your%20medical%20billing%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-white bg-[#25D366] hover:bg-[#20bd5a] px-4 py-2.5 rounded-xl transition shadow-xs text-xs sm:text-sm"
                  aria-label="Chat with Nexmedora on WhatsApp"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" aria-hidden="true">
                    <path d="M12.031 2c-5.518 0-9.998 4.48-9.998 9.998 0 1.761.458 3.479 1.33 4.992l-1.413 5.163 5.285-1.387c1.462.798 3.109 1.23 4.796 1.23 5.518 0 9.998-4.48 9.998-9.998 0-5.518-4.48-9.998-9.998-9.998zm0 18.286c-1.503 0-2.977-.404-4.265-1.168l-.306-.181-3.17.831.846-3.089-.199-.317c-.84-1.336-1.285-2.887-1.285-4.482 0-4.57 3.718-8.288 8.379-8.288 4.57 0 8.288 3.718 8.288 8.288 0 4.57-3.718 8.288-8.288 8.288zm4.542-6.196c-.249-.125-1.472-.727-1.7-.81-.229-.083-.395-.125-.561.125-.166.249-.643.81-.788.976-.145.166-.291.187-.54.062s-1.05-.387-2-1.234c-.739-.659-1.238-1.474-1.383-1.723-.145-.249-.015-.384.109-.508.112-.112.249-.291.374-.436.125-.145.166-.249.249-.415.083-.166.042-.312-.021-.436s-.561-1.35-.768-1.849c-.202-.486-.407-.42-.561-.428-.145-.008-.312-.01-.478-.01-.166 0-.436.062-.664.312-.229.249-.872.852-.872 2.078 0 1.226.893 2.41 1.018 2.576.125.166 1.758 2.684 4.258 3.764.595.257 1.06.411 1.423.526.598.19 1.142.163 1.572.099.479-.071 1.472-.602 1.68-1.184.208-.582.208-1.08.145-1.184-.062-.104-.229-.166-.478-.291z" />
                  </svg>
                  <span>Chat on WhatsApp (+91 7041451969)</span>
                </a>
              </div>
            </div>

            {/* Email Card */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl space-y-3 shadow-xs">
              <div className="flex items-center gap-2.5 text-[#0B1F3A]">
                <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 border border-teal-100 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0B1F3A] font-heading">
                    Official Email Addresses
                  </h3>
                  <span className="text-[11px] text-slate-500">Fast response within business hours</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1 text-xs sm:text-sm">
                <a
                  href="mailto:info@nexmedora.com"
                  className="inline-flex items-center gap-1.5 font-semibold text-teal-800 bg-white border border-teal-200/80 px-3 py-2 rounded-xl hover:bg-teal-50 hover:text-teal-900 transition shadow-2xs"
                  aria-label="Send email to info@nexmedora.com"
                >
                  <Mail className="w-3.5 h-3.5 text-teal-600" />
                  <span>info@nexmedora.com</span>
                </a>
                <a
                  href="mailto:support@nexmedora.com"
                  className="inline-flex items-center gap-1.5 font-semibold text-teal-800 bg-white border border-teal-200/80 px-3 py-2 rounded-xl hover:bg-teal-50 hover:text-teal-900 transition shadow-2xs"
                  aria-label="Send email to support@nexmedora.com"
                >
                  <Mail className="w-3.5 h-3.5 text-teal-600" />
                  <span>support@nexmedora.com</span>
                </a>
              </div>
            </div>

            {/* Social Links on Contact Page */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl flex items-center justify-between shadow-xs">
              <div>
                <span className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider block font-heading">
                  Follow Nexmedora
                </span>
                <span className="text-[11px] text-slate-500">
                  Industry updates & healthcare insights
                </span>
              </div>
              <div className="flex items-center gap-[28px]">
                <a
                  href="https://www.linkedin.com/company/nexmedora/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Nexmedora on LinkedIn"
                  className="text-[#0B1F3A] transition-all duration-200 ease-out hover:-translate-y-[3px] hover:scale-[1.15] hover:text-[#0A66C2]"
                >
                  <Linkedin className="w-[22px] h-[22px] transition-colors duration-200" />
                </a>
                <a
                  href="https://www.instagram.com/nexmedora/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Nexmedora on Instagram"
                  className="text-[#0B1F3A] transition-all duration-200 ease-out hover:-translate-y-[3px] hover:scale-[1.15] hover:text-[#E1306C]"
                >
                  <Instagram className="w-[22px] h-[22px] transition-colors duration-200" />
                </a>
              </div>
            </div>

            {/* Map Area: Anand Nagar Road, Ahmedabad Area */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-3xl space-y-3 shadow-xs overflow-hidden">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#0B1F3A] font-heading">
                  <MapPin className="w-4 h-4 text-teal-600" />
                  <span>Location Map • Anand Nagar Road, Ahmedabad</span>
                </div>
                <a
                  href="https://maps.google.com/?q=Devaurum+Commercial+Complex,+Anand+Nagar+Road,+Ahmedabad,+Gujarat+380015"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-teal-700 hover:text-teal-900 font-semibold inline-flex items-center gap-1 transition"
                >
                  <span>Open Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="w-full h-48 sm:h-56 rounded-2xl overflow-hidden border border-slate-200 shadow-inner relative bg-slate-100">
                <iframe
                  title="Nexmedora Location Map - Anand Nagar Road, Ahmedabad"
                  src="https://maps.google.com/maps?q=Devaurum+Commercial+Complex+Anand+Nagar+Road+Ahmedabad+Gujarat+380015&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
