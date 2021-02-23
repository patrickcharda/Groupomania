require('dotenv').config();
const fs = require('fs');
const Post = require('../models/Post');
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

var prePost = {};
var postInDB = {};
function getAPostQuery(sql, postInDB) {
  return new Promise(resolve => {
  connection.query(sql,[postInDB.id, postInDB.user_id], (error, results) => {
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
}

function getAPostQueryByAdmin(sql, postInDB) {
  return new Promise(resolve => {
  connection.query(sql, postInDB.id, (error, results) => {
    if (error) {
      return(error);
    } else {
      if (results.length === 1) {
        console.log(results[0].content);
        console.log(results[0].image_url);
        console.log('foundpost content + image_url:'+ results[0].content+' '+ results[0].image_url);
        postInDB.content = results[0].content;
        postInDB.image_url = results[0].image_url;
        prePost.user_id = results[0].user_id;
        prePost.id = results[0].id;
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
}

exports.getAllPosts = (req, res) => {
  Post.getAllPosts(function(err, posts) {
    if (err)
      res.send(err);
      console.log('res', posts);
    res.json(posts);
  });
};

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

/*exports.create = async (req, res) => {
  //validate request
  try {
    
    await uploadFile(req, res);

    console.log('req.body :'+req.body);
    const prePost = undefined;

    if (req.file == undefined && req.body == undefined) {
      return res.status(400).send({ message: "Empty post!" });
      //prePost.image_url = '';
    }

    console.log('body content :'+req.body.content);
    if (!req.body) {
      console.log('vide');
      prePost.content ='';
      prePost.image_url = req.file.originalname;
    } else {
      prePost.content = req.body.content;
      prePost.image_url = '';
    }
    prePost.user_id = req.body.userLoggedId;

    //const post = new Post(prePost);
    Post.create(prePost, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Post."
        });
      else res.send(data);
    });
  } catch (err) {
    res.status(500).send({
      message: `Could not create post / ${err}`,
    });
  }
}*/
exports.create = async (req, res) => {

  if (req.body.userLoggedId === undefined || req.body.userLoggedId === null) {
    res.status(400).send({
      message: `no user id in req`
    });
  } else {
    req.body.user_id = req.body.userLoggedId;
    //console.log('mycontent :'+req.body.content);
    var prePost = {
      'user_id': req.body.user_id
    }
    console.log('prepostid :'+prePost.user_id);
    
    try {
      await uploadFile(req, res);
      if (req.file !== undefined) {
        console.log(req.file.filename);
        prePost.image_url = req.file.filename;
      } else { 
        console.log('no file');
        prePost.image_url = '';
      }
      
      console.log('mycontent2 :'+req.body.content);
      if (req.body.content !== undefined) {
        prePost.content = req.body.content;
      } else {
        prePost.content = '';
      }
     
      if (prePost.image_url === '' && prePost.content === '') {
        console.log('pas de son pas d image');
        res.status(400).send({
          message: `Un post doit contenir au moins une image ou un texte`
        });
      } else {
        Post.create(prePost, function (err, post) {
          if (err) {
            console.log('pb crea post ds model?');
            res.send(err);
          } else {
          res.json(post);
          }
        });
      }
    }
    catch (err) {
      console.log('pbcrea post');
      console.log(err);
      res.status(500).send({
        message: `Could not create post / ${err}`,
      });
    }
  }
}

exports.update = async (req, res) => {
  // on récupère le user id depuis auth
  if (req.body.userLoggedId === undefined || req.body.userLoggedId === null) {
    res.status(400).send({
      message: `pb de user id`
    });
  } else {
  req.body.user_id = req.body.userLoggedId;
  console.log('post publisher id :'+req.body.user_id);
  // on paramètre la requête pour retrouver le post
  postInDB.user_id = req.body.user_id;
  postInDB.id = req.params.id;
  console.log('post id :' +postInDB.id+' post user id :'+postInDB.user_id);
  const sql = `SELECT * FROM post WHERE post.id=? and post.user_id=? LIMIT 1`;
  
  var test = await getAPostQuery(sql, postInDB);

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
      console.log(req.file);
      //pas de nouvelle image
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
    console.log('la '+test.postInDB.content);
    //si nouveau contenu texte
    /*if (req.body.content != test.postInDB.content) {
      prePost.content = req.body.content;
      console.log('prePost.content :'+prePost.content);
    } */
    prePost.content = req.body.content;
    //si post complètement vidé
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
      prePost = {};
      postInDB = {};
    }
  }
}

exports.updateByAdmin = async (req, res) => {
  // on récupère le user id depuis auth
  if (req.body.userLoggedId === undefined || req.body.userLoggedId === null) {
    res.status(400).send({
      message: `pb de user id`
    });
  } else {
  //req.body.user_id = req.body.userLoggedId;
  //console.log('admin id :'+req.body.user_id);
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
      console.log(req.file);
      //pas de nouvelle image
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
    console.log('la '+test.postInDB.content);
    /*if (req.body.content != test.postInDB.content) {
      prePost.content = req.body.content;
      console.log('prePost.content :'+prePost.content);
    } */
    prePost.content = req.body.content;
    //si post complètement vidé
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
        console.log('tototo');
        prePost = {};
        postInDB = {};
    }
  }
}


