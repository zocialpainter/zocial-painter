// src/components/MapWithMarkers.jsx

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import 'leaflet/dist/leaflet.css';

const emojiMap = {
  painter: '👨‍🎨',
  customer: '🙋',
  wheels: '🛵',
  paintshop: '🏪',
  plumber: '🔧',
};

const getEmojiIcon = (emoji) =>
  new L.DivIcon({
    html: `<div style="font-size:24px;">${emoji}</div>`,
    iconSize: [30, 30],
    className: '',
  });

const getStoredMarkers = () => {
  const data = localStorage.getItem('zocial-markers');
  if (!data) return [];
  return JSON.parse(data).filter(
    (m) => !m.expiresAt || new Date(m.expiresAt) > new Date()
  );
};
const saveMarkers = (markers) =>
  localStorage.setItem('zocial-markers', JSON.stringify(markers));

function AutoCenter({ setUserLocation }) {
  const map = useMap();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        map.setView([latitude, longitude], 13);
        setUserLocation([latitude, longitude]);
      },
      () => console.warn('GPS denied')
    );
  }, [map, setUserLocation]);
  return null;
}

export default function MapWithMarkers({ user }) {
  const [markers, setMarkers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [userLocation, setUserLocation] = useState(null);

  // Prefill form with user data or default
  const [form, setForm] = useState({
    name: user?.name || '',
    type: user?.role || 'painter',
    photo: '',
    phone: user?.phone || '',
  });

  const formRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatLog, setChatLog] = useState([]);
  const [peerId, setPeerId] = useState('');
  const [conn, setConn] = useState(null);
  const [message, setMessage] = useState('');
  const [peer, setPeer] = useState(null);

  useEffect(() => {
    const newPeer = new Peer();
    newPeer.on('open', (id) => setPeerId(id));
    newPeer.on('connection', (connection) => {
      setConn(connection);
      connection.on('data', (msg) =>
        setChatLog((prev) => [...prev, { text: msg, sender: 'them' }])
      );
    });
    setPeer(newPeer);
    return () => {
      conn?.close();
      newPeer.destroy();
    };
  }, []);

  useEffect(() => {
    setMarkers(getStoredMarkers());

    const scrollTarget = localStorage.getItem('scrollTo');
    if (scrollTarget) {
      const { lat, lng } = JSON.parse(scrollTarget);
      setTimeout(() => {
        const map = document.querySelector('.leaflet-container')?._leaflet_map;
        if (map) {
          map.setView([lat, lng], 16);
        }
        localStorage.removeItem('scrollTo');
      }, 500);
    }
  }, []);

  // Update form when user prop changes (on first login)
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        type: user.role || 'painter',
        photo: '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const addMarker = (lat, lng, name = form.name, type = form.type) => {
    if (!name) return;
    const newMarker = {
      lat,
      lng,
      name,
      type,
      peerId,
      photo: form.photo || '',
      phone: form.phone || '',
      expiresAt:
        type === 'wheels' || type === 'customer'
          ? new Date(Date.now() + 6 * 60 * 60 * 1000)
          : null,
    };
    const updated = [...markers, newMarker];
    setMarkers(updated);
    saveMarkers(updated);
    setForm((prev) => ({ ...prev, photo: '' })); // Clear photo only
  };

  function ClickHandler() {
    useMapEvents({
      click(e) {
        const box = formRef.current;
        if (box) {
          box.style.display = 'block';
          box.style.left = `${e.originalEvent.pageX}px`;
          box.style.top = `${e.originalEvent.pageY}px`;
          box.dataset.lat = e.latlng.lat;
          box.dataset.lng = e.latlng.lng;

          // Prefill form inputs with current user info
          setForm((prev) => ({
            ...prev,
            name: user?.name || '',
            type: user?.role || 'painter',
            phone: user?.phone || '',
            photo: '',
          }));
        }
      },
    });
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const box = formRef.current;
    const lat = parseFloat(box.dataset.lat);
    const lng = parseFloat(box.dataset.lng);
    addMarker(lat, lng);
    box.style.display = 'none';
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setForm({ ...form, photo: event.target.result });
    };
    reader.readAsDataURL(file);
  };

  const requestPainter = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        addMarker(latitude, longitude, 'Painter Needed', 'customer');
        alert('🙋 Request sent! Painters can now see you.');
      },
      () => alert('Location denied. Cannot request.')
    );
  };

  const startChat = (remotePeerId) => {
    if (!peer) return;
    const connection = peer.connect(remotePeerId);
    connection.on('open', () => {
      setConn(connection);
      setChatOpen(true);
      setChatLog([]);
    });
    connection.on('data', (msg) => {
      setChatLog((prev) => [...prev, { text: msg, sender: 'them' }]);
    });
  };

  const sendMessage = () => {
    if (conn && message.trim()) {
      conn.send(message);
      setChatLog((prev) => [...prev, { text: message, sender: 'me' }]);
      setMessage('');
    }
  };

  const filteredMarkers = markers.filter((m) => {
    if (filter === 'all') return true;
    if (filter === 'wheels') return m.type === 'wheels';
    return m.type === filter;
  });

  return (
    <div className="w-full h-[500px] mt-8 relative">
      <h2 className="text-2xl font-bold text-center mb-2">
        🗺️ Painter, Customer, Plumber नक्सा
      </h2>

      <div className="flex justify-center flex-wrap gap-2 mb-3">
        {['all', 'painter', 'customer', 'wheels', 'paintshop', 'plumber'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-full border ${
              filter === f
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {emojiMap[f] || '📍'} {f}
          </button>
        ))}
        <button
          onClick={requestPainter}
          className="px-4 py-1 rounded-full bg-yellow-600 text-white"
        >
          🙋 Request a Painter Nearby
        </button>
      </div>

      <MapContainer center={[27.7172, 85.324]} zoom={13} className="w-full h-full z-0">
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <AutoCenter setUserLocation={setUserLocation} />
        <ClickHandler />
        {filteredMarkers.map((m, i) => (
          <Marker
            key={i}
            position={[m.lat, m.lng]}
            icon={getEmojiIcon(emojiMap[m.type] || '📍')}
          >
            <Popup>
              <div className="text-center text-sm">
                <strong>{m.name}</strong><br />
                {emojiMap[m.type] || '📍'} {m.type}
                {m.phone && <><br />📞 {m.phone}</>}
                {m.photo && (
                  <img
                    src={m.photo}
                    alt="profile"
                    className="mt-2 w-24 h-24 object-cover rounded border mx-auto"
                  />
                )}
                {m.peerId && m.peerId !== peerId && (
                  <div className="mt-2">
                    <button
                      onClick={() => startChat(m.peerId)}
                      className="text-yellow-600 underline"
                    >
                      💬 Chat
                    </button>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="absolute bg-white shadow-xl rounded-md p-4 z-50 w-72"
        style={{ display: 'none', position: 'absolute' }}
      >
        <label className="block mb-2">
          नाम:
          <input
            required
            type="text"
            className="border p-1 w-full"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </label>
        <label className="block mb-2">
          तपाईं को हुनुहुन्छ?
          <select
            className="border p-1 w-full"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="painter">👨‍🎨 Painter</option>
            <option value="customer">🙋 Customer</option>
            <option value="wheels">🛵 On Wheels</option>
            <option value="paintshop">🏪 Paint Shop</option>
            <option value="plumber">🔧 Plumber</option>
          </select>
        </label>
        <label className="block mb-2">
          फोन नम्बर (optional):
          <input
            type="tel"
            className="border p-1 w-full"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </label>
        <label className="block mb-2">
          फोटो (optional):
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="w-full text-sm"
          />
        </label>
        <div className="flex justify-between mt-3">
          <button
            type="submit"
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => (formRef.current.style.display = 'none')}
            className="text-yellow-600"
          >
            Cancel
          </button>
        </div>
      </form>

      {chatOpen && (
        <div
          ref={chatBoxRef}
          className="fixed bottom-4 right-4 bg-white border shadow-lg w-80 rounded-md p-3 z-50"
        >
          <div className="font-bold mb-1 text-yellow-700">💬 Chat</div>
          <div className="h-40 overflow-y-auto border p-2 mb-2 bg-gray-50 text-sm">
            {chatLog.map((msg, i) => (
              <div
                key={i}
                className={`mb-1 ${
                  msg.sender === 'me' ? 'text-right text-red-600' : 'text-left text-yellow-700'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex gap-1">
            <input
              className="border p-1 w-full"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type..."
            />
            <button
              onClick={sendMessage}
              className="bg-yellow-600 text-white px-2 rounded"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
