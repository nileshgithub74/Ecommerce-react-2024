
import { useLocation } from 'react-router-dom';
import './OrderItems.css'

const OrderItems = () => {
  const location = useLocation();
  const { cartItems } = location.state || {}; // Access passed cartItems

  if (!cartItems || cartItems.length === 0) {
    return <div>No items to display in your order.</div>;
  }

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <div className="order-items">
        {cartItems.map((item, index) => (
          <div key={index} className="order-item">
            <img src={item.imageUrl} alt={item.name} className="order-item-image" />
            <div className="order-item-details">
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total: ${item.price * item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="order-total">
        <h3>Total Amount: ${cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)}</h3>
      </div>
    </div>
  );
};

export default OrderItems;
