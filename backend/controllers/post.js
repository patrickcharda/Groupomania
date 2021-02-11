require('dotenv').config();
const fs = require('fs');
const Post = require('../models/Post');


/*const mysql = require('mysql');
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
})*/

exports.getAllPosts = (req, res) => {
  Post.getAllPosts(function(err, posts) {
    if (err)
      res.send(err);
      console.log('res', posts);
    res.json(posts);
  });
};
/*exports.getAllPosts = (req, res, next) => {
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
}*/

exports.delete = (req, res) => {
  console.log('loggedId '+req.body.userLoggedId);
  console.log('publisherId '+req.params.publisherId);
  console.log('post id '+req.params.id);
  //le propriétaire du post peut le supprimer
  if (req.body.userLoggedId == req.params.publisherId) {
    Post.delete(req.params.id, req.params.publisherId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found post with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete user with id " + req.params.id
          });
        }
      } else res.send({ message: `Post was deleted successfully!` });
    });
  } else {
    res.status(500).send({
      message: "Could not delete a user that is not you " + req.params.id
    });
  }
};

exports.deleteByAdmin = (req, res) => {
  console.log('loggedId '+req.body.userLoggedId);
  console.log('publisherId '+req.params.publisherId);
  console.log('post id '+req.params.id);
  Post.delete(req.params.id, req.params.publisherId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found post with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete user with id " + req.params.id
        });
      }
    } else res.send({ message: `Post was deleted successfully!` });
  });
};

exports.newPost = (req, res) => {
  const data = {
    'error': 1,
    'created':true
  };

  console.log(req.body);
  /*const userId = req.body.userId;
  const content = req.body.content;
  const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;*/
  //const userId = '8';
  //const content = 'test';
  //const date = String.toStringDate.now();
  //console.log(date);
  //const imageUrl = 'http://blabla/images/test.jpg';
  //console.log(imageUrl+' '+req.body.content+' '+userId);

  /*connection.query(`INSERT INTO post VALUES('',?,?,?,?)`,[userId, date, content, imageUrl], function(err, rows, fields){
    if (!!err){
      console.log('insert ok');
      data['newPost'] = err.sqlMessage;
    } else {
      data['error'] = err.sqlMessage;;
      data['newPost'] = 'user added successfully';
    }
  });*/
    res.json(data); 
}






