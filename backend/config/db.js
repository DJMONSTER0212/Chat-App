const mongoose = require('mongoose')

const  connectDB = async ()=>{
    try {
        
        const connect = await mongoose.connect("mongodb+srv://devanshjain02122003:devansh%400212@chatters.kvzzx2p.mongodb.net/?retryWrites=true&w=majority",{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log(`MongoDB Connected : ${connect.connection.host}`)
    } catch (error) {
        console.log(error);
        process.exit();
    }
};

module.exports = connectDB;