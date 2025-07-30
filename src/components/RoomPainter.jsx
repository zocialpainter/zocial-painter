// src/components/RoomPainter.jsx
import React, { useRef, useState } from "react";
import { SketchPicker } from "react-color";

const RoomPainter = () => {
  const canvasRef = useRef(null);
  const [imageURL, setImageURL] = useState(null);
  const [color, setColor] = useState("#ffffff");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImageURL(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // "Paint" a 100px soft brush circle
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 50, 0, Math.PI * 2);
    ctx.fill();
  };

  const handleImageLoad = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const img = e.target;

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0, img.width, img.height);
  };

  return (
    <section id="roompainter" className="py-12 px-4 bg-gray-100">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2">🎨 Paint Your Room Digitally</h2>
        <p className="text-gray-700 mb-6">
          Upload your room photo, then tap on any wall to test wall paint colors.
          <br />
          आफ्नो कोठाको तस्बिर अपलोड गर्नुहोस् र रङहरू परीक्षण गर्नुहोस्।
        </p>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mb-6 block mx-auto"
        />

        <div className="mb-6 flex justify-center">
          <SketchPicker color={color} onChange={(c) => setColor(c.hex)} />
        </div>

        {imageURL && (
          <div className="overflow-auto border rounded shadow-lg inline-block">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="cursor-crosshair"
            />
            <img
              src={imageURL}
              alt="Uploaded room"
              onLoad={handleImageLoad}
              style={{ display: "none" }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default RoomPainter;
