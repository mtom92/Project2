//require needed modules
 let express = require('express');
//declare an express router
 let router = express.Router();
 let parser = require('body-parser');
 let request = require('request');
 let textVersion = require("textversionjs");
 //reference the models
 let db = require('../models')



 router.get('/:id',(req,res)=>{

   db.job.findOne({
     where : { id : req.params.id},
     include: [db.match]
   }).then(function(foundJobs) {
     let description = textVersion(foundJobs.description)
     res.render('jobs/show', { job: foundJobs , jobDescription: description })
   }).catch(function(error) {
     console.log(error)
     res.status(400).render('404')
   })
 })

 






 module.exports = router
