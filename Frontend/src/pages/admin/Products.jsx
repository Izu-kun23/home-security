import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchProducts, fetchCategories } from '../../../../Server/fire'; // Adjust the import path as needed

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);  // To store categories
  const [loading, setLoading] = useState(true);

  // Fetch categories and products on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);  // Save categories to state

        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);  // Save products to state
        setLoading(false);  // Stop loading when products are fetched
      } catch (error) {
        console.error("Failed to load products or categories", error);
        setLoading(false);  // Stop loading in case of error
      }
    };

    loadData();
  }, []); // Empty dependency array means this will run only once when the component mounts

  const handleAddProduct = () => {
    navigate('/admin/add-products');
  };

  // Function to get category name based on categoryId
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Uncategorized';  // Return 'Uncategorized' if no category found
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 pt-20">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">Product List</h1>

        <div className="bg-white shadow-lg rounded-lg p-8 space-y-4 min-h-[200px] flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product List</h2>
          <p className="text-gray-600 mb-6">Below is the list of all available products with their details:</p>

          {loading ? (
            <div className="flex justify-center items-center h-32">
              <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            </div>
          ) : (
            <AnimatePresence>
              <motion.div
                key="product-table"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                {products.length === 0 ? (
                  <p className="text-gray-600 text-center">No products available.</p>
                ) : (
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr className="bg-gray-100 border-b">
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">SN</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Name</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Image</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Category</th> 
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Price</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Description</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Stock Availability</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product, index) => (
                        <tr key={product.id} className="border-b">
                          <td className="py-3 px-4 text-sm text-gray-600">{index + 1}</td>
                          
                          <td className="py-3 px-4 text-sm text-gray-600">{product.name}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {/* Display the product image */}
                            <img
                              src={product.image || 'https://via.placeholder.com/150'}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">{getCategoryName(product.categoryId)}</td>  {/* Fetch and display category name */}
                          <td className="py-3 px-4 text-sm text-gray-600">${product.price}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{product.description}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            <span
                              className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                                product.stock === 'In Stock'
                                  ? 'bg-green-200 text-green-800'
                                  : 'bg-red-200 text-red-800'
                              }`}
                            >
                              {product.stock}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

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