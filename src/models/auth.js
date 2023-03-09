//const jwt=require("jsonwebtoken");
var jwt = require('jsonwebtoken');

const register=require("../models/adddata");
const auth=async (req,res,next)=>{
    try
    {
        const token=req.cookies.jwt;
       const verify= jwt.verify(token,'abcdefghijklmnopqrstuvwxyzabcdefsxa')
       console.log(verify);
       
       const user=await register.findOne({_id:verify._id})
       console.log(user)
       next();
    }
    catch(e){
     //res.send(e);
     console.log(e);
           res.status(401).send(e);
    }
}
module.exports=auth;