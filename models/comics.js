//==============
// requirements
//==============
var mongoose = require('mongoose');

//=========
// schemas
//=========

var comicSchema = new mongoose.Schema({
  title: String,
  issueNumber: Number,
  imgUrl: String,
  author: String,
  artist: String,
  qty: Number,
});

//=========
// #mapit
//=========

var Comic = mongoose.model("Comic", comicSchema);

module.exports = Comic;
