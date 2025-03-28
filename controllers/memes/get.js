import { Meme } from '../../models/meme.js';

export default (req, res) => {
  Meme.findMemesByFilters({ search: req.query.search, limit: 9 }, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('database_error');
    }

    return res.render('memes/memes', {
      page: 'memes/memes',
      title: 'Memes',
      includes: { js: ['page'], css: ['header', 'page', 'general'] },
      memes: result.memes,
      user: req.user,
      search: req.query.search || '',
    });
  });
};