import { useEffect, useState } from 'react';

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

const StatCard = ({ label, value, icon, color }) => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0, revenue: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${BACKEND}/allproduct`).then((r) => r.json()).catch(() => []),
      fetch(`${BACKEND}/api/orders`).then((r) => r.json()).catch(() => []),
      fetch(`${BACKEND}/api/users`).then((r) => r.json()).catch(() => []),
    ]).then(([products, orders, users]) => {
      const revenue = Array.isArray(orders)
        ? orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0)
        : 0;
      setStats({
        products: Array.isArray(products) ? products.length : 0,
        orders: Array.isArray(orders) ? orders.length : 0,
        users: Array.isArray(users) ? users.length : 0,
        revenue,
      });
      setRecentOrders(Array.isArray(orders) ? orders.slice(0, 5) : []);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Total Products"
          value={stats.products}
          color="bg-indigo-100"
          icon={<svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}
        />
        <StatCard
          label="Total Orders"
          value={stats.orders}
          color="bg-green-100"
          icon={<svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
        />
        <StatCard
          label="Total Users"
          value={stats.users}
          color="bg-purple-100"
          icon={<svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
        />
        <StatCard
          label="Total Revenue"
          value={`₹${stats.revenue.toLocaleString('en-IN')}`}
          color="bg-yellow-100"
          icon={<svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Recent Orders</h2>
        </div>
        {recentOrders.length === 0 ? (
          <p className="text-center py-10 text-gray-400 text-sm">No orders yet</p>
        ) : (
          <div className="divide-y divide-gray-50">
            {recentOrders.map((order, i) => (
              <div key={order._id || i} className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors">
                <div>
                  <p className="text-sm font-medium text-gray-800">{order.shippingDetails?.name || 'Unknown'}</p>
                  <p className="text-xs text-gray-400">{order.shippingDetails?.email || '—'}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-800">₹{order.totalAmount?.toLocaleString('en-IN') || 0}</p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    order.paymentStatus?.toLowerCase() === 'paid'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.paymentStatus || 'Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
