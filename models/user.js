'use strict';
<<<<<<< HEAD

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// ===== Define UserSchema & UserModel =====
const userSchema = new mongoose.Schema({
  fullname: { type: String, default: '' },
=======
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = new mongoose.Schema({
  fullName: { type: String, default: '' },
>>>>>>> 32c21e9117c917bbb5ffd451aeecf6cda33bf566
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

<<<<<<< HEAD
userSchema.set('toObject', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
  }
});

// userSchema.pre('save', function (next) {
//   const doc = this;
  
//   if (!doc.isModified('password')) {
//     return next();
//   }

//   bcrypt.hash(doc.password, 10)
//     .then(digest => {
//       doc.password = digest;  
//       next();
//     })
//     .catch(next);
// });

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = function (password) {
  return bcrypt.hash(password, 10);
};

module.exports = mongoose.model('User', userSchema);
=======
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


>>>>>>> 32c21e9117c917bbb5ffd451aeecf6cda33bf566
