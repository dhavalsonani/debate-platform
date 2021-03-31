// Route handlers
const express = require('express');
const router = express.Router();
const passport = require('passport');



//import data models
const User = require("./models/user");

router.use(function(req, res, next) { 
   res.locals.currentUser = req.user; 
   res.locals.errors = req.flash("error");  
   res.locals.infos = req.flash("info");  
   next();
});




// Route to signup page
router.get("/signup", function(req, res){
  res.render("signup");
});

router.post("/register", function(req, res, next){
  var username = req.body.username;
  let preferences = req.body.preferences.split(',');
  preferences.forEach(function(preference, index){
      preferences[index] = preference.trim();
  });

  User.findOne({email: username }, function(err, user){ 
    
    if (err) {
      return next(err);
    }
    if(user) {
      console.log(user)
      req.flash("error", "User already exists");
      return res.redirect("/signup");
    }
    var new_user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.username,
      password: req.body.password,
      preferences: preferences,
      debate_liked: [],
      comment_liked: [],
    });
    console.log('here')
    new_user.save(next);
  });
}, passport.authenticate("local", {
    successRedirect: "/",    
    failureRedirect: "/signup",    
    failureFlash: true
}));

// route to login page
router.get("/login", checkNotAuthenticated, function(req, res){
  res.render("login");
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true
}));

// route to logout page
router.get("/logout", function(req, res){
	//console.log(req.user);
  req.logout();
  req.session.destroy();
  res.redirect("/login");
});

// authentication middleware
function checkAuthenticated(req, res, next){
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash("info", "You must be logged into see this page");
    res.redirect("/login");
  }
};

function checkNotAuthenticated(req, res, next){
  if(req.isAuthenticated()){
      res.redirect("/");
  }
  else{
    next(); 
  }

}

module.exports = router;