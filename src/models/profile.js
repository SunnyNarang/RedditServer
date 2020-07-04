const sql = require("./db.js");
const Profile = function (profile) {
  this.name = profile.name;
  this.image = profile.image;
  this.points = profile.points;
  this.type = profile.type;
  this.communities = profile.communities;
  this.created_at = profile.created_at;
  this.pk_user = profile.pk_user;
};

Profile.create = (profile,callback) =>{
      sql.query("insert into profile values(null,'"+profile.name+"','"+profile.image+"',"+profile.points+","+profile.type+","+profile.pk_user+",'"+profile.communities+"','"+profile.created_at+"')", (err, res) => {
      if (err) {
        console.log("error: ", err);
        callback(err, null);
        return;
      }
      else{
        console.log("ADDED SUCCESSFULLY");
        callback(null,"DONE")
        return;
      }
        
      });
}


Profile.update = (data,callback) =>{
      var row;
    sql.query(
    "select * from profile where pk_user = '" + data.pk_user + "'",
    function (err, result2, fields) {
      console.log('RESULT: '+ result2);
      if(result2.length>0){
      if (err){ 
        callback("Something went wrong",null);
      }
        Object.keys(result2).forEach(function (key) {
        row =  result2[key];
        var name = row.name;
        var image = row.image;
        var communities = row.communities;
        if(data.name){
          name = data.name;
        }
        if(data.image){
          image = data.image;
        }
        if(data.communities){
          communities = data.communities;
        }
        
         sql.query("UPDATE profile set name= '"+name+"', image='"+image+"', communities='"+communities+"' where pk_user = '"+data.pk_user+"'", function (err2, result3) {
              if (err2) throw err2;
              console.log(result3.affectedRows + " record(s) updated");
              callback(null,"Profile Updated");
            });
        
        
        });
      }
      else{
        callback("User not found",null);
      }
    });
}


Profile.get = (id,callback) =>{
    var row;
    sql.query(
    "select * from profile where pk_user = '" + id + "'",
    function (err, result2, fields) {
      console.log('RESULT: '+ result2);
      if(result2.length>0){
      if (err){ 
        callback("Something went wrong",null);
      }
        Object.keys(result2).forEach(function (key) {
        row =  result2[key];
        callback(null,row)
        });
      }
      else{
        callback("User not found",null);
      }
    });
}


module.exports = Profile;