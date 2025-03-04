import mongoose from 'mongoose';
import { uploadToR2 } from '../utils/r2.js';

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
  filename: {
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

memeSchema.statics.createMemeAndUploadToR2 = function (data, callback) {
  if (!data || typeof data !== 'object') return callback('bad_request');

  if (!data.title || typeof data.title !== 'string') return callback('bad_request');

  if (!data.description || typeof data.description !== 'string') return callback('bad_request');

  if (!data.filePath || typeof data.filePath !== 'string') return callback('bad_request');

  if (!data.bucket || typeof data.bucket !== 'string') return callback('bad_request');

  if (!data.owner) return callback('bad_request');

  uploadToR2({ filePath: data.filePath, bucket: data.bucket }, (err, filename) => {
    if (err) return callback(err);

    const meme = new Meme({
      title: data.title,
      description: data.description,
      filename,
      owner: data.owner,
    });

    meme
      .save()
      .then((meme) => callback(null, meme))
      .catch((err) => {
        console.error('Database Error:', err);
        return callback('database_error');
      });
  });
};


memeSchema.statics.findMemesByFilters = function(filters, callback) {
  if (!filters || typeof filters !== 'object')
    return callback('bad_request');

  Meme.find(filters)
    .then(memes => callback(null, memes))
    .catch(err => {
      console.error(err);
      return callback('database_error');
    });
};

export const Meme = mongoose.model('Meme', memeSchema);
