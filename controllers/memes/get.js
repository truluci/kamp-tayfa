import { Meme } from '../../models/meme.js';

export default (req, res) => {
  // TODO: static function

  Meme.find()
    .then(memes => {
      return res.render('memes/memes', {
        page: 'memes/memes',
        title: 'memes',
        includes: {
          js: ['page'],
          css: ['header', 'page', 'general']
        },
        memes,
        user: req.user
      });
    })
    .catch(err => {
      console.error(err);

      return res.status(500).send('An error occurred while getting memes');
    });
};
