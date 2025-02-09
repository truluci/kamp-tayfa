import { User } from '../../../models/user.js';

export default (req, res) => {
  if (!req.body.email || typeof req.body.email !== 'string' || !req.body.password || typeof req.body.password !== 'string')
    return res.status(400).redirect('/auth/login');

  // TODO: add type checks to all controllers

  User.findByCredentials(req.body.email, req.body.password)
    .then((user) => {
      user.generateAuthToken()
        .then((token) => {
          return res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
          }).redirect('/memes');
        })
        .catch(err => {
          console.error(err);
          return res.status(500).send();
        });
    })
    .catch(err => {
      console.error(err);
      return res.status(400).redirect('/auth/login');
    });
};
