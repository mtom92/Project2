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
    include: [db.job,db.skill]
  }).then(function(foundJobs) {
    res.render('profile/index', { job: foundJobs.jobs , skill : foundJobs.skills })
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

  if(!req.body['result[value]']){
    db.job.findOrCreate({
      where : {
      title: req.body.title,
      company: req.body.company,
      description: req.body.description,
      url: req.body.url,
      location : req.body.location,
      logo : req.body.logo,
      userId : req.body.userId
    }

  })
   .spread((createdJob , wasCreated) =>{
     if(wasCreated){
         db.match.findOrCreate({
           where:{jobId: createdJob.id}
           }).then(createdMatch =>{
              res.redirect('/profile')
               }).catch(function(error) {
                 console.log(error)
                 res.status(400).render('404')
               })

     }else{
       res.redirect('/profile')
     }
   })
   .catch(function(error) {
    console.log(error)
    res.status(400).render('404')
  })

}

if(req.body['result[value]']){
  //this is dealing with the skills
       db.skill.findOrCreate({
         where: { name: req.body['result[value]']}
       })
       .spread((skill, wasCreated) =>{
         db.userSkills.findOrCreate({
           where : {userId: req.user.id , skillId: skill.id}

         }).then(()=>{

           res.redirect('/profile')

         }).catch(function(error) {
            console.log(error)
           res.status(400).render('404')
          })

              }).catch(function(error) {
                 console.log(error)
                res.status(400).render('404')
               })
             }
    })


//destroy (/delete/:id) delete

router.delete('/skill',(req,res)=>{
  db.userSkills.destroy({
   where: { userId: req.user.id , skillId : req.body.skillId}
    }).then(()=>{
     res.redirect('/profile')
    })
    .catch(error =>{
      console.log(error)
      res.status(404).render('404')
     })
  })


 router.delete('/jobs',(req,res)=>{
   db.job.destroy({
    where: { id: req.body.jobId}
     }).then(()=>{
      res.redirect('/profile')
     })
     .catch(error =>{
       console.log(error)
       res.status(404).render('404')
      })
   })

//export the routes

module.exports = router
