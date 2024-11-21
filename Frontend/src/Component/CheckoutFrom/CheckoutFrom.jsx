import './CheckoutFrom.css';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate hook
  const { totalAmount } = location.state;

  // Log the totalAmount to verify
  console.log("Total Amount:", totalAmount); // Log the value of totalAmount

  const handlePayment = async (e) => {
    e.preventDefault();

    // Step 1: Check if total amount is zero
    if (totalAmount === 0) {
      alert("Please add items to the cart before proceeding with payment.");
      return; // Prevent further processing if the total is zero
    }

    if (!stripe || !elements) return;

    // Step 2: Create a payment intent on the backend
    const { clientSecret } = await fetch("http://localhost:4000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalAmount }),
    }).then((res) => res.json());

    // Step 3: Confirm the payment with the client secret
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      alert(`Payment failed: ${result.error.message}`);
    } else if (result.paymentIntent.status === "succeeded") {
      alert("Payment successful!");

      // Step 4: Clear the cart
      localStorage.removeItem('cart'); // Remove cart data from localStorage

      // Step 5: Redirect to cart or home page
      navigate('/cart');
    }
  };

  return (
    <form className="checkout-form" onSubmit={handlePayment}>
      <h2 className="checkout-title">Total: ${totalAmount}</h2>
      <div className="checkout-card-element">
        <CardElement />
      </div>
      <button className="checkout-pay-button" type="submit" disabled={!stripe}>
        Pay Now
      </button>
    </form>
  );
};

export default CheckoutForm;
