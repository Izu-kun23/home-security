import React, { useEffect, useState } from "react";
import {
  fetchCartByUser,
  updateCartQuantity,
  deleteCartItem,
} from "../../../../Server/fire"; // Use only helper functions
import useAuth from "../../../../Server/utils/useAuth";
import { motion } from "framer-motion";

const Cart = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      if (!user) return;
      try {
        const items = await fetchCartByUser(user.uid);
        setCartItems(items);
      } catch (err) {
        console.error("Error loading cart:", err);
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, [user]);

  const updateQuantity = async (id, delta) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + delta);
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: newQuantity } : i))
    );

    try {
      await updateCartQuantity(id, newQuantity); // Firestore update
    } catch (err) {
      console.error("Failed to update Firestore quantity", err);
    }
  };

  const removeItem = async (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    try {
      await deleteCartItem(id); // Use helper function
    } catch (err) {
      console.error("Failed to remove item from Firestore", err);
    }
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading your cart...
      </div>
    );
  }

  return (
    <div className="bg-white text-black min-h-screen py-16 px-10">
      <motion.h1
        className="text-3xl font-bold mb-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Your Shopping Cart
      </motion.h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <motion.div
          className="grid md:grid-cols-3 gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-8">
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                className="flex items-center gap-8 border-b pb-6"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 shadow-sm">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover object-center rounded-md"
                  />
                </div>
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2 gap-4">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-3 py-1 border rounded hover:bg-gray-100 transition duration-200 ease-in-out"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-3 py-1 border rounded hover:bg-gray-100 transition duration-200 ease-in-out"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 font-semibold transition duration-200 ease-in-out"
                >
                  Remove
                </button>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <motion.div
            className="bg-gray-50 p-8 rounded-lg shadow-md h-fit sticky top-10"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Summary</h2>
            <div className="flex justify-between mb-4">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-6">
              <span>Shipping</span>
              <span className="text-gray-500">Free</span>
            </div>
            <hr className="mb-6" />
            <div className="flex justify-between text-xl font-semibold mb-8">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out">
              Proceed to Checkout
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;