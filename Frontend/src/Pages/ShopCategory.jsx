import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { ShopContext } from "../Context/ShopContext";
import drop_down from "../Assets/Frontend_Assets/dropdown_icon.png";
import Item from "../Component/Item/Item";

const SORT_OPTIONS = [
  { label: 'Default', value: 'default' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Name A–Z', value: 'name_asc' },
];

const ShopCategory = ({ banner, category }) => {
  const { all_product, loading } = useContext(ShopContext);
  const [sort, setSort] = useState('default');
  const [sortOpen, setSortOpen] = useState(false);

  let filtered = all_product.filter((item) => item.category === category);

  if (sort === 'price_asc') filtered = [...filtered].sort((a, b) => a.new_price - b.new_price);
  else if (sort === 'price_desc') filtered = [...filtered].sort((a, b) => b.new_price - a.new_price);
  else if (sort === 'name_asc') filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  const activeLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-8">
      {/* Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-lg mb-10 group">
        <img src={banner} alt="Category Banner" className="w-full h-52 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8">
          <h1 className="text-3xl sm:text-4xl font-black text-white capitalize tracking-tight">
            {category === 'kid' ? "Kids' Collection" : `${category}'s Collection`}
          </h1>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex justify-between items-center mb-8">
        <p className="text-sm text-gray-500">
          {loading ? 'Loading...' : (
            <><span className="font-semibold text-gray-800">{filtered.length}</span> products found</>
          )}
        </p>

        {/* Sort dropdown */}
        <div className="relative">
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 hover:border-red-300 transition-colors shadow-sm"
          >
            <span>{activeLabel}</span>
            <img src={drop_down} alt="" className={`w-3 h-3 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
          </button>
          {sortOpen && (
            <div className="absolute right-0 top-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-20 min-w-44 overflow-hidden">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { setSort(opt.value); setSortOpen(false); }}
                  className={`w-full text-left px-4 py-3 text-sm transition-colors ${sort === opt.value ? 'bg-red-50 text-red-500 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
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
      ) : filtered.length === 0 ? (
        <div className="text-center py-24 text-gray-400">
          <p className="text-5xl mb-4">🛍️</p>
          <p className="text-lg font-medium">No products found in this category</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <Item key={item.id} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          ))}
        </div>
      )}

      {/* Load more */}
      {!loading && filtered.length > 0 && (
        <div className="flex justify-center mt-16">
          <button className="px-10 py-4 rounded-full border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:border-red-400 hover:text-red-500 transition-all duration-200">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

ShopCategory.propTypes = {
  banner: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default ShopCategory;
