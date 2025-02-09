import jwt from 'jsonwebtoken';

import { User } from '../models/user.js';

export default (req, res, next) => {
  const token = req.cookies.token;

  if (!token)
    return res.status(401).redirect('/auth/login');

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error(err);
      return res.status(401).redirect('/auth/login');
    };

    User.findOne({ _id: decoded._id, 'tokens.token': token })
      .then(user => {
        if (!user)
          return res.status(401).redirect('/auth/login');

        req.token = token;
        req.user = user;

        return next();
      })
      .catch(err => {
        console.error(err);
        res.status(401).redirect('/auth/login')
      });
  });
};
