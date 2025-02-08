import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/user.js';

dotenv.config({ path: './config/.env' });

export const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};