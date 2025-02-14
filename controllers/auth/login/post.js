import { User } from '../../../models/user.js';

export default (req, res) => {
  if (!req.body.email || typeof req.body.email !== 'string' ||
      !req.body.password || typeof req.body.password !== 'string') {
    return res.status(400).send({ success: false, error: 'Invalid request' });
  }

  User.login(req.body, (err, user) => {
    if (err) {
      return res.status(400).send({ success: false, error: 'Authentication failed' });
    }

    req.session.userId = user._id;
    
    return res.send({
      success: true,
      message: 'Login successful',
      user,
    });
  });
};
