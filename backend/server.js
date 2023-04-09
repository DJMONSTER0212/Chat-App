const express = require('express');
const chats  = require('./data/data');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes')
const bodyParser = require('body-parser');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.json()); //to accept json data
dotenv.config();
connectDB();
app.get('/',(req,res)=>{
    res.send('app is running')
})


app.get('/api/chat',(req,res)=>{
    res.send(chats)
})

app.get("/api/chat/:id",async (req,res)=>{
    const singlechat = await chats.find((c)=>c._id===req.params.id);
    res.send(singlechat)
});

app.use(notFound);
app.use(errorHandler);

app.use('/api/user',userRoutes)

app.listen(5000,console.log("Server Running on localhost:5000"));