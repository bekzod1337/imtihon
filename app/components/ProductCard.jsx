"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart, Star } from "lucide-react";

const ProductCard = ({ product, onOrder, updateCartCount, updateLikedCount }) => {
  const [rating, setRating] = useState(0);
  const [cart, setCart] = useState([]);
  const [liked, setLiked] = useState([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
    setLiked(JSON.parse(localStorage.getItem("liked")) || []);
    setRating(JSON.parse(localStorage.getItem(`rating-${product.id}`)) || 0);
  }, [product.id]);

  const addToCart = () => {
    let updatedCart = cart.includes(product.id)
      ? cart.filter((id) => id !== product.id)
      : [...cart, product.id];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    updateCartCount(updatedCart.length);
  };

  const toggleLike = () => {
    let updatedLiked = liked.includes(product.id)
      ? liked.filter((id) => id !== product.id)
      : [...liked, product.id];

    localStorage.setItem("liked", JSON.stringify(updatedLiked));
    setLiked(updatedLiked);
    updateLikedCount(updatedLiked.length);
  };

  const handleRating = (star) => {
    setRating(star);
    localStorage.setItem(`rating-${product.id}`, JSON.stringify(star));
  };

  return (
    <div
      className="w-[18rem] min-h-[400px] flex flex-col border rounded-lg shadow-lg 
                 transition-transform duration-300 ease-out 
                 hover:translate-y-[-10px] hover:shadow-xl 
                 bg-white border-gray-200 text-gray-900 
                 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="w-full h-44 relative overflow-hidden rounded-t-lg">
          <Image
            src={product.img || "/images/default-product.jpg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 hover:scale-110 rounded-t-lg"
          />
        </div>
      </Link>

      <div className="flex flex-col flex-grow p-4">
        <Link href={`/product/${product.id}`} className="block">
          <h1 className="text-lg font-semibold text-center">{product.name}</h1>
        </Link>
        <p className="text-sm my-2 text-gray-700 dark:text-gray-300 line-clamp-2 text-center">
          {product.description || "Mahsulot tavsifi mavjud emas."}
        </p>
        <strong className="text-md text-gray-800 dark:text-gray-300 text-center">
          {product.price}$
        </strong>

        <div className="flex justify-center mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={20}
              className={`cursor-pointer transition ${
                star <= rating ? "text-yellow-500" : "text-gray-400"
              }`}
              onClick={() => handleRating(star)}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center px-4 pb-4">
        <button onClick={toggleLike}>
          <Heart
            size={22}
            className={`transition ${
              liked.includes(product.id) ? "text-red-500" : "text-gray-400"
            }`}
          />
        </button>

        <button onClick={addToCart}>
          <ShoppingCart size={22} className="text-gray-600 dark:text-gray-300 hover:text-gray-800 transition" />
        </button>
      </div>

      <button
        onClick={() => onOrder(product)}
        className="w-full py-2 rounded-b-lg transition-all duration-300 
                   bg-gray-900 text-white hover:bg-gray-700 
                   dark:bg-gray-700 dark:hover:bg-gray-600"
      >
        Shop Now
      </button>
    </div>
  );
};

export default ProductCard;
