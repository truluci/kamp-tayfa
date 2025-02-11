import { User } from "../../../models/user.js";

export default (req, res) => {
  if (!req.user || !req.token)
    return res.status(401).send({ error: "Unauthorized" });

  User.logout(req.user._id, req.token)
  .then(() => {
    res.clearCookie('token').send({
      success: true,
      message: "Logout successful",
    })
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send({
      success: false,
      error: err.message,
    })
  });
};
