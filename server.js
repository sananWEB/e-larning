const cors=require("cors")
const bodyParser=require("body-parser");
const upload=require("./multer")
const express=require("express")
require("./mongo")
require("./cloudinary")
const nodemiler=require("nodemailer")
require("dotenv").config();
const addcourse=require("./model/addcourse")
const jwt=require("jsonwebtoken")
const cloudinary=require("cloudinary")
const Auth=require("./Auth")
const signupmodel=require("./model/signup")
const addjob=require("./model/addjob")
const addintership=require("./model/addintership")
const app=express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors())

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
  });


  app.post("/signup",upload.single("file"),async(req,res)=>{
console.log(req.body)
console.log(req.file)
    const data1= await signupmodel.find({email:req.body.email});
   if(req.body.CompanyName=="" || req.body.email=="" || req.body.password=="" || req.body.cpassword==""){ 
      return res.send({msg:"Please Fill The Field",msgscreen:"error"})
    }
else if(req.file==undefined){
 return res.send({msg:"Please Select image",msgscreen:"error"})
}

else if(data1.length==1){
  return res.send({msg:"This Email is already register",msgscreen:"error"})
}

else if(req.body.password!=req.body.cpassword){
  return res.send({msg:"Password does not match",msgscreen:"error"})
}

else{
  const imgg= await cloudinary.v2.uploader.upload(req.file.path,{quality:"20"})
  const data= new signupmodel();
  data.companyname=req.body.CompanyName;
  data.email=req.body.email;
  data.password=req.body.password;
data.img=imgg.secure_url;
  await data.save().then(()=>{res.send({msg:"Company is Registered",msgscreen:"success"})})
}
  })




app.post("/signin",async(req,res)=>{
  const data= await signupmodel.find({email:req.body.email})


  if(req.body.email=="" || req.body.password==""){
    res.send({msg:"Please Fill The Field",msgscreen:"error"})
  }
  else if(data.length==0){
    res.send({msg:"This email doesnot exist !!!",msgscreen:"error"})
  }
  else if(req.body.password!=data[0].password){
    res.send({msg:"Incorrent Password",msgscreen:"error"})
  }
  else{
    

const token=jwt.sign({
  id:data[0]._id,
  companyname:data[0].companyname,
  email:data[0].email,
  password:data[0].password,
  img:data[0].img,
  login:true
},"xyz")
res.send(
  {
    msg:"login Successfully",msgscreen:"success",token:token,
    id:data[0]._id,
  companyname:data[0].companyname,
  email:data[0].email,
  password:data[0].password,
  img:data[0].img,
  login:true

  }
  )
}})


app.get("/getdata",Auth,(req,res)=>{

  res.send(userdata)

})

app.post("/updateuser",upload.single("img"),async(req,res)=>{
//console.log(req.file)
  
if(req.file==undefined){ 

 await signupmodel.updateOne({email:req.body.email},{$set:{companyname:req.body.companyname,password:req.body.password}}).then(async()=>{
  
  const data= await signupmodel.find({email:req.body.email})

  const token=jwt.sign({
   id:data[0]._id,
   companyname:data[0].companyname,
   email:data[0].email,
   password:data[0].password,
   img:data[0].img,
   login:true
 },"xyz")
 
   res.send({msg:"Updated",token:token})
   
 
})

}
else{



 
  const imgg= await cloudinary.v2.uploader.upload(req.file.path,{quality:"20"})
 await addcourse.updateMany({accountID:req.body.userid},{$set:{img:imgg.secure_url,companyname:req.body.companyname}})

 await addjob.updateMany({accountID:req.body.userid},{$set:{img:imgg.secure_url,companyname:req.body.companyname}})


 await addintership.updateMany({accountID:req.body.userid},{$set:{img:imgg.secure_url,companyname:req.body.companyname}})


  
  

 await signupmodel.updateOne({email:req.body.email},{$set:{companyname:req.body.companyname,password:req.body.password,img:imgg.secure_url}}).then(async()=>{
  
  const data= await signupmodel.find({email:req.body.email})

  const token=jwt.sign({
   id:data[0]._id,
   companyname:data[0].companyname,
   email:data[0].email,
   password:data[0].password,
   img:data[0].img,
   login:true
 },"xyz")
 
   res.send({msg:"Updated",token:token})
   
 
})


}
  
})


