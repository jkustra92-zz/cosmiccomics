//==============
// requirements
//==============
var mongoose = require('mongoose');

//=========
// schemas
//=========

var userSchema = new mongoose.Schema({
  name: String,
  email: {type: String, require: true, unique: true},
  comics: Array
});

//=========
// #mapit
//=========

var User = mongoose.model("User", userSchema);

module.exports = User;