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

// Comment Edit Route
router.get("/:comment_id/edit", function(req, res){
   // res.send("Edit Route For Comment"); 
   Comment.findById(req.params.comment_id, function(err, foundComment) {
      if(err) {
          res.redirect("back");
      } else {
          res.render("comments/edit", {product_id: req.params.id, comment: foundComment});
      }
   });
});

// Comment Update
router.put("/:comment_id", function(req, res){
    // res.send("You are trying to update comment");
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err) {
            res.redirect("back");
        } else {
            res.redirect("/products/" + req.params.id);
        }
    });
});

// Comment Destroy Route
router.delete("/:comment_id", function(req, res){
   // res.send("You are trying to destroy comment"); 
   // findByIdAndRemove
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/products/" + req.params.id);
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