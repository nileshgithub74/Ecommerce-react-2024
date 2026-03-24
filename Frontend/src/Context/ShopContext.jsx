import { createContext, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import all_product_fallback from "../Assets/Frontend_Assets/all_product";
import new_collections_fallback from "../Assets/Frontend_Assets/new_collections";

export const ShopContext = createContext(null);

const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

const getDefaultCart = () => {
  let cart = {};
  for (let i = 0; i < 301; i++) cart[i] = 0;
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product_data, setAllProduct] = useState(all_product_fallback);
  const [newCollection, setNewCollection] = useState(new_collections_fallback);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [placedOrders, setPlacedOrders] = useState([]);

  // Fetch products from backend, fall back to local data if it fails
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [allRes, newRes] = await Promise.all([
          fetch(`${BACKEND}/allproduct`, { signal: AbortSignal.timeout(5000) }),
          fetch(`${BACKEND}/newcollection`, { signal: AbortSignal.timeout(5000) }),
        ]);

        if (!allRes.ok) throw new Error("allproduct failed");
        const allData = await allRes.json();

        if (allData && allData.length > 0) {
          setAllProduct(allData);
        } else {
          setAllProduct(all_product_fallback);
          setUsingFallback(true);
        }

        if (newRes.ok) {
          const newData = await newRes.json();
          if (newData && newData.length > 0) {
            setNewCollection(newData);
          } else {
            setNewCollection(new_collections_fallback);
          }
        }
      } catch {
        // Backend unreachable — use local dummy data silently
        setAllProduct(all_product_fallback);
        setNewCollection(new_collections_fallback);
        setUsingFallback(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = useCallback((itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  }, []);

  const removeFromCart = useCallback((itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: Math.max((prev[itemId] || 0) - 1, 0) }));
  }, []);

  const clearCart = useCallback(() => setCartItems(getDefaultCart()), []);

  const getTotalAmount = useCallback(() => {
    let total = 0;
    for (const id in cartItems) {
      if (cartItems[id] > 0) {
        const item = all_product_data.find((p) => p.id === Number(id));
        if (item) total += item.new_price * cartItems[id];
      }
    }
    return total;
  }, [cartItems, all_product_data]);

  const placeOrder = useCallback((orderDetails) => {
    setPlacedOrders((prev) => [
      { ...orderDetails, id: Date.now(), date: new Date().toISOString() },
      ...prev,
    ]);
    setCartItems(getDefaultCart());
  }, []);

  return (
    <ShopContext.Provider value={{
      all_product: all_product_data,
      newCollection,
      loading,
      usingFallback,
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      getTotalAmount,
      placeOrder,
      placedOrders,
    }}>
      {props.children}
    </ShopContext.Provider>
  );
};

ShopContextProvider.propTypes = { children: PropTypes.node.isRequired };
export default ShopContextProvider;
