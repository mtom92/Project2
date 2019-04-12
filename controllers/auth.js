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
  res.send('reached the route post signup')
});

//export the router object so that the routes can be used
module.exports = router;
