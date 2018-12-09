var express = require("express");
var router = express.Router();
var Product = require("../models/product");

// Index Products
router.get("/", function(req,res){
    // console.log(req.user); // testing console before vs.after login
    // Get All Products from Database
    Product.find({}, function(err,allProducts){
        if(err){
            console.log(err);
        } else {
            
            res.render("products/index",{products:allProducts});
        }
    });

});

// Create a product
router.post("/", isLoggedIn, function(req, res){
    //res.send("Submit Success!");  // testing
   // get data from form and add to products array
    var brand = req.body.brand;
    var productID = req.body.productID;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newProduct = {brand: brand, productID: productID, image: image, description: description, author:author};
    
    // testing
    //console.log(req.user);
    
    //products.push(newProduct); // Delete the hard code of productsjson
    
    // Create a new product and save to DB
    Product.create(newProduct, function(err, newCreated){
       if(err) {
           console.log(err);
       } else {
           // redirect back to products page
           console.log(newCreated);
           res.redirect("/products");
       }
    });
 
});

// New Product Form
router.get("/new", isLoggedIn, function(req, res) {
    res.render("products/new");
})

// Show Single Product
router.get("/:id", function(req,res){
    // find by ID
    Product.findById(req.params.id).populate("comments").exec(function(err, foundProduct){
        if(err){
            console.log(err);
        } else{
            console.log(foundProduct);
            // render show template
            res.render("products/show",{product: foundProduct});
        }
    });
});

// Edit Product Route
router.get("/:id/edit", checkProductOwnership, function(req, res) {
    Product.findById(req.params.id, function(err, foundProduct){
        res.render("products/edit", {product: foundProduct});
    });
});

// Update Product Route
router.put("/:id", checkProductOwnership, function(req,res){
   // find and upate the correct product & // redirect show page
   Product.findByIdAndUpdate(req.params.id, req.body.product, function(err, updatedProduct){
      if(err) {
          res.redirect("/products");
      } else {
          res.redirect("/products/" + req.params.id);
      }
   });
   
});

// Destroy Product Route
router.delete("/:id", checkProductOwnership, function(req, res){
   // res.send("You are trying to delete");
   Product.findByIdAndRemove(req.params.id, function(err){
      if(err) {
          res.redirect("/products");
      } else {
          res.redirect("/products");
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

function checkProductOwnership(req, res, next){
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

module.exports = router;