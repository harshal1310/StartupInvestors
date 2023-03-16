const jwt=require('jsonwebtoken')
const auth=async (req,res,next)=>{
    try
    {
        const token=req.cookies.jwt;
       const verify= jwt.verify(token,'abcdefghijklmnopqrstuvwxyzabcdefsxa')
      
       const user=await register.findOne({_id:verify._id})
       console.log(user)
       next();
      
    }
    catch(e){
    // res.send(e);
     console.log(e);
           res.send('index.ejs')
    }
}
module.exports=auth;