import { Router } from 'express';
import { createOrder, getAllOrders } from '../controllers/order.controller.js';

const router = Router();

router.post('/api/order', createOrder);
router.get('/api/orders', getAllOrders);

export default router;
