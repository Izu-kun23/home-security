import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCategories, editCategory } from '../../../../Server/fire';
import { motion, AnimatePresence } from 'framer-motion';

// Loader Component
const Loader = () => (
  <div className="flex justify-center items-center h-64">
    <motion.div
      className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    />
  </div>
);

const Category = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: "", description: "", image: "" });
  const [imageFile, setImageFile] = useState(null);
  const [visibility, setVisibility] = useState({});

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
        const initialVisibility = data.reduce((acc, category) => {
          acc[category.id] = true;
          return acc;
        }, {});
        setVisibility(initialVisibility);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  const handleEditClick = (category) => {
    setEditId(category.id);
    setEditData({
      name: category.name,
      description: category.description || "",
      image: category.image || "",
    });
    setImageFile(null);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditData({ name: "", description: "", image: "" });
    setImageFile(null);
  };

  const handleSave = async (id) => {
    try {
      await editCategory(id, editData, imageFile);
      const updatedCategories = categories.map(cat =>
        cat.id === id ? { ...cat, ...editData, image: imageFile ? URL.createObjectURL(imageFile) : editData.image } : cat
      );
      setCategories(updatedCategories);
      setEditId(null);
      setImageFile(null);
    } catch (err) {
      console.error("Error saving category", err);
      alert("Failed to save changes.");
    }
  };

  const handleChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const toggleVisibility = (categoryId) => {
    setVisibility(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 pt-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h1
          className="text-3xl font-semibold text-gray-800 mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Smart Home Categories
        </motion.h1>

        <motion.div
          className="bg-white shadow-lg rounded-lg p-8 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Category List</h2>

          {loading ? (
            <Loader />
          ) : categories.length === 0 ? (
            <p className="text-gray-600">No categories available.</p>
          ) : (
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">SN</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Description</th>
                  <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">Products</th>
                  <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">Image</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Visibility</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {categories.map((category, index) => (
                    <motion.tr
                      key={category.id}
                      className="border-b"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="py-3 px-4 text-sm text-gray-600">{index + 1}</td>

                      <td className="py-3 px-4 text-sm text-gray-600">
                        {editId === category.id ? (
                          <input
                            type="text"
                            value={editData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 w-full"
                          />
                        ) : category.name}
                      </td>

                      <td className="py-3 px-1 text-sm text-gray-600">
                        {editId === category.id ? (
                          <textarea
                            value={editData.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 w-full"
                          />
                        ) : category.description || "-"}
                      </td>

                      <td className="py-3 px-4 text-sm text-gray-600 text-center">
                        {category.productCount || 0}
                      </td>

                      <td className="py-3 px-4 text-center">
                        {editId === category.id ? (
                          <label className="cursor-pointer group">
                            <img
                              src={imageFile ? URL.createObjectURL(imageFile) : editData.image}
                              alt="preview"
                              className="w-12 h-12 object-cover rounded-full mx-auto mb-1 border-2 border-transparent group-hover:border-blue-500 transition"
                            />
                            <span className="text-xs text-blue-500 hover:underline">Change</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="hidden"
                            />
                          </label>
                        ) : (
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-12 h-12 object-cover rounded-full mx-auto"
                          />
                        )}
                      </td>

                      <td className="py-3 px-2 text-sm text-gray-600">
                        {editId === category.id ? (
                          <div className="flex gap-2">
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleSave(category.id)}
                              className="text-green-600 hover:text-green-800 font-semibold"
                            >
                              Save
                            </motion.button>
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              onClick={handleCancelEdit}
                              className="text-gray-500 hover:text-gray-700 font-semibold"
                            >
                              Cancel
                            </motion.button>
                          </div>
                        ) : (
                          <div className="flex gap-4">
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              className="text-blue-500 hover:text-blue-700 font-semibold"
                              onClick={() => handleEditClick(category)}
                            >
                              Edit
                            </motion.button>
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              className="text-red-500 hover:text-red-700 font-semibold"
                              onClick={() =>
                                setCategories(prev => prev.filter(c => c.id !== category.id))
                              }
                            >
                              Delete
                            </motion.button>
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-4 text-center">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleVisibility(category.id)}
                          className={`text-sm font-semibold ${
                            visibility[category.id] ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {visibility[category.id] ? "Visible" : "Hidden"}
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          )}
        </motion.div>

        <motion.div
          className="mt-6 text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={() => navigate('/admin/add-category')}
            className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300"
          >
            Add Category
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Category;