import { useEffect, useState } from 'react';

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

const statusColor = (status) => {
  if (!status) return 'bg-gray-100 text-gray-600';
  const s = status.toLowerCase();
  if (s === 'paid') return 'bg-green-100 text-green-700';
  if (s === 'pending') return 'bg-yellow-100 text-yellow-700';
  if (s === 'failed') return 'bg-red-100 text-red-700';
  return 'bg-blue-100 text-blue-700';
};

const OrderItems = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    fetch(`${BACKEND}/api/orders`)
      .then((r) => r.json())
      .then((data) => { setOrders(data); setLoading(false); })
      .catch(() => { setError('Failed to load orders'); setLoading(false); });
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error) return (
    <div className="p-6 text-red-500 font-medium">{error}</div>
  );

  return (
    <div className="p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
        <span className="bg-indigo-100 text-indigo-700 text-sm font-semibold px-3 py-1 rounded-full">
          {orders.length} total
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-lg font-medium">No orders yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order, i) => (
            <div key={order._id || i} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Order header */}
              <div
                className="flex flex-wrap items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
                    #{i + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">
                      {order.shippingDetails?.name || 'Unknown Customer'}
                    </p>
                    <p className="text-xs text-gray-400">
                      {order.shippingDetails?.email || '—'} &nbsp;·&nbsp;
                      {order.orderDate ? new Date(order.orderDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-2 sm:mt-0">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor(order.paymentStatus)}`}>
                    {order.paymentStatus || 'Unknown'}
                  </span>
                  <span className="font-bold text-gray-800">₹{order.totalAmount?.toLocaleString('en-IN') || '0'}</span>
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform ${expanded === i ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Expanded details */}
              {expanded === i && (
                <div className="border-t border-gray-100 px-5 py-4 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Shipping info */}
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Shipping Details</p>
                      <div className="bg-white rounded-lg p-3 border border-gray-100 text-sm text-gray-700 space-y-1">
                        <p><span className="font-medium">Name:</span> {order.shippingDetails?.name || '—'}</p>
                        <p><span className="font-medium">Email:</span> {order.shippingDetails?.email || '—'}</p>
                        <p><span className="font-medium">Phone:</span> {order.shippingDetails?.phone || '—'}</p>
                        <p><span className="font-medium">Address:</span> {order.shippingDetails?.address || '—'}</p>
                        <p><span className="font-medium">City:</span> {order.shippingDetails?.city || '—'}, {order.shippingDetails?.zip || '—'}</p>
                      </div>
                    </div>

                    {/* Cart items */}
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                        Items ({order.cartItems?.length || 0})
                      </p>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {(order.cartItems || []).map((item, j) => (
                          <div key={j} className="bg-white rounded-lg p-3 border border-gray-100 flex items-center gap-3">
                            {item.image && (
                              <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-md" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                              <p className="text-xs text-gray-400">Qty: {item.quantity} · ₹{item.new_price || item.price}</p>
                            </div>
                            <p className="text-sm font-semibold text-gray-700">
                              ₹{((item.new_price || item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderItems;
