var express = require("express");
var router = express.Router({mergeParams: true});  // {mergeParams: true} solve for find :id
var Product = require("../models/product");
var Comment = require("../models/comment");


// Comments New
router.get("/new",isLoggedIn, function(req, res) {
    // find by ID
    Product.findById(req.params.id, function(err,product) {
        if(err){
            console.log(err);
        } else{
            res.render("comments/new",{product: product});
        }
    });
});

// Comments Create
router.post("/", function(req, res) {
    // find by ID
    console.log(req.param.id);    // solve error for <%= product.brand%> <%= product.productID %>
    Product.findById(req.params.id, function(err,product) {
        if(err){
            console.log(err);
            res.redirect("/products");
        } else{
          console.log(req.body.comment);
            // create new comment
            // connect new comment to product
            // redirect to product show page
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // checking in console log
                    // console.log("New comment's username will be: "+ req.user.username);
                    // save comment
                    comment.save();
                    product.comments.push(comment);
                    product.save();
                    console.log(comment);
                    res.redirect('/products/' + product._id);
                }
            });
        }
    });
});

// middleware
function isLoggedIn(req,res,next){              
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;