"use client";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { MdFavorite, MdLogout } from "react-icons/md";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Logo } from "../images";
import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";

const Header = ({ products }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [likedCount, setLikedCount] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  const pathname = usePathname();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const likedItems = JSON.parse(localStorage.getItem("liked")) || [];
    setCartCount(cartItems.length);
    setLikedCount(likedItems.length);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts([]);
    } else {
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(results);
    }
  }, [searchQuery, products]);

  const navLinks = [
    { name: "Asosiy", path: "/" },
    { name: "Mahsulotlar", path: "/products" },
    { name: "Ma'lumot", path: "/about" },
    { name: "Bog'lanish", path: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-md px-6 md:px-16 py-4 flex items-center justify-between transition-all">
      <div className="flex items-center">
        <Link href="/">
          <Image src={Logo} alt="BekMarket Logo" width={50} height={50} className="cursor-pointer" />
        </Link>
      </div>

      <nav className="hidden md:flex space-x-6">
        {navLinks.map((link) => (
          <Link key={link.path} href={link.path} className={`relative transition hover:text-blue-600 dark:hover:text-gray-400 
            ${pathname === link.path ? "text-blue-600 dark:text-gray-400 font-semibold after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-blue-600 dark:after:bg-gray-400" : ""}`}>
            {link.name}
          </Link>
        ))}
      </nav>

      <div className="flex items-center space-x-4">
        <button
          className="text-xl hover:text-blue-600 dark:hover:text-gray-400"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          <FaSearch />
        </button>

        <Link href="/liked" className="relative text-xl hover:text-blue-600 dark:hover:text-gray-400">
          <MdFavorite />
          {likedCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
              {likedCount}
            </span>
          )}
        </Link>

        <Link href="/cart" className="relative text-xl hover:text-blue-600 dark:hover:text-gray-400">
          <FaShoppingCart />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>

        <div className="relative">
          <button 
            className="text-xl hover:text-blue-600 dark:hover:text-gray-400"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          >
            <FaUser />
          </button>

          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
              <Link href="/profile" className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                <FaUser className="mr-2" /> Profil
              </Link>
              <DarkModeToggle />
              <button className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                <MdLogout className="mr-2" /> Chiqish
              </button>
            </div>
          )}
        </div>
      </div>

      <button className="md:hidden text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <nav className={`md:hidden absolute left-0 top-full w-full bg-white dark:bg-gray-900 shadow-lg flex-col items-center text-center p-4 space-y-4 ${isMenuOpen ? "flex" : "hidden"}`}>
        {navLinks.map((link) => (
          <Link 
            key={link.path} 
            href={link.path} 
            className="block text-lg font-medium hover:text-blue-600 dark:hover:text-gray-400"
            onClick={() => setIsMenuOpen(false)} 
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
