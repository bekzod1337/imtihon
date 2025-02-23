"use client";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useRouter } from "next/navigation"; 
import Header from "../components/Header";

const LikedPage = () => {
  const [liked, setLiked] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const savedLiked = JSON.parse(localStorage.getItem("liked")) || [];
    setLiked([...savedLiked]); 
  }, []);

  const removeFromLiked = (productId) => {
    const updatedLiked = liked.filter((p) => p.id !== productId);
    setLiked([...updatedLiked]); 
    localStorage.setItem("liked", JSON.stringify(updatedLiked)); 
  };

  return (
    <div className="container mx-auto py-8">
        <Header />
      <h1 className="text-2xl font-bold text-center mb-6">Yoqtirgan Mahsulotlar</h1>

      {liked.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600 mb-4">Hozircha yoqtirilgan mahsulot yo‘q.</p>
          <button
            onClick={() => router.push("/")} 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Bosh sahifaga qaytish
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={() => router.push("/")} 
            className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Bosh sahifaga qaytish
          </button>
          <div className="flex flex-wrap items-center justify-around gap-10">
            {liked.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOrder={() => console.log("Order", product)}
                updateLikedCount={() => setLiked([...JSON.parse(localStorage.getItem("liked")) || []])} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LikedPage;
