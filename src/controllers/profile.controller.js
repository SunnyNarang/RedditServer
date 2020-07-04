const Profile = require("../models/profile");
const auth = require("../Auth/Auth")

exports.create = (req,res) =>{
    
    if(!req.body.name||!req.body.pk_user){
        res.status(500).send({Error:"Data not sufficient"})
    }
    
    var image = "user.jpg";
    if(req.body.image){
        image = req.body.image;
    }
    var communities = "";
    if(req.body.communities){
        communities = req.body.communities;
    }
    const moment= require('moment') 
    const profile = new Profile({
        name: req.body.name,
        image: image,
        points: 0,
        type: 1,
        communities: communities,
        created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
        pk_user: req.body.pk_user,
    })
    
    Profile.create(profile,(err,data)=>{
        if(err){
            res.status(500).send({Error: err});
        }
        else{
            res.send({DATA: data});
        }
    })
    
}

exports.update = (req,res) =>{
   if(!req.body.pk_user){
       res.status(500).send({Error: "User id not provided"});
   }
   Profile.update(req.body, (err,data)=>{
       if(err){
            res.status(500).send({Error: err});
       }
       else{
           res.send({DATA:data});
       }
       
   })
}

exports.getdata = (req,res) =>{
    const id = req.params.id;
    Profile.get(id,(err,data)=>{
        if(err){
            res.status(500).send({Error: err});
        }
        else{
            res.send({DATA: data});
        }
    });
}