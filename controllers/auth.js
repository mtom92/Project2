//require needed modules
let express = require('express');
//declare an express router
let router = express.Router();
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
  if(req.body.password !== req.body.password_verify){
    req.flash('error','passwords does not match')
    //res.render('auth/signup', {
    //  alerts:req.flash()
    //})
    res.redirect('/auth/signup')
  }
  else{
    req.flash('success','Succesfuly logged')
    res.redirect('/')

  }

});

//export the router object so that the routes can be used
module.exports = router;
