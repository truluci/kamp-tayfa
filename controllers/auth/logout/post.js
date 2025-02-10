import { User } from "../../../models/user.js";

export default (req, res) => {
  if (!req.user || !req.token)
    return res.status(401).redirect('/auth/login');

  User.logout(req.user._id, req.token)
  .then(() => {
    res.clearCookie('token').redirect('/auth/login');
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send({ error: "Logout failed" });
  });
};
