/*const mongoose = require('mongoose');

const subdocumentSchema = new mongoose.Schema({
    child: new mongoose.Schema({ name: String, age: Number })
  });
  const Subdoc = mongoose.model('Subdoc', subdocumentSchema);
  
  // Nested path
  const nestedSchema = new mongoose.Schema({
    child: { name: String, age: Number }
  });
  const Nested = mongoose.model('Nested', nestedSchema);
  const subdocumentSchema = new mongoose.Schema({
    child: new mongoose.Schema({
      name: String,
      msg:String
    })
  });
  //const Subdoc = mongoose.model('Subdoc', subdocumentSchema);
  
  // Note that the `age` default has no effect, because `child`
  // is `undefined`.
  //const doc = new Subdoc();
module.exports=subdocumentSchema;



const mongoose = require("mongoose");
const postSchema = require("./post.js").schema; //or wherever post.js is

const userSchema = new mongoose.Schema({
  name: { type: String },
  details: { type: String },
  userid: { type: String,
    index: {
      unique: true,
    }
  },
  posts: [postSchema]
});

const User = mongoose.model("User", userSchema);

module.exports = User;


const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name : {
    type     : String,
    trim     : true,
    required : true,
  },
  
  // profile as sub document
  profile : new mongoose.Schema({
    city : String,
    age  : {
      type    : Number,
      default : 0
    },
  }),
  
  // others as nested document
  others : {
    amount : {
      type    : Number,
      default : 0
    },
    email : {
      type : String,
      trim : true,
    },
  },

  // array of names as nested document
  friends : [
    { name: String }
  ],

  // array of hobbies as sub document
  hobbies : [
    new mongoose.Schema({ name: 'string' })
  ]
});

module.exports = mongoose.model('Person', personSchema);
/* //const connection = mongoose.createConnection('mongodb://localhost:27017/test');
  const childSchema = new mongoose.Schema({ name: 'string' });
  const parentSchema = new mongoose.Schema({
    children: [childSchema],
    child: childSchema
  });
  const Child =  mongoose.model('Child', childSchema);
  const Parent =  mongoose.model('Parent', parentSchema);
  module.exports=Parent;
  
  const parentSchema = new mongoose.Schema({
    level1: new mongoose.Schema({
      level2: new mongoose.Schema({
        test: String
      })
    })
  });
  const Parent =  mongoose.model('Parent', parentSchema);
  module.exports=Parent;*/

  const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({

  senderid:{
    type:String,
    required:true
  },
  recieverid:{
    type:String,
    required:true
  
  },
  messages:[{
    msg:{
      type:String,required:true},name:{
       type:String
      }
    }],
  sendername:{
    type: String,
    required: true
  },
  recievername:{
    type: String,
    required: true
  }
});

const expense = mongoose.model('messages',ExpenseSchema);
module.exports = expense;