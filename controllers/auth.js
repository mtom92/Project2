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
      defaults: req.body
    })
    .spread((user,wasCreated) =>{
      if(wasCreated){
        req.flash('success','Succesfuly logged')
        res.redirect('/')
      }else{
        req.flash('error','Account already exist')
        res.redirect('/auth/login')
      }

    })
    .catch((err) =>{
      //generic error for all cases (not okay for user to see)
      console.log('there is an error', err)
        //validation-specific errors (ok to show the user)

      if(err && err.errors){
        req.flash('error','Something went wrong')
        err.errors.forEach((e) => {
          if(e.type == 'Validation error'){
            req.flash('error', 'Validation issue -' + e.message)
          }
        })
      }
      res.redirect('/auth/signup')
    })

  }

});


//get logout
router.get('/logout',(req,res)=>{
  res.send('logout stub')
})
//export the router object so that the routes can be used
module.exports = router;
