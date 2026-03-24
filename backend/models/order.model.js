import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  cartItems:       { type: Array },
  totalAmount:     { type: Number },
  shippingDetails: { type: Object },
  paymentStatus:   { type: String },
  orderDate:       { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
