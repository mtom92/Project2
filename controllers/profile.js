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
    let jobPromise =   db.job.create({
      title: req.body.title,
      company: req.body.company,
      description: req.body.description,
      url: req.body.url,
      location : req.body.location,
      logo : req.body.logo,
      userId : req.body.userId
    })
    let matchPromise = db.match.create({
      jobId : req.body.id
    })

    Promise.all([jobPromise,matchPromise])
     .then(function(results){
      res.redirect('/profile', { results })
    })
    .catch(function(error) {
      console.log(error)
      res.status(404).render('404')
    })

})

//export the routes

module.exports = router
