import mongoose from 'mongoose';

const labelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
});

labelSchema.statics.createLabel = function (name, callback) {
  if (!name || typeof name !== 'string') return callback('bad_request');
  if (name.length > 30) return callback('label_name_too_long');

  Label.create({ name })
    .then(() => callback(null, label))
    .catch(err => {
      if (err.code === 11000) return callback('label_already_exists');
      callback(err);
    });
}

export const Label = mongoose.model('Label', labelSchema);
