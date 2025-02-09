import { Meme } from '../../models/meme.js';

export default (req, res) => {
  const meme = new Meme({
    ...req.body,
    owner: req.user._id
  });

  meme.save()
    .then(() => {
      return res.send({
        success: true,
        meme
      });
    })
    .catch(err => {
      console.error(err);
      return res.send({
        success: false,
        error: 'An error occurred while adding meme'
      });
    });
  // Meme.createMeme(req.body, (err, meme) => {
  //   if (err) {
  //     console.error(err);
  //     return res.send({
  //       success: false,
  //       error: 'An error occurred while adding meme'
  //     });
  //   };

  //   return res.send({
  //     success: true,
  //     meme
  //   });
  // });
};