app.post("/addjob",(req,res)=>{
const data= new addjob();

data.jobtitle=req.body.jobtitle
data.city=req.body.city
data.catogary=req.body.catogary
data.experience=req.body.experience
data.timing=req.body.timing
data.companyname=req.body.companyname
data.timing=req.body.timing
data.salary=req.body.salary
data.gender=req.body.gender
data.accountID=req.body.accountID
data.education=req.body.education
data.position=req.body.position
data.apply=req.body.apply
data.skills=req.body.skills
data.discription=req.body.discription
data.img=req.body.img
data.save().then(()=>{res.send("Job has been created")});

//  console.log(req.body)
})


app.post("/Addinterships",(req,res)=>{
  const data= new addintership();

  data.intershiptitle=req.body.intershiptitle
data.city=req.body.city
data.catogary=req.body.catogary
data.experience=req.body.experience
data.timing=req.body.timing
data.Intershiptype=req.body.Intershiptype
data.timing=req.body.timing
data.salary=req.body.salary
data.gender=req.body.gender
data.accountID=req.body.accountID
data.position=req.body.position
data.companyname=req.body.companyname
data.apply=req.body.apply
data.skills=req.body.skills
data.discription=req.body.discription
data.img=req.body.img
data.save().then(()=>{res.send("Intership has been created")});

})

app.post("/addcourse",upload.single("selectimg"),async(req,res)=>{

  const imgg= await cloudinary.v2.uploader.upload(req.file.path,{quality:"20"})


  const data= new addcourse();

  data.coursetitle=req.body.coursetitle
data.city=req.body.city
data.catogary=req.body.catogary
data.timing=req.body.timing
data.content=req.body.content
data.learn=req.body.learn
data.Requirements=req.body.Requirements
data.instractorname=req.body.instractorname
data.accountID=req.body.accountID
data.discription=req.body.discription
data.img=imgg.secure_url
data.price=req.body.price
data.companyname=req.body.companyname



data.save().then(()=>{res.send("Course has been created")});

  
})

app.get("/getjobs",async(req,res)=>{

  await addjob.find().then((ress)=>{res.send(ress)})
})

app.get("/getintership",async(req,res)=>{

  await addintership.find().then((ress)=>{res.send(ress)})
})

app.get("/getintership",async(req,res)=>{

  await addintership.find().then((ress)=>{res.send(ress)})
})

app.get("/getcourse",async(req,res)=>{

  await addcourse.find().then((ress)=>{res.send(ress)})
})

app.post("/jobdataput",async(req,res)=>{

  await addjob.find({_id:req.body.id}).then((ress)=>{res.send(ress)})
})



app.post("/updatejob",async(req,res)=>{

  await addjob.updateOne({_id:req.body.productID},{$set:{
    jobtitle:req.body.jobtitle,
    city:req.body.city,
    catogary:req.body.catogary,
    experience:req.body.experience,
    timing:req.body.timing,
    salary:req.body.salary,
    gender:req.body.gender,
    education:req.body.education,
    position:req.body.position,
    apply:req.body.apply,
    skills:req.body.skills,
    discription:req.body.discription,

  }}).then((ress)=>{res.send("Job Has Been Uploaded")})

  

})




app.post("/editintershtip",async(req,res)=>{

  await addintership.updateOne({_id:req.body.productID},{$set:{
    intershiptitle:req.body.intershiptitle,
    city:req.body.city,
    catogary:req.body.catogary,
    Intershiptype:req.body.Intershiptype,
    timing:req.body.timing,
    salary:req.body.salary,
    gender:req.body.gender,
    education:req.body.education,
    position:req.body.position,
    apply:req.body.apply,
    skills:req.body.skills,
    discription:req.body.discription,

  }}).then((ress)=>{res.send("Interships Has Been Uploaded")})

  

})
  

