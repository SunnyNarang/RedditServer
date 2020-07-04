
var jwt = require('jsonwebtoken');
const sql = require("../models/db");

module.exports = function isAuthenticated(req, res, next) {


    var data = req.header('authorization');
    
    if(data){
    data = data.replace("Bearer ","");
 
 jwt.verify(data, 'LOVEMYSELF', function(err, decoded) {
if(decoded){
 
sql.query(
    "select * from users where username = '" + decoded.username + "'",
    function (err, result2, fields) {
        console.log("RESULT: "+result2);
        if(err){
             res.status(500).send({Error:"Authentication failed"})
        }
      if(result2.length>0){
          next();
      }
      else{
           res.status(500).send({Error:"Authentication failed"})
      }
        
    })
}
else{
    res.status(500).send({Error:"Authentication failed"})
}
     
     
 });
 
    }
    else{
        res.status(500).send({Error:"Authentication failed"})
    }
 
}


