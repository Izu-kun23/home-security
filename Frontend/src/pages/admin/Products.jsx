import React from 'react';
import { useNavigate } from 'react-router-dom'; // To navigate to another page

const Products = () => {
  // Sample product data to display
  const products = [
    { sn: '001', name: 'Product 1', price: 25.99, description: 'A high-quality product.', stock: 'In Stock' },
    { sn: '002', name: 'Product 2', price: 15.99, description: 'Affordable and reliable.', stock: 'Out of Stock' },
    { sn: '003', name: 'Product 3', price: 35.99, description: 'Premium product with great features.', stock: 'In Stock' },
  ];

  const navigate = useNavigate();

  const handleAddProduct = () => {
    // Navigate to the product creation page (you can set up this route separately)
    navigate('/admin/products/add'); // Example route for adding a product
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">Product List</h1>

        {/* Product List Section */}
        <div className="bg-white shadow-lg rounded-lg p-8 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product List</h2>
          <p className="text-gray-600 mb-6">Below is the list of all available products with their details:</p>

          {/* Product Table */}
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">SN</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Price</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Description</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Stock Availability</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.sn} className="border-b">
                  <td className="py-3 px-4 text-sm text-gray-600">{product.sn}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{product.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">${product.price}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{product.description}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                        product.stock === 'In Stock' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Product Button Below the Table */}
        <div className="mt-6 text-right">
          <button
            onClick={handleAddProduct}
            className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;