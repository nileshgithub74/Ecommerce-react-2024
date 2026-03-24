import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id:        { type: Number, required: true, unique: true },
  name:      { type: String, required: true },
  image:     { type: String },
  category:  { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  date:      { type: Date, default: Date.now },
  available: { type: Boolean, required: true },
});

const Product = mongoose.model('Product', productSchema);
export default Product;
