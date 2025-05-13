import React, { useState, useEffect } from "react";
import DashboardCard from "../../../components/DashCards";
import { FiUsers, FiBox, FiShoppingCart } from "react-icons/fi";
import { fetchProductCount } from "../../../../Server/fire"; // Import your fetch function

const Dashboard = () => {
  const [productCount, setProductCount] = useState(0); // State to hold product count
  const [loading, setLoading] = useState(true); // Loading state to handle async fetch

  // Fetch the product count from Firestore
  useEffect(() => {
    const loadProductCount = async () => {
      try {
        const count = await fetchProductCount();
        setProductCount(count); // Set the product count in state
      } catch (error) {
        console.error("Failed to fetch product count", error);
      } finally {
        setLoading(false); // Stop loading after the data is fetched
      }
    };

    loadProductCount();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-9 mt-14">
        {/* Users Card */}
        <DashboardCard
          title="Users"
          value="1,200"
          percentage="11.2%"
          icon={FiUsers}
          color="text-green-600"
          bgColor="bg-green-100"
          hoverEffect="hover:shadow-lg hover:bg-green-200" // Added hover effect
        />
        
        {/* Products Card */}
        <DashboardCard
          title="Products"
          value={loading ? "Loading..." : productCount} // Show loading until the product count is fetched
          percentage="2.4%"
          icon={FiBox}
          color="text-blue-600"
          bgColor="bg-blue-100"
          hoverEffect="hover:shadow-lg hover:bg-blue-200" // Added hover effect
        />
        
        {/* Orders Card */}
        <DashboardCard
          title="Orders"
          value="98"
          percentage="5.9%"
          icon={FiShoppingCart}
          color="text-purple-600"
          bgColor="bg-purple-100"
          hoverEffect="hover:shadow-lg hover:bg-purple-200" // Added hover effect
        />
      </div>
    </div>
  );
};

export default Dashboard;