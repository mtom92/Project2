module.exports = (req,res,next) => {
  if(req.user){
 //someone is logged in . This is expected
 //we allow them to proceed
  next()
  } else{
    req.flash('error','You must be logged to view this page!')
    res.redirect('/auth/login')
  }
}
