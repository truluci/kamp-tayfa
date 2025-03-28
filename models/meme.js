import { Label } from './label.js';
import { uploadToR2, deleteFromR2 } from '../utils/r2.js';
import { uploadToYouTube, deleteFromYouTube } from '../utils/youtube.js';
import mongoose from 'mongoose';
import 'dotenv/config.js';

const DEFAULT_FILTER_LIMIT = 9;

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
  fileUrl: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  labels: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Label',
  }],
}, { timestamps: true });

memeSchema.statics.createMemeAndUpload = function (data, callback) {
  if (!data || typeof data !== 'object') return callback('bad_request');
  if (!data.title || typeof data.title !== 'string') return callback('bad_request');
  if (!data.description || typeof data.description !== 'string') return callback('bad_request');
  if (!data.filePath || typeof data.filePath !== 'string') return callback('bad_request');
  if (!data.fileType || !['image', 'video'].includes(data.fileType)) return callback('bad_request');
  if (!data.owner || !mongoose.isValidObjectId(data.owner)) return callback('bad_request');

  if (data.fileType === 'image') {
    uploadToR2({ filePath: data.filePath, bucket: data.bucket }, (err, filename) => {
      if (err) return callback(err);

      Meme.create({
        title: data.title,
        description: data.description,
        fileType: 'image',
        filename,
        fileUrl: `${process.env.R2_PUBLIC_ENDPOINT}/${filename}`,
        owner: data.owner
      })
        .then(meme => callback(null, meme))
        .catch(err => {
          console.error('Database Error:', err);
          return callback('database_error');
        });
    });
  } else if (data.fileType === 'video') {
    uploadToYouTube({ filePath: data.filePath, title: data.title, description: data.description }, (err, videoId) => {
      if (err) return callback(err);
      
      Meme.create({ 
        title: data.title,
        description: data.description,
        fileType: 'video',
        videoId,
        owner: data.owner
      })
        .then(meme => callback(null, meme))
        .catch(err => {
          console.error('Database Error:', err);
          return callback('database_error');
        });
    });
  } else {
    return callback('not_possible_error');
  }
};

memeSchema.statics.deleteMeme = function (data, callback) {
  if (!data || typeof data !== 'object') return callback('bad_request');
  if (!data.memeId || typeof data.memeId !== 'string') return callback('bad_request');
  if (!data.owner || !mongoose.isValidObjectId(data.owner)) return callback('bad_request');

  Meme.findById(data.memeId)
    .then(meme => {
      if (!meme) return callback('not_found');
      if (meme.owner.toString() !== data.owner.toString()) return callback('not_authorized');

      if (meme.fileType === 'image') {
        deleteFromR2({ filename: meme.filename, bucket: data.bucket }, err => {
          if (err) return callback(err);

          Meme.deleteOne({ _id: meme._id })
            .then(() => callback(null))
            .catch(err => {
              console.error('Database Error:', err);
              return callback('database_error');
            });
        });
      } else if (meme.fileType === 'video') {
        deleteFromYouTube({ videoId: meme.videoId }, err => {
          if (err) return callback(err);

          Meme.deleteOne({ _id: meme._id })
            .then(() => callback(null))
            .catch(err => {
              console.error('Database Error:', err);
              return callback('database_error');
            });
        });
      }
    })
    .catch(err => {
      console.error('Database Error:', err);
      return callback('database_error');
    });
};

memeSchema.statics.updateMeme = function (data, callback) {
  if (!data || typeof data !== 'object') return callback('bad_request');
  if (!data.memeId || typeof data.memeId !== 'string') return callback('bad_request');
  if (!data.owner || !mongoose.isValidObjectId(data.owner)) return callback('bad_request');

  Meme.findById(data.memeId)
    .then(meme => {
      if (!meme) return callback('not_found');
      if (meme.owner.toString() !== data.owner.toString()) return callback('not_authorized');

      if (data.title && typeof data.title === 'string') {
        meme.title = data.title;
      }

      if (data.description && typeof data.description === 'string') {
        meme.description = data.description;
      }

      Meme.updateOne({ _id: meme._id }, meme)
        .then(() => callback(null, meme))
        .catch(err => {
          console.error('Database Error:', err);
          return callback('database_error');
        });
    })
    .catch(err => {
      console.error('Database Error:', err);
      return callback('database_error');
    });
};

memeSchema.statics.findMemesByFilters = function (data, callback) {
  const filters = {};
  if (data.search) {
    filters.$or = [
      { title: { $regex: data.search, $options: 'i' } },
      { description: { $regex: data.search, $options: 'i' } }
    ];
  }
  if (data.lastMemeId) {
    filters._id = { $lt: data.lastMemeId }; // Fetch memes older than lastMemeId
  }
  const limit = data.limit || DEFAULT_FILTER_LIMIT;
  
  Meme.find(filters)
    .sort({ createdAt: -1 })
    .limit(limit)
    .then(memes => callback(null, { memes }))
    .catch(err => {
      console.error(err);
      callback('database_error');
    });
};

export const Meme = mongoose.model('Meme', memeSchema);
