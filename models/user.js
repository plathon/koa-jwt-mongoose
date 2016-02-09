var mongoose   = require('mongoose');
var validate   = require('mongoose-validator');
var timestamps = require('mongoose-timestamp');
var Schema     = mongoose.Schema;

/**
* User model validations
**/

var namelValidator = [
  validate({
    validator: 'isLength',
    arguments: [ 3, 60 ],
    message: 'Name deve ter entre {ARGS[0]} e {ARGS[1]} caracteres'
  })
];

var emailValidator = [
  validate({
    validator: 'isEmail',
    message: 'Informe um email válido.'
  }),
  validate({
    validator: 'isLength',
    arguments: [ 3, 60 ],
    message: 'Email deve ter entre {ARGS[0]} e {ARGS[1]} caracteres'
  })
];

var passwordValidator = [
  validate({
    validator: 'isLength',
    arguments: [ 3, 60 ],
    message: 'Senha deve ter entre {ARGS[0]} e {ARGS[1]} caracteres'
  })
];

/**
* User Database Schema
**/

var UserSchema = new Schema({
  name: { type: String, required: true, validate: namelValidator },
  email: { type: String, required: true, validate: emailValidator },
  password: { type: String, required: true, validate: passwordValidator }
});

/**
* User Virtual Schema
**/

UserSchema
  .virtual('withoutPassword')
  .get(function () {
    return {
      _id:   this._id,
      name: this.name,
      email: this.email
    }
  });

/**
* Timestamps plugin
**/

UserSchema.plugin(timestamps);

/**
* Create and exports model
**/

var UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
