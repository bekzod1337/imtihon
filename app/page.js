"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import { DarkModeProvider } from "./context/DarkModeContext";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/json/product.json");

        if (!response.ok) {
          throw new Error("Mahsulotlarni yuklashda xatolik!");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getProductsByCategory = (categoryName) => {
    return products.filter((p) => p.category.toLowerCase() === categoryName.toLowerCase());
  };

  return (
    <DarkModeProvider>
      <div className="pt-28 bg-gray-50 dark:bg-gray-900">
        <Header />

        {loading && <p className="text-center text-lg text-gray-600 dark:text-gray-300">Yuklanmoqda...</p>}
        {error && <p className="text-center text-red-500">Xatolik: {error}</p>}

        {!loading && !error && products.length > 0 && (
          <>
            <Section title="🔥 Eng ko‘p sotilgan mahsulotlar" link="/category/bestseller">
              <ProductList products={getProductsByCategory("bestseller")} onOrder={setSelectedProduct} />
            </Section>

            <Section title="🆕 Yangi mahsulotlar" link="/category/new">
              <ProductList products={getProductsByCategory("new")} onOrder={setSelectedProduct} />
            </Section>

            <Section title="💰 Chegirmadagi mahsulotlar" link="/category/discount">
              <ProductList products={products.filter((p) => p.discount > 0)} onOrder={setSelectedProduct} />
            </Section>
          </>
        )}

        <Footer />
      </div>
    </DarkModeProvider>
  );
}

const Section = ({ title, link, children }) => {
  return (
    <section className="my-10 px-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold uppercase text-gray-800 dark:text-gray-300 tracking-wide shadow-md">
          {title}
        </h2>
        <Link href={link} className="flex items-center gap-2 px-4 py-2 rounded-lg text-white 
          bg-gradient-to-r from-blue-500 to-blue-700 border border-blue-600 
          hover:from-blue-400 hover:to-blue-600 transition-all shadow-md 
          dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 
          dark:border-gray-700 dark:hover:from-gray-700">
          Ko'proq <ArrowRight size={18} />
        </Link>
      </div>
      {children}
    </section>
  );
};
