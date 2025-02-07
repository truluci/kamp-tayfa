import { User } from '../../../models/user.js';
// import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

export const renderLogin = (_req, res) => {
  res.render('auth/login', {
    page: 'auth/login',
    title: 'login',
    includes: {
      js: ['page'],
      css: ['header', 'page', 'general']
    }
  });
};

dotenv.config();

export const login = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user: user, token });
  } catch (e) {
      res.status(400).send();
      console.log(e);
  }
};

export const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
}