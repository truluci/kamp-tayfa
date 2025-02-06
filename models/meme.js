import mongoose from "mongoose";

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
  image: {
    type: Buffer
  }
}, {
  timestamps: true
});

export const Meme = mongoose.model("Meme", memeSchema);