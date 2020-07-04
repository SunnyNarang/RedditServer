const Users = require("../models/users");
const bcrypt = require("bcrypt");
exports.create = (req, res) => {
 
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  bcrypt.hash(req.body.password, 10).then(function (hash) {
    const user = new Users({
      username: req.body.username,
      password: hash,
    });
    Users.create(user, (err, data) => {
      if (err)
        res.status(500).send({
          message:err,
        });
      else {
            var nodemailer = require('nodemailer');
            var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'commhub100@gmail.com',
              pass: 'Sunny@123'
            }
          });
          
          var mailOptions = {
            from: 'commhub100@gmail.com',
            to: req.body.username,
            subject: 'Community Hub - Verify Email',
            text: 'Hello There, Your verification code is - '+data.otp
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        
        res.send(data.message);
        
      }
    });
  });
};

exports.auth = (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const user = new Users({
    username: req.body.username,
    password: req.body.password,
  });

  Users.checkpass(user, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err,
      });
    }
    else res.send(data);
  });
};

exports.forgot = (req,res) =>{
   
   if (!req.body.username) {
    res.status(400).send({
      message: "Content can not be empty!",
    });}
    
  
    Users.forgot(req.body.username, (err,data)=>{
      if(err)
        res.status(500).send({Error:err});
      else{
            var nodemailer = require('nodemailer');
            var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'commhub100@gmail.com',
              pass: 'Sunny@123'
            }
              });
              
              var mailOptions = {
                from: 'commhub100@gmail.com',
                to: req.body.username,
                subject: 'Community Hub - Forgot Password',
                text: 'Hello There, Your password reset link is - '+data.password
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
        res.send({DATA:data.message});
      }
    })
    
  }



exports.verify = (req,res)=>{
  if (!req.body.username || !req.body.otp) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  
  Users.verify(req.body.username,req.body.otp,(err,data)=>{
    if(err){
      console.log("OTP Didn't Match")
      res.status(500).send({message:err});
    }
    else{
      console.log("OTP Verified");
      res.send({data:data});
    }
  })
  
  
}

