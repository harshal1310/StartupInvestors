const express = require("express");
const app = express();
const mongoose = require("./src/db/conn");
const UserModel = require("./src/models/adddata");
const auth = require("./src/models/auth");
const StartupModel = require("./src/models/addstartup");
const InvestorModel = require("./src/models/addinvestors");
const port = process.env.PORT || 3000;
const path = require("path");
var jwt = require('jsonwebtoken');
var http = require('http').Server(app);
var socketio = require('socket.io');
const msg = require('./src/models/msg');
const submsg = require('./src/models/addmsg')
const MongoClient = require("mongodb").MongoClient;
const url = 'mongodb://localhost:27017/';
const databasename = "registergordata";
const cookieParser = require('cookie-parser');
const axios = require("axios");
const static_path = path.join(__dirname, "../public/");
//console.log(static_path)
app.use(express.static(__dirname + '/public'))
app.set("view engine", "ejs")
const jwtSecretKey = "abcdefghijklmnopqrstuvwxyz123456"
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))

const update_user = (req, res) => {
  axios.get('/chat', { params: { id: req.query.id } })
    .then(submsg.find({ senderid: req.cookies.jwt.id }, ((err, docs) => {
      console.log(req.cookies.jwt.id);
      if (!err)
        res.render("showparticularchat", { data: docs })
      else
        res.send(err);
    })

    )
    )
    .catch(err => {
      res.send(err);
    })
}

app.get("/", (req, res) => {
  // res.send("hhh")
  res.render("index");
})
app.get("/userschat", (req, res) => {
  //res.send(req.params.id);

  //const array=await  submsg.find({senderid:"h1"});
  submsg.find({ senderid: "h1" }, ((err, docs) => {
    if (!err)
      res.render("showchat", { data: docs })
    else
      res.send(err);
  })

  )

})
app.get("/chat", update_user
)
/*
app.get("/chat", (req,res)=>{
  res.send(req.params.id);
  /*
//const array=await  submsg.find({senderid:"h1"});
 submsg.find({senderid:req.cookies.jwt.id,recieverid:req.params.id},((err,docs)=>{
  if(!err)
res.render("showparticularchat",{data:docs})
else
res.send(err);
})

)

//res.send("aa");
})*/
//var token="";
app.post("/", async (req, res) => {
  const user = new UserModel(req.body);
  const token = user.generateAuthToken();
  const userExist = await UserModel.findOne({ email: req.body.email });
  if (userExist) {
    res.json({ error: "Email or Phone number already exists" });
  }
  else {

    user.save().then(() => {
      res.render("login");
    }).catch((err) => { res.send(err) });
  }

})
app.get("/login", (req, res) => {
  res.render("login.ejs");
})
app.post("/login", async (req, res) => {
  const email = req.body.email
  const psw = req.body.pass
  console.log(email);
  const useremail = await UserModel.findOne({ email: email });
  console.log(useremail != null);
  if (useremail) {
    if (email == useremail.email && psw == useremail.pass) {
      token = await useremail.generateAuthToken();
      const data = {
        token: token,
        time: Date(),
        id: useremail._id,
        name: useremail.firstname
      }
      //const token = jwt.sign(data, jwtSecretKey);

      res.cookie('jwt', data);
      res.render('home.ejs', {profile:useremail.firstname})
    }
    else
      res.send("iNvalid")
  }
  else
    res.send("iNvalid")


})



app.get("/get", (req, res) => {
  res.send(req.cookies.jwt);

})
app.get("/showstartups", auth, (req, res) => {

  const startups = StartupModel.find();
  StartupModel.find((err, docs) => {
    if (!err) {
      res.render("_showstartups", { data: docs });
    }
    else {
      console.log(err);
    }
  })
});
app.get("/showinvestors", auth, (req, res) => {

  const investor = InvestorModel.find();
  InvestorModel.find((err, docs) => {
    if (!err) {
      res.render("_showinvestors", { data: docs });
    }
    else {
      console.log(err);
    }
  })
});

app.get("/logout", auth, async (req, res) => {
  try {
    res.clearCookie("jwt");
    await req.user.save();
    res.render("login");
  }
  catch (e) {
    res.send(e);
  }
  //  res.send(req.cookies.jwt);
})

