"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductList from "@/app/components/ProductList";
import Header from "@/app/components/Header";

const products = [
  { id: 1, name: "Mahsulot 1", category: "bestseller", price: 25, image: "/images/product1.jpg" },
  { id: 2, name: "Mahsulot 2", category: "bestseller", price: 40, image: "/images/product2.jpg" },
  { id: 3, name: "Mahsulot 3", category: "new", price: 30, image: "/images/product3.jpg" },
  { id: 4, name: "Mahsulot 4", category: "new", price: 35, image: "/images/product4.jpg" },
];

const CategoryPage = () => {
  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const result = products.filter((product) => product.category === category);
    setFilteredProducts(result);
  }, [category]);

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <Header /> 
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {category.toUpperCase()} Mahsulotlari
        </h1>
        <ProductList products={filteredProducts} onOrder={(product) => console.log("Buyurtma:", product)} />
      </div>
    </div>
  );
};

export default CategoryPage;
