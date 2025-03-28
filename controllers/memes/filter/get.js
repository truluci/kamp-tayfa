import { Meme } from '../../../models/meme.js';

export default (req, res) => {
  const { search, lastMemeId } = req.query;
  console.log('Search:', search);
  console.log('Last Meme ID:', lastMemeId);
  Meme.findMemesByFilters({ search, lastMemeId }, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'database_error' });
    }
    return res.json(result.memes);
  });
};