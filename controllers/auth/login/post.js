import { User } from '../../../models/user.js';

export default (req, res) => {
  if (
    !req.body.email || typeof req.body.email !== 'string' ||
    !req.body.password || typeof req.body.password !== 'string'
  )
    return res.status(400).json({ success: false, error: 'Invalid request' });

  User.authenticateUser(req.body, (err, user) => {
    if (err)
      return res.status(400).json({ success: false, error: err });

    req.session.userId = user._id;

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user,
    });
  });
};
