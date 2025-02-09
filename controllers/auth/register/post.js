import { User } from '../../../models/user.js';

// TODO: post requests shouldn't render or redirect, they should return json, frontend should handle the response

export default (req, res) => {
  const user = new User(req.body);

  user.save()
    .then(user.generateAuthToken)
    .then(token => {
      return res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
      }).redirect('/memes');
    })
    .catch(err => {
      console.error(err);
      return res.redirect('/auth/register');
    });
};
