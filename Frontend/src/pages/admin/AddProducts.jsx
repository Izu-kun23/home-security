import React, { useState, useEffect } from 'react';
import { fetchCategories } from '../../../../Server/fire'; // Adjust the path as needed
import { addProduct } from '../../../../Server/fire';
import { motion } from 'framer-motion';

const AddProducts = () => {
  const [productName, setProductName] = useState('');
  const [categoryId, setCategoryId] = useState(''); // Store the category ID
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('In Stock');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [productId, setProductId] = useState(null); // To store the newly created product ID
  const [isLoading, setIsLoading] = useState(false); // To manage loading state

  // Fetch categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories', err);
      }
    };

    loadCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true); // Start loading

      const newProduct = {
        name: productName,
        categoryId, // Pass categoryId to the addProduct function
        price,
        stock,
        description,
        imageFile: image,
      };

      // Add the product to Firestore and get the product ID
      const newProductId = await addProduct(newProduct);
      setProductId(newProductId); // Store the product ID in state
      console.log('Product added with ID:', newProductId);

      alert('Product added successfully!');

      // Reset form fields
      setProductName('');
      setCategoryId('');
      setPrice('');
      setDescription('');
      setStock('In Stock');
      setImage(null);
      setImagePreview(null);

      setIsLoading(false); // Stop loading
    } catch (error) {
      setIsLoading(false); // Stop loading on error
      console.error('Failed to add product:', error.message);
      alert('Failed to add product.');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validFormats = ['image/jpeg', 'image/png', 'image/jpg']; // Allowed formats
      if (validFormats.includes(file.type)) {
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
      } else {
        alert('Invalid file format! Please upload a valid image.');
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 py-10 pt-20"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">Add Product</h1>

        <div className="bg-white shadow-xl rounded-xl p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Enter Product Details</h2>

          <form onSubmit={handleSubmit}>
            {/* Product Name */}
            <div className="mb-4">
              <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter product name"
              />
            </div>

            {/* Category */}
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <select
                id="category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option> /* Use categoryId here */
                ))}
              </select>
            </div>

            {/* Price */}
            <div className="mb-4">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                min="0"
                step="0.01"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter product price"
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter product description"
              />
            </div>

            {/* Stock */}
            <div className="mb-4">
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock Availability</label>
              <select
                id="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>

            {/* Product Image */}
            <div className="mb-4">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Product Image</label>
              <input
                type="file"
                id="image"
                onChange={handleImageChange}
                accept="image/*"
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black focus:outline-none"
              />
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-6 text-right">
              <button
                type="submit"
                disabled={isLoading}
                className={`bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Adding Product...' : 'Add Product'}
              </button>
            </div>
          </form>

          {/* Show the product ID after successful submission */}
          {productId && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">
              <strong>Product added successfully!</strong>
              <p>Product ID: {productId}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AddProducts;