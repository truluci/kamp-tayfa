import { User } from '../models/user.js';

export default (req, res, next) => {
  if (!req.session.userId) return res.status(401).redirect('/auth/login');

  User.findById(req.session.userId)
    .then(user => {
      if (!user) return res.status(401).redirect('/auth/login');

      req.user = user;
      return next();
    })
    .catch(err => {
      console.error(err);
      res.status(401).redirect('/auth/login');
    });
};