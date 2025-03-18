import 'dotenv/config';
import { Meme } from '../../models/meme.js';

export default (req, res) => {
  if (
    !req.body.title || typeof req.body.title !== 'string' ||
    !req.body.description || typeof req.body.description !== 'string' ||
    !req.file || !req.file.path || typeof req.file.path !== 'string'
  )
    return res.status(400).json({ success: false, error: 'bad_input' });

  const fileType = req.file.mimetype.startsWith('image') ? 'image' : 'video';

  Meme.createMemeAndUpload({
    title: req.body.title,
    description: req.body.description,
    filePath: req.file.path,
    fileType,
    bucket: process.env.R2_BUCKET_NAME,
    owner: req.user._id
  }, (err, meme) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, error: err });
    }

    return res.status(201).json({ success: true, meme });
  });
};
