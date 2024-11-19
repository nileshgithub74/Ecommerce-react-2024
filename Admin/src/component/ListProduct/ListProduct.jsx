import { useEffect, useState } from "react";
import cross_icon from '../../assets/cross_icon.png'; 
import './ListProduct.css'

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  // Fetch all products
  const fetchInfo = async () => {
    try {
      const response = await fetch('http://localhost:4000/allproducts');
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch products when the component mounts
  useEffect(() => {
    fetchInfo();
  }, []);

  // Remove product by its ID
  const removeProduct = async (id) => {
    await fetch('http://localhost:4000/removeproduct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }), // Send the product ID in the request body
    });

    // Re-fetch products after removal
    await fetchInfo();
  };

  return (
    <div className="listproduct">
      <h1>All Product Lists</h1>

      <div className="list-product-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>

      <div className="listproducts-allproducts">
        <hr />
        {allproducts.map((product) => (
          <div key={product._id} className="listProduct-format-main listproduct-format">
            <img src={product.image} alt={product.name} className="listproduct-product-icon" />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img
              className="listproduct-remove-icon"
              src={cross_icon}
              alt="Remove"
              onClick={() => removeProduct(product.id)} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
