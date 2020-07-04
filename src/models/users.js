const sql = require("./db.js");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

const User = function (user) {
  this.username = user.username;
  this.password = user.password;
};

User.create = (newUser, result) => {
  
  sql.query(
    "select * from users where username = '" + newUser.username + "'",
    function (err, result2, fields) {
      if(result2.length<1){
            var otp = between(100000,999999);
            sql.query("INSERT INTO users values(null,'"+newUser.username+"','"+newUser.password+"',"+otp+",0)", (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
            }
        
            console.log("created user: ", { id: res.insertId, ...newUser });
            result(null, {otp:otp,message: {id: res.insertId, ...newUser }});
          });
      }
      else{
        result("Username Exist",null);
      }
  });
};

User.checkpass = (user, result) => {
  
  var row = null;
  sql.query(
    "select * from users where username = '" + user.username + "'",
    function (err, result2, fields) {
      console.log('RESULT: '+ result2);
      if (err) throw err;
      
      
      if(result2.length>0){
      Object.keys(result2).forEach(function (key) {
        row =  result2[key];
        bcrypt.compare(user.password, row.password).then(function (res) {
          if (res === true) {
            if(row.verified===0){
              result(null,{Message:"Account not verified"})
            }
            else{
            var token = jwt.sign({username:user.username},"LOVEMYSELF")
            result(null, {token:token} );
            }
            
          } else {
            result("password didn't match", null);
          }
        });
      });
      }
      else{
        result("Username not found",null);
      }
      
      
      
    }
  );
};

User.verify = (username,otp,result) =>{
  var row = null;
  sql.query(
    "select * from users where username = '" +username + "'",
    function (err, result2, fields) {
        if(err){
          result("Error Try Again", null);
        }
        if(result2.length>0){
      Object.keys(result2).forEach(function (key) {
          row =  result2[key];
          if(row.otp == otp){
            result(null,"OTP MATCHED")
            
             
            sql.query("UPDATE users set verified = 1 where username = '"+username+"'", function (err2, result3) {
              if (err2) throw err2;
              console.log(result3.affectedRows + " record(s) updated");
            });
            
            
            
          }
          else{
            result("OTP DIDN'T MATCH",null)
          }
          }) 
        }
    })
};


User.forgot = (username,callback)=>{
  console.log("HERE")
  sql.query(
    "select * from users where username = '" +username + "'",
    function (err, result2, fields) {
      
      console.log("RESULT: "+ result2);
      if(err){
        callback("Something went Wrong", null);
      }
      if(result2.length>0){
        Object.keys(result2).forEach(function (key) {
        var row =  result2[key];
        callback(null,{message:"Email Sent", password: row.password});
        })
          
      }
      else{
        callback("No Username Found", null);
      }
      
    });
}



function between(min, max) {  
  return Math.floor(
    Math.random() * (max - min) + min
  )
}


module.exports = User;
