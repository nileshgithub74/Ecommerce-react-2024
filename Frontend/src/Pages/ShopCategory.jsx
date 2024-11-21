import { useContext } from "react";
import PropTypes from "prop-types"; 
import "./ShopCategory.css";

import { ShopContext } from "../Context/ShopContext";

import drop_down from "../Assets/Frontend_Assets/dropdown_icon.png";
import Item from "../Component/Item/Item";

const ShopCategory = (props) => {

  const { all_product } = useContext(ShopContext);



  return (
    <div className="shop-category">
      <img src={props.banner} alt="Banner" />
      <div className="shopcategory-indexsort">
        <p>
          <span>Showing 1-12</span> out of 36 Products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={drop_down} alt="Sort Dropdown" />
        </div>
      </div>

      <div className="shopcategory-product">
        {all_product.map((items)=>{
         if (props.category === items.category) {
          return (
            <Item
              key={items.id}
              id={items.id}
              name={items.name}
              image={items.image}
              new_price={items.new_price}
              old_price={items.old_price}
            />
          );
        }
        })}
      
       
      </div>
      <div className="shopcategory-loadmore">
         Explore more 
      </div>
    </div>
  );
};

ShopCategory.propTypes = {
  banner: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default ShopCategory;
