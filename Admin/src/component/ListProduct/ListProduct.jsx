import { useEffect, useState } from 'react';

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchInfo = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND}/allproduct`);
      const data = await res.json();
      setAllProducts(data);
    } catch {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchInfo(); }, []);

  const removeProduct = async (id) => {
    if (!confirm('Remove this product?')) return;
    try {
      const res = await fetch(`${BACKEND}/removeproduct`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) fetchInfo();
      else setError(data.message || 'Failed to remove');
    } catch {
      setError('Failed to remove product');
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
        <span className="bg-indigo-100 text-indigo-700 text-sm font-semibold px-3 py-1 rounded-full">
          {allProducts.length} items
        </span>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-12 px-5 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wide">
          <div className="col-span-1">Image</div>
          <div className="col-span-4">Title</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-2">Offer</div>
          <div className="col-span-1 text-center">Del</div>
        </div>

        {allProducts.length === 0 ? (
          <p className="text-center py-12 text-gray-400 text-sm">No products found</p>
        ) : (
          <div className="divide-y divide-gray-50">
            {allProducts.map((product) => (
              <div key={product.id} className="grid grid-cols-12 px-5 py-3 items-center hover:bg-gray-50 transition-colors">
                <div className="col-span-1">
                  <img
                    src={product.image || ''}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded-lg border border-gray-100"
                  />
                </div>
                <div className="col-span-4 text-sm font-medium text-gray-800 truncate pr-2">{product.name}</div>
                <div className="col-span-2">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize">{product.category}</span>
                </div>
                <div className="col-span-2 text-sm text-gray-400 line-through">₹{product.old_price}</div>
                <div className="col-span-2 text-sm font-semibold text-gray-800">₹{product.new_price}</div>
                <div className="col-span-1 flex justify-center">
                  <button
                    onClick={() => removeProduct(product.id)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListProduct;
