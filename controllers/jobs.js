//require needed modules
 let express = require('express');
//declare an express router
 let router = express.Router();
 let parser = require('body-parser');
 let request = require('request');



 router.get('/:id',(req,res)=>{
   res.render('jobs/show')
 })


















 module.exports = router
