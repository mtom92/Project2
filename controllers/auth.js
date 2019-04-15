//require needed modules
let express = require('express');
//declare an express router
let router = express.Router();
//reference the models
let db = require('../models')
//declare Routes
router.get('/login',(req,res)=>{
  res.render('auth/login')
});

router.post('/login', (req,res)=>{
  res.send('reached the route post login')
})

router.get('/signup',(req,res)=>{
  res.render('auth/signup')
});


router.post('/signup',(req,res)=>{
  console.log(req.body)
  if(req.body.password !== req.body.password_verify){
    req.flash('error','passwords does not match')
    //res.render('auth/signup', {
    //  alerts:req.flash()
    //})
    res.redirect('/auth/signup')
  }
  else{
    db.user.findOrCreate({
      where: { email : req.body.email },
      default: req.body
    })
    .spread((user,wasCreated) =>{
      req.flash('success','Succesfuly logged')
      res.redirect('/')
    })
    .catch((err) =>{
      console.log('there is an error', err)
      req.flash('error','Something went wrong')
      res.redirect('/auth/signup')
    })

  }

});

//export the router object so that the routes can be used
module.exports = router;
