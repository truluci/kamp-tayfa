import { Meme } from '../../models/meme.js';

export default (req, res) => {
  if (!req.body.title || typeof req.body.title !== 'string' || !req.body.description || typeof req.body.description !== 'string' || !req.body.memeUrl || typeof req.body.memeUrl !== 'string')
    return res.send({
      success: false,
      error: 'Invalid input'
    });

  Meme.addMeme({
    ...req.body,
    owner: req.user._id,
  })
    .then(() => {
      return res.send({
        success: true,
        message: 'Meme added successfully',
        meme: {
          title: req.body.title,
          description: req.body.description,
          memeUrl: req.body.memeUrl,
        }
      });
    })
    .catch((err) => {
      console.error(err);
      return res.send({
        success: false,
        error: 'Internal server error'
      });
    });
};
