import mongoose from 'mongoose';

const memeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  memeUrl: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
}, {
  timestamps: true
});

memeSchema.statics.createMeme = function(data, callback) {
  if (!data || typeof data !== 'object')
    return callback('bad_request');

  if (!data.title || typeof data.title !== 'string')
    return callback('bad_request');

  if (!data.description || typeof data.description !== 'string')
    return callback('bad_request');

  if (!data.memeUrl || typeof data.memeUrl !== 'string')
    return callback('bad_request');

  const meme = new Meme({
    title: data.title,
    description: data.description,
    memeUrl: data.memeUrl,
    owner: data.owner,
  });

  meme
    .save()
    .then(() => callback(null, meme))
    .catch(err => {
      console.error(err);
      return callback('database_error');
    });
};

export const Meme = mongoose.model('Meme', memeSchema);
