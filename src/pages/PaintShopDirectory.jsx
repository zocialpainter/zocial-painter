// src/pages/PaintShopDirectory.jsx

import { useEffect, useState } from 'react';
import { emojiMap } from '../utils/emojiMap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PaintShopDirectory() {
  const [activeTab, setActiveTab] = useState('paintshop');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('zocial-markers');
    if (stored) {
      const all = JSON.parse(stored).filter(
        (m) => !m.expiresAt || new Date(m.expiresAt) > new Date()
      );
      setItems(all);
    }
  }, []);

  const filtered = items.filter((m) => m.type === activeTab);

  const scrollToMap = (lat, lng) => {
    localStorage.setItem('scrollTo', JSON.stringify({ lat, lng }));
    window.location.href = '/'; // go to home map
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-6">
          {emojiMap[activeTab]} {activeTab === 'paintshop' ? 'Paint Shops' : 'Plumbers'} Directory
        </h2>

        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`px-4 py-1 rounded-full ${
              activeTab === 'paintshop'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab('paintshop')}
          >
            🏪 Paint Shops
          </button>
          <button
            className={`px-4 py-1 rounded-full ${
              activeTab === 'plumber'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab('plumber')}
          >
            🔧 Plumbers
          </button>
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-gray-600">No {activeTab}s found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filtered.map((item, i) => (
              <div key={i} className="border rounded-lg p-4 bg-white shadow">
                <h3 className="font-bold text-lg">
                  {emojiMap[item.type] || '📍'} {item.name}
                </h3>
                {item.phone && <p className="text-sm">📞 {item.phone}</p>}
                {item.photo && (
                  <img
                    src={item.photo}
                    alt="pic"
                    className="mt-2 w-full h-40 object-cover rounded border"
                  />
                )}
                <button
                  onClick={() => scrollToMap(item.lat, item.lng)}
                  className="mt-3 text-blue-600 underline text-sm"
                >
                  📍 View on Map
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
