const mongoose = require('mongoose');

const notesSchema = mongoose.Schema({

  title: {type: String},
  content:{type: String},
  create:{type:Date}

});

const Note = mongoose.model('Note', notesSchema);

module.exports = Note;