var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/products", function(req,res){
    var products = [
        {brand:"Coach", id:"31208", image:"https://img1.cohimg.net/is/image/Coach/31208_b4ru_a0?fmt=jpeg&wid=578&hei=727&bgc=240,240,240&qlt=85,0&op_sharpen=1&resMode=bicub&op_usm=0,0,0,0&iccEmbed=0&fit=hfit"},
        {brand:"MK", id:"30T8SXIL7T", image:"https://michaelkors.scene7.com/is/image/MichaelKors/30T8SXIL7T-1684_1?wid=997&hei=1344&op_sharpen=1&resMode=sharp2&qlt=90"},
        {brand:"KateSpade", id:"pxru9257", image:"https://katespade.insnw.net/KateSpade/PXRU9257_242?$rr_large$"}
    ]
    res.render("products",{products:products});
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("This ShopTime Server Has Started!");
});
