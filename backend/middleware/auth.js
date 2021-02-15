const jwt = require('jsonwebtoken');
require('dotenv').config();

const mysql = require('mysql');
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
})

//const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    //console.log('yop'+req.body);
    //console.log('yap'+req.params);
    console.log('body content :'+ req.body.content);
    console.log('authorization' +req.authorization);
    console.log('headers' +req.headers);
    const token = req.headers.authorization.split(' ')[1];
    console.log('toktok : '+token);
    const decodedToken = jwt.verify(token, process.env.KEY_TOKEN);
    var email = decodedToken.email;
    console.log('decodedtokenemail : '+email);
    console.log('req.body.email :'+ req.body.email);
    //console.log('req.body.userId :'+ req.body.login);

    if (req.body.email && req.body.email !== email) {
      throw 'Invalid user ID';
    } else { 
      console.log('ELSE');
      connection.query(`SELECT email,id  FROM user WHERE email=?`,email, function (err, result) {
        if (result == 0) {
          console.log('user not in db');
          data['err'] = 'user not found';
          data['user'] = [{email : 'user not found'}];
          //res.status(401).json({ error: 'Utilisateur non trouvé !' });
          return res.status(401).json({ error: 'login incorrect !', user: [{email : 'Utilisateur non trouvé'}] });
          //res.json(data);
        } else {
          console.log('verif ok');
          console.log(result[0].id);
          req.body.userLoggedId = result[0].id;
          console.log('auth userLoggedId ' +req.body.userLoggedId);
          next();}
      });
    }}
    catch {
    res.status(407).json({
      error: new Error('Invalid request!')
    })
}}
