const jwt = require('jsonwebtoken');
require('dotenv').config();

const mysql = require('mysql');
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
})


module.exports = (req, res, next) => {
  try {
    //console.log(req.authorization);
    //console.log(req.headers);
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.KEY_TOKEN);
    const email = decodedToken.email;
    console.log('decodedtokenemail : '+email);
    console.log('req.body.email :'+ req.body.email);

    if (req.body.email && req.body.email !== email) {
      throw 'Invalid user ID';
    } else { 
      connection.query(`SELECT email,role,id  FROM user WHERE email=? AND role=?`,[email, 'admin'], function(err, result){
        if (result == 0){
          //console.log('user not in db');
          data['err'] = 'user not found';
          data['user'] = [{email : 'user not found'}];
          return res.status(401).json({ error: 'login incorrect !', user: [{email : 'Utilisateur non trouvé'}] });
        } else {
          //verif ok
          console.log(result[0].id);
          req.body.userLoggedId = result[0].id;
          req.body.admin = true;
          next();
        }
      });
    }}
    catch {
    res.status(407).json({
      error: new Error('Invalid request!')
    })
}}
