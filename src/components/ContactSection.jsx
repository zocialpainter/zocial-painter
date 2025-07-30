// src/components/ContactSection.jsx

import React from 'react';
import { useLanguage } from '../lang/LanguageContext';
import lang from '../lang/langStrings';

export default function ContactSection() {
  const { language } = useLanguage();
  const t = lang[language];

  return (
    <section className="py-16 bg-white px-4">
      <h2 className="text-3xl font-bold text-center mb-6">{t.contact.heading}</h2>
      <p className="text-center text-lg mb-6">{t.contact.text}</p>

      <div className="text-center text-blue-700 text-xl font-semibold">
        📞 {t.footer.call} <a href="tel:9851151294" className="underline">9851151294</a>
      </div>
    </section>
  );
}
