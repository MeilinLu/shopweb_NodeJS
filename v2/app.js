var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose  = require("mongoose");

//mongoose.connect("mongodb://localhost/shop_time");  
mongoose.connect('mongodb://localhost:27017/shop_time', { useNewUrlParser: true }); //solve a DeprecationWarning
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});
// SCHEMA SETUP
var productSchema = new mongoose.Schema({
    brand: String,
    productID: String,
    image: String,
    description: String
});

var Product = mongoose.model("Product", productSchema);
/*
// testing
Product.create(
        {
            brand:"Coach", 
            productID:"31208", 
            image:"https://img1.cohimg.net/is/image/Coach/31208_b4ru_a0?fmt=jpeg&wid=578&hei=727&bgc=240,240,240&qlt=85,0&op_sharpen=1&resMode=bicub&op_usm=0,0,0,0&iccEmbed=0&fit=hfit",
            description: "crossbody, logo"
        }, function(err, product){
            if(err){
                console.log(err);
            }else{
                console.log("New Product Created: ");                    
                console.log(product);
            }
        });
*/

/* 
// testing
var products = [
        {brand:"Coach", productID:"31208", image:"https://img1.cohimg.net/is/image/Coach/31208_b4ru_a0?fmt=jpeg&wid=578&hei=727&bgc=240,240,240&qlt=85,0&op_sharpen=1&resMode=bicub&op_usm=0,0,0,0&iccEmbed=0&fit=hfit"},
        {brand:"MK", productID:"30T8SXIL7T", image:"https://michaelkors.scene7.com/is/image/MichaelKors/30T8SXIL7T-1684_1?wid=997&hei=1344&op_sharpen=1&resMode=sharp2&qlt=90"},
        {brand:"KateSpade", productID:"pxru9257", image:"https://katespade.insnw.net/KateSpade/PXRU9257_242?$rr_large$"},
        {brand:"Coach", productID:"31208", image:"https://img1.cohimg.net/is/image/Coach/31208_b4ru_a0?fmt=jpeg&wid=578&hei=727&bgc=240,240,240&qlt=85,0&op_sharpen=1&resMode=bicub&op_usm=0,0,0,0&iccEmbed=0&fit=hfit"},
        {brand:"MK", productID:"30T8SXIL7T", image:"https://michaelkors.scene7.com/is/image/MichaelKors/30T8SXIL7T-1684_1?wid=997&hei=1344&op_sharpen=1&resMode=sharp2&qlt=90"},
        {brand:"KateSpade", productID:"pxru9257", image:"https://katespade.insnw.net/KateSpade/PXRU9257_242?$rr_large$"},
        {brand:"Coach", productID:"31208", image:"https://img1.cohimg.net/is/image/Coach/31208_b4ru_a0?fmt=jpeg&wid=578&hei=727&bgc=240,240,240&qlt=85,0&op_sharpen=1&resMode=bicub&op_usm=0,0,0,0&iccEmbed=0&fit=hfit"},
        {brand:"MK", productID:"30T8SXIL7T", image:"https://michaelkors.scene7.com/is/image/MichaelKors/30T8SXIL7T-1684_1?wid=997&hei=1344&op_sharpen=1&resMode=sharp2&qlt=90"},
        {brand:"KateSpade", productID:"pxru9257", image:"https://katespade.insnw.net/KateSpade/PXRU9257_242?$rr_large$"}

]*/

// INDEX
app.get("/products", function(req,res){
    // Get all products from database
    Product.find({}, function(err,allProducts){
        if(err){
            console.log(err);
        } else {
            res.render("index",{products:allProducts});
        }
    });

});

// CREATE
app.post("/products",function(req, res){
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

// NEW
app.get("/products/new", function(req, res) {
    res.render("new.ejs");
})

// SHOW
app.get("/products/:id", function(req,res){
    // find by ID
    Product.findById(req.params.id, function(err, foundProduct){
        if(err){
            console.log(err);
        } else{
            // render show template
            res.render("show",{product: foundProduct});
        }
    });
  
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("This ShopTime Started V2 !");
});
