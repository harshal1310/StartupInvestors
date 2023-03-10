const express = require("express");
const app = express();
const mongoose=require("./src/db/conn");
const UserModel=require("./src/models/adddata");
const auth=require("./src/models/auth");
const StartupModel=require("./src/models/addstartup");
const InvestorModel=require("./src/models/addinvestors");
const port = process.env.PORT || 3000;
const path=require("path");
var jwt = require('jsonwebtoken');
var http = require('http').Server(app);
var socketio = require('socket.io');
const msg=require('./src/models/msg');
const cookieParser = require('cookie-parser');

const static_path = path.join(__dirname,"../public/");
//console.log(static_path)
app.use(express.static(__dirname + '/public'))
app.set("view engine", "ejs")

app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))


app.get("/",(req,res)=>{
   // res.send("hhh")
    res.render("index");
})
app.post("/register", async (req,res)=>{
    const user=new UserModel(req.body);
const token=await user.generateAuthToken();
   const userExist = await UserModel.findOne({ email: req.body.email });
   if (userExist)
   {
         res   .json({ error: "Email or Phone number already exists" });
   }
else{

user.save().then(()=>{
  res.render("login");
}).catch((err)=>{res.send(err)});
}

})

app.post("/login",async (req,res)=>{
 const email=req.body.email
    const psw=req.body.psw
    const useremail = await UserModel.findOne({email:email});
console.log(useremail);
if(useremail)
   {if(email==useremail.email&&psw==useremail.pass)
  { 
const token=await useremail.generateAuthToken();
res.cookie('jwt',token,{expire:new Date()+5000});
res.send("iff");  
}
else
res.send("iNvalid")
}
  else
  res.send("iNvalid")
  
 
})
app.get("/showstartups", (req,res)=>{
//const user=UserModel.find();
  /*UserModel.find((err, docs) => {
    if (!err) {
        res.render("_show", {
            data: docs
        });
    } else {
        console.log('Failed to retrieve the Course List: ' + err);
    }
});
*/
const startups=StartupModel.find();
StartupModel.find((err,docs)=>{
  if(!err){
    res.render("_showstartups",{data:docs});
  }
  else
  {
    console.log(err);
  }
})
});
app.get("/showinvestors", (req,res)=>{
  
  const investor=InvestorModel.find();
  InvestorModel.find((err,docs)=>{
    if(!err){
  // console.log(docs);
   //res.send(docs);
         res.render("_showinvestors",{data:docs});
    }
    else
    {
      console.log(err);
    }
  })
  });
  
app.get("/logout",auth,async(req,res)=>{
try{res.clearCookie("jwt");
await req.user.save();
  res.render("login");}
  catch(e){
    res.send(e);
  }
  //  res.send(req.cookies.jwt);
})

app.get("/s",auth,(req,res)=>{
//  res.clearCookie("jwt");
    res.send("yes");
    //  res.send(req.cookies.jwt);
  })
app.get("/addstartup",(req,res)=>{
  const startup=new StartupModel({CompanyName:"c1",Description:"des",Foundedin:"2023",BType:"B2B",Employees:"100-150",FundingStage:"80",TotalRaised:"84",Tags:"BBHKK"});
  startup.save().then(()=>{
    res.send("ok");
  }).catch((err)=>{res.send(err)});
  
}
)
app.get("/addinvestors",(req,res)=>{
  
  const investor=new InvestorModel({InvestorsName:"Investor1",InvestorType:"VC",Investments:"10",Range:"100-150",Tags:"BBHKK"});
  investor.save().then(()=>{
    res.send("ok");
  }).catch((err)=>{res.send(err)});
  
}
)
app.get("/messages",(req,res)=>{
  const investor=msg.find();
  msg.find((err,docs)=>{
    if(!err){
  // console.log(docs);
   res.send(docs);
      //   res.render("_showinvestors",{data:docs});
    }
    else
    {
      console.log(err);
    }
  })  
})
 
const server=app.listen(port,()=>console.log("est"));
const io = socketio(server)

io.on('connection', (socket) => {
    console.log('New connection')
})
