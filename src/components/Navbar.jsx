// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Navbar({ user, setUser, language, setLanguage }) {
  const toggleLanguage = () => {
    setLanguage(language === 'english' ? 'nepali' : 'english');
  };

  const logout = () => {
    setUser(null);
    alert(language === 'english' ? 'Logged out successfully' : 'सफलतापूर्वक लगआउट गरियो');
  };

  return (
    <nav className="bg-red-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="flex items-center space-x-2">
        <img src={logo} alt="Zocial Painter Logo" className="h-8 w-8 object-contain" />
        <span className="font-bold text-xl">Zocial Painter</span>
      </Link>

      <div className="flex items-center space-x-4">
        <button
          onClick={toggleLanguage}
          className="bg-yellow-400 text-black px-3 py-1 rounded"
          title={language === 'english' ? 'Switch to Nepali' : 'नेपालीमा स्विच गर्नुहोस्'}
        >
          {language === 'english' ? 'नेपाली' : 'English'}
        </button>

        {user ? (
          <>
            <span>
              {language === 'english'
                ? `Welcome, ${user.name} (${user.type})`
                : `स्वागत छ, ${user.name} (${user.type})`}
            </span>
            <button
              onClick={logout}
              className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
            >
              {language === 'english' ? 'Logout' : 'लगआउट'}
            </button>
          </>
        ) : (
          <>
            <Link to="/customer-register" className="hover:underline">
              {language === 'english' ? 'Customer Register' : 'ग्राहक दर्ता'}
            </Link>
            <Link to="/painter-register" className="hover:underline">
              {language === 'english' ? 'Painter Register' : 'रंगाउने दर्ता'}
            </Link>
            <Link to="/painter-booking" className="hover:underline">
              {language === 'english' ? 'Painter Booking' : 'सेवा बुकिङ'}
            </Link>
            <Link to="/paint-shops" className="hover:underline">
              {language === 'english' ? 'Paint Shops' : 'रंग पसलहरू'}
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
