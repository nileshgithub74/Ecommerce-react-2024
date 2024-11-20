import { useEffect, useState } from "react";
import cross_icon from "../../assets/cross_icon.png"; 
import "./ListProduct.css";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [error, setError] = useState("");

  const fetchInfo = async () => {
    try {
      const response = await fetch("http://localhost:4000/allproduct?page=1&limit=10"); // Add pagination if needed
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();

      if (data.success) {
        setAllProducts(data.data.products); // Access products from `data`
      } else {
        setError(data.message || "Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    try {
      const response = await fetch("http://localhost:4000/removeproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();

      if (data.success) {
        fetchInfo(); // Refresh products after removal
      } else {
        console.error("Error removing product:", data.message);
        setError(data.message || "Failed to remove product");
      }
    } catch (error) {
      console.error("Error removing product:", error);
      setError("Failed to remove product");
    }
  };

  return (
    <div className="listproduct">
      <h1>All Product Lists</h1>

      {error && <p className="error-message">{error}</p>}

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
        {allProducts.length > 0 ? (
          allProducts.map((product) => (
            <div key={product.id} className="listProduct-format-main listproduct-format">
              <img
                src={product.image || "placeholder-image-url"}
                alt={product.name}
                className="listproduct-product-icon"
              />
              <p>{product.name}</p>
              <p>₹{product.old_price}</p>
              <p>₹{product.new_price}</p>
              <p>{product.category}</p>
              <img
                className="listproduct-remove-icon"
                src={cross_icon}
                alt="Remove"
                onClick={() => removeProduct(product.id)}
              />
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ListProduct;
