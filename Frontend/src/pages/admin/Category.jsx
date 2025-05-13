import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCategories } from '../../../../Server/fire'; // Make sure path is correct

const Category = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories from Firestore on mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();  // Call the API to fetch categories
        setCategories(data);  // Set the fetched categories
      } catch (error) {
        console.error("Failed to fetch categories", error);
        alert("Failed to fetch categories.");
      } finally {
        setLoading(false);  // Set loading to false when done fetching
      }
    };

    loadCategories();  // Trigger the function to fetch categories
  }, []);

  // Handle delete action (just removes from UI for now)
  const handleDelete = (id) => {
    // This only removes it from the UI; you'd add Firestore delete logic here if needed
    setCategories(prev => prev.filter(category => category.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 pt-20">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">Smart Home Categories</h1>

        <div className="bg-white shadow-lg rounded-lg p-8 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Category List</h2>
          <p className="text-gray-600 mb-6">Below is the list of all available smart home categories:</p>

          {loading ? (
            <p>Loading categories...</p>
          ) : categories.length === 0 ? (
            <p className="text-gray-600">No categories available.</p>
          ) : (
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">SN</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Category Name</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Products Count</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Category Image</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={category.id} className="border-b">
                    <td className="py-3 px-4 text-sm text-gray-600">{index + 1}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{category.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{category.productCount || 0}</td>
                    <td className="py-3 px-4 text-center">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-12 h-12 object-cover rounded-full mx-auto"
                      />
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      <div className="flex gap-4">
                        <button className="text-blue-500 hover:text-blue-700 font-semibold">Edit</button>
                        <button
                          className="text-red-500 hover:text-red-700 font-semibold"
                          onClick={() => handleDelete(category.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={() => navigate('/admin/add-category')}
            className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300"
          >
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default Category;