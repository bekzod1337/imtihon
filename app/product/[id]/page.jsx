"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, Sun, Moon } from "lucide-react";
import Header from "@/app/components/Header"; // Header componentini import qildim

const getProduct = async (id) => {
  try {
    const res = await fetch(`/json/product.json`, { cache: "no-store" });

    if (!res.ok) throw new Error("Mahsulotlar yuklanmadi");
    const products = await res.json();
    return products.find((product) => product.id === parseInt(id)) || null;
  } catch (error) {
    console.error("Mahsulot yuklanmadi:", error);
    return null;
  }
};

export default function ProductPage({ params }) {
  const [product, setProduct] = useState(null);
  const [liked, setLiked] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await getProduct(params.id);
      setProduct(productData);

      const likedProducts = JSON.parse(localStorage.getItem("liked")) || [];
      setLiked(likedProducts.includes(params.id));
    };

    fetchProduct();

    // Dark mode ni localStorage orqali o'qish
    setDarkMode(localStorage.getItem("theme") === "dark");
  }, [params.id]);

  const toggleLike = () => {
    let likedProducts = JSON.parse(localStorage.getItem("liked")) || [];

    if (liked) {
      likedProducts = likedProducts.filter((id) => id !== params.id);
    } else {
      likedProducts.push(params.id);
    }

    localStorage.setItem("liked", JSON.stringify(likedProducts));
    setLiked(!liked);
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-3xl font-bold text-red-500">Mahsulot topilmadi</h1>
      </div>
    );
  }

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <Header />

      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <button
          onClick={toggleDarkMode}
          className="absolute top-5 right-5 p-2 rounded-full bg-gray-200 dark:bg-gray-700 shadow-md"
        >
          {darkMode ? <Sun size={24} className="text-yellow-500" /> : <Moon size={24} className="text-gray-700" />}
        </button>

        <div className="max-w-3xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">{product.name}</h1>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-full md:w-1/2">
              <Image
                src={product.img}
                alt={product.name}
                width={500}
                height={400}
                className="rounded-lg shadow-lg object-cover"
              />
            </div>

            <div className="w-full md:w-1/2 text-center">
              <p className="text-gray-600 dark:text-gray-300 text-lg">{product.description}</p>
              <p className="text-2xl font-semibold text-blue-500 mt-4">${product.price}</p>

              {product.discount > 0 && (
                <p className="text-lg text-red-500 font-semibold mt-2">
                  Chegirma: {product.discount}% off!
                </p>
              )}

              <div className="flex justify-center items-center mt-4">
                <button onClick={toggleLike} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Heart
                    size={30}
                    className={`transition ${
                      liked ? "text-red-500" : "text-gray-400"
                    }`}
                  />
                  <span>{liked ? "Sevimlilarga qo‘shildi" : "Sevimlilarga qo‘shish"}</span>
                </button>
              </div>

              <button className="mt-6 w-full py-3 text-white bg-blue-600 hover:bg-blue-700 transition rounded-lg shadow-md">
                Savatga qo'shish
              </button>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Mahsulot tafsilotlari</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300 leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
