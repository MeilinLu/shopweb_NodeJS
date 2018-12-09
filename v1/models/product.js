var mongoose = require("mongoose");

// SCHEMA SETUP
var productSchema = new mongoose.Schema({
    brand: String,
    productID: String,
    image: String,
    description: String,
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
});

module.exports = mongoose.model("Product", productSchema); 

//var Product = mongoose.model("Product", productSchema);  // not sending mongoose model out of the file, need export it