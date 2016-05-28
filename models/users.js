//==============
// requirements
//==============
var mongoose = require('mongoose');

//=========
// schemas
//=========

var userSchema = new mongoose.Schema({
  name: String,
  comics: Array
});

//=========
// #mapit
//=========

var Product = mongoose.model("Product", productSchema);

module.exports = Product;
