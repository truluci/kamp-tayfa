import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

userSchema.statics.registerUserAndGenerateToken = function (data, callback) {
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
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });

  user
    .save()
    .then(() => callback(null, { user, token }))
    .catch(err => {
      console.error(err);
      return callback('database_error')
    });
};

// TODO: callbackify

userSchema.statics.loginAndGenerateToken = function (email, password) {
  return User.findOne({ email }).then((user) => {
    if (!user) {
      throw new Error("Unable to login");
    }
    return bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        throw new Error("Unable to login");
      }
      const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
      user.tokens = user.tokens.concat({ token });
      return user.save().then(() => ({ user, token }));
    });
  });
};

userSchema.statics.logoutAndRemoveToken = function (user, token) {
  user.tokens = user.tokens.filter((t) => t.token !== token);
  return user.save();
};

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password"))
    return next();

  bcrypt.hash(user.password, 8)
    .then((hashedPassword) => {
      user.password = hashedPassword;
      return next();
    })
    .catch(err => {
      console.error(err);
      return next(err);
    });
});


export const User = mongoose.model("User", userSchema);
