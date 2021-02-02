const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/User');

module.exports = (req, res, next) => {
  try {
    console.log('yop'+req.body);
    console.log('yip'+req.params);
    console.log(req.authorization);
    console.log(req.headers);
    /*var data = req.body;
    data.forEach(function (item) {
       console.log(item);
    });*/
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.KEY_TOKEN);
    const userId = decodedToken.userId;
    console.log(userId);
    
    console.log('req.body.userId :'+ req.body.userId);
    console.log('req.body.userId :'+ req.body.login);
    console.log('req.params.userId'+ req.params.userId);

    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else { 
      User.findOne({_id: userId})
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        } else {console.log('verif ok');next();}
      })
    }} 
    catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};



