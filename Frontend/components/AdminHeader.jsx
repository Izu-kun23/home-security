import React, { useState } from "react"; // Ensure useState is imported
import { useNavigate } from "react-router-dom";
import HamburgerIcon from "../src/assets/hamburger.svg"; // Adjust path if necessary

const AdminHeader = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for the search input
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="bg-black text-white py-1 pb-1 fixed top-0 left-[250px] right-0 z-10 shadow-lg ">
      <div className="flex justify-between items-center h-20 px-10">
        {/* Logo */}
        <div className="flex items-center gap-4 ">
          
        </div>

        {/* Search Bar */}
        <div className="flex items-center bg-gray-800 p-2 rounded-xl w-1/3">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="bg-transparent text-white placeholder-gray-400 outline-none w-full pl-5"
          />
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition duration-300 shadow-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminHeader;