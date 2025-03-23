import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const PASSWORD_MIN_LENGTH = 7;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if(!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: PASSWORD_MIN_LENGTH,
    validate(value) {
      if(value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain \'password\'');
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if(value < 0) {
        throw new Error('Age must be a positive number');
      }
    }
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  avatar: {
    type: Buffer
  }
}, {
  timestamps: true
});

userSchema.methods.toJSON = function() {
  const userObject = this.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
};

userSchema.pre('save', function (next) {
  if (this.isModified('password'))
    bcrypt.hash(this.password, 8)
      .then(hash => {
        this.password = hash;
        return next();
      })
      .catch(err => {
        console.error(err);
        return next('database_error');
      });
});

userSchema.statics.findUserById = function(id, callback) {
  if (!id || typeof id !== 'string' || !mongoose.isValidObjectId(id))
    return callback('bad_request');

  User.findById(new mongoose.Types.ObjectId(id))
    .then(user => callback(null, user))
    .catch(err => {
      console.error(err);
      return callback('database_error');
    });
};

userSchema.statics.createUser = function (data, callback) {
  if (!data || typeof data !== 'object')
    return callback('bad_request');

  if (!data.email || typeof data.email !== 'string' || !validator.isEmail(data.email))
    return callback('bad_request');

  if (!data.password || typeof data.password !== 'string' || data.password.length < PASSWORD_MIN_LENGTH)
    return callback('bad_request');

  if (!data.name || typeof data.name !== 'string')
    return callback('bad_request');

  User.create({
    name: data.name,
    email: data.email,
    password: data.password
  })
    .then(user => callback(null, user))
    .catch(err => {
      console.error(err);
      return callback('database_error');
    });
};

userSchema.statics.authenticateUser = function (data, callback) {
  if (!data || typeof data !== 'object')
    return callback('bad_request');

  if (!data.email || typeof data.email !== 'string' || !validator.isEmail(data.email))
    return callback('bad_request');

  if (!data.password || typeof data.password !== 'string')
    return callback('bad_request');

  User.findOne({ email: data.email })
    .then(user => {
      if (!user) return callback('authentication_failed');

      bcrypt.compare(data.password, user.password)
        .then(isMatch => {
          if (!isMatch) return callback('authentication_failed');

          return callback(null, user);
        })
        .catch(err => {
          console.error(err);
          return callback('database_error');
        });
    })
    .catch(err => {
      console.error(err);
      return callback('database_error');
    });
};

export const User = mongoose.model('User', userSchema);
