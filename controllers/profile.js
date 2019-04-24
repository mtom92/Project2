//require needed modules
let express = require('express');
//declare an express router
let router = express.Router();
//reference the models
let db = require('../models')

//include custom middleware to ensure users are logged inspect
let adminLoggedIn = require('../middleware/adminLoggedIn')
let loggedIn = require('../middleware/loggedIn')

let store
//get profile
router.get('/', loggedIn ,(req,res)=>{
  db.user.findOne({
    where : { id : req.user.id},
    include: [db.job]
  }).then(function(foundJobs) {
    res.render('profile/index', { job: foundJobs.jobs })
  }).catch(function(error) {
    console.log(error)
    res.status(400).render('404')
  })
})

//get profile/admin
router.get('/admin', adminLoggedIn ,(req,res)=>{
  res.render('profile/admin')
})

//post
router.post('/', (req,res) => {
      db.job.create({
      title: req.body.title,
      company: req.body.company,
      description: req.body.description,
      url: req.body.url,
      location : req.body.location,
      logo : req.body.logo,
      userId : req.body.userId
    })
     .then(createdJob => {
       store = createdJob;
       db.match.create({
          jobId: createdJob.id
       })
        .then(createdMatch =>{
          res.redirect('/profile')
        })
         .catch(error =>{
           console.log(error)
           res.status(404).render('404')
         })

    })
    .catch(function(error) {
      console.log(error)
      res.status(404).render('404')
    })

})

//export the routes

module.exports = router
