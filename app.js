const express = require('express');
const app = express();

const cookieParser = require("cookie-parser");
const cors = require('cors');
const morgan = require('morgan');


app.use(express.json());
app.use(cookieParser());

// setting up config files 
require('dotenv').config({path:'config/config.env'});


const bassurl = process.env.BASS_URL // api/v1


// emport routes 

const userRoute = require('./route/auth');
const errorMiddleware = require('./middlewares/errors/errors');

// middlewares 
app.use(morgan('dev'));
app.use(cors());


// endpoints 
// app.get('/',(req,res)=>{
//      res.status(200).json({message:'ok find it!!!'})
// });

app.use(bassurl,userRoute)

// error middlewares
app.use(errorMiddleware)

module.exports = app;