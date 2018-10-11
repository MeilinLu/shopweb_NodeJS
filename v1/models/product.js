var mongoose = require("mongoose");

// SCHEMA SETUP
var productSchema = new mongoose.Schema({
    brand: String,
    productID: String,
    image: String,
    description: String
});

module.exports = mongoose.model("Product", productSchema);