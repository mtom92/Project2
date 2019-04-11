//include .env variables
require('dotenv').config;

//require necessary modules
let express = require('express');
//declare express app
let app = express();
//set view engine
app.set('view engine', 'ejs');
//include (use) middle ware

//include routes from controllers

//make a home route GET /
app.get('/', (req,res)=>{
  res.send('STUB')
});
//listen from your port
app.listen(process.env.PORT || 3000);
