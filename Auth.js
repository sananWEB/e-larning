const jwt=require("jsonwebtoken");


const auth= async(req,res,next)=>{

    const token=req.header("token");

    if(!token){
        return res.send({msg:"token is not avilable"})
    }

   const tokenvarify=jwt.verify(token,"xyz")

   if(!tokenvarify){
    return res.send({msg:"token is not varify-token"})
   }

   userdata=tokenvarify

   next();

   
}

module.exports=auth;