import upload_area from '../../assets/upload_area.svg';
import { useState } from 'react';

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [productDetail, setProductDetail] = useState({
    name: '', category: 'women', new_price: '', old_price: '', available: true,
  });

  const changeHandler = (e) => setProductDetail({ ...productDetail, [e.target.name]: e.target.value });

  const addProduct = async () => {
    if (!image) return alert('Please select an image');
    if (!productDetail.name || !productDetail.new_price || !productDetail.old_price)
      return alert('Please fill all fields');

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('product', image);
      const uploadRes = await fetch(`${BACKEND}/upload`, { method: 'POST', body: formData });
      const uploadData = await uploadRes.json();
      if (!uploadData.success) return alert('Image upload failed');

      const res = await fetch(`${BACKEND}/addproducts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...productDetail, image: uploadData.image_url }),
      });
      const data = await res.json();
      if (data.success) {
        alert('Product added successfully!');
        setProductDetail({ name: '', category: 'women', new_price: '', old_price: '', available: true });
        setImage(null);
      } else {
        alert('Failed to add product');
      }
    } catch {
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-full max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Product</h1>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-5">
        {/* Product Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Product Title</label>
          <input
            type="text" name="name" placeholder="Enter product name"
            value={productDetail.name} onChange={changeHandler}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        {/* Prices */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Original Price (₹)</label>
            <input
              type="number" name="old_price" placeholder="0"
              value={productDetail.old_price} onChange={changeHandler}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Offer Price (₹)</label>
            <input
              type="number" name="new_price" placeholder="0"
              value={productDetail.new_price} onChange={changeHandler}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
        </div>

        {/* Category + Availability */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
            <select
              name="category" value={productDetail.category} onChange={changeHandler}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
            >
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="kid">Kids</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Availability</label>
            <select
              name="available" value={productDetail.available}
              onChange={(e) => setProductDetail({ ...productDetail, available: e.target.value === 'true' })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
            >
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </select>
          </div>
        </div>

        {/* Image upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Product Image</label>
          <label htmlFor="file-input" className="cursor-pointer block">
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center hover:border-indigo-300 transition-colors">
              <img
                src={image ? URL.createObjectURL(image) : upload_area}
                alt="Upload"
                className={`object-contain ${image ? 'w-40 h-40 rounded-lg' : 'w-20 h-20 opacity-50'}`}
              />
              {!image && <p className="text-sm text-gray-400 mt-2">Click to upload image</p>}
            </div>
          </label>
          <input type="file" id="file-input" hidden accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        </div>

        <button
          onClick={addProduct}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition-colors text-sm"
        >
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
