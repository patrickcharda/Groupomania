const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cryptojs = require('crypto-js');
require('dotenv').config();

const User = require('../models/User');
const  passwordValidator = require('password-validator');
const { Connection } = require('mongoose');
const mysql = require('mysql');
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
})
var schema = new passwordValidator();

schema
.is().min(8)                                    // Minimum length 8
.is().max(16)                                  // Maximum length 16
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces();                          // no space


exports.signup = (req, res, next) => {
  const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,7}$/i;
  if (!mailRegex.test(req.body.email) && req.body.length < 50) {
    return res.status(400).json({message: 'adresse email invalide'});
  }
  if (schema.validate(req.body.password)) {
    const cipherEmail = cryptojs.HmacSHA512(req.body.email, process.env.KEY_CRYPTOJS).toString();
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
      email: cipherEmail,
      password: hash
      });
      user.save()
      .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
      .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
  } else {
    return(res.status(400).json({error: 'mot de passe invalide'}));
  }
};

/*exports.getAllUsers = (req, res, next) => {
  const data = {
    'error': 1,
    'users': ""
  };

  connection.query("SELECT * FROM users", function(err, rows, fields){
    if (rows.length != 0){
      data['error'] = 0;
      data['users'] = rows;
      console.log(data.users);
      res.json(data);
    } else {
      data['users'] = 'No users found..';
      res.json(data);
    }
  })
}*/

exports.getAllUsers = (req, res, next) => {
  const data = {
    'error': 1,
    'users': []
  };

  connection.query("SELECT * FROM users", function(err, rows, fields){
    if (rows.length != 0){
      data['error'] = 0;
      data['users'] = rows;
      console.log(data.users);
      res.json(data);
    } else {
      data['users'] = 'No users found..';
      res.json(data);
    }
  })
}

exports.login = (req, res, next) => {
  const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,7}$/i;
  if (!mailRegex.test(req.body.email) && req.body.length < 50) {
    return res.status(400).json({message: 'adresse email invalide'});
  }
  const cipherEmail = cryptojs.HmacSHA512(req.body.email, process.env.KEY_CRYPTOJS).toString();
  User.findOne({ email: cipherEmail })
  .then(user => {
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
    bcrypt.compare(req.body.password, user.password)
    .then(valid => {
      if (!valid) {
        return res.status(401).json({ error: 'Mot de passe incorrect !' });
      }
    res.status(200).json({
    userId: user._id,
    token: jwt.sign(
      { userId: user._id },
      process.env.KEY_TOKEN,
      { expiresIn: '24h' }
    )
    });
    })
    .catch(error => res.status(500).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
};

