import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import productRoutes from './routes/product.routes.js';
import userRoutes from './routes/user.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import orderRoutes from './routes/order.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app  = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'upload/images')));

// Connect DB
connectDB();

// Routes
app.use(productRoutes);
app.use(userRoutes);
app.use(paymentRoutes);
app.use(orderRoutes);

// Health check
app.get('/', (_req, res) => res.send('Express App is running'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
