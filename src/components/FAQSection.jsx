// src/components/FAQSection.jsx

import React from 'react';
import { useLanguage } from '../lang/LanguageContext';
import lang from '../lang/langStrings';

export default function FAQSection() {
  const { language } = useLanguage();
  const t = lang[language];

  const faqs = [
    {
      question: t.faq.q1,
      answer: t.faq.a1,
    },
    {
      question: t.faq.q2,
      answer: t.faq.a2,
    },
    {
      question: t.faq.q3,
      answer: t.faq.a3,
    },
  ];

  return (
    <section className="py-16 bg-gray-100 px-4">
      <h2 className="text-3xl font-bold text-center mb-10">{t.faq.heading}</h2>
      <div className="max-w-3xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg p-4 bg-white shadow-sm">
            <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
