import { Meme } from '../../models/meme.js';

export default (_req, res) => {
  Meme.find({})
    .then(memes => {
      return res.render('index/memes', {
        page: 'index/memes',
        title: 'memes',
        includes: {
          js: ['page'],
          css: ['header', 'page', 'general']
        },
        memes
      });
    })
    .catch(err => {
      console.error(err);

      return res.status(500).send('An error occurred while getting memes');
    });
};
