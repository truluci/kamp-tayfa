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

  User.loginAndGenerateToken(req.body.email, req.body.password)
  .then(({ user, token }) => {
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    }).send({
      success: true,
      message: 'Login successful',
      user,
      token,
    });
  })
  .catch(err => {
    console.error(err);
    res.status(400).send({
      success: false,
      error: err.message,
    });
  });

};
