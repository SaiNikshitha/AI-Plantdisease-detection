const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const User = require('./models/user' );
const Upload=require('./models/upload');
require('dotenv').config();


const jwt=require('jsonwebtoken');
const cookieParser=require("cookie-parser");
const passport=require('passport');
const path=require('path');
const app = express();

const connectdb=require('./db.js');
const {restrictToLoggedinUserOnly,checkAuth,restrictto }=require('./middleware/auth.js');
const userroute=require('./routes/user.js');
const uploadroute=require('./routes/upload.js');
const feedbackroute=require('./routes/feedback.js');
const staticroute=require('./routes/static.js');
const historyroute=require('./routes/history.js');
const authroutes = require('./routes/auth');
const adminroute=require('./routes/admin.js');


const fs= require('fs');

// const multer=require('multer');
const axios=require('axios');

// connectdb("mongodb://127.0.0.1:27017/project").then(()=>{
//   console.log("mongodb connected");
//   app.listen(5000,()=>{
//     console.log('server listening on port 5000');
//  });
// })

connectdb(process.env.MONGO_URL).then(()=>{
  console.log("mongodb connected");
  app.listen(process.env.PORT || 5000,()=>{
    console.log('server listening on port 5000');
 });
})

app.set("view engine","ejs");

app.use(cors());
// app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use('/node_modules', express.static('node_modules'));


app.use('/history',restrictToLoggedinUserOnly,restrictto(["user","admin"]),historyroute);
app.use(express.static("public")); 
app.use('/uploads', express.static('uploads'));

app.use(express.urlencoded({extended:true}));

app.use('/user',userroute);
app.use('/auth',authroutes)
// app.use((req, res, next) => {
//   console.log(`Received request: ${req.method} ${req.url}`);
//   console.log('Headers:', req.headers);
//   console.log('Body:', req.body); // May be empty for file uploads
//   next();
// });


//distinct

app.use('/upload',restrictToLoggedinUserOnly,restrictto(["user","admin"]),uploadroute);
app.use('/',checkAuth,staticroute);

app.use('/feedback',restrictToLoggedinUserOnly,restrictto(["user"]),feedbackroute);
app.use('/admin',restrictto(["admin"]),adminroute)
app.get('/signup',(req,res)=>{
  res.render('signup');
})
app.get('/capture',(req,res)=>{
  res.render('capture');
})




