//require needed modules
 let express = require('express');
//declare an express router
 let router = express.Router();
 let parser = require('body-parser');
 let request = require('request');
 let urlToCall = ""

// Include any middleware here
 router.use(parser.urlencoded({ extended: false }));
//post search results
 router.post('/', (req,res)=>{

  var location = req.body.jobLocation
  var description = req.body.jobDescription

  if (req.body.jobLocation && req.body.jobDescription) {
     location = location.toLowerCase()
     description = description.toLowerCase()
      }else{
        location = '%22%20%22'
        description = '%22%20%22'
         }
     urlToCall = 'https://jobs.github.com/positions.json?description=' + description + '&location=' + location
     request( urlToCall , function(error , response , body){
     // Parse the data
       var result = JSON.parse(body);
       res.render('search/results', {result} )
        })
    })

//get search
   router.get('/', (req,res)=>{
   res.render('search/index')
    })


module.exports = router
