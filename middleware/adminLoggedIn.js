module.exports = (req,res,next) => {
  if(req.user && req.user.admin){
 //someone is logged in and they are an admin This is expected
 //we allow them to proceed
  next()
  } else{
    req.flash('error','You must be AN ADMIN logged to view this page!')
    res.redirect('/profile')
  }
}
