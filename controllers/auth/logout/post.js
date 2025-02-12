import { User } from "../../../models/user.js";

// TODO: destroy session

export default (req, res) => {
  if (!req.user || !req.token)
    return res.status(401).send({ error: "Unauthorized" });

  User.logoutAndRemoveToken(req.user, req.token)
    .then(() => res.clearCookie("token").redirect("/"))
    .catch((error) => res.status(500).send({ error: error.message }));
};
