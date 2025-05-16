import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchProducts, fetchCategories } from '../../../../Server/fire';

// ✅ Framer Motion Loader Component
const Loader = () => (
  <div className="flex justify-center items-center h-64">
    <motion.div
      className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    />
  </div>
);

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);

        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to load products or categories", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleAddProduct = () => {
    navigate('/admin/add-products');
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Uncategorized';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 pt-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h1
          className="text-3xl font-semibold text-gray-800 mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Product List
        </motion.h1>

        <motion.div
          className="bg-white shadow-lg rounded-lg p-8 space-y-4 min-h-[200px] flex flex-col justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product List</h2>
          <p className="text-gray-600 mb-6">Below is the list of all available products with their details:</p>

          {loading ? (
            <Loader />
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
                            <img
                              src={product.image || 'https://via.placeholder.com/150'}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">{getCategoryName(product.categoryId)}</td>
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
        </motion.div>

        <motion.div
          className="mt-6 text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={handleAddProduct}
            className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300"
          >
            Add Product
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Products;