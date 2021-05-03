const request = require('supertest');
const express = require('express');

const app = express();

const appGet=app.get('/mentor', function(req, res) {
  res.status(200).json({ mentorFirstName: 'Mentor' });
});

const appPost=app.post('/mentor', function(req, res) {
    res.status(200).json({ mentorFirstName: 'Mentor' });
  });

const  appPut=app.put('/mentor', function(req, res) {
   res.status(200).json({ mentorFirstName: 'Mentor' });
});

app.use('/mentor', require('./mentors/mentor.controller'));

request(appGet)
  .get('/mentor')
  .expect('Content-Type', /json/)
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });

  request(appPost)
  .post('/mentor')
  .expect('Content-Type', /json/)
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });
