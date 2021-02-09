require('dotenv').config();
const fs = require('fs');


const mysql = require('mysql');
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
})

exports.getAllPosts = (req, res, next) => {
  const data = {
    'error': 1,
    'posts':[]
  };
  console.log('toto');
  connection.query("select p.content, p.date_creation, p.id, p.user_id, u.firstname, u.lastname from post as p inner join user as u on p.user_id = u.id order by p.id desc", function(err, rows, fields){
    if (rows.length != 0){
      data['error'] = 0;
      data['posts'] = rows;
      console.log(data.posts);
      console.log(rows);
      res.json(data);
    } else {
      data['posts'] = 'No post found..';
      console.log(data.posts);
      res.json(data);
    }
  })
}

exports.newPost = (req, res, next) => {
  console.log('ça passe');
  //console.log(req.body.email+req.body.password);
  const data = {
    'error': 1,
    'newPost': null
  };
  const userId = req.body.userId;
  const content = req.body.content;
  const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  connection.query(`INSERT INTO post VALUES('',?,?,?,?)`,[userId, Date.now(), content, imageUrl], function(err, rows, fields){
    if (!!err){
      console.log('insert ok');
      data['newPost'] = err.sqlMessage;
    } else {
      data['error'] = err.sqlMessage;;
      data['newPost'] = 'user added successfully';
    }
  });
    //res.json(data);
    res.status(201).json({ message: 'Post créé !' }); 
}






