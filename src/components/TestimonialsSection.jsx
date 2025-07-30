// src/components/TestimonialsSection.jsx

import React from 'react';
import { useLanguage } from '../lang/LanguageContext';
import lang from '../lang/langStrings';

export default function TestimonialsSection() {
  const { language } = useLanguage();
  const t = lang[language];

  // Safely grab testimonials
  const testimonials = t?.testimonials?.items || [];

  return (
    <section className="py-16 bg-blue-100 px-4">
      <h2 className="text-3xl font-bold text-center mb-10">
        {t?.testimonials?.heading || "Testimonials"}
      </h2>

      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
        {testimonials.length > 0 ? (
          testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition"
            >
              <p className="italic text-gray-700">“{testimonial.quote}”</p>
              <p className="mt-4 font-semibold text-blue-800">– {testimonial.name}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-3">
            No testimonials available.
          </p>
        )}
      </div>
    </section>
  );
}
