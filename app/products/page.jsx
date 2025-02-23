"use client";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";
import { DarkModeProvider } from "../context/DarkModeContext";

export default function ProductsPage() {
  const [category, setCategory] = useState("all"); 
  const [categories, setCategories] = useState([]); 
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/json/category.json"); // Mahalliy JSON
        if (!response.ok) throw new Error("Kategoriyalarni yuklashda xatolik!");
        
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error("Kategoriya yuklashda xatolik:", err.message);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch("/json/product.json"); // Mahalliy JSON
        if (!response.ok) throw new Error("Mahsulotlarni yuklashda xatolik!");

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  const filteredProducts =
    category === "all"
      ? products
      : products.filter((p) => p.category === category); // category_id emas, category ishlatilmoqda

  return (
    <DarkModeProvider>
      <div className="pt-28 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <Header />

        <div className="flex justify-center my-6">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 
                      text-gray-700 dark:text-gray-200 shadow-md focus:outline-none focus:ring-2 
                      focus:ring-blue-500 dark:focus:ring-blue-400 transition"
          >
            <option value="all">Barcha mahsulotlar</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}> 
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="px-6">
          {loading ? (
            <p className="text-center text-lg text-gray-600 dark:text-gray-300">Yuklanmoqda...</p>
          ) : error ? (
            <p className="text-center text-red-500">Xatolik: {error}</p>
          ) : filteredProducts.length > 0 ? (
            <ProductList products={filteredProducts} />
          ) : (
            <p className="text-center text-lg text-gray-600 dark:text-gray-300">Mahsulotlar topilmadi.</p>
          )}
        </div>

        <Footer />
      </div>
    </DarkModeProvider>
  );
}
