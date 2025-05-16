import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchCartByUser, addToCart as firebaseAddToCart } from "../../../Server/fire"; // Adjust path if needed
import useAuth from "../../../Server/utils/useAuth"; // Adjust path if needed

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const loadCart = async () => {
    if (!user) return;
    const items = await fetchCartByUser(user.uid);
    setCartItems(items);
    setCartCount(items.length); // Count unique products, not quantities
  };

  const addToCart = async (product, quantity = 1) => {
    if (!user) return;

    await firebaseAddToCart(user.uid, product, quantity);
    await loadCart(); // Refresh after adding
  };

  useEffect(() => {
    loadCart();
  }, [user]);

  return (
    <CartContext.Provider value={{ cartItems, cartCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};