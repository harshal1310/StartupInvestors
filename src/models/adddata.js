const mongoose = require('mongoose');
//var jwt = require('jsonwebtoken');
var jwt = require('jsonwebtoken');

var schema = new mongoose.Schema({
    name : {
        type : String,
        //required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    pass : {
        type: String,
        required: true,
        
    },
    tokens:[{
        token:{
            type: String,
            required: true,
             
        }
    }]
})
schema.methods.generateAuthToken=async function(){
    try{
        var token = jwt.sign({ _id: this._id}, 'abcdefghijklmnopqrstuvwxyzabcdefsxa');
        console.log(token);
        this.tokens=this.tokens.concat({token:token});
       // await this.save(); 
        return token;
    }
    catch(error){
        console.log(error);
    }
}
const Userdb = mongoose.model('playlist', schema);

module.exports = Userdb;