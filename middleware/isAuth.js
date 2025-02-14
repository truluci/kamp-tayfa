import { User } from '../models/user.js';

export default (req, res, next) => {
  if (!req.session.userId)
    return res.status(401).redirect('/auth/login');

  User.findUserById(req.session.userId, (err, user) => {
    if (err || !user)
      return res.status(401).redirect('/auth/login');

    req.user = user;

    return next();
  });
};
