//include the variables from .env
require('dotenv').config()

//require passport and any passport strategies you wish to use
let passport = require('passport')
let LocalStrategy = require('passport-local').Strategy
let FacebookStrategy = require('passport-facebook').Strategy

// references to the models
let db = require('../models')

//provide serialization/deserialization functions for passport to used
//this allows passport to store the user by the id alone (serialize the number)
// and look up the full information about a user from the id (deserialize the user)
passport.serializeUser((user,callback) =>{
  //callback (errormessage -null if none , userData - the id only in this case )
  callback(null,user.id)
})

passport.deserializeUser((id,callback) =>{
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
  .catch(callback)
}))

//set up facebook strategy
passport.use(new FacebookStrategy({
  clientID : process.env.FB_APP_ID,
  clientSecret : process.env.FB_APP_SECRET,
  callbackURL : process.env.BASE_URL + '/auth/callback/facebook',
  profileFields : ['id','email','displayName','photos','birthday'],
  enableProof : true
},(facebookAccessToken,refreshToken,profile,callback) =>{
  //grab the primary email
   let facebookEmail = profile.emails.length ? profile.emails[0].value : ''
  //look for the email facebook gave us in our local database
  db.user.findOne({
    where : { email : facebookEmail}
  })
  .then(existingUser =>{
    if(existingUser && facebookEmail){
      //this is a returning user - just return their facebook id and token
      existingUser.update({
        facebookId : profile.id,
        facebookToken : facebookAccessToken
      })
      .then( updatedUser =>{
        callback(null,updatedUser)
      })
      .catch(callback)
    }
    else{
      //this is a new user - we need to create them
      let userNameArr = profile.displayName.split(' ')
      let photo = profile.photos.length ? profile.photos[0].value : 'https://res.cloudinary.com/dnkav9q9s/image/upload/v1555699331/sample.jpg'
      db.user.findOrCreate({
        where : { facebookId : profile.id },
        defaults : {
          facebookToken : facebookAccessToken,
          email : facebookEmail,
          firstname : userNameArr.length > 2  ? userNameArr.slice(0, userNameArr.length - 2).join(' ') : userNameArr[0],
          lastname : userNameArr[userNameArr.length - 1],
          birthday : profile._json.birthday,
          image : photo ,
          bio : 'this account was created with facebook'
        }
      })
      .spread((foundOrCreatedUser , wasCreated) => {
        callback(null,foundOrCreatedUser)
      })
      .catch(callback)
    }
  })
  .catch()

}))
//make sure I can use this file in the other pages
module.exports = passport
