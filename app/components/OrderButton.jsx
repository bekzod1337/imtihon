import { useState } from "react";

const OrderModal = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Buyurtma berish</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Buyurtma muvaffaqiyatli yuborildi!");
            onClose();
          }}
        >
          <input
            type="text"
            placeholder="Ismingiz"
            className="w-full p-2 mb-2 border rounded-lg focus:ring focus:ring-blue-300"
            required
          />
          <input
            type="tel"
            placeholder="Telefon raqamingiz"
            className="w-full p-2 mb-2 border rounded-lg focus:ring focus:ring-blue-300"
            required
          />
          <textarea
            placeholder="Buyurtma tafsilotlari"
            className="w-full p-2 mb-4 border rounded-lg focus:ring focus:ring-blue-300"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Yuborish
          </button>
        </form>
      </div>
    </div>
  );
};

const OrderButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex justify-center mt-4">
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        onClick={() => setIsModalOpen(true)}
      >
        Buyurtma berish
      </button>
      <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default OrderButton;
