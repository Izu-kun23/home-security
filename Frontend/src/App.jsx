import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Login from "./pages/client/Login";
import Register from "./pages/client/Register";
import Home from "./pages/client/Home";
import Dashboard from "./pages/admin/Dashboard";

import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import Products from "./pages/admin/Products";
import AddProducts from "./pages/admin/AddProducts";
import Category from "./pages/admin/Category";
import AddCategory from "./pages/admin/AddCategory";
import AllProducts from "./pages/client/AllProducts";

const AppLayout = () => {
  const location = useLocation();
  const path = location.pathname;

  const isAuthPage = path === "/login" || path === "/register";
  const isAdminPage = path.startsWith("/admin");

  return (
    <>
      {isAdminPage ? (
        <div className="flex min-h-screen bg-gray-100">
          <Sidebar />
          <main className="ml-64 flex-grow p-6">
            <AdminHeader title="Admin Dashboard" />
            <Routes>
              <Route path="/admin-dashboard" element={<Dashboard />} />
              <Route path="/admin/products" element={<Products />} />
              <Route path="/admin/category" element={<Category />} />
              <Route path="/admin/add-products" element={<AddProducts />} />
              <Route path="/admin/add-category" element={<AddCategory />} />
            </Routes>
          </main>
        </div>
      ) : (
        <div className="min-h-screen flex flex-col bg-gray-100">
          {!isAuthPage && <Header />}
          {!isAuthPage && <Navbar />}

          <div className={path === "/" ? "pt-0 flex-grow" : "flex-grow"}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/all-products" element={<AllProducts />} />
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