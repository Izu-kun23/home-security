import React from "react";
import DashboardCard from "../../../components/DashCards";
import { FiUsers, FiBox, FiShoppingCart } from "react-icons/fi";

const Dashboard = () => {
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
          value="320"
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