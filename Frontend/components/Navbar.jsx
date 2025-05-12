import React, { useState } from 'react';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Server/utils/useAuth';
import { logoutUser } from '../../Server/fire';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const [userDropdownVisible, setUserDropdownVisible] = useState(false);
  const [shopDropdownVisible, setShopDropdownVisible] = useState(false);
  const [supportDropdownVisible, setSupportDropdownVisible] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
    setUserDropdownVisible(false);
  };

  const navLinkStyle =
    'text-gray-400 hover:text-white text-lg font-bold px-6 py-4 transition-colors duration-200';

  if (loading) return null;

  return (
    <nav className="w-full bg-black shadow-md px-8 py-2 flex justify-between items-center">
      {/* Left Section */}
      <div className="flex items-center gap-6">
        <button className="text-gray-400 hover:text-white text-xl">
          <FaSearch />
        </button>
      </div>

      {/* Center Section (Nav Links) */}
      <div className="flex-grow flex justify-center gap-6 text-md font-medium text-gray-400">
        {/* Shop Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setShopDropdownVisible(true)}
          onMouseLeave={() => setShopDropdownVisible(false)}
        >
          <button className={navLinkStyle}>
            Shop <FaChevronDown className="inline-block ml-1 text-xs" />
          </button>
          {shopDropdownVisible && (
            <div className="absolute top-full left-0 bg-white text-black shadow-md rounded-md py-2 w-40 z-10">
              <a href="/products/cameras" className="block px-4 py-2 hover:bg-gray-100">
                Cameras
              </a>
              <a href="/products/alarms" className="block px-4 py-2 hover:bg-gray-100">
                Alarms
              </a>
              <a href="/products/access-control" className="block px-4 py-2 hover:bg-gray-100">
                Access Control
              </a>
              <a href="/products/all" className="block px-4 py-2 hover:bg-gray-100">
                All Products
              </a>
            </div>
          )}
        </div>

        <a href="/solutions" className={navLinkStyle}>
          Solutions
        </a>

        {/* Support Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setSupportDropdownVisible(true)}
          onMouseLeave={() => setSupportDropdownVisible(false)}
        >
          <button className={navLinkStyle}>
            Support <FaChevronDown className="inline-block ml-1 text-xs" />
          </button>
          {supportDropdownVisible && (
            <div className="absolute top-full left-0 bg-white text-black shadow-md rounded-md py-2 w-40 z-10">
              <a href="/support/how-it-works" className="block px-4 py-2 hover:bg-gray-100">
                How It Works
              </a>
              <a href="/support/faq" className="block px-4 py-2 hover:bg-gray-100">
                FAQs
              </a>
            </div>
          )}
        </div>

        <a href="/about" className={navLinkStyle}>
          About Us
        </a>
        <a href="/build" className={navLinkStyle}>
          Build Your System
        </a>
        <a href="/quote" className={navLinkStyle}>
          Get a Quote
        </a>
      </div>

      {/* Right Section */}
      {user ? (
        <div className="relative">
          <button
            onClick={() => setUserDropdownVisible(!userDropdownVisible)}
            className="text-gray-400 hover:text-white text-lg font-bold px-5 py-3 transition-colors duration-200 flex items-center"
          >
            {user.fullName || user.email}
            <FaChevronDown
              className={`ml-2 transition-transform duration-200 ${
                userDropdownVisible ? 'rotate-180' : ''
              }`}
            />
          </button>

          {userDropdownVisible && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-10">
              {user.email === 'izuchukwuonuoha6@gmail.com' && (
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
          onClick={() => navigate('/login')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>
      )}
    </nav>
  );
};

export default Navbar;