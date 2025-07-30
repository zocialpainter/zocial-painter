// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      navigate('/');
    } else {
      setError('Invalid credentials. Try admin / zocial123');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md border max-w-sm w-full"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">🔐 Login</h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <label className="block mb-2">
          Username
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 w-full rounded mt-1"
          />
        </label>

        <label className="block mb-4">
          Password
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full rounded mt-1"
          />
        </label>

        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white w-full py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
