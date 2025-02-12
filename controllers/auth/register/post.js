import { User } from '../../../models/user.js';

export default (req, res) => {
  if (!req.body.email || typeof req.body.email !== 'string' || !req.body.password || typeof req.body.password !== 'string')
    return res.status(400).send({
      success: false,
      error: 'Invalid request',
    });

  User.registerUserAndGenerateToken(req.body.name, req.body.email, req.body.password)
    .then(({ user, token }) => {
      res
        .cookie('auth_token', token)
        .status(201)
        .send({
          success: true,
          message: 'User registered successfully',
          user,
          token,
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({
        success: false,
        error: error.message,
      });
    });
};
