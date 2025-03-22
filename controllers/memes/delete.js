import { Meme } from "../../models/meme.js";

export default (req, res) => {
  Meme.deleteMeme({
    memeId: req.params.memeId,
    owner: req.user._id
  }, err => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, error: err });
    }

    return res.status(204).end();
  });
};