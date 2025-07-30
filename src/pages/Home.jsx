// src/pages/Home.jsx

import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import RoomPainter from '../components/RoomPainter';
import MapWithMarkers from '../components/MapWithMarkers';
import TestimonialsSection from '../components/TestimonialSection';
import FAQSection from '../components/FAQSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import FloatingFacebook from '../components/FloatingFacebook';

export default function Home() {
  return (
    <div className="bg-white text-gray-900">
      <Navbar />

      <main className="mt-16">
        <HeroSection />
        <ServicesSection />
        <RoomPainter />
        <MapWithMarkers />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>

      <Footer />
      <FloatingFacebook />
    </div>
  );
}
