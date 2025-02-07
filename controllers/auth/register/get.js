import {User} from '../../../models/user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

export const renderRegister = (_req, res) => {
  res.render('auth/register', {
    page: 'auth/register',
    title: 'register',
    includes: {
      js: ['page'],
      css: ['header', 'page', 'general']
    }
  });
};

dotenv.config();

export const register = async (req, res) => {
  const user = new User(req.body);

  try {
      await user.save();
      const token = await user.generateAuthToken();
      res.status(201).send({user, token});
  } catch (e) {
      res.status(400).send(e);
  }
}