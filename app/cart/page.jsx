"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa";
import OrderModal from "../components/OrderModal";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-20">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-300 mb-6">
        🛒 Savatcha
      </h1>

      {cartItems.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition hover:scale-105"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h3 className="mt-3 text-lg font-semibold text-gray-900 dark:text-gray-200">
                  {item.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-bold text-blue-600 dark:text-gray-300">
                    ${item.price} × {item.quantity}
                  </span>
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center gap-2 hover:bg-red-700 transition"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <FaTrashAlt /> O‘chirish
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-300">
              Umumiy narx: <span className="text-blue-600 dark:text-gray-300">${totalPrice}</span>
            </h2>
            <button
              className="mt-4 px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition"
              onClick={() => setSelectedProduct(cartItems)}
            >
              ✅ Buyurtma berish
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 text-xl">
          Savatcha bo‘sh.
        </p>
      )}

      <OrderModal
        isOpen={!!selectedProduct}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default CartPage;
