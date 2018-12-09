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
router.post("/",function(req, res){
    //res.send("Submit Success!");  // testing
   // get data from form and add to products array
    var brand = req.body.brand;
    var productID = req.body.productID;
    var image = req.body.image;
    var description = req.body.description;
    var newProduct = {brand: brand, productID: productID, image: image, description: description};
  //products.push(newProduct); // Delete the hard code of productsjson
    
    // Create a new product and save to DB
    Product.create(newProduct, function(err, newCreated){
       if(err) {
           console.log(err);
       } else {
           // redirect back to products page
           res.redirect("/products");
       }
    });
 
});

// New Product Form
router.get("/new", function(req, res) {
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

module.exports = router;