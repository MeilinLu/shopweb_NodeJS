var Product = require("../models/product");
var Comment = require("../models/comment");

// All Middleware

var middlewareObj = {}

middlewareObj.checkProductOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Product.findById(req.params.id, function(err, foundProduct){
            if(err) {
                res.redirect("back");
            } else {
                // console.log(foundProduct.author.id );
                // console.log(req.user._id);
                // check if the user own the post
                if(foundProduct.author.id.equals(req.user._id)){
                    // res.render("products/edit", {product: foundProduct});
                    next();
                } else {
                    // res.send("You do not have the permit to edit the product !");
                    res.redirect("back");
                }
            }
        });
    } else {
        // console.log("You need to login for authenticate");
        // res.send("You need to login for authenticate");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err) {
                res.redirect("back");
            } else {
                // check if the user own the comment
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}


middlewareObj.isLoggedIn = function(req,res,next){              
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = middlewareObj;



// OR
// var middlewareObj = {
//     checkProductOwnership : function(){}
//     checkCommentOwnership : function(){}
// };
// module.exports = middlewareObj;

// OR
/*
module.exports = {
    checkProductOwnership 
}
*/