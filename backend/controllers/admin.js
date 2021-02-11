const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/User');
const mysql = require('mysql');
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
})


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

exports.delete = (req, res) => {
  User.delete(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete user with id " + req.params.id
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};




