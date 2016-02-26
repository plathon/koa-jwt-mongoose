var bcrypt    = require('co-bcrypt');
var jwt       = require('jsonwebtoken');
var config    = require('../config');
var UserModel = require('../models/user');

/**
* autenticate user and return JWT
**/

module.exports.auth = function *(){
  try {
    var reqBody = this.request.body;
      //get user by credentials
      var user = yield UserModel.findOne({email: reqBody.email});

      if (!user)
        this.throw('User not found.');

      //decrypt the password and validate
      if ( yield bcrypt.compare( reqBody.password, user.password ) ) {

        //generate JWT
        var token = jwt.sign(user.withoutPassword, config.secret, { expiresInMinutes: 60*5 });
        //response
        this.body = {
          msg: 'Successfully logged in.',
          token: token
        }

      } else
        this.throw('Username and password do not match.');

  } catch (err) {
    this.status = err.status || 500;
    this.body = err.message;
    this.app.emit('error', err, this);
  }
}

/**
* register user and return JWT
**/

module.exports.create = function *() {
  try {
    var reqBody = this.request.body;

    var userExists = yield UserModel.findOne({email: reqBody.email});

    if ( userExists )
      this.throw('User already exists.');

      //hash the password
      var salt = yield bcrypt.genSalt(10);
      var hash = yield bcrypt.hash(reqBody.password, salt);
      reqBody.password = hash;

      //persists user
      var user = yield UserModel.create(reqBody);
      //generate JWT
      var token = jwt.sign(user.withoutPassword, config.secret, { expiresInMinutes: 60*5 });

      //response
      this.body = {
        msg: 'User was successfully created.',
        token: token
      }

  } catch (err) {
    this.status = err.status || 500;
    this.body = err.message;
    this.app.emit('error', err, this);
  }
}
