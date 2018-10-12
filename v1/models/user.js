var mongoose = require("mongoose");

var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
        username: String,
        password: String
});

// solve TypeError: User.authenticate is not a function
// Mongoose model does not have authenticate method, so add it to your schema.

UserSchema.methods.authenticate = function(password) {
  //implementation code goes here
}

    
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);