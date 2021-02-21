const mongo=require("mongoose");

const signup=mongo.Schema({
    companyname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    img:{
        type:String,
        require:true
    }
})
module.exports=mongo.model("signup",signup)