import Product from '../models/product.model.js';

export const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: 0, message: 'No file uploaded' });
  }
  const backendUrl = process.env.BASE_URL || process.env.BACKEND_URL || 'http://localhost:4000';
  res.json({
    success: 1,
    image_url: `${backendUrl}/images/${req.file.filename}`,
  });
};

export const addProduct = async (req, res) => {
  try {
    const lastProduct = await Product.findOne().sort({ id: -1 });
    const newId = lastProduct ? lastProduct.id + 1 : 1;

    const { name, image, category, new_price, old_price, available } = req.body;

    const product = new Product({ id: newId, name, image, category, new_price, old_price, available });
    const saved = await product.save();

    res.status(201).json({ success: true, message: 'Product added successfully', product: saved });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add product', error: error.message });
  }
};

export const removeProduct = async (req, res) => {
  try {
    await Product.findOneAndDelete({ id: req.body.id });
    res.json({ success: true, name: req.body.name });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to remove product', error: error.message });
  }
};

export const getAllProducts = async (_req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch products', error: error.message });
  }
};

export const getNewCollection = async (_req, res) => {
  try {
    const products = await Product.find({});
    const newCollection = products.slice(1).splice(-8);
    res.json(newCollection);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch new collection', error: error.message });
  }
};
