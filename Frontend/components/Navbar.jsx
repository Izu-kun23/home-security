import React, { useState, useEffect } from "react";
import {
  FaChevronDown,
  FaCartPlus,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Server/utils/useAuth";
import {
  logoutUser,
  fetchCategories,
  fetchProductsByCategory,
} from "../../Server/fire";
import { useCart } from "../src/context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { cartCount } = useCart();

  const [userDropdownVisible, setUserDropdownVisible] = useState(false);
  const [shopDropdownVisible, setShopDropdownVisible] = useState(false);
  const [supportDropdownVisible, setSupportDropdownVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setMobileMenuOpen(false);
        setShopDropdownVisible(false);
        setSupportDropdownVisible(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setUserDropdownVisible(false);
    setMobileMenuOpen(false);
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
    "text-gray-300 hover:text-white font-semibold px-4 py-2 rounded transition";

  if (loading) return null;

  return (
    <nav className="bg-black text-gray-300 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center h-16">
          {/* Left Section: Cart and Hamburger */}
          <div className="flex items-center justify-between w-full sm:w-auto">
            <button
              onClick={() => {
                navigate("/cart");
                setMobileMenuOpen(false);
              }}
              aria-label="Go to Cart"
              className="relative text-gray-300 hover:text-white text-3xl"
            >
              <FaCartPlus />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden text-gray-300 hover:text-white text-3xl focus:outline-none"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Navigation Links */}
          <div
            className={`${
              mobileMenuOpen ? "flex flex-col mt-4 space-y-3" : "hidden"
            } sm:flex sm:flex-row sm:space-x-6 sm:mt-0 sm:space-y-0 items-center w-full sm:w-auto`}
          >
            {/* Shop Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => !mobileMenuOpen && setShopDropdownVisible(true)}
              onMouseLeave={() => !mobileMenuOpen && setShopDropdownVisible(false)}
            >
              <div
                onClick={() => {
                  if (mobileMenuOpen) {
                    setShopDropdownVisible(!shopDropdownVisible);
                  } else {
                    navigate("/all-products");
                    setMobileMenuOpen(false);
                  }
                }}
                className={`${navLinkStyle} flex items-center cursor-pointer select-none`}
              >
                Shop <FaChevronDown className="ml-1 text-xs" />
              </div>

              {shopDropdownVisible && (
                <div
                  className={`${
                    mobileMenuOpen
                      ? "relative bg-black text-gray-300 mt-2 rounded"
                      : "absolute bg-white text-black mt-2 rounded shadow-lg w-64"
                  } p-4 z-50 max-h-60 overflow-y-auto`}
                >
                  {/* Categories */}
                  <div className="mb-3 border-b border-gray-500 pb-2">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        onClick={() => handleCategoryHover(category.id)}
                        className={`flex items-center cursor-pointer px-2 py-1 rounded hover:bg-gray-200 ${
                          activeCategoryId === category.id
                            ? mobileMenuOpen
                              ? "bg-gray-700"
                              : "bg-gray-300"
                            : ""
                        }`}
                      >
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-7 h-7 object-cover rounded-full mr-2"
                        />
                        <span className={mobileMenuOpen ? "text-gray-300" : "text-black"}>
                          {category.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Products */}
                  <div>
                    {categoryProducts.length > 0 ? (
                      <ul className={`${mobileMenuOpen ? "text-gray-300" : "text-black"} space-y-1 max-h-48 overflow-y-auto`}>
                        {categoryProducts.map((product) => (
                          <li key={product.id}>
                            <a
                              href={`/product/${product.id}`}
                              className={`block px-2 py-1 rounded hover:bg-gray-300 ${
                                mobileMenuOpen ? "hover:bg-gray-700" : ""
                              }`}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {product.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className={mobileMenuOpen ? "text-gray-400" : "text-gray-600"}>
                        Select a category to see products.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <a
              href="/solutions"
              className={navLinkStyle}
              onClick={() => setMobileMenuOpen(false)}
            >
              Solutions
            </a>

            {/* Support Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => !mobileMenuOpen && setSupportDropdownVisible(true)}
              onMouseLeave={() => !mobileMenuOpen && setSupportDropdownVisible(false)}
            >
              <div
                onClick={() =>
                  mobileMenuOpen && setSupportDropdownVisible(!supportDropdownVisible)
                }
                className={`${navLinkStyle} flex items-center cursor-pointer select-none`}
              >
                Support <FaChevronDown className="ml-1 text-xs" />
              </div>

              {supportDropdownVisible && (
                <div
                  className={`${
                    mobileMenuOpen
                      ? "relative bg-black text-gray-300 mt-2 rounded"
                      : "absolute bg-white text-black mt-2 rounded shadow-lg w-48"
                  } p-4 z-50`}
                >
                  <a
                    href="/support/how-it-works"
                    className={`block px-3 py-2 rounded hover:bg-gray-300 ${
                      mobileMenuOpen ? "hover:bg-gray-700" : ""
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    How It Works
                  </a>
                  <a
                    href="/support/faqs"
                    className={`block px-3 py-2 rounded hover:bg-gray-300 ${
                      mobileMenuOpen ? "hover:bg-gray-700" : ""
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    FAQs
                  </a>
                </div>
              )}
            </div>

            <a
              href="/about-us"
              className={navLinkStyle}
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </a>
            <a
              href="/build"
              className={navLinkStyle}
              onClick={() => setMobileMenuOpen(false)}
            >
              Build Your System
            </a>
            <a
              href="/quote"
              className={navLinkStyle}
              onClick={() => setMobileMenuOpen(false)}
            >
              Get a Quote
            </a>
          </div>

          {/* User Section */}
          <div className="mt-4 sm:mt-0 relative">
            {user ? (
              <>
                <button
                  onClick={() => setUserDropdownVisible(!userDropdownVisible)}
                  className="text-gray-300 hover:text-white text-lg font-semibold px-5 py-3 flex items-center rounded select-none focus:outline-none focus:ring-2 focus:ring-white"
                >
                  {user.fullName || user.email}
                  <FaChevronDown
                    className={`ml-2 transition-transform duration-200 ${
                      userDropdownVisible ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {userDropdownVisible && (
                  <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-md z-50">
                    {user.email === "izuchukwuonuoha6@gmail.com" && (
                      <a
                        href="/admin-dashboard"
                        className="block px-4 py-2 hover:bg-gray-200"
                        onClick={() => setUserDropdownVisible(false)}
                      >
                        Admin Dashboard
                      </a>
                    )}
                    <button
                      onClick={() => {
                        handleLogout();
                        setUserDropdownVisible(false);
                      }}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  setMobileMenuOpen(false);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded select-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;