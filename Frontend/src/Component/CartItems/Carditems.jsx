import { useContext, useState } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { useNavigate } from "react-router-dom";

const PROMO_CODES = { SAVE10: 0.10, SAVE20: 0.20 };

const CartItems = () => {
  const { all_product, cartItems, addToCart, removeFromCart, getTotalAmount } = useContext(ShopContext);
  const navigate = useNavigate();
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoMsg, setPromoMsg] = useState("");

  const cartList = all_product.filter((p) => cartItems[p.id] > 0);
  const subtotal = getTotalAmount();
  const discountAmt = subtotal * discount;
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal - discountAmt + shipping;

  const applyPromo = () => {
    const code = promo.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setDiscount(PROMO_CODES[code]);
      setPromoMsg(`${code} applied — ${PROMO_CODES[code] * 100}% off`);
    } else {
      setDiscount(0);
      setPromoMsg("Invalid promo code");
    }
  };

  if (cartList.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <svg className="w-20 h-20 text-gray-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
        <p className="text-gray-400 mb-6 text-sm">Add some items to get started</p>
        <button onClick={() => navigate("/")} className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-4">
          <div className="hidden md:grid grid-cols-12 text-xs font-semibold text-gray-400 uppercase tracking-wide pb-2 border-b border-gray-100">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Qty</div>
            <div className="col-span-2 text-right">Total</div>
          </div>
          {cartList.map((product) => {
            const qty = cartItems[product.id];
            return (
              <div key={product.id} className="grid grid-cols-12 items-center gap-3 bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <div className="col-span-12 md:col-span-6 flex items-center gap-4">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg border border-gray-100 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{product.name}</p>
                    <p className="text-xs text-gray-400 capitalize mt-0.5">{product.category}</p>
                  </div>
                </div>
                <div className="col-span-4 md:col-span-2 text-center">
                  <p className="text-sm font-medium text-gray-700">Rs.{product.new_price}</p>
                </div>
                <div className="col-span-4 md:col-span-2 flex items-center justify-center gap-2">
                  <button onClick={() => removeFromCart(product.id)} className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">-</button>
                  <span className="w-6 text-center text-sm font-semibold text-gray-800">{qty}</span>
                  <button onClick={() => addToCart(product.id)} className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">+</button>
                </div>
                <div className="col-span-4 md:col-span-2 text-right">
                  <p className="text-sm font-bold text-gray-900">Rs.{(product.new_price * qty).toLocaleString("en-IN")}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sticky top-24">
            <h2 className="text-base font-bold text-gray-800 mb-5">Order Summary</h2>
            <div className="space-y-3 text-sm text-gray-600 mb-5">
              <div className="flex justify-between"><span>Subtotal</span><span className="font-medium text-gray-800">Rs.{subtotal.toLocaleString("en-IN")}</span></div>
              {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-Rs.{discountAmt.toLocaleString("en-IN")}</span></div>}
              <div className="flex justify-between"><span>Shipping</span><span className={shipping === 0 ? "text-green-600 font-medium" : "font-medium text-gray-800"}>{shipping === 0 ? "Free" : `Rs.${shipping}`}</span></div>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900 text-base"><span>Total</span><span>Rs.{total.toLocaleString("en-IN")}</span></div>
            </div>
            <div className="mb-5">
              <div className="flex gap-2">
                <input type="text" placeholder="Promo code" value={promo} onChange={(e) => setPromo(e.target.value)} className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                <button onClick={applyPromo} className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">Apply</button>
              </div>
              {promoMsg && <p className={`text-xs mt-1.5 ${discount > 0 ? "text-green-600" : "text-red-500"}`}>{promoMsg}</p>}
              <p className="text-xs text-gray-400 mt-1">Try: SAVE10 or SAVE20</p>
            </div>
            <button onClick={() => navigate("/checkout")} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors text-sm">
              Proceed to Checkout
            </button>
            <div className="mt-5 flex justify-around text-xs text-gray-400">
              <div className="flex flex-col items-center gap-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8l1 12a2 2 0 002 2h8a2 2 0 002-2l1-12" /></svg>
                <span>Free Returns</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                <span>Secure Pay</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                <span>Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
