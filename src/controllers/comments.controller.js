const Comments = require("../models/comments");

exports.getCommentsByID = (req,res) =>{
    if(!req.params.id){
        res.status(500).send({Error:"Send ID"});
    }
    
    Comments.getCommentsByID(req.params.id,(err,data)=>{
        if(err){
            res.status(500).send({Error:err})
        }
        else{
            res.send({message:data})
        }
    })
    
}

exports.postComment = (req,res)=>{
    if(!req.body.post_id||!req.body.user_id||!req.body.comment){
        res.status(500).send({Error:"Data Not Provided"})
    }
    
    Comments.postComment(req.body.post_id,req.body.user_id,req.body.comment,(err,data)=>{
        
        if(err){
            res.status(500).send({Error:err})
        }
        else{
            res.send({message:data});
        }
    })
}