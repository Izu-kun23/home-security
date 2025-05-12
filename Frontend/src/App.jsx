import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Login from "./pages/client/Login";
import Register from "./pages/client/Register";
import Home from "./pages/client/Home";

import Dashboard from "./pages/admin/Dashboard";

import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/AdminSidebar"; // Import Sidebar
import AdminHeader from "../components/AdminHeader"; // Import AdminHeader
import Products from "./pages/admin/Products";

const AppLayout = () => {
  const location = useLocation();
  const path = location.pathname;

  const isAuthPage = path === "/login" || path === "/register";
  const isAdminPage = path.startsWith("/admin"); // Update this to catch all admin routes

  return (
    <>
      {/* ADMIN LAYOUT */}
      {isAdminPage ? (
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar with fixed position */}
        <Sidebar />
        
        {/* Main content area */}
        <main className="ml-64 flex-grow p-6"> {/* Adding left margin for the fixed sidebar */}
          {/* Admin Header */}
          <AdminHeader title="Admin Dashboard" />
          
          {/* Admin routes */}
          <Routes>
            <Route path="/admin-dashboard" element={<Dashboard />} />
            {/* Add more admin routes as needed */}
            <Route path="/admin/products" element={<Products />} />
            {/* <Route path="/admin/users" element={<Users />} /> */}
          </Routes>
        </main>
      </div>
      ) : (
        // CLIENT LAYOUT
        <div className="min-h-screen flex flex-col bg-gray-100">
          {!isAuthPage && <Header />}
          {!isAuthPage && <Navbar />}

          <div className={path === "/" ? "pt-0 flex-grow" : "pt-10 flex-grow"}>
            {/* Client routes */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* Add more client routes if needed */}
            </Routes>
          </div>

          {!isAuthPage && <Footer />}
        </div>
      )}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

export default App;