var express = require("express");
var router = express.Router();
var Comic = require("../models/comics.js")
var User = require("../models/users.js")

router.get("/newcomic", function(req, res) {

    var newComic = [
      {
        title: "Hawkeye",
        issueNumber: "1",
        imgUrl: "http://i.annihil.us/u/prod/marvel/i/mg/a/00/513f32ffeb699.jpg",
        author: "Matt Fraction",
        artist: "David Aja",
        qty: 1
      }

    ];

    Comic.create(newComic, function(err) {
          console.log("done!");
    });

});

router.get("/newuser", function(req, res) {

    var newUser = [
        {
          name: "Test",
          comics: ["Test 1", "Test 2"]
        }
    ];

    User.create(newUser, function(err) {
          console.log("done! :)")
    });
});

module.exports = router;