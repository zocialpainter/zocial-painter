import React, { useEffect } from 'react';

export default function PainterRegister() {
  useEffect(() => {
    window.location.href =
      'https://docs.google.com/forms/d/e/1FAIpQLSeG5GFM_0ea7fpgb_ZMB0NFZWYnPecO4hcO5dnXjNG_Dj88mg/viewform?usp=header';
  }, []);

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-2">
        👨‍🎨 चित्रकार दर्ता फारम
      </h1>
      <p className="text-red-600 font-semibold text-lg">
        काम खोज्दै हुनुहुन्छ? ग्राहकहरू तपाईंलाई खोज्दै छन्!
      </p>
      <p className="text-sm text-gray-700 mb-4">
        Fill this painter form and appear on the map — more visibility, more jobs!
      </p>
      <p>
        If the form doesn’t open, click{' '}
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSeG5GFM_0ea7fpgb_ZMB0NFZWYnPecO4hcO5dnXjNG_Dj88mg/viewform?usp=header"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          this link
        </a>
        .
      </p>
    </div>
  );
}
