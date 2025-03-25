import { Meme } from "../../models/meme.js";

export default (req, res) => {
  Meme.updateMeme({
    memeId: req.params.id,
    owner: req.user._id,
    title: req.body.title,
    description: req.body.description,
  }, (err, meme) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, error: err });
    }

    return res.status(200).json({ success: true, meme });
  });
};