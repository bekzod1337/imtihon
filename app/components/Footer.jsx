import { FaFacebook, FaInstagram, FaTelegram } from "react-icons/fa";
import { useEffect, useState } from "react";

const Footer = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setDarkMode(localStorage.getItem("theme") === "dark");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <footer
      className={`py-6 text-center mt-10 transition-all dark:bg-gray-900 dark:text-white dark:border-t dark:border-gray-700 bg-gray-200 text-gray-900 border-t border-gray-400"
      }`}
    >
      <div className="container mx-auto">
        <h1 className="text-2xl font-semibold tracking-wide">BekMarket</h1>
        <p className={`mt-2 text-lg transition dark:text-gray-400 ${
          darkMode ? "text-gray-400" : "text-gray-700"
        }`}>
          Barcha xizmatlar qonuniy!
        </p>

        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className={`transition-all duration-300 dark:text-gray-400 dark:hover:text-blue-400 ${
            darkMode ? "text-gray-400 hover:text-blue-400" : "text-gray-700 hover:text-blue-600"
          }`}>
            <FaFacebook size={28} />
          </a>
          <a href="#" className={`transition-all duration-300 dark:text-gray-400 dark:hover:text-pink-400 ${
            darkMode ? "text-gray-400 hover:text-pink-400" : "text-gray-700 hover:text-pink-600"
          }`}>
            <FaInstagram size={28} />
          </a>
          <a href="#" className={`transition-all duration-300 ${
            darkMode ? "text-gray-400 hover:text-blue-300" : "text-gray-700 hover:text-blue-500"
          }`}>
            <FaTelegram size={28} />
          </a>
        </div>

        <p className="text-sm mt-6 transition text-gray-500">
          &copy; {new Date().getFullYear()} BekMarket. Barcha huquqlar himoyalangan.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
