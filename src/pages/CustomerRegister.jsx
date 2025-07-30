import React, { useState } from 'react';

export default function CustomerRegister() {
  const [language, setLanguage] = useState('nepali');

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      {/* Language Switch */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setLanguage('nepali')}
          className={`px-3 py-1 rounded-l ${
            language === 'nepali' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          नेपाली
        </button>
        <button
          onClick={() => setLanguage('english')}
          className={`px-3 py-1 rounded-r ${
            language === 'english' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          English
        </button>
      </div>

      {/* Testimonial Box */}
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 mb-6 rounded">
        {language === 'nepali' ? (
          <p>
            🧡 "Zocial Painter मार्फत मैले केही मिनेटमै राम्रो पेन्टर भेटें!
            सजिलो, छिटो र भरपर्दो सेवा!" – <strong>सन्तोष, भक्तपुर</strong>
          </p>
        ) : (
          <p>
            🧡 "I found a great painter within minutes through Zocial Painter!
            Easy, fast, and reliable!" – <strong>Santosh, Bhaktapur</strong>
          </p>
        )}
      </div>

      {/* Embedded Google Form */}
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLScTdUGXNn_A9pMlBMIFcKYACj5EllVTne8fPMiIXIhb2QgI4Q/viewform?embedded=true"
        width="100%"
        height="2000"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        title="Customer Registration Form"
      >
        Loading…
      </iframe>
    </div>
  );
}
