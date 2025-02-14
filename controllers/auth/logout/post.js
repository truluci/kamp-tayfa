import { User } from "../../../models/user.js";

export default (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
      return res.status(500).send({ success: false, error: "Logout failed" });
    }
    res.clearCookie('connect.sid');
    return res.redirect('/');
  });
};
