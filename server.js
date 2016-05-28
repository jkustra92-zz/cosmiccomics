//==============
// REQUIREMENTS
//==============

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var db = process.env.MONGODB_URI || "mongodb://localhost/comic_collection";
var methodOverride = require("method-override");
var mongoose = require("mongoose");
var logger = require("morgan");
var api = require('marvel-api');
var port = process.env.PORT || 3000;

//==============
// middleware
//==============

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

//===============
// static stuffs
//===============

app.use(express.static("public"));

//=============
// controllers
//=============

var comicsController = require("./controllers/comics.js");
app.use("/comics/", comicsController);

// var userController = require("./controllers/users.js");
// app.use("/users/", userController);

// var seedController = require("./controllers/seed.js");
// app.use("/seed/", seedController);

//===================
// connect to the db
//===================

// mongoose.connect(db);

//============
// it listens
//============

app.listen(port);
console.log("yay the server is working on: " + port);