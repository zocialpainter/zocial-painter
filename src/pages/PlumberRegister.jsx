import React from 'react';

export default function PlumberRegister() {
  return (
    <div className="max-w-4xl mx-auto mt-16 p-6 bg-white rounded shadow-md border-4 border-yellow-400">
      <h2 className="text-3xl font-bold mb-6 text-center text-black">
        Plumber Registration
      </h2>
      <div className="overflow-hidden rounded-md shadow-lg border-2 border-green-600">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSfMcEgYIGMnLKIrGfWbTe5-6_km4kcSsQ6-zrw3LhKxGwe2Ng/viewform?embedded=true"
          title="Plumber Registration Form"
          width="100%"
          height="900"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          className="min-h-[900px] bg-white"
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
}
