import PropTypes from 'prop-types';
import star_dull_icon from '../Assets/Frontend_Assets/star_dull_icon.png';
import star_icon from '../Assets/Frontend_Assets/star_icon.png';
import { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('');
  const [added, setAdded] = useState(false);
  const [activeImg, setActiveImg] = useState(product.image);

  const handleAddToCart = () => {
    addToCart(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    addToCart(product.id);
    navigate('/checkout');
  };

  const discount = Math.round(((product.old_price - product.new_price) / product.old_price) * 100);
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-8">
      <div className="flex flex-col lg:flex-row gap-10 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-10">

        {/* ── Left: Images ── */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-3 order-2 sm:order-1">
            {[...Array(4)].map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(product.image)}
                className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${activeImg === product.image ? 'border-red-400' : 'border-gray-100 hover:border-gray-300'}`}
              >
                <img src={product.image} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Main image */}
          <div className="flex-1 order-1 sm:order-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden flex items-center justify-center min-h-72">
            <img src={activeImg} alt={product.name} className="max-h-96 w-full object-contain p-6 hover:scale-105 transition-transform duration-500" />
          </div>
        </div>

        {/* ── Right: Details ── */}
        <div className="flex-1 flex flex-col gap-5">
          {/* Title + badge */}
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">{product.name}</h1>
            {discount > 0 && (
              <span className="shrink-0 bg-red-100 text-red-600 text-sm font-bold px-3 py-1 rounded-full">-{discount}%</span>
            )}
          </div>

          {/* Stars */}
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(4)].map((_, i) => <img key={i} src={star_icon} alt="★" className="w-4 h-4" />)}
              <img src={star_dull_icon} alt="☆" className="w-4 h-4" />
            </div>
            <span className="text-sm text-gray-500">4.0 <span className="text-gray-300">|</span> 122 reviews</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 bg-gray-50 rounded-2xl px-5 py-4">
            <span className="text-4xl font-black text-red-500">${product.new_price}</span>
            <span className="text-xl text-gray-400 line-through">${product.old_price}</span>
            <span className="text-sm text-green-600 font-semibold">
              Save ${(product.old_price - product.new_price).toFixed(2)}
            </span>
          </div>

          <p className="text-gray-500 text-sm leading-relaxed">
            Premium quality product crafted with care. Perfect for everyday wear with a modern, stylish design that suits every occasion.
          </p>

          {/* Size selector */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-gray-800">Select Size</p>
              <button className="text-xs text-red-500 hover:underline">Size Guide</button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-xl border-2 text-sm font-bold transition-all duration-200 ${
                    selectedSize === size
                      ? 'bg-gray-900 text-white border-gray-900 scale-105'
                      : 'border-gray-200 text-gray-600 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-4 rounded-full font-bold text-base transition-all duration-300 shadow-md ${
                added ? 'bg-green-500 text-white shadow-green-200' : 'bg-red-500 hover:bg-red-600 text-white hover:shadow-lg hover:shadow-red-200'
              }`}
            >
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 py-4 rounded-full font-bold text-base border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
            >
              Buy Now
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="flex flex-col items-center gap-1.5 bg-gray-50 rounded-xl py-3 px-2 border border-gray-100">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <span className="text-xs font-medium text-gray-600 text-center leading-tight">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 bg-gray-50 rounded-xl py-3 px-2 border border-gray-100">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="text-xs font-medium text-gray-600 text-center leading-tight">Easy Returns</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 bg-gray-50 rounded-xl py-3 px-2 border border-gray-100">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-xs font-medium text-gray-600 text-center leading-tight">Secure Payment</span>
            </div>
          </div>

          {/* Meta */}
          <div className="border-t border-gray-100 pt-4 flex flex-col gap-1.5 text-sm text-gray-500">
            <p><span className="font-semibold text-gray-700">Category: </span><span className="capitalize">{product.category}</span></p>
            <p><span className="font-semibold text-gray-700">Tags: </span>Modern, Latest, Trending</p>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductDisplay.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    old_price: PropTypes.number.isRequired,
    new_price: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    category: PropTypes.string,
  }).isRequired,
};

export default ProductDisplay;
