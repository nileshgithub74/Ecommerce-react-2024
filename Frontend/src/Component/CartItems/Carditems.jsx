import { useContext } from 'react';
import './Carditems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../../Assets/Frontend_Assets/cart_cross_icon.png';

const CardItems = () => {
  const { all_product, cartItems, removeFromCart } = useContext(ShopContext);

  return (
    <div className="carditems">
      <div className="cartitems-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>TOTAL</p>
        <p>Remove</p>
      </div>
      <hr />

      {all_product.map((product) => {
        if (cartItems[product.id] > 0) {
        
        

          return (
            <div className="cartitems-format" key={product.id}>
              <img
                src={product.image}
                alt={product.title}
                className="carticon-product-icon"
              />
              <p>{product.name}</p>
              <p>${product.new_price}</p>
              <button className="cartitems-quantity" >{cartItems[product.id]}

               
              </button>
              <p>{product.new_price * cartItems[product.id]}</p>
              <img
                src={remove_icon}
                onClick={() => removeFromCart(product.id)} 
                alt="remove"
              />
              <hr />
            </div>
          );
        }
        return null; 
      })}
    </div>
  );
};

export default CardItems;
