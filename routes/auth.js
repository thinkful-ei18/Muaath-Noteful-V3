'use strict';

const express = require('express');
const passport = require('passport');
const localStrategy = require('../passport/local');
const router = express();

passport.use(localStrategy);

const options = {session: false, failWithError: true};
const localAuth = passport.authenticate('local', options);


router.post('/login', localAuth, function (req, res) {
  console.log(`${req.user.username} successfully logged in.`);
  return res.json({ data: 'rosebud' });
}); 

module.exports = router;