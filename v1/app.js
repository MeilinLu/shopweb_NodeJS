var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});


var products = [
        {brand:"Coach", productID:"31208", image:"https://img1.cohimg.net/is/image/Coach/31208_b4ru_a0?fmt=jpeg&wid=578&hei=727&bgc=240,240,240&qlt=85,0&op_sharpen=1&resMode=bicub&op_usm=0,0,0,0&iccEmbed=0&fit=hfit"},
        {brand:"MK", productID:"30T8SXIL7T", image:"https://michaelkors.scene7.com/is/image/MichaelKors/30T8SXIL7T-1684_1?wid=997&hei=1344&op_sharpen=1&resMode=sharp2&qlt=90"},
        {brand:"KateSpade", productID:"pxru9257", image:"https://katespade.insnw.net/KateSpade/PXRU9257_242?$rr_large$"}
]
app.get("/products", function(req,res){
    res.render("products",{products:products});
});

app.post("/products",function(req, res){
    res.send("Submit Success!");
   // get data from form and add to products array
    var brand = req.body.brand;
    var productID = req.body.productID;
    var image = req.body.image;
    var newProduct = {brand: brand, productID: productID, image: image};
    products.push(newProduct);
   // redirect back to products page
    res.redirect("/products");
});


app.get("/products/new", function(req, res) {
    res.render("new.ejs");
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("This ShopTime Server Has Started!");
});
