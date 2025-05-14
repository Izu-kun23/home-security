import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCategories, editCategory } from '../../../../Server/fire'; // Adjust path accordingly

const Category = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: "", description: "", image: "" });
  const [imageFile, setImageFile] = useState(null);
  const [visibility, setVisibility] = useState({}); // State to track the visibility of each category

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
        // Initialize visibility of categories to true
        const initialVisibility = data.reduce((acc, category) => {
          acc[category.id] = true;  // Default all categories to visible
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

  // Toggle category visibility
  const toggleVisibility = (categoryId) => {
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      [categoryId]: !prevVisibility[categoryId],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 pt-20">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">Smart Home Categories</h1>

        <div className="bg-white shadow-lg rounded-lg p-8 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Category List</h2>

          {loading ? (
            <p>Loading categories...</p>
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
                {categories.map((category, index) => (
                  <tr key={category.id} className="border-b">
                    <td className="py-3 px-4 text-sm text-gray-600">{index + 1}</td>

                    {/* Name */}
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {editId === category.id ? (
                        <input
                          type="text"
                          value={editData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1 w-full"
                        />
                      ) : (
                        category.name
                      )}
                    </td>

                    {/* Description */}
                    <td className="py-3 px-1 text-sm text-gray-600">
                      {editId === category.id ? (
                        <textarea
                          value={editData.description}
                          onChange={(e) => handleChange("description", e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1 w-full"
                        />
                      ) : (
                        category.description || "-"
                      )}
                    </td>

                    {/* Product Count */}
                    <td className="py-3 px-4 text-sm text-gray-600 text-center">
                      {category.productCount || 0}
                    </td>

                    {/* Image Edit */}
                    <td className="py-3 px-4 text-center">
                      {editId === category.id ? (
                        <>
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
                        </>
                      ) : (
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-12 h-12 object-cover rounded-full mx-auto"
                        />
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-2 text-sm text-gray-600">
                      {editId === category.id ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSave(category.id)}
                            className="text-green-600 hover:text-green-800 font-semibold"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="text-gray-500 hover:text-gray-700 font-semibold"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-4">
                          <button
                            className="text-blue-500 hover:text-blue-700 font-semibold"
                            onClick={() => handleEditClick(category)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-500 hover:text-red-700 font-semibold"
                            onClick={() =>
                              setCategories((prev) => prev.filter((c) => c.id !== category.id))
                            }
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>

                    {/* Visibility Toggle */}
                    <td className="py-3 px-4 text-center">
                      <button
                        className={`text-sm font-semibold ${
                          visibility[category.id] ? "text-green-600" : "text-red-600"
                        }`}
                        onClick={() => toggleVisibility(category.id)}
                      >
                        {visibility[category.id] ? "Visible" : "Hidden"}
                      </button>
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