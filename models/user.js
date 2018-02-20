'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = new mongoose.Schema({
  fullName: { type: String, default: '' },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.methods.apiRepr = function () {
  return {
    id: this._id,
    username: this.username,
    fullName: this.fullName
  };
};

UserSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};
  
UserSchema.statics.hashPassword = function (password) {
    return bcrypt.hash(password, 10);
  };

module.exports = mongoose.model('User', UserSchema);


