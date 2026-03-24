import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";

const Orders = () => {
  const { placedOrders } = useContext(ShopContext);

  if (placedOrders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No orders yet</h2>
          <p className="text-gray-500 mb-6">Looks like you haven&apos;t placed any orders.</p>
          <Link to="/">
            <button className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full transition-all duration-300 shadow-md">
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">My Orders</h1>

      <div className="flex flex-col gap-6">
        {placedOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Order header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 bg-gray-50 border-b border-gray-100">
              <div className="flex flex-col gap-1">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Order ID</p>
                <p className="text-sm font-mono text-gray-700">{order.backendId || order.id}</p>
              </div>
              <div className="flex flex-col gap-1 sm:text-right">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Date</p>
                <p className="text-sm text-gray-700">
                  {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  {order.paymentStatus === 'succeeded' ? 'Paid' : order.paymentStatus}
                </span>
              </div>
            </div>

            {/* Items */}
            <div className="px-6 py-4 flex flex-col gap-3">
              {order.cartItems.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  {item.image && (
                    <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-xl border border-gray-100" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                    <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-sm text-gray-500">
                <span className="font-medium text-gray-700">Ship to: </span>
                {order.shippingDetails.name}, {order.shippingDetails.address}, {order.shippingDetails.city} {order.shippingDetails.postalCode}
              </div>
              <div className="text-base font-bold text-gray-900">
                Total: <span className="text-red-500">${order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
