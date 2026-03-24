import { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import Item from '../Item/Item';
import PropTypes from 'prop-types';

const RelatedProduct = ({ category }) => {
  const { all_product, loading } = useContext(ShopContext);
  const related = all_product.filter((p) => p.category === category).slice(0, 4);

  return (
    <section className="py-12 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">You May Also Like</h2>
        <div className="mt-3 mx-auto w-16 h-1 bg-gradient-to-r from-red-500 to-orange-400 rounded-full" />
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-xl h-56 mb-3" />
              <div className="bg-gray-200 rounded h-4 mb-2 w-3/4" />
              <div className="bg-gray-200 rounded h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {related.map((item) => (
            <Item key={item.id} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          ))}
        </div>
      )}
    </section>
  );
};

RelatedProduct.propTypes = { category: PropTypes.string };
RelatedProduct.defaultProps = { category: 'women' };
export default RelatedProduct;
