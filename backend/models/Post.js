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

module.exports= Post;