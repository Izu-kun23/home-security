import React from "react";
import { NavLink, Link } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiBox,
  FiSettings,
  FiArrowLeft,
} from "react-icons/fi";
import secureLogo from "../src/assets/secure.png"; // Adjust path if necessary

const AdminSidebar = () => {
  const baseLink =
    "flex items-center gap-3 px-4 py-3 rounded font-bold transition duration-300 ease-in-out";
  const activeStyle = "bg-gradient-to-r from-white text-black";
  const hoverStyle = "hover:bg-gradient-to-r hover:from-white hover:text-black";

  return (
    <aside className="fixed top-0 left-0 w-64 bg-black text-white h-screen shadow-md p-4 flex flex-col">
      <div className="flex flex-col flex-grow">
        {/* Logo at the top */}
        <div className="relative h-[70px] flex justify-center items-center overflow-hidden mb-9">
          <img
            src={secureLogo}
            alt="Security"
            className="w-[210px] object-contain"
          />
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-8 flex-grow overflow-y-auto">
          {/* Dashboard Link */}
          <NavLink
            to="/admin-dashboard"
            end
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeStyle : ""} ${hoverStyle}`
            }
          >
            <FiHome className="text-xl" />
            Dashboard
          </NavLink>

          {/* Users Link */}
          <NavLink
            to="/admin-dashboard/users"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeStyle : ""} ${hoverStyle}`
            }
          >
            <FiUsers className="text-xl" />
            Users
          </NavLink>

          {/* Products Link */}
          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeStyle : ""} ${hoverStyle}`
            }
          >
            <FiBox className="text-xl" />
            Products
          </NavLink>

          {/* Settings Link */}
          <NavLink
            to="/admin-dashboard/settings"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeStyle : ""} ${hoverStyle}`
            }
          >
            <FiSettings className="text-xl" />
            Settings
          </NavLink>
        </nav>
      </div>

      {/* Back to Website Button */}
      <div className="mt-auto">
        <Link
          to="/"
          className="flex items-center justify-center gap-3 bg-white text-black px-4 py-4 rounded font-bold hover:bg-gradient-to-r hover:from-purple-400 hover:via-pink-500 hover:to-red-500 hover:text-black transition"
        >
          <FiArrowLeft />
          Back to Website
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;