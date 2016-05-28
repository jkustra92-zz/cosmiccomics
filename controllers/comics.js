var express = require("express");
var router = express.Router();
var Comic = require("../models/comics.js")
var publicKey = process.env.MARVEL_PUBLIC_KEY;
var privateKey = process.env.MARVEL_PRIVATE_KEY;
var api = require('marvel-api');
var marvel = api.createClient({
  publicKey: publicKey,
  privateKey: privateKey
});

router.get("/", function(req, res){
  var characters = marvel.characters.findAll()
  .then(function(characters){res.send(characters)})
  .fail(console.error)
  .done();
})

module.exports = router;