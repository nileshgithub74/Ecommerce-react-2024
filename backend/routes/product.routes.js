import { Router } from 'express';
import upload from '../middleware/upload.middleware.js';
import {
  uploadImage,
  addProduct,
  removeProduct,
  getAllProducts,
  getNewCollection,
} from '../controllers/product.controller.js';

const router = Router();

router.post('/upload', upload.single('product'), uploadImage);
router.post('/addproducts', addProduct);
router.post('/removeproduct', removeProduct);
router.get('/allproduct', getAllProducts);
router.get('/newcollection', getNewCollection);

export default router;
