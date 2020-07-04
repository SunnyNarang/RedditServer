const sql = require("./db.js");

const Community = function(community){
    this.name = community.name;
    this.desc = community.desc;
    this.image = community.image;
    this.admin = community.admin;
};

Community.getAll = (callback) =>{
    sql.query("select * from community",(err,result)=>{
        if(err){
            callback("Something went wrong",null);
        }
        var row;
        var data=[];
        Object.keys(result).forEach(function (key) {
        row =  result[key];
        data.push(row)
        });
        callback(null,data);
    })
}

Community.getComm = (id,callback)=>{
    sql.query("select * from community where pk_community = "+id,(err,result)=>{
        if(err){
            callback("Something went wrong",null);
        }
        if(result.length>0){
        var row;
        row =  result[0];
        callback(null,row);}
        else{
            callback("Didn't found Community",null);
        }
    })
}


module.exports =  Community;