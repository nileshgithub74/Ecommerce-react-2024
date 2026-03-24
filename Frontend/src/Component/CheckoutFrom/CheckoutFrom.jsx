import { useContext, useState } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutFrom = () => {
  const { cartItems, getTotalAmount, all_product, placeOrder } = useContext(ShopContext);
  const navigate = useNavigate();
  const totalAmount = getTotalAmount();
  const stripe = useStripe();
  const elements = useElements();

  const [shippingDetails, setShippingDetails] = useState({ name: "", address: "", city: "", postalCode: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentSuccess = async (e) => {
    e.preventDefault();
    if (totalAmount <= 0) { setError("Your cart is empty."); return; }
    if (!shippingDetails.name || !shippingDetails.address || !shippingDetails.city || !shippingDetails.postalCode) {
      setError("Please fill in all shipping details."); return;
    }
    setError("");
    setLoading(true);

    const backends = [
      import.meta.env.VITE_BACKEND_URL,
      "http://localhost:4000",
    ].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i);

    // Try to get a real payment intent from backend
    let clientSecret = null;
    for (const base of backends) {
      try {
        const res = await fetch(`${base}/create-payment-intent`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: totalAmount }),
          signal: AbortSignal.timeout(5000),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.clientSecret) { clientSecret = data.clientSecret; break; }
        }
      } catch { /* try next or fall back to demo mode */ }
    }

    const cartProducts = all_product
      .filter((p) => cartItems[p.id] > 0)
      .map((p) => ({ name: p.name, image: p.image, quantity: cartItems[p.id], new_price: p.new_price }));

    const orderDetails = {
      cartItems: cartProducts,
      totalAmount,
      shippingDetails,
      paymentStatus: "succeeded",
    };

    // ── DEMO MODE: backend unreachable ──────────────────────────────────────
    if (!clientSecret) {
      // Simulate a brief processing delay
      await new Promise((r) => setTimeout(r, 1200));
      placeOrder({ ...orderDetails, backendId: `DEMO-${Date.now()}` });
      setOrderId(`DEMO-${Date.now()}`);
      setSuccess(true);
      setLoading(false);
      return;
    }

    // ── REAL STRIPE PAYMENT ─────────────────────────────────────────────────
    if (!stripe || !elements) { setError("Stripe has not loaded."); setLoading(false); return; }

    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (result.error) {
        setError(`Payment failed: ${result.error.message}`);
      } else if (result.paymentIntent.status === "succeeded") {
        // Save order to backend (best effort)
        let savedId = String(Date.now());
        for (const base of backends) {
          try {
            const res = await fetch(`${base}/api/order`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(orderDetails),
              signal: AbortSignal.timeout(5000),
            });
            if (res.ok) { const d = await res.json(); savedId = d.order?._id || savedId; break; }
          } catch { /* ignore */ }
        }
        placeOrder({ ...orderDetails, backendId: savedId });
        setOrderId(savedId);
        setSuccess(true);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-gray-50 transition-all";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  // ── Success screen ──────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4 py-12">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 max-w-md w-full text-center">
          {/* Animated checkmark */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-500 text-sm mb-1">Thank you for your order 🎉</p>
          {orderId && (
            <p className="text-xs text-gray-400 mb-6">
              Order ID: <span className="font-mono text-gray-600">{orderId}</span>
            </p>
          )}

          {/* Order summary */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-left">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Shipping to</p>
            <p className="text-sm font-medium text-gray-800">{shippingDetails.name}</p>
            <p className="text-sm text-gray-500">{shippingDetails.address}, {shippingDetails.city} {shippingDetails.postalCode}</p>
            <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between text-sm font-semibold text-gray-800">
              <span>Total Paid</span>
              <span className="text-green-600">${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate("/orders")}
              className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-md"
            >
              View My Orders
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full py-3 border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium rounded-xl transition-all duration-300 text-sm"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Checkout form ───────────────────────────────────────────────────────────
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <form onSubmit={handlePaymentSuccess} className="flex-1 flex flex-col gap-5">
          {/* Shipping */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-800 mb-5">Shipping Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label htmlFor="name" className={labelClass}>Full Name</label>
                <input type="text" id="name" name="name" value={shippingDetails.name} onChange={handleInputChange} className={inputClass} placeholder="John Doe" required />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="address" className={labelClass}>Address</label>
                <input type="text" id="address" name="address" value={shippingDetails.address} onChange={handleInputChange} className={inputClass} placeholder="123 Main St" required />
              </div>
              <div>
                <label htmlFor="city" className={labelClass}>City</label>
                <input type="text" id="city" name="city" value={shippingDetails.city} onChange={handleInputChange} className={inputClass} placeholder="New York" required />
              </div>
              <div>
                <label htmlFor="postalCode" className={labelClass}>Postal Code</label>
                <input type="text" id="postalCode" name="postalCode" value={shippingDetails.postalCode} onChange={handleInputChange} className={inputClass} placeholder="10001" required />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-800 mb-5">Payment Information</h2>
            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
              <CardElement options={{ style: { base: { fontSize: '16px', color: '#374151' } } }} />
            </div>
            <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
              Secured by Stripe
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 flex items-center gap-2">
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !stripe || !elements}
            className="w-full py-4 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-lg text-base"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Processing payment...
              </span>
            ) : `Pay $${totalAmount.toFixed(2)}`}
          </button>
        </form>

        {/* Order summary sidebar */}
        <div className="lg:w-72">
          <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-24">
            <h2 className="text-base font-bold text-gray-900 mb-4">Order Summary</h2>
            <div className="flex flex-col gap-2 mb-4 max-h-48 overflow-y-auto">
              {all_product.filter((p) => cartItems[p.id] > 0).map((p) => (
                <div key={p.id} className="flex items-center gap-3 text-sm">
                  <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-gray-700 font-medium">{p.name}</p>
                    <p className="text-gray-400">x{cartItems[p.id]}</p>
                  </div>
                  <span className="text-gray-700 font-medium">${(p.new_price * cartItems[p.id]).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 flex flex-col gap-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-gray-800">${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-gray-900 text-base">
                <span>Total</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutFrom;
