import Order from '../models/order.model.js';

export const createOrder = async (req, res) => {
  try {
    const { cartItems, totalAmount, shippingDetails, paymentStatus } = req.body;

    if (!cartItems || cartItems.length === 0 || totalAmount <= 0 || !shippingDetails) {
      return res.status(400).json({ error: 'Invalid order details.' });
    }

    const order = new Order({ cartItems, totalAmount, shippingDetails, paymentStatus });
    const saved = await order.save();

    res.status(201).json({ message: 'Order successfully placed!', order: saved });
  } catch (error) {
    console.error('Order error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const getAllOrders = async (_req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
