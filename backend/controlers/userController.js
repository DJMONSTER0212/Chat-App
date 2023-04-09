const expressAsyncHandler = require("express-async-handler")
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');
const registerUser = expressAsyncHandler(async(req,res)=>{
    console.log(req.body)
    const {name,email,password,pic} = req.body
    if(!name||!email||!password){
        res.status(400);
        throw new Error("Please enter all the Fields");
    }
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error("user already exists");
    }
    
        const user = await User.create({
            name,
            email,
            password,
            pic,
        });
        if(user){
            res.status(201).json({
                _id:user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                token:generateToken(user._id)
            })
        }else {
            res.status(400);
            throw new Error("Failed to create a new user ")
        }
    // console.log("Hellp")
})

module.exports = {registerUser};