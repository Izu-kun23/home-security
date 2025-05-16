import React, { useState, useEffect } from "react";
import { FaSearch, FaChevronDown, FaCartPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../Server/utils/useAuth";
import {
  logoutUser,
  fetchCategories,
  fetchProductsByCategory,
} from "../../Server/fire";
import { useCart } from "../src/context/CartContext"; // Import the Cart Context hook

const dropdownVariants = {
  hidden: { opacity: 0, y: -20, scale: 0.95, height: 0 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    height: "auto",
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    height: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const Navbar = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { cartCount } = useCart(); // Access the cart count from CartContext

  const [userDropdownVisible, setUserDropdownVisible] = useState(false);
  const [shopDropdownVisible, setShopDropdownVisible] = useState(false);
  const [supportDropdownVisible, setSupportDropdownVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
        if (data.length > 0) {
          setActiveCategoryId(data[0].id);
          const products = await fetchProductsByCategory(data[0].id);
          setCategoryProducts(products);
        }
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };
    loadCategories();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setUserDropdownVisible(false);
  };

  const handleCategoryHover = async (categoryId) => {
    setActiveCategoryId(categoryId);
    try {
      const products = await fetchProductsByCategory(categoryId);
      setCategoryProducts(products);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  const navLinkStyle =
    "text-gray-400 hover:text-white text-lg font-bold px-6 py-4 transition-colors duration-200";

  if (loading) return null;

  return (
    <nav className="w-full bg-black shadow-md px-8 py-3 flex justify-between items-center z-50 relative">
      {/* Left */}
      <div className="flex items-center gap-6">
        <button
          onClick={() => navigate("/cart")}
          className="text-gray-400 hover:text-white text-3xl pl-3 relative"
        >
          <FaCartPlus />
          {/* Display cart count badge */}
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Center */}
      <div className="flex-grow flex justify-center gap-6 text-md font-medium text-gray-400">
        {/* Shop */}
        <div
          className="relative"
          onMouseEnter={() => setShopDropdownVisible(true)}
          onMouseLeave={() => setShopDropdownVisible(false)}
        >
          <div
            onClick={() => {
              setShopDropdownVisible(false);
              navigate("/all-products");
            }}
            className={`${navLinkStyle} cursor-pointer flex items-center`}
          >
            Shop <FaChevronDown className="inline-block ml-1 text-xs" />
          </div>

          <AnimatePresence>
            {shopDropdownVisible && (
              <motion.div
                className="absolute left-[-282px] top-full bg-white text-black shadow-lg w-screen overflow-hidden rounded-b-lg z-40"
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="flex flex-col p-6">
                  {/* Category Row */}
                  <div
                    className={`flex overflow-x-auto gap-7 border-b pb-2 mb-2 ${
                      categories.length <= 7 ? "justify-center" : ""
                    }`}
                  >
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        onMouseEnter={() => handleCategoryHover(category.id)}
                        className={`flex flex-col items-center cursor-pointer px-4 py-2 rounded hover:bg-gray-100 transition ${
                          activeCategoryId === category.id ? "bg-gray-100" : ""
                        }`}
                      >
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-12 h-12 object-cover rounded-full mb-1"
                        />
                        <span className="text-sm text-center text-gray-800 font-medium">
                          {category.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Products */}
                  <div>
                    {categoryProducts.length > 0 ? (
                      <ul className="flex gap-6 overflow-x-auto">
                        {categoryProducts.map((product, index) => (
                          <li
                            key={product.id}
                            className="min-w-[200px] flex flex-col items-center transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                          >
                            <a href={`/product/${product.id}`} className="mb-2">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-[200px] h-auto object-cover rounded"
                              />
                            </a>
                            <a
                              href={`/product/${product.id}`}
                              className="text-sm font-medium text-gray-700 text-center hover:underline"
                            >
                              {product.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500 mt-2">
                        Hover a category to view products.
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <a href="/solutions" className={navLinkStyle}>Solutions</a>

        {/* Support */}
        <div
          className="relative"
          onMouseEnter={() => setSupportDropdownVisible(true)}
          onMouseLeave={() => setSupportDropdownVisible(false)}
        >
          <div className={`${navLinkStyle} cursor-pointer flex items-center`}>
            Support <FaChevronDown className="inline-block ml-1 text-xs" />
          </div>

          <AnimatePresence>
            {supportDropdownVisible && (
              <motion.div
                className="absolute left-[-572px] top-full bg-white text-black shadow-lg w-screen overflow-hidden rounded-b-lg z-40"
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="flex flex-col p-6">
                  <div className="flex justify-center gap-10">
                    <a
                      href="/support/how-it-works"
                      className="flex flex-col items-center cursor-pointer px-4 py-2 rounded hover:bg-gray-100 transition text-center"
                    >
                      <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full mb-2 text-sm font-bold text-gray-700">
                        ?
                      </div>
                      <span className="text-sm text-gray-800 font-medium">
                        How It Works
                      </span>
                    </a>
                    <a
                      href="/support/faqs"
                      className="flex flex-col items-center cursor-pointer px-4 py-2 rounded hover:bg-gray-100 transition text-center"
                    >
                      <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full mb-2 text-sm font-bold text-gray-700">
                        FAQ
                      </div>
                      <span className="text-sm text-gray-800 font-medium">FAQs</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <a href="/about-us" className={navLinkStyle}>About Us</a>
        <a href="/build" className={navLinkStyle}>Build Your System</a>
        <a href="/quote" className={navLinkStyle}>Get a Quote</a>
      </div>

      {/* Right */}
      {user ? (
        <div className="relative">
          <button
            onClick={() => setUserDropdownVisible(!userDropdownVisible)}
            className="text-gray-400 hover:text-white text-lg font-bold px-5 py-3 transition-colors duration-200 flex items-center"
          >
            {user.fullName || user.email}
            <FaChevronDown
              className={`ml-2 transition-transform duration-200 ${
                userDropdownVisible ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {userDropdownVisible && (
              <motion.div
                className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {user.email === "izuchukwuonuoha6@gmail.com" && (
                  <a
                    href="/admin-dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Admin Dashboard
                  </a>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>
      )}
    </nav>
  );
};

export default Navbar;