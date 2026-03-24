import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';

const Item = ({ id, image, name, new_price, old_price }) => {
  const { addToCart } = useContext(ShopContext);
  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Image */}
      <Link to={`/product/${id}`} onClick={() => window.scrollTo(0, 0)}>
        <div className="overflow-hidden bg-gray-50 h-56">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <Link to={`/product/${id}`} onClick={() => window.scrollTo(0, 0)}>
          <p className="text-sm font-semibold text-gray-800 line-clamp-2 hover:text-red-500 transition-colors leading-snug">{name}</p>
        </Link>
        <div className="flex items-center gap-2 mt-auto">
          <span className="text-base font-bold text-gray-900">${new_price}</span>
          <span className="text-sm text-gray-400 line-through">${old_price}</span>
        </div>

        {/* Quick add */}
        <button
          onClick={() => addToCart(id)}
          className="mt-1 w-full py-2 text-xs font-semibold bg-gray-900 hover:bg-red-500 text-white rounded-xl transition-all duration-200 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0"
        >
          + Add to Cart
        </button>
      </div>
    </div>
  );
};

Item.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  new_price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  old_price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Item;
