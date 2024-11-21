import { createContext, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";


export const ShopContext = createContext(null);

// Initialize the cart with product IDs as keys and values set to 0
const getDefaultCart = () => {
  let cart = {};
  for(let i=0; i<300+1; i++){
    cart[i] =0;
  }
 
  return cart;
};

const ShopContextProvider = (props) => {

  const[all_product, setAll_product] = useState([]);
  
  useEffect(()=>{
    fetch('http://localhost:4000/allproduct').then((res)=>res.json()).then((data)=>setAll_product(data))

  },[])






  const [cartItems, setCartItems] = useState(getDefaultCart());

 
  const addToCart = useCallback((itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  }, []);

 
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


// import { createContext, useState, useCallback, useEffect } from "react";
// import PropTypes from "prop-types";

// export const ShopContext = createContext(null);

// // Initialize the cart with product IDs as keys and values set to 0
// const getDefaultCart = () => {
//   let cart = {};
//   for (let i = 0; i <= 300; i++) {
//     cart[i] = 0;
//   }
//   return cart;
// };

// const ShopContextProvider = (props) => {
//   const [all_product, setAll_product] = useState([]);
//   const [cartItems, setCartItems] = useState(getDefaultCart());
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   // Fetch all products from the backend
//   useEffect(() => {
//     fetch("http://localhost:4000/allproduct")
//       .then((res) => res.json())
//       .then((data) => {
//         setAll_product(data);
//         setFilteredProducts(data); // Set initial state to display all products
//       })
//       .catch((error) => console.error("Error fetching products:", error));
//   }, []);

//   // Filter products by category
//   const filterByCategory = (category) => {
//     const filtered = all_product.filter((product) => product.category === category);
//     setFilteredProducts(filtered);
//   };

//   const addToCart = useCallback((itemId) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//   }, []);

//   const removeFromCart = useCallback((itemId) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: Math.max(prev[itemId] - 1, 0) }));
//   }, []);

//   // Function to calculate the total amount
//   const getTotalAmount = useCallback(() => {
//     let totalAmount = 0;
//     for (const item in cartItems) {
//       if (cartItems[item] > 0) {
//         const itemInfo = all_product.find((product) => product.id === Number(item));
//         if (itemInfo) {
//           totalAmount += itemInfo.new_price * cartItems[item];
//         }
//       }
//     }
//     return totalAmount;
//   }, [cartItems, all_product]);

//   const contextValue = {
//     all_product,
//     filteredProducts,
//     filterByCategory,
//     cartItems,
//     addToCart,
//     removeFromCart,
//     getTotalAmount,
//   };

//   return (
//     <ShopContext.Provider value={contextValue}>
//       {props.children}
//     </ShopContext.Provider>
//   );
// };

// ShopContextProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export default ShopContextProvider;
