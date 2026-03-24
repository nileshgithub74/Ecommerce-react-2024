import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { createClerkClient } from '@clerk/backend';

export const getAllUsers = async (_req, res) => {
  try {
    const users = await User.find({}, '-password -cartData').sort({ date: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch users', error: error.message });
  }
};

export const getClerkUsers = async (_req, res) => {
  try {
    const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
    const response = await clerk.users.getUserList({ limit: 100, orderBy: '-created_at' });
    const users = response.data.map((u) => ({
      id: u.id,
      name: [u.firstName, u.lastName].filter(Boolean).join(' ') || u.username || '—',
      email: u.emailAddresses?.[0]?.emailAddress || '—',
      imageUrl: u.imageUrl,
      createdAt: u.createdAt,
      lastSignInAt: u.lastSignInAt,
    }));
    res.json({ total: response.totalCount, users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch Clerk users', error: error.message });
  }
};

const JWT_SECRET = process.env.JWT_SECRET || 'secret_ecom';

export const signup = async (req, res) => {
  try {
    const existing = await User.findOne({ email: req.body.email });
    if (existing) {
      return res.status(400).json({ success: false, errors: 'User already exists with this email' });
    }

    const cartData = {};
    for (let i = 0; i < 300; i++) cartData[i] = 0;

    const user = new User({
      name:     req.body.username,
      email:    req.body.email,
      password: req.body.password,
      cartData,
    });

    await user.save();
    const token = jwt.sign({ user: { id: user.id } }, JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Signup failed', error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ success: false, errors: 'Wrong email' });
    if (req.body.password !== user.password) return res.status(400).json({ success: false, errors: 'Wrong password' });

    const token = jwt.sign({ user: { id: user.id } }, JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Login failed', error: error.message });
  }
};
