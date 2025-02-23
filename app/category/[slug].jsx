"use client";
import { useParams } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductList from "../../components/ProductList";
import { allProducts } from "../../data/products"; 

export default function CategoryPage() {
  const { slug } = useParams(); 
  const categoryNames = {
    bestseller: "🔥 Eng ko‘p sotilgan mahsulotlar",
    new: "🆕 Yangi mahsulotlar",
    discount: "💰 Chegirmadagi mahsulotlar",
  };

  const filteredProducts = allProducts.filter((p) => p.category === slug);

  return (
    <div className="pt-28">
      <Header />
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold my-6">{categoryNames[slug] || "Mahsulotlar"}</h1>
        {filteredProducts.length > 0 ? (
          <ProductList products={filteredProducts} />
        ) : (
          <p className="text-gray-500">Bu kategoriya uchun mahsulotlar topilmadi.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
