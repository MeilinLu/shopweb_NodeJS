var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose  = require("mongoose");
var Product = require("./models/product");
var seedDB = require("./seeds");
var Comment = require("./models/comment");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");



seedDB();
mongoose.connect('mongodb://localhost:27017/shop_time', { useNewUrlParser: true }); //solve a DeprecationWarning //mongoose.connect("mongodb://localhost/shop_time");  
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));



// PASSPORT
app.use(require("express-session")({
    secret:"Secret setup !",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); // middleware
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());






app.get("/", function(req, res){
    res.render("landing");
});




// INDEX
app.get("/products", function(req,res){
    // Get all products from database
    Product.find({}, function(err,allProducts){
        if(err){
            console.log(err);
        } else {
            res.render("products/index",{products:allProducts});
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
    res.render("products/new");
})

// SHOW
app.get("/products/:id", function(req,res){
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

// COMMENTS 
app.get("/products/:id/comments/new", function(req, res) {
    // find by ID
    Product.findById(req.params.id, function(err,product) {
        if(err){
            console.log(err);
        } else{
            res.render("comments/new",{product: product});
        }
    });
});

app.post("/products/:id/comments", function(req, res) {
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


// AUTHENTICATION

// Registration Form

app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", function(req, res) {
   // res.send("Register Processing....."); // testing
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/products");
        });
    });
});

// Login Form

app.get("/login", function(req, res) {
    res.render("login");
});

/*app.post("/login",function(req, res) {
    //res.send("Login Processing....."); // testing
})*/

// app.post("/login", middleware, callback) // logic

app.post("/login", passport.authenticate("local",
    {
        successRedirect: "/products",
        failureRedirect: "/login"
    }), function(req, res){
        
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("This ShopTime Started V1 !");
});
