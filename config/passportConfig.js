//require passport and any passport strategies you wish to use
let passport = require('passport')
let LocalStrategy = require('passport-local').Strategy

// references to the models
let db = require('../models')

//provide serialization/deserialization functions for passport to used
//this allows passport to store the user by the id alone (serialize the number)
// and look up the full information about a user from the id (deserialize the user)
passport.serializeUser((user,callback) =>{
  //callback (errormessage -null if none , userData - the id only in this case )
  callback(null,user.id)
})

passport.deserialize((id,callback) =>{
  db.user.findByPk(id)
  .then(user =>{
    //callback (errormessage -null if none , userData - the id only in this case )
    callback(null,user)
  })
  .catch(callback)
})

//set up the LocalStrategy
passport.use(new LocalStrategy({
  usernameField : 'email',
  password : 'password'
} , (email,password,callback) =>{
  //try looking up the user by email
  db.user.findOne({
    where : { email: email }
  })
  .then(foundUser =>{
    //if I didnt find a user or if i dod find a user and they have a bad password
    if(!foundUser || !foundUser.validPassword(password)){
      //this is a bad user
      callback(null,null)
    } else{
      //this one is a valid users
      callback(null,foundUser)
    }
  })
  .cathc(callback)
}))

//make sure I can use this file in the other pages
module.exports = passport
