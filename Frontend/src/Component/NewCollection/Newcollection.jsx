import { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import Item from '../Item/Item';

const Newcollection = () => {
  const { newCollection, loading } = useContext(ShopContext);

  return (
    <section className="py-16 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <span className="text-xs font-semibold text-red-500 uppercase tracking-widest">Just Dropped</span>
        <h2 className="text-3xl font-bold text-gray-900 mt-1">New Collections</h2>
        <div className="mt-3 mx-auto w-16 h-1 bg-gradient-to-r from-red-500 to-orange-400 rounded-full" />
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-xl h-64 mb-3" />
              <div className="bg-gray-200 rounded h-4 mb-2 w-3/4" />
              <div className="bg-gray-200 rounded h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {newCollection.map((item) => (
            <Item key={item.id} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Newcollection;
