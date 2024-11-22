import { useContext, useState } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'; 
import './CheckoutFrom.css';

const CheckoutFrom = () => {
  const { cartItems, getTotalAmount, all_product } = useContext(ShopContext);
  const navigate = useNavigate();
  const totalAmount = getTotalAmount();
  const stripe = useStripe(); 
  const elements = useElements();


  
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePaymentSuccess = async (e) => {
    e.preventDefault();

    if (totalAmount <= 0) {
      setError("Please add items to the cart before proceeding with checkout.");
      return;
    }

    if (!stripe || !elements) {
      setError("Stripe.js has not loaded yet.");
      return;
    }

    if (!shippingDetails.name || !shippingDetails.address || !shippingDetails.city || !shippingDetails.postalCode) {
      setError("Please fill in all your details.");
      return;
    }

    setError(""); 
    setLoading(true); 

    try {
      
      const { clientSecret } = await fetch("http://localhost:4000/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount }),
      }).then((res) => res.json());

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(`Payment failed: ${result.error.message}`);
      } else if (result.paymentIntent.status === "succeeded") {
       
        const orderDetails = {
          cartItems: all_product.filter(product => cartItems[product.id] > 0).map(product => ({
            name: product.name,
            quantity: cartItems[product.id],
            price: product.new_price,
          })),
          totalAmount,
          shippingDetails, 
          paymentStatus: "succeeded",
        };

        
        const response = await fetch("http://localhost:4000/api/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderDetails),
        });

        if (response.ok) {
         
          alert("Payment Successful!");

         
          navigate("/");
        } else {
          setError("Order submission failed.");
        }

        
        localStorage.removeItem("cart");
      }
    } catch (error) {
      console.error("Error submitting payment or order:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-header">Checkout</h1>

    
      <form className="checkout-form" onSubmit={handlePaymentSuccess}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={shippingDetails.name}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address" className="form-label">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={shippingDetails.address}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="city" className="form-label">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={shippingDetails.city}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="postalCode" className="form-label">Postal Code:</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={shippingDetails.postalCode}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>

    
        <div className="form-group">
          <label htmlFor="card" className="form-label">Payment Information</label>
          <CardElement />
        </div>

     
        {error && <div className="error-message">{error}</div>}

       
        <p className="total-amount">Total Amount: ${totalAmount.toFixed(2)}</p>
        <button
          type="submit"
          className="pay-now-button"
          disabled={loading || !stripe || !elements}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutFrom;
