const Community = require("../models/community");


exports.getAll = (req,res) =>{
    Community.getAll((err,data)=>{
        if(err){
            res.status(500).send({Error:err})
        }
        else{
            res.send({message:data});
        }
    })
};

exports.getComm = (req,res) =>{
    if(!req.params.id){
        res.status(500).send({Error:"Didn't send ID"});
    }
    
    Community.getComm(req.params.id,(err,data)=>{
        if(err)
            res.status(500).send({Error:err})
        else{
            res.send({message:data});
        }
    })
    
};