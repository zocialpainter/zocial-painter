// src/components/ServicesSection.jsx

export default function ServicesSection() {
  return (
    <section className="py-12 px-4 bg-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">🔧 Zocial Services</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-2">👨‍🎨 Hire a Wall Painter</h3>
            <p>Find nearby painters around you and check their contact info or chat directly.</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-2">🏪 Paint Shops</h3>
            <p>View paint shops near you with offers, photos, and direct map links.</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-2">🎨 Wall Recolor Preview</h3>
            <p>Upload a photo of your room and see how different colors look before painting.</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-2">🛵 Painters on Wheels</h3>
            <p>Track available mobile painters driving around your area in real-time.</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-2">🙋 Request a Painter</h3>
            <p>Send your GPS location to request painter help. Painters will see your 🙋 marker.</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-2">🔧 Plumbing Services</h3>
            <p>Add or find plumbers on the map and chat directly with available ones.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
