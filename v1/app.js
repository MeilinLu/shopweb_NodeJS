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
var methodOverride = require("method-override");
var flash = require("connect-flash");

// Require Routes
var commentRoutes = require("./routes/comments");
var productRoutes = require("./routes/products");
var indexRoutes = require("./routes/index");

mongoose.connect('mongodb://localhost:27017/shop_time', { useNewUrlParser: true }); //solve a DeprecationWarning //mongoose.connect("mongodb://localhost/shop_time");  
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"))
app.use(flash());
//seed the database
// seedDB();

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

// With this function, we do not need to write {products:allProducts, currentUser: req.user}) all the time
app.use(function(req, res, next){               // middleware
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


app.use("/", indexRoutes);
app.use("/products", productRoutes);
app.use("/products/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("This ShopTime Started V1 !");
});
