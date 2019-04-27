// Require needed modules
let express = require('express')

// Declare an express router
let router = express.Router()

// Reference the models
let db = require('../models')

// Refernce to passport so we can use the authenticate function
let passport = require('../config/passportConfig')

// Declare routes
router.get('/login', (req, res) => {
  res.render('auth/login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  successFlash: 'Yay, login was successful!',
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid Credentials!'
}))

router.get('/signup', (req, res) => {
  res.render('auth/signup')
})

router.post('/signup', (req, res, next) => {
  if(req.body.password !== req.body.password_verify) {
    req.flash('error', 'Passwords do not match')
    res.redirect('/auth/signup')
  }
  else {
    db.user.findOrCreate({
      where: { email: req.body.email },
      defaults: req.body
    })
    .spread((user, wasCreated) => {
      if(wasCreated) {
        // Automatically log the new user in!
        passport.authenticate('local', {
          successRedirect: '/profile',
          successFlash: 'Yay, successful account creation!',
          failureRedirect: '/auth/login',
          failureFlash: 'Invalid Credentials'
        })(req, res, next)
      }
      else {
        req.flash('error', 'Account already exists. Please log in!')
        res.redirect('/auth/login')
      }
    })
    .catch((err) => {
      // Print all error info to the terminal (not okay for user to see)
      console.log('Error in POST /auth/signup', err)

      // Generic Error for all cases
      req.flash('error', 'Something went wrong! :(')

      // Validation-specific errors (okay to show the user)
      if(err && err.errors) {
        err.errors.forEach((e) => {
          if(e.type == 'Validation error') {
            req.flash('error', 'Validation issue - ' + e.message)
          }
        })
      }

      res.redirect('/auth/signup')
    })
  }
})

// GET /auth/logout
router.get('/logout', (req, res) => {
  req.logout() // Delete the session data for logged in user
  req.flash('success', 'Goodbye - see ya next time! ❤️')
  res.redirect('/')
})

/* FACEBOOK SPECIFIC ROUTES */
// GET /auth/facebook (outgoing request to facebook)
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['public_profile', 'email', 'user_birthday']
}))

// GET /auth/callback/facebook (incoming data from facebook)
router.get('/callback/facebook', passport.authenticate('facebook', {
  successRedirect: '/profile',
  successFlash: 'Facebook login successful',
  failureRedirect: '/auth/login',
  failureFlash: 'Facebook has failed you'
}))

// Export the router object so that the routes can used elsewhere
module.exports = router
