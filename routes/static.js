const express = require("express");
const { restrictto,checkAuth } = require("../middleware/auth");
const uploads = require("../models/upload");

const router = express.Router();


router.get('/',(req,res)=>{
  // console.log('User:', req.user);
    res.render('project',{user:req.user});
  })
  
router.get('/signup',(req,res)=>{
    res.render('signup');
  })
  
router.get('/login',(req,res)=>{
    res.render('login');
  })
router.get('/logout',(req,res)=>{
  res.clearCookie('uid'); // Clear the authentication token cookie
  res.redirect('/'); 
})
router.get('/upload',(req,res)=>{
    res.render('upload');
  })

router.get('/history',(req,res)=>{
  res.render('history');
})


router.get('/admin/history',restrictto(["admin"]),async (req,res)=>{
    const histories= await uploads.find().lean();
    res.json({data:histories});
})

module.exports=router;