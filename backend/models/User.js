var sql = require('./db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  passwordValidator = require('password-validator');

//User object constructor
var User = function(user) {
    this.email = user.email;
    this.password = user.password;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
}

User.signup = function(newUser, result) {
  sql.query("INSERT INTO user set ?",newUser, function(err, res){
    if (err){
      console.log('error: ', err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  })
}

module.exports= User;

/*const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);*/