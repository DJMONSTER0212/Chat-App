const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    pic: { type: String, required: true, default:"https://www.ps4wallpapers.com/wp-content/uploads/2017/11/PS4Wallpapers.com_5a1b8d9f24d92_Mia-Khalifa-Beautiful-Hd-Wallpapers.jpg"},            //because link is also a string
 },{
    timestamps:true
 })
 const User = mongoose.Model("User",userSchema);
 module.exports = User