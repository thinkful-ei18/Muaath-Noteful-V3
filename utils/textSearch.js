'use strict';

const mongoose = require('mongoose');

const { MONGODB_URI } = require('../config');
const Note = require('../models/note');

mongoose.connect(MONGODB_URI)
  .then(() => Note.createIndexes())
  .then(() => {
    return Note.find({ $text: { $search: 'ways' } },{ score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } })
      .then(results => {
<<<<<<< HEAD
        console.info(results);
=======
        console.log(results);
>>>>>>> 32c21e9117c917bbb5ffd451aeecf6cda33bf566
      });
  })
  .then(() => {
    return mongoose.disconnect()
      .then(() => {
        console.info('Disconnected');
      });
  })
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });