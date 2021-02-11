var sql = require('./db.js');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  passwordValidator = require('password-validator');

//User object constructor
var User = function(user) {
    this.email = user.email;
    this.password = user.password;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.role = user.role;
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

User.login = function(user, result) {
  sql.query(`SELECT email, password, id, role  FROM user WHERE email=?`, user.email, function(err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  })
}

User.delete = (id, result) => {
  sql.query(`DELETE FROM user WHERE id = ?`,id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found user with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

module.exports= User;

