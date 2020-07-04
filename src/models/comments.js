//select profile.name,profile.image,comments.text,comments.fk_post_id,comments.time from comments inner join profile on comments.fk_user_id = profile.pk_user where comments.fk_post_id = 1
const sql = require("./db.js");

const Comments = function(comment){};

Comments.getCommentsByID = (id,callback) =>{
    sql.query("select profile.name,profile.image,comments.text,comments.fk_post_id,comments.time from comments inner join profile on comments.fk_user_id = profile.pk_user where comments.fk_post_id = "+id,(err,result)=>{
        if(err){
            callback("Something went wrong", null)
        }
        else{
            var row;
            var data = [];
            Object.keys(result).forEach(function (key) {
            row =  result[key];
            data.push(row);
            });
            callback(null,data);
        }
    })
}

Comments.postComment = (post_id,user_id,comment,callback)=>{
    var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    sql.query("insert into comments values(null,"+post_id+","+user_id+",'"+comment+"','"+date+"')",(err,result)=>{
        if(err){
            callback("Error Posting Comment",null)
        }
        else{
            callback(null,"Commented Successfully")
        }
    })
}

module.exports = Comments;