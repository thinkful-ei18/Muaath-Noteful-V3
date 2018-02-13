'use strict';

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Note = require('../models/note');

/* ========== GET/READ ALL ITEM ========== */
router.get('/notes', (req, res, next) => {
  const { searchTerm } = req.query;

  let filter = {};

  if (searchTerm) {
    const re = new RegExp(searchTerm, 'i');
    filter.title = { $regex: re };
  }
console.log(filter);
  return Note.find(filter)
    // .select('title created')
    // .sort('created')
    .then(results => {
      res.json(results);
    })
    .catch(console.error);
});

/* ========== GET/READ A SINGLE ITEM ========== */
router.get('/notes/:id', (req, res, next) => {

  const id = req.params.id;

  Note.findById(id)
  .then(note => res.json(note))
  .catch(err=> {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  });

});

/* ========== POST/CREATE AN ITEM ========== */
router.post('/notes', (req, res, next) => {

  const requiredFields = ['title', 'content'];
  for (let i =0; i < requiredFields.length; i++){
    const field = requiredFields[i];
    if(!(field in req.body)){
      const message = `You are missing ${field} in req body`;
      console.error(message);
      return res.status(400).send(message);

    }
  }
  Note
  .create({
    title: req.body.title,
    content: req.body.content
  })
  .then(result => res.status(201).json(result))
  .catch(err => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  });

  
});

/* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/notes/:id', (req, res, next) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    const message = (
      `Request path id (${req.params.id})`);
    console.error(message);
    return res.status(400).json({ message: message });
  }

  const toUpdate = {};
  const updateableFields = ['title', 'content'];

  updateableFields.forEach(field=>{
    if(field in req.body){
      toUpdate[field] = req.body[field];
    }
  });

  Note
  .findByIdAndUpdate(req.params.id, {$set: toUpdate})
  .then(result => res.status(204).end())
  .catch(err => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  });
  

});

/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
router.delete('/notes/:id', (req, res, next) => {

  Note
  .findByIdAndRemove(req.params.id)
  .then(result => res.status(204).end())
  .catch(err => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  });

});

module.exports = router;