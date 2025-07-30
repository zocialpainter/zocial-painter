// src/components/Footer.jsx

import React from 'react';
import logo from '../assets/logo.png'; // Adjust path if needed

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
          <div>
            <h2 className="font-bold text-lg">Zocial</h2>
            <p className="text-xs italic">Tap Choking? Wall Joking? Call Zocial!</p>
          </div>
        </div>
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Zocial. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
