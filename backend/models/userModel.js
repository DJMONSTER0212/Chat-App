const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true ,unique :true},
    password:{type:String,required:true},
    pic: { type: String, default:"https://www.ps4wallpapers.com/wp-content/uploads/2017/11/PS4Wallpapers.com_5a1b8d9f24d92_Mia-Khalifa-Beautiful-Hd-Wallpapers.jpg"},            //because link is also a string
 },{
    timestamps:true
 })
 const User = mongoose.model("User",userSchema);
 module.exports = User