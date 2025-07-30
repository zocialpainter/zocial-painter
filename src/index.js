import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { LanguageProvider } from './lang/LanguageContext'; // ✅ Import this

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);
