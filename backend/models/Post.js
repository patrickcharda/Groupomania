var sql = require('./db.js');

//Post object constructor
var Post = function(post) {
    this.user_id = post.user_id;
    this.created_at = new Date();
    this.content = post.content;
    this.image_url = post.image_url;
}

Post.getAllPosts = function(result) {
    sql.query("select p.content, p.created_at, p.id, p.user_id, u.firstname, u.lastname from post as p inner join user as u on p.user_id = u.id order by p.id desc", function(err, res){
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('posts : ', res);  
            result(null, res);
        }
    });   
};

Post.delete = (postId, publisherId,  result) => {
    sql.query(`DELETE FROM post WHERE id = ? AND user_id = ?`,[postId, publisherId], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found post with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted post with id: ", postId);
      result(null, res);
    });
  };

Post.create = (post, result) => {
  sql.query("INSERT INTO post set?", post, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
}
module.exports= Post;