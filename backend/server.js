const express = require('express');
const chats  = require('./data/data');
const dotenv = require('dotenv'); 
const cors = require('cors')
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes')
const messageRoutes = require('./routes/messageRoutes')
const chatRoutes = require('./routes/chatRoutes')
const bodyParser = require('body-parser');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.json()); //to accept json data
dotenv.config();
connectDB();
app.get('/',(req,res)=>{
    res.send('app is running')
})


// app.get('/api/chat',(req,res)=>{
//     res.send(chats)
// })

// app.get("/api/chat/:id",async (req,res)=>{
//     const singlechat = await chats.find((c)=>c._id===req.params.id);
//     res.send(singlechat)
// });

app.use("/api/user",userRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes);

app.use(notFound);
app.use(errorHandler);


const server = app.listen(process.env.PORT||5000,console.log("Server Running on localhost:5000"));
const io = require('socket.io')(server,{
    pingTimeout:60000,     // amout of time it will wait while being inactive 
    cors:{
        origin:"http://localhost:3000",
    }
});

io.on("connection",(socket)=>{
    console.log("connected to scoket.io")

    socket.on("setup",(userData)=>{
        socket.join(userData._id);
        console.log(userData._id)
        socket.emit("connected");
    })

    socket.on("join chat",(room)=>{
        socket.join(room);
        console.log("user joined room "+ room)
    })

    socket.on("typing",(room)=>socket.in(room).emit("typing")); 
    socket.on("stop typing",(room)=>socket.in(room).emit("stop typing")); 

    socket.on("new message",(newMessageRecieved)=>{
        var chat = newMessageRecieved.chat;
        if(!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user)=>{
            if(user._id == newMessageRecieved.sender._id) return;
            socket.in(user._id).emit("message recieved",newMessageRecieved)
        })
    })
})