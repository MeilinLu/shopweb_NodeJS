var mongoose = require("mongoose");
var Product = require("./models/product");
var Comment  = require("./models/comment");

var data = [
    {
        brand:"Coach", 
        productID:"31208", 
        image:"https://img1.cohimg.net/is/image/Coach/31208_b4ru_a0?fmt=jpeg&wid=578&hei=727&bgc=240,240,240&qlt=85,0&op_sharpen=1&resMode=bicub&op_usm=0,0,0,0&iccEmbed=0&fit=hfit",
        description:"1Crossbody, Logo, 2Crossbody, Logo, 3Crossbody, Logo, 4Crossbody, Logo, 5Crossbody, Logo, 6Crossbody, Logo, 7Crossbody, Logo"
     },
    {
        brand:"MK", 
        productID:"30T8SXIL7T", 
        image:"https://michaelkors.scene7.com/is/image/MichaelKors/30T8SXIL7T-1684_1?wid=997&hei=1344&op_sharpen=1&resMode=sharp2&qlt=90",
        description:"Crossbody, Logo"
    },
    {
        brand:"KateSpade", 
        productID:"pxru9257", 
        image:"https://katespade.insnw.net/KateSpade/PXRU9257_242?$rr_large$",
        description:"Crossbody, Logo"
    }
]
function seedDB(){
    
    // Remove all products
    Product.remove({}, function(err) {
        if(err){
            console.log(err);
        }
        console.log("removed products !");
    });
   
    // add a few products
    data.forEach(function(seed){
        Product.create(seed, function(err,product){
            if(err){
                console.log(err);
            } else {
                console.log("add a product");
                
                // create a comment
                Comment.create(
                    {
                        text: "This is a nice design",
                        author: "Meilin"
                    
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        } else {
                            product.comments.push(comment);
                            product.save();
                            console.log("Create a new comment");
                        }
                    });
                    
            }
        });
    });
   
}

module.exports = seedDB;
/*
 
function seedDB(){
   //Remove all products
   Product.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed products!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few products
            data.forEach(function(seed){
                Product.create(seed, function(err, product){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a product");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    product.comments.push(comment);
                                    product.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;*/