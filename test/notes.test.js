'use strict';
const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiSpies = require('chai-spies');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const { TEST_MONGODB_URI } = require('../config');

const Note = require('../models/note');
const seedNotes = require('../db/seed/notes');

const expect = chai.expect;

chai.use(chaiHttp);
chai.use(chaiSpies);

describe('Noteful API - Notes',function(){
  before(function () {
      console.log('String test',TEST_MONGODB_URI);
    return mongoose.connect(TEST_MONGODB_URI, { autoIndex: false });
  });
    
  beforeEach(function () {
    return Note.insertMany(seedNotes)
          .then(() => Note.ensureIndexes());
  });
    
  afterEach(function () {
    return mongoose.connection.db.dropDatabase();
  });
    
  after(function () {
    return mongoose.disconnect();
  });    
});

describe('GET /v3/notes', function(){

  it('should return all existing notes', function(){
    let res;
    console.log('In here');
    return chai.request(app)
        .get('/v3/notes')
        .then(res2 => {
            console.log(res2);
          res = res2;
          expect(res).to.have.status(200);
          expect(res.body.notes).to.have.length.of.at.least(1);
          return Note.count();
        })
        .catch(err => {console.log(err)});
        // .then(function(count){
        //   expect(res.body.notes).to.have.length.of(count);
        // });
  });

});