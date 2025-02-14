import { User } from '../../../models/user.js';

export default (req, res) => {
  User.registerUser(req.body, (err, user) => {
    if (err) {
      return res.status(400).send({ success: false, error: err });
    }

    req.session.userId = user._id; // Store session after successful registration
    return res.send({ success: true, message: "Registration successful", user });
  });
};
