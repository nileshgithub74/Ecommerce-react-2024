import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';
import { useState } from 'react';

const AddProduct = () => {
  const [image, setImage] = useState(null); 
  const [productDetail, setProductDetail] = useState({
    name: "",
    category: "women",
    new_price: "",
    old_price: "",
    available: true, 
  });

  // Handler for input changes
  const changeHandler = (e) => {
    setProductDetail({ ...productDetail, [e.target.name]: e.target.value });
  };

  // Handler for image file input
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  // Add product function
  const addProduct = async () => {
    try {
      // Step 1: Upload the image
      const formData = new FormData();
      formData.append("product", image); // 'product' is the field expected by backend

      const uploadResponse = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (!uploadData.success) {
        alert("Image upload failed");
        return;
      }

      // Step 2: Add product details
      const product = {
        ...productDetail,
        image: uploadData.image_url, // Set the uploaded image URL
      };

      const response = await fetch('http://localhost:4000/addproducts', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      const data = await response.json();

      if (data.success) {
        alert("Product added successfully!");
        // Reset form
        setProductDetail({
          name: "",
          category: "women",
          new_price: "",
          old_price: "",
          available: true,
        });
        setImage(null);
      } else {
        alert("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("An error occurred while adding the product");
    }
  };

  return (
    <div className='addproduct'>
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input
          type="text"
          name="name"
          placeholder="Type here"
          value={productDetail.name}
          onChange={changeHandler}
        />
      </div>

      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            type="text"
            name="old_price"
            placeholder="Type here"
            value={productDetail.old_price}
            onChange={changeHandler}
          />
        </div>

        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            type="text"
            name="new_price"
            placeholder="Type here"
            value={productDetail.new_price}
            onChange={changeHandler}
          />
        </div>

        <div className="addproduct-itemfield">
          <p>Product Category</p>
          <select
            name="category"
            className="add-product-selector"
            value={productDetail.category}
            onChange={changeHandler}
          >
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kids</option>
          </select>
        </div>

        <div className="addproduct-itemfield">
          <label htmlFor="file-input">
            <img
              src={image ? URL.createObjectURL(image) : upload_area}
              className="addproduct-thumbnail-img"
              alt="Thumbnail"
            />
          </label>
          <input
            type="file"
            id="file-input"
            name="image"
            hidden
            onChange={imageHandler}
          />
        </div>

        <div className="addproduct-itemfield">
          <p>Availability</p>
          <select
            name="available"
            value={productDetail.available}
            onChange={(e) =>
              setProductDetail({ ...productDetail, available: e.target.value === "true" })
            }
          >
            <option value="true">Available</option>
            <option value="false">Unavailable</option>
          </select>
        </div>

        <button onClick={addProduct} className="addproduct-btn">
          ADD
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
