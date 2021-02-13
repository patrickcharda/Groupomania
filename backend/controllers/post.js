require('dotenv').config();
const fs = require('fs');
const Post = require('../models/Post');
const uploadFile = require('../middleware/multer-config');


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
    console.log('mycontent :'+req.body.content);
    var prePost = {
      'user_id': req.body.user_id
    }
    console.log('prepostcontent :'+prePost.content+' prepostid :'+prePost.user_id);
    try {
      await uploadFile(req, res);
      prePost.image_url = req.file.filename;
      console.log('mycontent2 :'+req.body.content);
      prePost.content = req.body.content;
      
      Post.create(prePost, function (err, post) {
        if (err)
          res.send(err);
        res.json(post);
      });
    }
    catch (err) {
      res.status(500).send({
        message: `Could not create post / ${err}`,
      });
    }
  }
}


exports.createSauce = (req, res, next) => {
  let scriptRegex = /<|>/;
  if (scriptRegex.test(req.body.sauce)) {
    //console.log(req.body.sauce);
    return res.status(401).json({message: `signes < et > interdits`});
  };
  console.log(req.body.sauce);
  const sauceObject = JSON.parse(req.body.sauce);
  if (sauceObject.name.length > 50 || sauceObject.manufacturer.length > 30 || 
    sauceObject.description.length > 1000 || sauceObject.mainPepper.length > 100 ) {
      return res.status(401).json({message: `name 50 caracteres max, manufacturer 30, description 1000, et mainpepper 100`});
    }

    if (sauceObject._id) {
      delete sauceObject._id;
    }
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      usersDisliked: []
    });
    sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};






