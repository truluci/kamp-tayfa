import { Meme } from '../../models/meme.js';

export const renderMemes = (_req, res) => {
  res.render('index/memes', {
    page: 'index/memes',
    title: 'memes',
    includes: {
      js: ['page'],
      css: ['header', 'page', 'general']
    }
  });
};

export const addMeme = async (req, res) => {
  const meme = new Meme({
    ...req.body,
    owner: req.user._id
  });

  try {
    await meme.save();
    res.status(201).send(meme);
  } catch (e) {
    res.status(400).send(e);
  }
};