app.post("/updatecourse",upload.single("selectimg"),async(req,res)=>{
  
  
  if(req.file==undefined){

    await addcourse.updateOne({_id:req.body.productID},{$set:{
      coursetitle:req.body.coursetitle,
      city:req.body.city,
      catogary:req.body.catogary,
      price:req.body.price,
      timing:req.body.timing,
      instractorname:req.body.instractorname,
      Requirements:req.body.Requirements,
      learn:req.body.learn,
      content:req.body.content,
      discription:req.body.discription,
      accountID:req.body.accountID,
      companyname:req.body.companyname,
      number:req.body.number,
      companyname:req.body.companyname,
       
  
  
      
  
    }}).then((ress)=>{res.send("Course Has Been Uploaded")})
  
    

  }
  else{

    const imgg= await cloudinary.v2.uploader.upload(req.file.path,{quality:"20"})
  
 
  await addcourse.updateOne({_id:req.body.productID},{$set:{
    coursetitle:req.body.coursetitle,
    city:req.body.city,
    catogary:req.body.catogary,
    price:req.body.price,
    timing:req.body.timing,
    instractorname:req.body.instractorname,
    Requirements:req.body.Requirements,
    learn:req.body.learn,
    content:req.body.content,
    discription:req.body.discription,
    accountID:req.body.accountID,
    companyname:req.body.companyname,
    number:req.body.number,
    companyname:req.body.companyname,
     
      img:imgg.secure_url

    

  }}).then((ress)=>{res.send("Course Has Been Uploaded")})

}

})


app.post("/deletejob",async(req,res)=>{

  await addjob.findByIdAndDelete({_id:req.body.id})
})




app.post("/deleteintersgip",async(req,res)=>{

  await addintership.findByIdAndDelete({_id:req.body.id})
})


app.post("/deletecourse",async(req,res)=>{

  await addcourse.findByIdAndDelete({_id:req.body.id})
})


app.post("/getcv",upload.single("v3"), async(req,res)=>{

const email= await signupmodel.find({companyname:req.body.v2})
console.log(email[0].email)




let trans=nodemiler.createTransport({
  service:"gmail",
  secure: true,
  port: 587,
  auth:{
      user:"finalyearprojectsh@gmail.com",
      pass:"KHANKHAN123"
  }
}) 
//step2
let mailOptions={
 from:"finalyearprojectsh@gmail.com",
  to:email[0].email, 
  subject:req.body.v1,
  text:`JOBS:-${req.body.v1}`,
  attachments:[{filename:req.file.originalname,path:req.file.path}]
};

//step 3

trans.sendMail(mailOptions,(err)=>{
  if(err){
      console.log("something is wrong email does not send !",err)
  }
  else{
      console.log(" Email Send!!!!!")
  }
});

  
})



app.post("/getcvInter",upload.single("v3"), async(req,res)=>{

  const email= await signupmodel.find({companyname:req.body.v2})
  console.log(email[0].email)
  
  
  
  
  let trans=nodemiler.createTransport({
    service:"gmail",
    secure: true,
    port: 587,
    auth:{
        user:"finalyearprojectsh@gmail.com",
        pass:"KHANKHAN123"
    }
  }) 
  //step2
  let mailOptions={
   from:"finalyearprojectsh@gmail.com",
    to:email[0].email, 
    subject:req.body.v1,
    text:`intershiptitle:-${req.body.v1}`,
    attachments:[{filename:req.file.originalname,path:req.file.path}]
  };
  
  //step 3
  
  trans.sendMail(mailOptions,(err)=>{
    if(err){
        console.log("something is wrong email does not send !",err)
    }
    else{
        console.log(" Email Send!!!!!")
    }
  });
  
    
  })
  


  app.listen( process.env.PORT||5000,()=>{console.log("server is ON!")})
