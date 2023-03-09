const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/registergordata",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>console.log("ss")).catch((err)=>console.log(err));
mongoose.set('strictQuery', true);
/*const Playlist=mongoose.Schema({name:String ,city:String ,videos:Number})

const PayListClass=new mongoose.model("PlayList",Playlist);
const react1=new PayListClass({name:"ash",city:"no",videos:7});
//react1.save();
const react2 = new PayListClass({name:"matkaKingAjinkya",city:"Wassepur",videos : 56});
//react2.save();
const getdoc=async()=>{
 const res= await  PayListClass.find();
 console.log(res);
}
getdoc();*/