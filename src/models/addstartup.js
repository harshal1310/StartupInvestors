const mongoose = require('mongoose');
//var jwt = require('jsonwebtoken');
var schema = new mongoose.Schema({
    CompanyName : {
        type : String,
        required: true,
        unique:true
    },
    Description:{
        type:String,
        required:true
    },
    Foundedin:{
        type:String,
        required:true
    },
    BType:{
          type:String,
          required:true  
    },
    Employees:{
        type:String,
        required:true
    },
    FundingStage:{
        type:String,
        required:true
    },
    TotalRaised:{
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
const Userdb = mongoose.model('startuplists', schema);

module.exports = Userdb;