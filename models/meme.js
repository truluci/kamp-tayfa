import { uploadToR2 } from '../utils/r2.js';
import { uploadToYouTube } from '../utils/youtube.js';
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
  fileType: {
    type: String,
    required: true,
    enum: ['image', 'video'],
  },
  filename: String,
  videoId: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
}, { timestamps: true });

memeSchema.statics.createMemeAndUpload = function (data, callback) {
  if (!data || typeof data !== 'object') return callback('bad_request');
  if (!data.title || typeof data.title !== 'string') return callback('bad_request');
  if (!data.description || typeof data.description !== 'string') return callback('bad_request');
  if (!data.filePath || typeof data.filePath !== 'string') return callback('bad_request');
  if (!data.fileType || !['image', 'video'].includes(data.fileType)) return callback('bad_request');
  if (!data.owner) return callback('bad_request');

  if (data.fileType === 'image') {
    // Upload image to R2
    uploadToR2({ filePath: data.filePath, bucket: data.bucket }, (err, filename) => {
      if (err) return callback(err);
      Meme.create({ 
        title: data.title,
        description: data.description,
        fileType: 'image',
        filename,
        owner: data.owner
      })
        .then(meme => callback(null, meme))
        .catch(err => {
          console.error('Database Error:', err);
          return callback('database_error');
        });
    });
  } else if (data.fileType === 'video') {
    // Upload video to YouTube
    uploadToYouTube({ filePath: data.filePath, title: data.title, description: data.description }, (err, videoId) => {
      if (err) return callback(err);
      Meme.create({ title: data.title, description: data.description, fileType: 'video', videoId, owner: data.owner })
        .then(meme => callback(null, meme))
        .catch(err => {
          console.error('Database Error:', err);
          return callback('database_error');
        });
    });
  }
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
};

export const Meme = mongoose.model('Meme', memeSchema);
