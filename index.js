//include .env variables
require('dotenv').config();

//require necessary modules
let express = require('express');
let flash = require('connect-flash');
let layouts = require('express-ejs-layouts');
let session = require('express-session');
let methodOverride = require('method-override');
let moment = require('moment');
let shortDateFormat = 'LL';

//Include passport configuration
let passport = require('./config/passportConfig')

//declare express app
let app = express();
//set view engine
app.set('view engine', 'ejs');
//include (use) middle ware
app.use('/',express.static('static'))
app.locals.moment
app.use(layouts);
app.locals.moment = moment; // this makes moment available as a variable in every EJS page
app.locals.shortDateFormat = shortDateFormat;
app.use(express.urlencoded({ extended: false}))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave : false,
  saveUninitialized : true
}))
app.use(flash());
app.use(express.static(__dirname + '/static/'))
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
//custom meddleware - write data to locals
app.use((req,res,next) =>{
  res.locals.alerts = req.flash()
  res.locals.user = req.user
  next()
})
//include routes from controllers
app.use('/auth', require('./controllers/auth'))
app.use('/profile', require('./controllers/profile'))
app.use('/search', require('./controllers/search'))
app.use('/jobs', require('./controllers/jobs'))
//make a home route GET /
app.get('/', (req,res)=>{
  res.render('home')
});
//catch-all route -render the 404 page
app.get('*',(req,res)=>{
res.render('404')
})
//listen from your port
app.listen(process.env.PORT || 3000);
