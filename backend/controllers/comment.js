require('dotenv').config();
//const fs = require('fs');
const Comment = require('../models/Comment');
const uploadFile = require('../middleware/multer-config');
//const util = require("util");

const mysql = require('mysql');
const { resolve } = require('path');
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
})

var commentInDB = {};
var preComment = {};

function getCommentQuery(sql, commentInDB) {
  return new Promise(resolve => {
    //let foundPostBeforeUpdate = getAPostQuery(sql, postBeforeUpdate);
  connection.query(sql,[commentInDB.id, commentInDB.user_id], (error, results) => {
    if (error) {
      return(error);
    } else {
      if (results.length === 1) {
        console.log(results[0].content);
        console.log('foundcomment content :'+ results[0].content);
        commentInDB.content = results[0].content;
        preComment.user_id = commentInDB.user_id;
        preComment.id = commentInDB.id;
        console.log('preComment user_id :'+preComment.user_id);
        console.log('preComment id :'+preComment.id);
        const response = {
          'commentInDB':commentInDB,
          'preComment':preComment
        }
        resolve(response);
        }
      }
    }); 
  })
}

function getCommentQueryByAdmin(sql, commentInDB) {
  return new Promise(resolve => {
  connection.query(sql,commentInDB.id, (error, results) => {
    if (error) {
      return(error);
    } else {
      if (results.length === 1) {
        console.log(results[0].content);
        console.log('foundcomment content :'+ results[0].content);
        commentInDB.content = results[0].content;
        preComment.user_id = results[0].user_id;
        preComment.id = commentInDB.id;
        console.log('preComment user_id :'+preComment.user_id);
        console.log('preComment id :'+preComment.id);
        const response = {
          'commentInDB':commentInDB,
          'preComment':preComment
        }
        resolve(response);
        }
      }
    }); 
  })
}

exports.getPostComments = (req, res) => {
  const postId = req.params.post_id;
  Comment.getPostComments(postId,function(err, comments) {
    if (err)
      res.send(err);
      console.log('res', comments);
    res.json(comments);
  });
};

exports.delete = (req, res) => {
  console.log('loggedId '+req.body.userLoggedId);
  console.log('comment id '+req.params.comment_id);
  commentId = req.params.comment_id;
  userId = req.body.userLoggedId
  //le propriétaire du post peut le supprimer
 
  Comment.delete(commentId, userId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found comment with id ${req.params.comment_id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete comment with id " + req.params.comment_id
          });
        }
      } else res.send({ message: `Comment was deleted successfully!` });
    });
};

exports.deleteByAdmin = (req, res) => {
  console.log('loggedId '+req.body.userLoggedId);
  console.log('comment id '+req.params.comment_id);
  commentId = req.params.comment_id;
  //le propriétaire du post peut le supprimer
 
  Comment.deleteByAdmin(commentId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found comment with id ${req.params.comment_id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete comment with id " + req.params.comment_id
          });
        }
      } else {
        console.log('message : comment deleted');
        res.send({ message: `Comment was deleted successfully!` });
      }
    });
};

exports.create = (req, res) => {

  // handles null errors
  if (req.body.content === undefined || req.body.content === null || req.body.content === '') {
    res.status(400).json({ error: true, message: 'formulaire incomplet'});
  } else {
    console.log('req.post_id :'+ req.body.post_id);
    console.log('req.content :'+ req.body.content);
    var comment = {};
    comment.user_id = req.body.userLoggedId;
    comment.post_id = req.body.post_id;
    comment.content = req.body.content;
  
    Comment.create(comment, function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    })
  }
};

exports.update = async(req, res) => {
  // on récupère le user id depuis auth
  if (req.body.userLoggedId === undefined || req.body.userLoggedId === null) {
    res.status(400).send({
      message: `pb de user id`
    });
  } else {
    console.log('test today :'+ req.body);
    req.body.user_id = req.body.userLoggedId;
    console.log('comment publisher id :'+req.body.user_id);
    // on paramètre la requête pour retrouver le post
    commentInDB.user_id = req.body.user_id;
    commentInDB.id = req.params.id;
    console.log('comment id :' +commentInDB.id+' comment user id :'+commentInDB.user_id);

    const sql = `SELECT * FROM comment WHERE comment.id=? and comment.user_id=? LIMIT 1`;
    var test = await getCommentQuery(sql, commentInDB);

    console.log('body content :' +req.body.content);
    if (req.body.content !== commentInDB.content) {
      preComment.content = req.body.content;
      console.log('preComment.content :'+preComment.content);
    }
    if (preComment.content == undefined || preComment.content =='') {
      Comment.delete(preComment.id, preComment.user_id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found comment with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete comment with id " + req.params.id
            });
          }
        } else res.send({ message: `Comment was deleted successfully!` });
      });
    } else {
      await Comment.update(preComment, function(err, post) {
          if (err)
            res.send(err);
              res.json(post);
      });
    }
  }
commentInDB.length = 0;
preComment.length = 0;
};

exports.updateByAdmin = async(req, res) => {
  // on récupère le user id depuis auth
  if (req.body.userLoggedId === undefined || req.body.userLoggedId === null) {
    res.status(400).send({
      message: `pb de user id`
    });
  } else {
    req.body.user_id = req.body.userLoggedId;
    console.log('comment publisher id :'+req.body.user_id);
    // on paramètre la requête pour retrouver le post
    //commentInDB.user_id = req.body.user_id;
    commentInDB.id = req.params.id;
    //console.log('comment id :' +commentInDB.id+' comment user id :'+commentInDB.user_id);

    const sql = `SELECT * FROM comment WHERE comment.id=? LIMIT 1`;
    var test = await getCommentQueryByAdmin(sql, commentInDB);

    console.log('body content :' +req.body.content);
    if (req.body.content !== commentInDB.content) {
      preComment.content = req.body.content;
      console.log('preComment.content :'+preComment.content);
    }
    if (preComment.content == undefined || preComment.content =='' || preComment.content === null) {
      Comment.deleteByAdmin(preComment.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found comment with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete comment with id " + req.params.id
            });
          }
        } else res.send({ message: `Comment was deleted successfully!` });
      });
    } else {
      await Comment.updateByAdmin(preComment, function(err, post) {
          if (err)
            res.send(err);
              res.json(post);
      });
    }
  }
  commentInDB.length = 0;
  preComment.length = 0;
};


 


