import { Router } from 'express';
import { signup, login, getAllUsers, getClerkUsers } from '../controllers/user.controller.js';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/api/users', getAllUsers);
router.get('/api/clerk-users', getClerkUsers);

export default router;
