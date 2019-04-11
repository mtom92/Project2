//require needed modules
let express = require('express');
//declare an express router
let router = express.Router();
//declare Routes
router.get('/login',(req,res)=>{
  res.send('Login Page')
});

router.get('/signup',(req,res)=>{
  res.send('Sign Up Page')
});

//export the router object so that the routes can be used
modules.exports = router;
