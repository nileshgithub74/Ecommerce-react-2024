// import { createContext, useState } from "react";
// import PropTypes from "prop-types";
// import all_product from '../Assets/Frontend_Assets/all_product.js';

// export const ShopContext = createContext(null); 
// const getDefaultcart =()=>{
//   let cart ={};
//   for(let i=0; i< all_product.length+ 1; i++){
//     cart[i] =0;
//   }
//   return cart;
// }

// const ShopContextProvider = (props) => {
  
//   const [cartitems , setCartItmes] = useState(getDefaultcart());

 

  
//     const addToCart=()=>{
//       setCartItmes((prev) => ({...prev,[itemId]:prev[itemId]+ 1}));
//     }

//     const removeFromCart=()=>{
//       setCartItmes((prev) => ({...prev,[itemId]:prev[itemId]- 1}));
//     }

//     const contextValue = { all_product, cartitems,addToCart,removeFromCart };




//   return (
//     <ShopContext.Provider value={contextValue}>
//       {props.children}
//     </ShopContext.Provider>
//   );
// };

// ShopContextProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export  default  ShopContextProvider ; 








import { createContext, useState, useCallback } from "react";
import PropTypes from "prop-types";
import all_product from '../Assets/Frontend_Assets/all_product.js';

export const ShopContext = createContext(null);

// Get the default cart with all items set to 0
const getDefaultcart = () => {
  let cart = {};
  for (let i = 0; i < all_product.length; i++) {
    cart[i] = 0;  
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultcart());


  const addToCart = useCallback((itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  }, []);

 
  const removeFromCart = useCallback((itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  }, []);

  const contextValue = { all_product, cartItems, addToCart, removeFromCart };

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
