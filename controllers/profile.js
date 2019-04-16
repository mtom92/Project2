//require needed modules
let express = require('express');
//declare an express router
let router = express.Router();
//reference the models
let db = require('../models')

//get profile
router.get('/',(req,res)=>{
  res.send('profile stub page')
})

//export the routes

module.exports = router
