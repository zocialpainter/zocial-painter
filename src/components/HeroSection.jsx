// src/components/HeroSection.jsx

import React from 'react';

export default function HeroSection() {
  return (
    <section className="bg-red-600 text-white py-20 px-6 text-center">

      <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
        Zocial — Your Local Painter & Plumber Hub
      </h1>
      <p className="text-xl md:text-2xl italic mb-6">
        Tap Choking? Wall Joking? Call Zocial! <br />
        पाइप चोकिँदै? भित्तो हाँस्दै? कल गर्नुहोस् Zocial लाई!
      </p>

      <p className="max-w-xl mx-auto text-lg md:text-xl">
        Connect with trusted painters, plumbers, and paint shops around Kathmandu Valley.  
        काठमाडौं उपत्यकाका भरपर्दो रङ्गरोगन, प्लम्बिङ सेवा र रंग पसलहरूसँग जोडिनुहोस्।
      </p>
    </section>
  );
}
