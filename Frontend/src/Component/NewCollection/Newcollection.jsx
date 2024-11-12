import './Newcollection.css';
import new_collection from '../../Assets/Frontend_Assets/new_collections';
import Item from '../Item/Item';

const Newcollection = () => {
  return (
    <div className="collection-container">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collection-items">
        {new_collection.map((items, i) => (
          <Item
            key={i}
            id={items.id}
            name={items.name}
            image={items.image}
            new_price={items.new_price}
            old_price={items.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default Newcollection;
