// import { useContext } from "react";
import "./Carditems.css";

 


import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext"; // Import the context here
import { useNavigate } from "react-router-dom";
import remove_icon from "../../Assets/Frontend_Assets/cart_cross_icon.png";

const CardItems = () => {
  const { all_product, cartItems, getTotalAmount, removeFromCart } = useContext(ShopContext);
  const navigate = useNavigate();
  const totalAmount = getTotalAmount(); // Get the total amount from the context

  // Handle the checkout redirect with total amount passed
  const handleCheckout = () => {
    navigate("/checkout", { state: { totalAmount } });
  };

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
            <div className="cartitems-format cartitems-format-main" key={product.id}>
              <img
                src={product.image}
                alt={product.name}
                className="carticon-product-icon"
              />
              <p>{product.name}</p>
              <p>${product.new_price}</p>
              <button className="cartitems-quantity">{cartItems[product.id]}</button>
              <p>${(product.new_price * cartItems[product.id]).toFixed(2)}</p>
              <img
                className="cartitems-remove-icon"
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

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Total</h1>
          <div>
            <div className="cartitems-total-items">
              <p>Subtotal</p>
              <p>${totalAmount.toFixed(2)}</p>
              <hr />
              <div className="cartitems-total-ites">
                <p>Shipping Fee</p>
                <p>Free</p>
              </div>
              <hr />
              <div className="cartitems-total-items">
                <h3>Total</h3>
                <h3>${totalAmount.toFixed(2)}</h3>
              </div>
              <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
            </div>
          </div>
        </div>
      </div>

      <div className="cartitems-promode">
        <p>If you have a promo code, enter it here</p>
        <div className="cartitems-promo-box">
          <input type="text" placeholder="Promo Code" />
          <button className="btn">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default CardItems;
