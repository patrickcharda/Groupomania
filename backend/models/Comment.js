var sql = require('./db.js');

//Post object constructor
var Comment = function(comment) {
    this.user_id = comment.user_id;
    this.created_at = new Date();
    this.content = comment.content;
    this.post_id = comment.post_id;
}

Comment.getPostComments = function(postId,result) {
    sql.query("select u.firstname, u.lastname, c.content, c.id, c.user_id from user as u inner join comment as c on c.user_id = u.id where c.post_id=?", postId, function(err, res){
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('comments : ', res);  
            result(null, res);
        }
    });   
};

Comment.delete = (commentId, userId, result) => {
  sql.query(`DELETE FROM comment WHERE id = ? AND user_id = ?`,[commentId, userId], (err, res) => {
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
    console.log("deleted comment with id: ", commentId);
    result(null, res);
  });
}

Comment.deleteByAdmin = (commentId, result) => {
  sql.query(`DELETE FROM comment WHERE id = ?`,commentId, (err, res) => {
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
    console.log("deleted comment with id: ", commentId);
    result(null, res);
  });
}

Comment.create = (comment, result) => {
  sql.query("INSERT INTO `comment` (`id`, `post_id`, `user_id`, `created_at`, `content`) VALUES (NULL, ?, ?, current_timestamp(), ?); ",
   [comment.post_id, comment.user_id, comment.content], function (err, res) {
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

Comment.update = async (comment, result) => {
  console.log(comment.content+ ' '+comment.user_id+' '+comment.id);
  sql.query(" UPDATE comment SET content=?, user_id=? WHERE id=?", [comment.content, comment.user_id, comment.id], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      console.log('affected rows :'+res.affectedRows);
      result(null, res.affectedRows);
    }
  });
}

Comment.updateByAdmin = async (comment, result) => {
  console.log(comment.content+ ' '+comment.user_id+' '+comment.id);
  sql.query(" UPDATE comment SET content=?, user_id=? WHERE id=?", [comment.content, comment.user_id, comment.id], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      console.log('affected rows :'+res.affectedRows);
      result(null, res.affectedRows);
    }
  });
}

module.exports= Comment;