import './BreadCrum.css';
import arrow_icon from '../Assets/Frontend_Assets/breadcrum_arrow.png';
import PropTypes from 'prop-types'; 
const Breadcrum = (props) => {
  const { product } = props;

  return (
    <div className="breadcrum">
      <span>HOME</span> <img src={arrow_icon} alt="arrow" /> 
      <span>SHOP</span> <img src={arrow_icon} alt="arrow" /> 
      <span>{product.category}</span> <img src={arrow_icon} alt="arrow" /> 
      <span>{product.name}</span>
    </div>
  );
};


Breadcrum.propTypes = {
  product: PropTypes.shape({
    category: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Breadcrum;
