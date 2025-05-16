import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../../../../Server/fire";
import { motion } from "framer-motion";
import useAuth from "../../../../Server/utils/useAuth";
import { useCart } from "../../context/CartContext"; // 👈 Import

const ProductDetail = () => {
  const { productId } = useParams();
  const { user } = useAuth();
  const { addToCart } = useCart(); // 👈 Use context
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      const allProducts = await fetchProducts();
      const found = allProducts.find((p) => p.id === productId);
      setProduct(found);
    };
    loadProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!user) {
      alert("Please log in to add products to your cart.");
      return;
    }

    addToCart(product, quantity); // 👈 Use context instead of direct DB call
    alert(`✅ Added ${quantity} of "${product.name}" to your cart.`);
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <motion.section
      className="py-10 md:py-16 bg-white antialiased"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-screen-xl px-4 mx-auto">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          {/* Image */}
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <img className="w-full" src={product.image} alt={product.name} />
          </div>

          {/* Product Info */}
          <div className="mt-8 lg:mt-0">
            <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
              {product.name}
            </h1>

            <div className="mt-4 sm:flex sm:items-center sm:gap-6">
              <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                ${product.price}
              </p>
              <span className={`inline-block mt-2 sm:mt-0 px-4 py-1 text-sm font-medium rounded-full ${
                product.stock === "In Stock"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}>
                {product.stock}
              </span>
            </div>

            {/* Quantity Control */}
            <div className="mt-6 flex items-center gap-4">
              <label className="text-gray-700 font-medium">Quantity:</label>
              <div className="flex items-center border rounded-md overflow-hidden">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-2xl text-black">-</button>
                <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-12 text-center outline-none text-black" />
                <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-2xl text-black">+</button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-4 text-black">
              <button onClick={handleAddToCart} className="flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.293 2.293A1 1 0 007 17h10a1 1 0 00.894-1.447L17 13H7z" />
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                </svg>
                Add to Cart
              </button>
              <button className="flex items-center justify-center px-6 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.78-3.4 6.86-8.55 11.18L12 21z" />
                </svg>
                Add to Favorites
              </button>
            </div>

            <hr className="my-8 border-gray-300" />
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-gray-600 text-sm">
              Comes with ultra-fast SSD, dual USB-C ports, high-fidelity speakers and intelligent voice control.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProductDetail;