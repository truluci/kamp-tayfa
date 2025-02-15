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

  Meme.create({
    title: data.title,
    description: data.description,
    memeUrl: data.memeUrl,
    owner: data.owner,
  })
    .then(meme => callback(null, meme))
    .catch(err => {
      console.error(err);
      return callback('database_error');
    });
};

memeSchema.statics.findMemesByFilters = function(data, callback) {
  if (!data || typeof data !== 'object')
    return callback('bad_request');

  const filters = {};

  if (data.owner && typeof data.owner === 'string')
    filters.owner = data.owner;

  Meme.find(filters)
    .then(memes => callback(null, memes))
    .catch(err => {
      console.error(err);
      return callback('database_error');
    });
}

export const Meme = mongoose.model('Meme', memeSchema);
