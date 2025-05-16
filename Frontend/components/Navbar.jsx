import React, { useState, useEffect } from "react";
import {
  FaSearch,
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
    "text-gray-400 hover:text-white ml-[-30px] text-lg font-bold px-8 py-4  transition-colors duration-200 block ";

  if (loading) return null;

  return (
    <nav className="w-full bg-black shadow-md px-4 py-3 z-50 relative">
      {/* Responsive container wrapper */}
      <div className="mx-auto max-w-md md:max-w-2xl lg:max-w-5xl flex flex-col sm:flex-row justify-between items-center">
        {/* Top Bar: Cart and Hamburger */}
        <div className="flex justify-between items-center w-full sm:w-auto">
          <button
            onClick={() => navigate("/cart")}
            className="text-gray-400 hover:text-white text-3xl pl-3 relative ml-[-210px]"
            aria-label="Cart"
          >
            <FaCartPlus />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-400 hover:text-white text-3xl sm:hidden focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            mobileMenuOpen ? "flex flex-col mt-6 space-y-4" : "hidden"
          } sm:flex sm:flex-row sm:space-x-8 sm:mt-4 sm:space-y-0 items-center w-full sm:w-auto relative`}
        >
          {/* Shop */}
          <div
            className="relative"
            onMouseEnter={() => !mobileMenuOpen && setShopDropdownVisible(true)}
            onMouseLeave={() =>
              !mobileMenuOpen && setShopDropdownVisible(false)
            }
          >
            <div
              onClick={() => {
                if (mobileMenuOpen) {
                  setShopDropdownVisible(!shopDropdownVisible);
                } else {
                  navigate("/all-products");
                }
              }}
              className={`${navLinkStyle} cursor-pointer flex items-center select-none`}
            >
              Shop <FaChevronDown className="inline-block ml-1 text-xs" />
            </div>

            {shopDropdownVisible && (
              <div
                className={`${
                  mobileMenuOpen
                    ? "static bg-black text-white"
                    : "absolute bg-white text-black"
                } shadow-md w-full sm:w-64 rounded-b-md z-40 p-4`}
              >
                <div className="flex flex-col gap-2 border-b pb-2 mb-2 max-h-40 overflow-y-auto">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      onClick={() => handleCategoryHover(category.id)}
                      className={`flex items-center cursor-pointer px-2 py-1 rounded hover:bg-gray-100 ${
                        activeCategoryId === category.id ? "bg-gray-100" : ""
                      }`}
                    >
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-8 h-8 object-cover rounded-full mr-2"
                      />
                      <span
                        className={`text-sm font-medium ${
                          mobileMenuOpen ? "text-gray-500" : "text-gray-800"
                        }`}
                      >
                        {category.name}
                      </span>
                    </div>
                  ))}
                </div>

                <div>
                  {categoryProducts.length > 0 ? (
                    <ul className="flex flex-col gap-2 max-h-40 overflow-y-auto">
                      {categoryProducts.map((product) => (
                        <li
                          key={product.id}
                          className={`text-sm hover:underline cursor-pointer ${
                            mobileMenuOpen
                              ? "text-white hover:text-gray-300"
                              : "text-gray-700"
                          }`}
                        >
                          <a href={`/product/${product.id}`}>{product.name}</a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 mt-2">
                      Select a category to see products.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          <a href="/solutions" className={navLinkStyle}>
            Solutions
          </a>

          {/* Support */}
          <div
            className="relative"
            onMouseEnter={() =>
              !mobileMenuOpen && setSupportDropdownVisible(true)
            }
            onMouseLeave={() =>
              !mobileMenuOpen && setSupportDropdownVisible(false)
            }
          >
            <div
              onClick={() =>
                mobileMenuOpen &&
                setSupportDropdownVisible(!supportDropdownVisible)
              }
              className={`${navLinkStyle} cursor-pointer flex items-center select-none`}
            >
              Support <FaChevronDown className="inline-block ml-1 text-xs" />
            </div>

            {supportDropdownVisible && (
              <div
                className={`${
                  mobileMenuOpen
                    ? "static bg-black text-white"
                    : "absolute bg-white text-black"
                } shadow-md w-full sm:w-48 rounded-b-md z-40 p-4`}
              >
                <a
                  href="/support/how-it-works"
                  className="block px-3 py-2 rounded hover:bg-gray-100 text-sm text-gray-500"
                >
                  How It Works
                </a>
                <a
                  href="/support/faqs"
                  className="block px-3 py-2 rounded hover:bg-gray-100 text-sm text-gray-500"
                >
                  FAQs
                </a>
              </div>
            )}
          </div>

          <a href="/about-us" className={`${navLinkStyle} whitespace-nowrap`}>
            About Us
          </a>
          <a href="/build" className={`${navLinkStyle} whitespace-nowrap`}>
            Build Your System
          </a>
          <a href="/quote" className={`${navLinkStyle} whitespace-nowrap`}>
            Get a Quote
          </a>
        </div>

        {/* User Login / Dropdown */}
       <div className="mt-4 sm:mt-3 flex items-center pl-15">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownVisible(!userDropdownVisible)}
                className="text-gray-400 hover:text-white text-lg font-bold px-5 py-3 transition-colors duration-200 flex items-center select-none"
              >
                {user.fullName || user.email}
                <FaChevronDown
                  className={`ml-2 transition-transform duration-200 ${
                    userDropdownVisible ? "rotate-180" : ""
                  }`}
                />
              </button>

              {userDropdownVisible && (
                <div className="absolute right-1 mt-2 w-40 bg-white border  border-gray-200 rounded shadow-md z-10 ">
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
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition select-none left-20"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
