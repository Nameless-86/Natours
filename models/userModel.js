const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Input a valid email'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "An user must have a password"],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Confirm your password"],
    validate: {
      //only works on save
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not equal',
    },
  },
});

userSchema.pre('save', async function (next) {
  //Only run this function if password was modified
  if (!this.isModified('password')) return next();
  //Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12)
  //Delete the password confirm field
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;