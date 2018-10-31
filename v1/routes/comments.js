var express = require("express");
var router = express.Router();
var Product = require("../models/product");
var Comment = require("../models/comment");



// COMMENTS 
router.get("/products/:id/comments/new",isLoggedIn, function(req, res) {
    // find by ID
    Product.findById(req.params.id, function(err,product) {
        if(err){
            console.log(err);
        } else{
            res.render("comments/new",{product: product});
        }
    });
});

router.post("/products/:id/comments", function(req, res) {
    // find by ID
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
                    product.comments.push(comment);
                    product.save();
                    res.redirect('/products/' + product._id);
                }
            });
        }
    });
});

function isLoggedIn(req,res,next){              // middleware
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;