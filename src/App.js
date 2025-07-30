// src/App.jsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignupModal from './components/SignupModal';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import MapWithMarkers from './components/MapWithMarkers';
import PaintShopDirectory from './pages/PaintShopDirectory';
import CustomerRegister from './pages/CustomerRegister';
import PainterRegister from './pages/PainterRegister';
import PainterBooking from './pages/PainterBooking';
import RoomPainter from './components/RoomPainter';
import LanguageToggle from './components/LanguageToggle';

export default function App() {
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState('english');

  return (
    <Router>
      <LanguageToggle /> {/* Floating language toggle button */}
      <SignupModal onComplete={setUser} language={language} />

      <Navbar
        user={user}
        setUser={setUser}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Only show main app if user signed up */}
      {user ? (
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection language={language} />
                <ServicesSection language={language} />
                <MapWithMarkers user={user} language={language} /> {/* Pass user & language */}
                <RoomPainter language={language} />
                <TestimonialsSection language={language} />
                <FAQSection language={language} />
                <ContactSection language={language} />
                <Footer language={language} />
              </>
            }
          />
          <Route path="/customer-register" element={<CustomerRegister language={language} />} />
          <Route path="/painter-register" element={<PainterRegister language={language} />} />
          <Route path="/painter-booking" element={<PainterBooking language={language} />} />
          <Route path="/paint-shops" element={<PaintShopDirectory language={language} />} />
        </Routes>
      ) : (
        <div className="text-center mt-40 text-gray-600">
          {/* Optional: Message or blank while waiting for signup */}
          {language === 'english'
            ? 'Please enter name, phone, and role to continue.'
            : 'कृपया नाम, फोन र भूमिका प्रविष्ट गर्नुहोस्।'}
        </div>
      )}
    </Router>
  );
}
