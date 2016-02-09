'use strict';
var superagent = require('supertest');
var app = require('../app');

function request() {
	return superagent(app);
}

describe('Routes', function () {
  describe('GET /signin', function () {
    it('should return 500', function (done) {
      request()
        .get('/signin')
        .expect(401, done);
    });
  });
  describe('GET /signup', function () {
    it('should return 500', function (done) {
      request()
        .get('/signup')
        .expect(401, done);
    });
  });
})
