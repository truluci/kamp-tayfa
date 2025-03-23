import "dotenv/config.js";
import { Meme } from "../../models/meme.js";

export default (req, res) => {
  Meme.deleteMeme({
    memeId: req.params.id,
    owner: req.user._id,
    bucket: process.env.R2_BUCKET_NAME,
  }, err => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, error: err });
    }

    return res.status(204).end();
  });
};