import { Meme } from '../../models/meme.js';

export default (req, res) => {
  if (
    !req.body.title || typeof req.body.title !== 'string' ||
    !req.body.description || typeof req.body.description !== 'string' ||
    !req.body.memeUrl || typeof req.body.memeUrl !== 'string'
  )
    return res.send({
      success: false,
      error: 'Invalid input'
    });

  Meme.createMeme({ ...req.body, owner: req.user._id }, (err, meme) => {
    if (err)
      return res.send({
        success: false,
        error: 'Meme creation failed'
      });

    return res.send({
      success: true,
      message: 'Meme created successfully',
      meme,
    });
  });
};
