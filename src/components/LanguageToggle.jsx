// src/components/LanguageToggle.jsx
import React from 'react';
import { useLanguage } from '../lang/LanguageContext';

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleLanguage}
        className="bg-white border border-gray-300 text-sm px-3 py-1 rounded shadow hover:bg-gray-100"
        title={language === 'en' ? 'Switch to Nepali' : 'Switch to English'}
      >
        {language === 'en' ? '🇳🇵 नेपाली' : '🇬🇧 English'}
      </button>
    </div>
  );
}
