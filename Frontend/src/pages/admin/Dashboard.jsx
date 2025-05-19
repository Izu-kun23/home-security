import React, { useState, useEffect } from "react";
import DashboardCard from "../../../components/DashCards";
import { FiUsers, FiBox, FiShoppingCart } from "react-icons/fi";
import { fetchProductCount } from "../../../../Server/fire"; // Your fetch function

const Dashboard = () => {
  const [productCount, setProductCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Mock order data (replace this with actual fetch logic when needed)
  const mockOrders = [
    { id: "ORD-001", customer: "Jane Doe", total: "$299", status: "Shipped", date: "2024-05-01" },
    { id: "ORD-002", customer: "John Smith", total: "$120", status: "Pending", date: "2024-05-03" },
    { id: "ORD-003", customer: "Alice Johnson", total: "$560", status: "Delivered", date: "2024-05-05" },
  ];

  useEffect(() => {
    const loadProductCount = async () => {
      try {
        const count = await fetchProductCount();
        setProductCount(count);
      } catch (error) {
        console.error("Failed to fetch product count", error);
      } finally {
        setLoading(false);
      }
    };

    loadProductCount();
  }, []);

  return (
    <div className="p-6">
      {/* Dashboard Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-9 mt-4 pt-9">
        <DashboardCard
          title="Users"
          value="1,200"
          percentage="11.2%"
          icon={FiUsers}
          color="text-green-600"
          bgColor="bg-green-100"
          hoverEffect="hover:shadow-lg hover:bg-green-200"
        />
        <DashboardCard
          title="Products"
          value={loading ? "Loading..." : productCount}
          percentage="2.4%"
          icon={FiBox}
          color="text-blue-600"
          bgColor="bg-blue-100"
          hoverEffect="hover:shadow-lg hover:bg-blue-200"
        />
        <DashboardCard
          title="Orders"
          value="98"
          percentage="5.9%"
          icon={FiShoppingCart}
          color="text-purple-600"
          bgColor="bg-purple-100"
          hoverEffect="hover:shadow-lg hover:bg-purple-200"
        />
      </div>

      {/* Orders Table */}
      <div className="mt-14 bg-white shadow-md rounded-lg overflow-hidden ">
        <div className="p-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Total</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4">{order.total}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.status === "Shipped"
                          ? "bg-blue-100 text-blue-700"
                          : order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;