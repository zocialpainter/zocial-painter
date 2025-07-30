import React from 'react';

export default function PainterBooking() {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2 text-center">
        🧾 चित्रकार बुकिंग फारम
      </h1>
      <div className="text-center mb-6">
        <p className="text-red-600 font-semibold text-lg">
          अनुभवी चित्रकार तुरुन्त बुक गर्नुहोस्!
        </p>
        <p className="text-sm text-gray-700">
          Fill this form and our painters will reach out to you. Fast, easy & free.
        </p>
      </div>
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSeHXcZAi7AxCw42vcSS9vrMiUzwmR9wmRUJDApanqABmqWRfg/viewform?embedded=true"
        width="100%"
        height="1200"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        title="Painter Booking Form"
      >
        Loading…
      </iframe>
    </div>
  );
}
