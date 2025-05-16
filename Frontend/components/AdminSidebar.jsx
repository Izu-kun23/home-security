import React from "react";
import { NavLink, Link } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiBox,
  FiSettings,
  FiArrowLeft,
  FiInbox
} from "react-icons/fi";
import { motion } from "framer-motion";
import Homelogo from "../src/assets/Homelogo.png"; // Adjust the path if needed

const AdminSidebar = () => {
  const baseLink =
    "flex items-center gap-3 px-4 py-3 rounded font-bold transition duration-300 ease-in-out";
  const activeStyle = "bg-gradient-to-r from-white text-black";
  const hoverStyle = "hover:bg-gradient-to-r hover:from-white hover:text-black";

  const sidebarVariants = {
    hidden: { x: -200, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.aside
      className="fixed top-0 left-0 w-65 bg-black text-white h-screen shadow-md p-2 flex flex-col z-50"
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col flex-grow">
        {/* Logo */}
        <motion.div
          className="relative h-[70px] flex justify-center items-center overflow-hidden mb-9"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <img
            src={Homelogo}
            alt="logo"
            className="w-[210px] object-contain"
          />
        </motion.div>

        {/* Navigation */}
        <nav className="flex flex-col gap-8 flex-grow overflow-y-auto">
          {[
            { to: "/admin-dashboard", icon: FiHome, label: "Dashboard" },
            { to: "/admin/products", icon: FiBox, label: "Products" },
            { to: "/admin/category", icon: FiInbox, label: "Categories" },
            { to: "/admin-dashboard/users", icon: FiUsers, label: "Users" },
            { to: "/admin-dashboard/settings", icon: FiSettings, label: "Settings" }
          ].map(({ to, icon: Icon, label }, i) => (
            <motion.div
              key={to}
              // whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `${baseLink} ${isActive ? activeStyle : ""} ${hoverStyle}`
                }
              >
                <Icon className="text-xl" />
                {label}
              </NavLink>
            </motion.div>
          ))}
        </nav>
      </div>

      {/* Back to Website Button */}
      <motion.div
        className="mt-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Link
          to="/"
          className="flex items-center justify-center gap-3 bg-white text-black px-4 py-4 rounded font-bold hover:bg-gradient-to-r hover:from-purple-400 hover:via-pink-500 hover:to-red-500 hover:text-black transition"
        >
          <FiArrowLeft />
          Back to Website
        </Link>
      </motion.div>
    </motion.aside>
  );
};

export default AdminSidebar;