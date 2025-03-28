import { Meme } from '../../../models/meme.js';

export default (req, res) => {
  const { search, lastMemeId } = req.query;

  Meme.findMemesByFilters({ search, lastMemeId }, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, error: 'database_error' });
    }
    return res.status(200).json({ success: true, memes: result.memes });
  });
};