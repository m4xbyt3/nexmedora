import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';

// Common Components
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { Preloader } from './components/common/Preloader';
import { AuditModal } from './components/common/AuditModal';
import { FloatingAuditButton } from './components/common/FloatingAuditButton';
import { WhatsAppButton } from './components/common/WhatsAppButton';


// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { SpecialtiesPage } from './pages/SpecialtiesPage';
import { SpecialtyDetailPage } from './pages/SpecialtyDetailPage';
import { ProcessPage } from './pages/ProcessPage';
import { ContactPage } from './pages/ContactPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { CookiePolicyPage } from './pages/CookiePolicyPage';
import { HipaaPage } from './pages/HipaaPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Helper component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

// Animated Route Wrapper
function AnimatedRoutes({ onOpenAudit }: { onOpenAudit: () => void }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="flex-1 flex flex-col"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage onOpenAudit={onOpenAudit} />} />
          <Route path="/about-us" element={<AboutPage onOpenAudit={onOpenAudit} />} />
          <Route path="/about" element={<AboutPage onOpenAudit={onOpenAudit} />} />
          <Route path="/services" element={<ServicesPage onOpenAudit={onOpenAudit} />} />
          <Route path="/services/:slug" element={<ServiceDetailPage onOpenAudit={onOpenAudit} />} />
          <Route path="/specialties" element={<SpecialtiesPage onOpenAudit={onOpenAudit} />} />
          <Route path="/specialties/dental-billing" element={<Navigate to="/specialties" replace />} />
          <Route path="/specialties/dental" element={<Navigate to="/specialties" replace />} />
          <Route path="/specialties/pathology" element={<Navigate to="/specialties" replace />} />
          <Route path="/specialties/anesthesia" element={<Navigate to="/specialties" replace />} />
          <Route path="/specialties/:slug" element={<SpecialtyDetailPage onOpenAudit={onOpenAudit} />} />
          <Route path="/process" element={<ProcessPage onOpenAudit={onOpenAudit} />} />
          <Route path="/why-choose-us" element={<Navigate to="/" replace />} />
          <Route path="/calculator" element={<Navigate to="/" replace />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/testimonials" element={<ReviewsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-and-conditions" element={<TermsPage />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />
          <Route path="/terms" element={<Navigate to="/terms-and-conditions" replace />} />
          <Route path="/hipaa" element={<HipaaPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  const handleOpenAudit = () => setIsAuditModalOpen(true);
  const handleCloseAudit = () => setIsAuditModalOpen(false);

  return (
    <BrowserRouter>
      {/* Animated Preloader Curtain */}
      <Preloader />

      {/* Scroll restoration */}
      <ScrollToTop />

      <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-teal-600 selection:text-white font-sans">
        {/* Sticky Header */}
        <Header onOpenAudit={handleOpenAudit} />

        {/* Dynamic Route Pages with transitions */}
        <main className="flex-1 flex flex-col">
          <AnimatedRoutes onOpenAudit={handleOpenAudit} />
        </main>

        {/* Global Footer */}
        <Footer onOpenAudit={handleOpenAudit} />

        {/* Global Reusable Audit Modal */}
        <AuditModal isOpen={isAuditModalOpen} onClose={handleCloseAudit} />

        {/* Floating Actions */}
        <FloatingAuditButton />
        <WhatsAppButton />
      </div>
    </BrowserRouter>
  );
}
