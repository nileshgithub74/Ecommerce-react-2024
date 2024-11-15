import './RelatedProduct.css'
import data_product from '../../Assets/Frontend_Assets/data';
import Item from '../Item/Item';


const RelatedProduct = () => {
  return (
    <div className="relatedproducts">
      <h1>Related Product</h1>
      <hr/>
      <div className="realtedproducts-items">
        {data_product.map((items, i)=>{
          return <Item
          key={i}
          id={items.id}
          name={items.name}
          image={items.image}
          new_price={items.new_price}
          old_price={items.old_price} />
        })}

      </div>
    </div>
  )
}

export default RelatedProduct