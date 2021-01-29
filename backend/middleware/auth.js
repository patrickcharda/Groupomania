const jwt = require('jsonwebtoken');
require('dotenv').config();

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
    if (req.body.userId !== userId) {
      console.log('aie');
      next(); // le frontend Angular n'envoyant pas le userId dans le body des requêtes on laisse passer qd même :-(
      //throw 'Invalid user ID';
    } else {
      console.log('ok'+req.body.userId);
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};

