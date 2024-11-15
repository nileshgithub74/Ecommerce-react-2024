import { createContext, useState, useCallback } from "react";
import PropTypes from "prop-types";
import all_product from "../Assets/Frontend_Assets/all_product.js";

export const ShopContext = createContext(null);

// Initialize the cart with product IDs as keys and values set to 0
const getDefaultCart = () => {
  let cart = {};
  all_product.forEach((product) => {
    cart[product.id] = 0; // Use product ID as key
  });
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  // Function to add an item to the cart
  const addToCart = useCallback((itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  }, []);

  // Function to remove an item from the cart
  const removeFromCart = useCallback((itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: Math.max(prev[itemId] - 1, 0) }));
  }, []);

  // Function to calculate the total amount
  const getTotalAmount = useCallback(() => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = all_product.find((product) => product.id === Number(item));
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  }, [cartItems]);

  const contextValue = { 
    all_product, 
    cartItems, 
    addToCart, 
    removeFromCart, 
    getTotalAmount 
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShopContextProvider;
