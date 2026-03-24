import arrow_icon from '../Assets/Frontend_Assets/breadcrum_arrow.png';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Breadcrum = ({ product }) => {
  return (
    <nav className="flex items-center gap-2 px-4 sm:px-8 lg:px-16 py-4 text-sm text-gray-500 max-w-7xl mx-auto">
      <Link to="/" className="hover:text-red-500 transition-colors">HOME</Link>
      <img src={arrow_icon} alt=">" className="w-3 h-3" />
      <Link to="/" className="hover:text-red-500 transition-colors">SHOP</Link>
      <img src={arrow_icon} alt=">" className="w-3 h-3" />
      <span className="capitalize hover:text-red-500 cursor-pointer transition-colors">{product.category}</span>
      <img src={arrow_icon} alt=">" className="w-3 h-3" />
      <span className="text-gray-800 font-medium truncate max-w-xs">{product.name}</span>
    </nav>
  );
};

Breadcrum.propTypes = {
  product: PropTypes.shape({
    category: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Breadcrum;
