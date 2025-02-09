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

memeSchema.statics.createMeme = function (data, callback) {
  // TODO: implement
};

// TODO: move all logic here, only call one static function from controllers

export const Meme = mongoose.model('Meme', memeSchema);