app.get("/home", (req, res) => {
  //  res.clearCookie("jwt");
  var profile = req.jwt.token.name;
  // console.log(profile);
  res.render("home", {profile:profile});
  //  res.send(req.cookies.jwt);
})
app.get("/addstartup", (req, res) => {
  const startup = new StartupModel({ CompanyName: "c2", Description: "new", Foundedin: "2022", BType: "B2C", Employees: "100-250", FundingStage: "100m", TotalRaised: "50m", Tags: "IT" });
  startup.save().then(() => {
    res.send("ok");
  }).catch((err) => { res.send(err) });

}
)
app.get("/addinvestors", (req, res) => {

  const investor = new InvestorModel({ InvestorsName: "VKSINHA", InvestorType: "Angel", Investments: "5", Range: "50-150", Tags: "IT" });
  investor.save().then(() => {
    res.send("ok");
  }).catch((err) => { res.send(err) });

}
)
app.get("/messages", (req, res) => {
  const investor = msg.find();
  msg.find((err, docs) => {
    if (!err) {
      // console.log(docs);
      res.send(docs);
      //   res.render("_showinvestors",{data:docs});
    }
    else {
      console.log(err);
    }
  })
})
app.get("/messages:user", async (req, res) => {
  const sender = await msg.find({ name: 'h1' });
  res.send(sender);
})

m_user = (req, res) => {
  axios.get('http://localhost:3000/showstartups', { params: { id: req.query.id } })
    .then(
      function () {
        const startups = StartupModel.find();
        StartupModel.find((err, docs) => {
          if (!err) {
            res.render("_showstartups", { data: docs });
          }
          else {
            console.log(err);
          }
        })
      }
    )
    .catch(err => {
      res.send(err);
    })
}

app.get('/startups', auth, m_user)

var id = "";
const chat =  (req, res) => {
  id = req.query.id;
  console.log(id);
  console.log(req.cookies.jwt.id);

   submsg.findOne({senderid:req.cookies.jwt.id, recieverid:id}, (err, docs) => {
    if (!err) {
      res.render('mypage', { data: docs })
      // res.send(docs)
    }
    else
      res.send(err);
  })


}
app.get("/sendmessage", auth, chat)
app.post("/sendmessage", auth, async (req, res) => {
  var sender = req.cookies.jwt.id;
  var reciever = id;

  try {
    const array = await submsg.findOne({ senderid: sender, recieverid: reciever });
    //console.log(array);
    if (array != null) {
      try {
        const newarray = array.messages;

        newarray.push({ msg: req.body.message, name: req.cookies.jwt.name });
        submsg.findOneAndUpdate({ senderid: sender, recieverid: reciever }, { messages: newarray }, { upsert: true }, function (err, doc) {
          if (err) {
            console.log(err);
            res.send(500, { error: err });
          } else
            res.render('mypage', { data: doc });
        });
      }
      catch (e) {
        console.log(e);
        res.send(e);
      }
    }
    else {
      const user = new submsg(req.body);
      // console.log(user);
      user.senderid = sender;
      user.recieverid = reciever;
      user.sendername = req.cookies.jwt.name;
      user.recievername = reciever;
      user.messages.push({ msg: req.body.message, name: req.cookies.jwt.name });
      user.save().then(() => {
        res.render("initiateChat");
      }
      ).catch((err) => { res.send(err) });

      console.log('saved');
      // res.send("ss");
    }
  }
  catch (error) {
    res.sendStatus(500);
    return console.log('error', error);
  }
  finally {
    console.log('Message Posted')
  }
}
)
app.get("/inbox", auth, (req, res) => {
  submsg.find({ senderid: req.cookies.jwt.id }, (err, docs) => {
    if (!err)
      res.render('inbox', { data: docs })
    else
      res.send(err);
  })
})
// res.send("pp"+id+req.cookies.jwt.id);


app.post('/mes', async (req, res) => {

  //res.send(req.cookies.jwt.id+" "+"rec"+req.query.id);
  try {

    const array = await submsg.findOne({ senderid: req.body.name, recieverid: "h3" });
    //
    //console.log(req.cookies.jwt.id);
    //console.log(req.params.id);
    console.log(req.body.name);
    console.log(req.body.message);
    if (array) {
      console.log(array.senderid);
      try {
        const newarray = array.messages;
        // console.log("if")
        newarray.push({ msg: req.body.message });
        //submsg.updateOne({senderid:"h1"},{sendername:"ss"})

        await submsg.findOneAndUpdate({ senderid: req.body.name, recieverid: "h3" }, { messages: newarray }, { upsert: true }, function (err, doc) {
          if (err) {

            console.log(err);
            res.send(500, { error: err });
          } else
            res.send('Succesfully saved.');
        });
      }
      catch (e) {
        console.log(e);
        res.send(e);
      }
    }
    else {
      const user = await new submsg(req.body);

      // console.log(user);
      user.senderid = req.body.name;
      user.recieverid = "h3";
      user.sendername = req.body.name;
      user.recievername = "h3";
      user.messages.push({ msg: req.body.message });
      user.save().then(() => {
        res.render("login");
      }).catch((err) => { res.send(err) });

      console.log('saved');
      res.send("ss");
    }
  }
  catch (error) {
    res.sendStatus(500);
    return console.log('error', error);
  }
  finally {
    console.log('Message Posted')
  }

})
//app.post('/messages',addmessage);

const server = app.listen(port, () => console.log("est"));
const io = socketio(server)

io.on('connection', (socket) => {
  console.log('New connection')
})
