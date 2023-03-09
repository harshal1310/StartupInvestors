const mongoose = require('mongoose');
//var jwt = require('jsonwebtoken');
var schema = new mongoose.Schema({
    InvestorsName : {
        type : String,
        required: true,
        unique:true
    },
    InvestorType:{
          type:String,
          required:true  
    },
    Investments:{
        type:String,
        required:true
    },
    Range:{
        type:String,
        required:true
    },
    Tags:{
        type:String,
        required:true
    }
    
    

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
const Userdb = mongoose.model('investorslist', schema);

module.exports = Userdb;