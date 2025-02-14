import { User } from '../../../models/user.js';

export default (req, res) => {
  User.createUser(req.body, (err, user) => {
    if (err)
      return res.status(400).json({ success: false, error: err });

    req.session.userId = user._id;

    return res.status(200).json({ success: true, message: "Registration successful", user });
  });
};
