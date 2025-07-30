// src/components/SignupModal.jsx

import React, { useState, useEffect } from 'react';

const roles = [
  { value: 'painter', label: '👨‍🎨 Painter' },
  { value: 'customer', label: '🙋 Customer' },
  { value: 'plumber', label: '🔧 Plumber' },
  { value: 'paintshop', label: '🏪 Paint Shop' },
  { value: 'wheels', label: '🛵 On Wheels' },
];

export default function SignupModal({ onComplete }) {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', type: 'painter' });
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user already logged in locally
    const savedUser = localStorage.getItem('zocial-user');
    if (savedUser) {
      onComplete(JSON.parse(savedUser));
    } else {
      setShow(true);
    }
  }, [onComplete]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setError('Please enter name and phone number.');
      return;
    }
    // Basic phone validation (Nepal format)
    if (!/^\d{7,15}$/.test(form.phone.trim())) {
      setError('Please enter a valid phone number (7-15 digits).');
      return;
    }
    setError('');
    localStorage.setItem('zocial-user', JSON.stringify(form));
    onComplete(form);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-md p-6 max-w-sm w-full shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center text-red-600">Welcome to Zocial Painter</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-3">
            नाम (Name):
            <input
              type="text"
              className="border p-2 w-full rounded mt-1"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              autoFocus
            />
          </label>

          <label className="block mb-3">
            फोन नम्बर (Phone):
            <input
              type="tel"
              className="border p-2 w-full rounded mt-1"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
              placeholder="e.g. 9851123456"
            />
          </label>

          <label className="block mb-4">
            भूमिका (Role):
            <select
              className="border p-2 w-full rounded mt-1"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              {roles.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </label>

          {error && <div className="text-red-600 mb-3 text-center">{error}</div>}

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition"
          >
            सुरु गर्नुहोस् (Get Started)
          </button>
        </form>
      </div>
    </div>
  );
}
