import { Meme } from '../../models/meme.js';

export default (req, res) => {
  if (
    !req.body.title || typeof req.body.title !== 'string' ||
    !req.body.description || typeof req.body.description !== 'string' ||
    !req.body.memeUrl || typeof req.body.memeUrl !== 'string'
  )
    return res.status(400).json({
      success: false,
      error: 'bad_input'
    });

  Meme.createMeme({ ...req.body, owner: req.user._id }, (err, meme) => {
    if (err)
      return res.status(400).json({
        success: false,
        error: 'database_error'
      });

    return res.status(200).json({
      success: true,
      message: 'Meme created successfully',
      meme,
    });
  });
};
