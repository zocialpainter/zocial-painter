// src/lang/LanguageContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const stored = localStorage.getItem('zocial-lang') || 'en';
    setLanguage(stored);
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'np' : 'en';
    setLanguage(newLang);
    localStorage.setItem('zocial-lang', newLang);
    window.location.reload(); // Apply change
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
