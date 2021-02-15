require('dotenv').config();
const fs = require('fs');
const Comment = require('../models/Comment');
const uploadFile = require('../middleware/multer-config');
const util = require("util");

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
    //let foundPostBeforeUpdate = getAPostQuery(sql, postBeforeUpdate);
  connection.query(sql,commentInDB.id, (error, results) => {
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

/*function getAPostQueryByAdmin(sql, postInDB) {
  return new Promise(resolve => {
    //let foundPostBeforeUpdate = getAPostQuery(sql, postBeforeUpdate);
  connection.query(sql,[postInDB.id], (error, results) => {
    if (error) {
      return(error);
    } else {
      if (results.length === 1) {
        console.log(results[0].content);
        console.log(results[0].image_url);
        console.log('foundpost content + image_url:'+ results[0].content+' '+ results[0].image_url);
        postInDB.content = results[0].content;
        postInDB.image_url = results[0].image_url;
        prePost.user_id = postInDB.user_id;
        prePost.id = postInDB.id;
        console.log('prePost user_id :'+prePost.user_id);
        console.log('prePost id :'+prePost.id);
        const response = {
          'postInDB':postInDB,
          'prePost':prePost
        }
        resolve(response);
        }
      }
    }); 
  })
}*/

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
      } else res.send({ message: `Comment was deleted successfully!` });
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
    commentInDB.user_id = req.body.user_id;
    commentInDB.id = req.params.id;
    console.log('comment id :' +commentInDB.id+' comment user id :'+commentInDB.user_id);

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
};


/*exports.updateByAdmin = async (req, res) => {
  // on récupère le user id depuis auth
  if (req.body.userLoggedId === undefined || req.body.userLoggedId === null) {
    res.status(400).send({
      message: `pb de user id`
    });
  } else {
  req.body.user_id = req.body.userLoggedId;
  console.log('admin id :'+req.body.user_id);
  // on paramètre la requête pour retrouver le post
  //postInDB.user_id = req.body.user_id;
  postInDB.id = req.params.id;
  console.log('post id :' +postInDB.id);
  const sql = `SELECT * FROM post WHERE post.id=? LIMIT 1`;
  
  var test = await getAPostQueryByAdmin(sql, postInDB);

  await uploadFile(req, res);
    console.log(req.body.content);
    if (req.file !== undefined) {
      console.log(req.file.filename);
    //suppression ancien fichier image
      if (test.postInDB.image_url !== undefined || test.postInDB.image_url !== '') {
        console.log('fic a suppr :'+ test.postInDB.image_url);
        fs.unlink(`images/${test.postInDB.image_url}`, (err => {
          if (err) console.log(err);
          else {
            console.log('Deleted file : '+test.postInDB.image_url);
          }
        }));
      }
    prePost.image_url = req.file.filename;
    console.log('prePost.image_ulr : '+prePost.image_url);
    } else { 
      if (req.body.img_remove != 'true') {
        console.log('no file');
        prePost.image_url = postInDB.image_url;
        console.log('prePost.image_ulr : '+prePost.image_url);
      } else {
        prePost.image_url ='';
        if (test.postInDB.image_url !='') {
          fs.unlink(`images/${test.postInDB.image_url}`, (err => {
            if (err) console.log(err);
            else {
              console.log('Deleted file : '+test.postInDB.image_url);
            }
          }));
        }
      }
    }
    console.log('body content :' +req.body.content);
    if (req.body.content !== postInDB.content) {
      prePost.content = req.body.content;
      console.log('prePost.content :'+prePost.content);
    }
    if ((prePost.content == undefined || prePost.content =='') && (prePost.image_url =='' || prePost.image_url == undefined)) {
      Post.delete(prePost.id, prePost.user_id, (err, data) => {
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
      await Post.update(prePost, function(err, post) {
        if (err)
          res.send(err);
            res.json(post);
        });
    }
  }
}*/


 


