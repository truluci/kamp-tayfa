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

memeSchema.statics.addMeme = function(meme) {
  const newMeme = new Meme(meme);
  return newMeme.save();
}

export const Meme = mongoose.model('Meme', memeSchema);
