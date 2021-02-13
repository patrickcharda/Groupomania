const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const postRoutes = require('./routes/post');
const dbAdmin = require('./key');
const dbKey = dbAdmin.dbKey;

//const mongoSanitize = require('express-mongo-sanitize');

const cors = require("cors");
require('dotenv').config();

const app = express();

/*mongoose.connect(`mongodb+srv://${dbKey.login}:${dbKey.password}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`,  
    { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
*/

const mysql = require('mysql');
require('dotenv').config();

var conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
});

conn.connect(function(err) {
    if (err) throw err;
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

/*app.use(cors());*/

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '2Mb'}));


/* app.use((req, res, next) => {
  var data = req.params;
  console.log('typeof' +typeof data);
  for (const key of Object.keys(data)) {
    if (key == 'body') {
    console.log('key:'+key, data[key]);
    }
  }; 
  next();
}); */


/*to avoid sql injection by replacing prohibited characters ($ et .) with _ 
(callback passed as the first argument to app.use(), it matches all routes ) 
app.use(mongoSanitize({
  replaceWith: '_'
}));*/

app.use('/images', express.static(path.join(__dirname, 'images')));

//app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/authadmin', adminRoutes);
app.use('/api/post', postRoutes);

module.exports = app;
