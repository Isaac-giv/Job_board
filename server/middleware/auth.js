import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;
  if (req.headers['x-auth-token']) {
    token = req.headers['x-auth-token'];
  }
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.user.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ msg: 'User not found' });
    }
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export const employerOnly = (req, res, next) => {
  if (req.user.role !== 'employer') {
    return res.status(403).json({ msg: 'Access denied: employers only' });
  }
  next();
};

export const seekerOnly = (req, res, next) => {
  if (req.user.role !== 'seeker') {
    return res.status(403).json({ msg: 'Access denied: seekers only' });
  }
  next();
};