'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const  User  = require('../models/user');

const router = express.Router();

router.use(bodyParser.json());

router.post('/users', (req, res)=> {
    // Username and password were validated as pre-trimmed
  let { username, password, fullName} = req.body;
    const newUser = {username, password, fullName};

    return User.create(newUser)
    .then(result => {
        return res.status(201).json(result);
    })
    .catch(err => {err.status = 400;});
});

module.exports = router;
