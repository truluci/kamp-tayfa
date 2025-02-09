import { Meme } from '../../models/meme.js';

export const renderMemes = async (_req, res) => {
  try {
    const memes = await Meme.find({});
    res.render('index/memes', {
      page: 'index/memes',
      title: 'memes',
      includes: {
        js: ['page'],
        css: ['header', 'page', 'general']
      },
      memes // Pass the memes array to the view
    });
  } catch (e) {
    res.status(500).send('Failed to load memes');
  }
};

export const addMeme = async (req, res) => {
  const meme = new Meme({
    ...req.body,
    owner: req.user._id
  });

  try {
    await meme.save();
    renderMemes(req, res);
    // res.status(201).send(meme);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const getMemesPage = async (req, res) => {
  try {
    const memes = await Meme.find({});
    res.render('memes', { memes });
  } catch (e) {
    res.status(500).send();
  }
};