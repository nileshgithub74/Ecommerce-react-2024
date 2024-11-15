import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; 
import './Item.css';

const Item = (props) => {
  return (
    <div className="item">
      <Link to={`/product/${props.id}`}>
        <img onClick={window.scrollTo(0,0)}    src={props.image} alt="" />
      </Link>
      <p>{props.name}</p>

      <div className="item-price">
        <div className="item-price-new">
          ${props.new_price}
        </div>

        <div className="item-price-old">
          ${props.old_price}
        </div>
      </div>
    </div>
  );
}

Item.propTypes = {
  id: PropTypes.number.isRequired,  // Added id prop validation
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  new_price: PropTypes.string.isRequired,
  old_price: PropTypes.string.isRequired,
};

export default Item;
