const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const cryptojs = require('crypto-js');
require('dotenv').config();

const User = require('../models/User');
const  passwordValidator = require('password-validator');
//const { Connection } = require('mongoose');
/*const mysql = require('mysql');
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
})*/
var schema = new passwordValidator();

schema
.is().min(8)                                    // Minimum length 8
.is().max(16)                                  // Maximum length 16
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces();                          // no space

exports.signup = (req, res) => {
  var newUser = new User(req.body);
  // handles null errors
  if(!newUser.email || !newUser.password || !newUser.firstname || !newUser.lastname) {
    res.status(400).json({ error: true, message: 'formulaire incomplet'});
  }
  //checks 
  const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,7}$/i;
  if (!mailRegex.test(newUser.email) || newUser.email.length > 50) {
    console.log('error: ', 'adresse email invalide');
    res.status(400).json({ error: true, message: 'formulaire incomplet'});
  }

  if (!schema.validate(newUser.password)) {
    res.status(400).json({ error: true, message: 'formulaire incomplet'});
  }

  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    newUser.password = hash;
  })
  .then(
    User.signup(newUser, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  }));
}

/*
exports.signup = (req, res) => {
  const data = {
    'error': 1,
    'signup': null
  };
  const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,7}$/i;
  if (!mailRegex.test(req.body.email) || req.body.email.length > 50) {
    return res.status(400).json({message: 'adresse email invalide'});
  }
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;

  if (schema.validate(req.body.password)) {
    //const cipherEmail = cryptojs.HmacSHA512(req.body.email, process.env.KEY_CRYPTOJS).toString();
    const email = req.body.email;
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      console.log(hash);
      console.log(email);
      connection.query("INSERT INTO user VALUES('',?,?,?,?,'')",[email, hash, firstname, lastname], function(err, rows, fields){
        if (!!err){
          console.log('insert ok');
          data['signup'] = err.sqlMessage;
        } else {
          data['error'] = 0;
          data['signup'] = 'user added successfully';
        }
        //res.json(data);
        res.status(201).json({ message: 'Utilisateur créé !' });
      })
    })
    .catch(error => res.status(500).json({ error }));
  } else {
    return(res.status(400).json({error: 'mot de passe invalide'}));
  }
};
*/

/* //version de signup avec masquage adresse email en bdd
exports.signup = (req, res, next) => {
  console.log(req.body.email.length);
  const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,7}$/i;
  if (!mailRegex.test(req.body.email) || req.body.email.length > 50) {
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
};*/

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
  console.log('authentif token ok');
  connection.query("SELECT * FROM user", function(err, rows, fields){
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
  //console.log(req.body.email+req.body.password);
  const data = {
    'error': 1,
    'login': null
  };
  const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,7}$/i;
  if (!mailRegex.test(req.body.email) && req.body.length < 50) {
    return res.status(400).json({message: 'adresse email invalide'});
  }
  //const cipherEmail = cryptojs.HmacSHA512(req.body.email, process.env.KEY_CRYPTOJS).toString();
  const email = req.body.email;
  const password = req.body.password;
  console.log('email login : '+email);

  connection.query(`SELECT email, password, id  FROM user WHERE email=?`,email, function(err, result){
    console.log('resultat req sql login : '+result);
    if (!result){
      console.log('erreur !!');
      data['err'] = 'user not found';
      data['user'] = [{email : 'user not found'}];
      //res.status(401).json({ error: 'Utilisateur non trouvé !' });
      return res.status(401).json({ error: 'login incorrect !', user: [{email : 'Utilisateur non trouvé'}] });
      //res.json(data);
    } else {
      data['user'] = (result);
      console.log('resultat requete : '+result[0].email);
      //res.json(data);
      bcrypt.compare(password, result[0].password)
      .then(valid => {
      if (!valid) {
        console.log('password do not matched');
        return res.status(401).json({ error: 'Mot de passe incorrect !', user: [{email : 'Mot de passe incorrect'}] });
      }
      console.log('password ok');
      res.status(200).json({
        email: email,
        user : [{email : email}],
        userId : result[0].id,
        token: jwt.sign(
          { email: email },
          process.env.KEY_TOKEN,
          { expiresIn: '24h' }
        )
        });
        })
    }
  })
};

  /*User.findOne({ email: email })
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
};*/



/*exports.login = (req, res, next) => {
  const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,7}$/i;
  if (!mailRegex.test(req.body.email) && req.body.length < 50) {
    return res.status(400).json({message: 'adresse email invalide'});
  }
  //const cipherEmail = cryptojs.HmacSHA512(req.body.email, process.env.KEY_CRYPTOJS).toString();
  const email = req.body.email;

  User.findOne({ email: email })
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
};*/

