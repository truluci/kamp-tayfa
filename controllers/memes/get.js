import { Meme } from '../../models/meme.js';

export default (req, res) => {
  Meme.findMemesByFilters(req.query, (err, memes) => {
    if (err) {
      console.error(err);
      return res.status(500).send('database_error');
    }

    return res.render('memes/memes', {
      page: 'memes/memes',
      title: 'memes',
      includes: {
        js: ['page'],
        css: ['header', 'page', 'general']
      },
      memes,
      user: req.user,
      search: req.query.search || ''
    });;
  });
};
