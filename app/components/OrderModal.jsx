"use client";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const OrderModal = ({ isOpen, product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [position, setPosition] = useState([41.2995, 69.2401]); 
  const [address, setAddress] = useState("Toshkent, O‘zbekiston");
  const [showAlert, setShowAlert] = useState(false);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        setAddress(`Lat: ${e.latlng.lat.toFixed(5)}, Lng: ${e.latlng.lng.toFixed(5)}`);
      },
    });

    return <Marker position={position} icon={markerIcon} />;
  }

  const totalPrice = product ? (product.price * quantity).toFixed(2) : "0.00";

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
      onClose();
    }, 2000);
  };

  useEffect(() => {
    if (!isOpen) setShowAlert(false);
  }, [isOpen]);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50 p-4">
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-full max-w-lg md:max-w-2xl rounded-lg shadow-lg overflow-hidden">
        
        <button
          className="absolute top-4 right-4 text-2xl text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="flex justify-center p-4 bg-gray-100 dark:bg-gray-700">
          <Image
            src={product.image}
            alt={product.name}
            width={250}
            height={250}
            className="w-full max-h-52 object-contain"
            unoptimized
          />
        </div>

        <div className="p-6">
          <h2 className="text-lg font-bold text-center">📦 Buyurtma qilish</h2>
          <p className="text-center text-gray-600 dark:text-gray-400">Siz tanlagan mahsulot: <strong>{product.name}</strong></p>

          <form className="flex flex-col gap-3 mt-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Ismingiz"
              className="border p-2 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
            <input
              type="text"
              placeholder="Telefon raqamingiz"
              className="border p-2 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />

            <p className="text-sm text-gray-500 dark:text-gray-400">📍 Xaritadan joy tanlang:</p>
            <div className="w-full h-40 rounded-md overflow-hidden border dark:border-gray-600">
              <MapContainer center={position} zoom={12} className="h-full w-full">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationMarker />
              </MapContainer>
            </div>
            <input
              type="text"
              value={address}
              readOnly
              className="border p-2 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />

            <div className="flex items-center justify-between border p-2 rounded-md dark:border-gray-600">
              <button
                type="button"
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                -
              </button>
              <span className="text-lg font-bold">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                +
              </button>
            </div>

            <h3 className="text-lg font-bold text-center">
              Umumiy narx: <span className="text-blue-600">${totalPrice}</span>
            </h3>

            <button
              type="submit"
              className="bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition"
            >
              ✅ Buyurtma berish
            </button>
          </form>
        </div>
      </div>

      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 50, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg z-50"
          >
            ✅ Buyurtmangiz qabul qilindi! Siz bilan tez orada bog‘lanamiz.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrderModal;
