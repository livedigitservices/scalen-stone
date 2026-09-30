import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { useScrollToTop } from './hooks/useScrollToTop';

// Pages matching reference website (cyangold.in)
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { LocationPage } from './pages/LocationPage';
import { ContactPage } from './pages/ContactPage';
import { GoldPurchasePage } from './pages/GoldPurchasePage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsConditionsPage } from './pages/TermsConditionsPage';
import { NotFoundPage } from './pages/NotFoundPage';

const ScrollHelper: React.FC = () => {
  useScrollToTop();
  return null;
};

export const App: React.FC = () => {
  return (
    <Router>
      <ScrollHelper />
      <div className="min-h-screen flex flex-col bg-white text-[#0f172a]">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/location" element={<LocationPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/gold-purchase" element={<GoldPurchasePage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-conditions" element={<TermsConditionsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
