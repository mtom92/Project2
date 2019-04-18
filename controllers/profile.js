//require needed modules
let express = require('express');
//declare an express router
let router = express.Router();
//reference the models
let db = require('../models')

//include custom middleware to ensure users are logged inspect
let adminLoggedIn = require('../middleware/adminLoggedIn')
let loggedIn = require('../middleware/loggedIn')

//get profile
router.get('/', loggedIn ,(req,res)=>{
  res.render('profile/index')
})

//get profile/admin
router.get('/admin', adminLoggedIn ,(req,res)=>{
  res.render('profile/admin')
})

//export the routes

module.exports = router
