const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/User');
const  passwordValidator = require('password-validator');
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

/*exports.signup = (req, res) => {
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
    newUser.role = 'user';
  })
  .then(
    User.signup(newUser, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  }));
}*/
exports.signup = async(req, res) => {

  // handles null errors
  if(!req.body.email || !req.body.password || !req.body.firstname || !req.body.lastname) {
    res.status(400).json({ error: true, message: 'formulaire incomplet'});
  }
  var user = {...req.body};
  //checks 
  const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,7}$/i;
  if (!mailRegex.test(user.email) || user.email.length > 50) {
    console.log('error: ', 'adresse email invalide');
    res.status(400).json({ error: true, message: 'formulaire incomplet'});
  }
  if (!schema.validate(user.password)) {
    res.status(400).json({ error: true, message: 'formulaire incomplet'});
  }

  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  user.role = 'user';

  User.signup(user, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  })
}

exports.getAllUsers = (req, res) => {
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

/*exports.login = (req, res) => {
  //console.log(req.body.email+req.body.password);
  const data = {
    'error': 1,
    'login': null
  };
  const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,7}$/i;
  if (!mailRegex.test(req.body.email) && req.body.length < 50) {
    return res.status(400).json({message: 'adresse email invalide'});
  }
  const email = req.body.email;
  const password = req.body.password;
  console.log('email login : '+email);

  connection.query(`SELECT email, password, id, role  FROM user WHERE email=?`,email, function(err, result){
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
        role: result[0].role,
        token: jwt.sign(
          { email: email },
          process.env.KEY_TOKEN,
          { expiresIn: '24h' }
        )
        });
        })
    }
  })
};*/
exports.login = async(req, res) => {
  // handles errors
  if(!req.body.email || !req.body.password) {
    res.status(400).json({ error: true, message: 'formulaire incomplet'});
  }
  const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,7}$/i;
  if (!mailRegex.test(req.body.email) && req.body.length < 50) {
    return res.status(400).json({message: 'adresse email invalide'});
  }

  var user = {...req.body};
  User.login(user, async function(err, userFound) {
    if (err) {
      res.send(err);
    } else {
      const passIsOk = await bcrypt.compare(user.password, userFound[0].password)
        .then(valid => {
        if (!valid) {
          //console.log('password do not matched');
          return false;
        } else {
          return true;
        }
      })
      if (passIsOk) {
        //console.log('pass ok');
        res.status(200).json({
          email: userFound[0].email,
          user : [{email : userFound[0].email}],
          userId : userFound[0].id,
          role: userFound[0].role,
          token: jwt.sign(
            { email: userFound[0].email },
            process.env.KEY_TOKEN,
            { expiresIn: '24h' }
          )
          });
      }
    }
  });
}
  