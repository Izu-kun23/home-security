import React, { useState, useRef } from 'react';
import { addCategory } from '../../../../Server/fire'; // ✅ Adjust path as needed

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [categoryDescription, setCategoryDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null); // ✅ For resetting file input

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName || !categoryDescription || !categoryImage) {
      alert("All fields are required.");
      return;
    }

    try {
      setLoading(true);

      const categoryId = await addCategory(
        categoryName,
        categoryDescription,
        categoryImage
      );

      console.log("Category added successfully. ID:", categoryId);
      alert("✅ Category has been successfully added!");

      // Reset form fields
      setCategoryName('');
      setCategoryDescription('');
      setCategoryImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // ✅ Clear file input manually
      }

    } catch (error) {
      console.error("Error adding category:", error);
      alert("❌ Failed to add category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-xl">
        <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Add Category</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Name */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">Category Name</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
              className="w-full px-6 py-3 border border-gray-400 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Category Image */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">Category Image</label>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={(e) => setCategoryImage(e.target.files[0])}
              className="w-full px-6 py-3 border border-gray-400 text-black rounded-md"
              required
            />
          </div>

          {/* Category Description */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">Category Description</label>
            <textarea
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
              placeholder="Enter a description for the category"
              className="w-full px-6 py-3 border border-gray-400 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="6"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white py-3 px-8 rounded-full hover:bg-blue-700 transition duration-300"
            >
              {loading ? "Saving..." : "Save Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;