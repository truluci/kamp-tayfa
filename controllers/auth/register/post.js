import { User } from '../../../models/user.js';

export default (req, res) => {
  if (
    !req.body.email || typeof req.body.email !== 'string' ||
    !req.body.password || typeof req.body.password !== 'string'
  )
    return res.status(400).send({
      success: false,
      error: 'Invalid request',
    });

  User.registerUserAndGenerateToken({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }, (err, { user, token }) => {
    if (err)
      return res.status(400).send({
        success: false,
        error: err,
      });

    return res
      .cookie('auth_token', data.token)
      .status(201)
      .send({
        success: true,
        message: 'User registered successfully',
        user: user,
        token: token,
      });
  });
};
