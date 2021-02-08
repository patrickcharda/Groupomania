require('dotenv').config();


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
  connection.query("SELECT * FROM post", function(err, rows, fields){
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





