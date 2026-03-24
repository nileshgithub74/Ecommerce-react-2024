import { Router } from 'express';
import { signup, login, getAllUsers } from '../controllers/user.controller.js';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/api/users', getAllUsers);

export default router;
