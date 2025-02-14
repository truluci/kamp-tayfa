import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

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
        throw new Error("Email is invalid");
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if(value.toLowerCase().includes("password")) {
        throw new Error("Password cannot contain 'password'");
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if(value < 0) {
        throw new Error("Age must be a positive number");
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
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
};

userSchema.statics.registerUser = function (data, callback) {
  if (!data || typeof data !== 'object')
    return callback('bad_request');

  if (!data.email || typeof data.email !== 'string' || !validator.isEmail(data.email))
    return callback('bad_request');

  if (!data.password || typeof data.password !== 'string' || data.password.length < 7 || data.password.toLowerCase().includes('password'))
    return callback('bad_request');

  if (!data.name || typeof data.name !== 'string')
    return callback('bad_request');

  const user = new User({
    name: data.name,
    email: data.email,
    password: data.password
  });

  user
    .save()
    .then(() => callback(null, user))
    .catch(err => {
      console.error(err);
      return callback('database_error');
    });
};

userSchema.statics.login = function (data, callback) {
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

export const User = mongoose.model("User", userSchema);
