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

// TODO: change authentication logic to server-side cookie and express-session

// // isAuth.js

// const Admin = require('../models/admin/Admin');

// module.exports = (req, res, next) => {
//   if (req.session && req.session.admin)
//     Admin.findAdminByIdAndFormat(req.session.admin._id, (err, admin) => {
//       if (err) return res.status(401).redirect('/auth/login');

//       req.session.admin = admin;
//       return next();
//     });
// };


// // ----------------

// // login.js

// module.exports = (req, res) => {
//   Admin.findAdminByEmailAndVerifyPassword(req.body, (err, admin) => {
//     if (err) {
//       res.write(JSON.stringify({ error: err, success: false }));
//       return res.end();
//     }

//     req.session.admin = admin;

//     res.write(JSON.stringify({ redirect: req.session.redirect, success: true }));
//     return res.end();
//   });
// };
