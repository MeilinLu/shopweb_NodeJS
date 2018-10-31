var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


router.get("/", function(req, res){
    res.render("landing");
});


// AUTHENTICATION

// Registration Form

router.get("/register", function(req, res) {
    res.render("register");
});

router.post("/register", function(req, res) {
   // res.send("Register Processing....."); // testing
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/products");
        });
    });
});

// Login Form

router.get("/login", function(req, res) {
    res.render("login");
});

/*app.post("/login",function(req, res) {
    //res.send("Login Processing....."); // testing
})*/

// app.post("/login", middleware, callback) // logic

router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/products",
        failureRedirect: "/login"
    }), function(req, res){
});

// Logout 

router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/products");
});

function isLoggedIn(req,res,next){              // middleware
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;