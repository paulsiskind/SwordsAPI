
var app = require('./../app.js');
var db = require('monk')('localhost/items');
var swords = db.get('swords');
var assert = require('assert');
var request = require('supertest');

before(function(done) {
  swords.remove({}, function() {
    swords.insert({title: 'Master Sword', _id: '55c050595ae876b6b79ad318'}, function() {
      done();
    });
  });
});


describe('POST api/swords', function () {
  it('creates a new resource', function (done) {
    request(app)
      .post('/api/swords')
      .send({title: 'from test'})
      .expect(201)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          assert.equal(res.body.title,'from test');
          done();
        }
      })
  });
});
describe('PUT api/swords/:id', function () {
  it('updates a resource', function (done) {
    request(app)
      .put('/api/swords/55c050595ae876b6b79ad318')
      .send({title:'from test'})
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          assert.equal(res.body.title,'from test');
          done();
        }
      });
  });
});

describe('GET api/swords/:id', function(){
  it('respond with json', function(done){
    request(app)
      .get('/api/swords/55c050595ae876b6b79ad318')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          assert.equal(res.status, 200);
          done();
        }
      })
  });
});


describe('DELETE /api/swords/:id', function(){
  it('deletes a resource', function(done){
    request(app)
      .del('/api/swords/55c050595ae876b6b79ad318')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          assert.equal(res.status, 200);
          done();
        }
      })
  });
});
describe('GET /api/swords/:id', function(){
  it('Responds with JSON', function(done){
    request(app)
      .get('/api/swords/55c050595ae876b6b79ad318')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          assert.equal(res.status, 200);
          done();
        }
      })
  });
});