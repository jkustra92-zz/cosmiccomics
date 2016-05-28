var express = require("express");
var router = express.Router();
var md5 = require("md5");
var Comic = require("../models/comics.js")
var publicKey = process.env.MARVEL_PUBLIC_KEY;
var privateKey = process.env.MARVEL_PRIVATE_KEY;
var ts = Date.now();
var hash = md5(ts+privateKey+publicKey)

//http://gateway.marvel.com:80/v1/public/comics?title=Hawkeye&startYear=2012&issueNumber=3&apikey=a7fe91c1a8f9dff79e43e342dfc46824

//============
//search form
//============

router.get("/search", function(req, res){
  res.render("comicviews/search.ejs")
})

router.post("/search", function(req, res){
  var searchTitle = req.body.title;
  var searchIssueNumber = req.body.issueNumber
  var searchStartYear = req.body.startYear
  // console.log(searchTitle)
  // console.log(searchIssueNumber)
  // console.log(searchStartYear)
  res.redirect("/comics/" + searchTitle + "/" + searchIssueNumber + "/" + searchStartYear);
})


router.get("/:title/:issueNumber/:startYear", function(req, res){
  var title = req.params.title;
  var issueNumber = req.params.issueNumber;
  var startYear = req.params.startYear;
  // console.log(title);
  // console.log(issueNumber);
  // console.log(startYear);
  request("http://gateway.marvel.com/v1/public/comics?title=" + encodeURIComponent(title) + "&StartYear=" + startYear + "&issueNumber=" + issueNumber + "ts=" + ts + "apikey=" + publicKey + "hash=" + hash), function(err, response, body){
    // console.log(response.body)
    res.send(response.body)
  }
});

module.exports = router;