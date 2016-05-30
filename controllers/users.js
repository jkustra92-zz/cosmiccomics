//=============
//requirements
//=============

var express = require("express");
var router = express.Router();
var request = require("request");
var Comic = require("../models/comics.js");
var User = require("../models/users.js");

//======
//index
//======

router.get("/", function(req, res){
  // console.log(req.cookies);
  function isEmpty(object) {
    for(var key in object) {
      if(object.hasOwnProperty(key)){
        return false;
        }
      }
      return true;
    }
    if(isEmpty(req.cookies)){
      res.redirect("/user/addUser") 
    }else{
      var user = User.findOne({email: req.cookies.email}).then(function(user){
        Promise.all(user.comics.map(function(id){                               //Promise.all is pretty cool. So there's a set amount of IDs in the user.comics array. Promise.all is gonna make sure
          return Comic.findById(id);                                            //map can do its thing and get all of the ids before returning the array. very thoughtful. i appreciate you, Promise.All
        })
        ).then(function(comics){
          res.render("userviews/index.ejs", {user: user, comics: comics})
        }).fail(function(err){
          console.log(err);
        })
      })
    }
});

//==========
// new user
//==========

router.get("/adduser", function(req, res){
  res.render("userviews/new.ejs");                     
});

//============
//create user
//============

router.post("/", function(req, res){
  var user = new User(req.body)
  // console.log(user);
  user.save(function(err){
    if (err){
      console.log(err);
    }else{
      res.cookie("email", user.email);                                    //figured it'd be best to set the cookie as the user's email since they have to be unique - no confusion here!
      res.redirect("/user")
    }
  })
});

//=======
// stats
//=======

router.get("/comics/stats", function(req, res){
  // console.log("hey");
 var user = User.findOne({email: req.cookies.email}).then(function(user){
    Promise.all(user.comics.map(function(id){                              
      return Comic.findById(id);                                            
    })
    ).then(function(comics){
      // console.log(comics);
      var priceArray = comics.map(function(value){                            //utilizing map and reduce to get the total price and page count for the 
        return value.price                                                    //comics in the user's array. have a separate show page for these totals.
      })
      // console.log(priceArray);
      var pageArray = comics.map(function(value){
        return value.pageCount
      })
      // console.log(pageArray);
      var price = priceArray.reduce(function(previous, current){
        return previous + current
      })
      // console.log(price);
      var pageCount = pageArray.reduce(function(previous, current){
        return previous + current
      })
      // console.log(pageCount);
      var comics = {
        price: price,
        pageCount: pageCount
      }
      // console.log(comics);
      res.render("userviews/stats.ejs", {user: user, comics: comics})
    }).fail(function(err){
      console.log(err);
    })
  })
})

//======
// show
//======

router.get("/comics/:id", function(req, res){
  // console.log(req.params.id)
  var comic = Comic.findById(req.params.id).then(function(comic){
    res.render("userviews/show.ejs", {comic})
  })
});

//=======
// edit
//=======

router.get("/comics/:id/edit", function(req, res){
  var comic = Comic.findById(req.params.id).then(function(comic){
    res.render("userviews/edit.ejs", {comic})
  })
});

//========
// update
//========

router.put("/comics/:id", function(req, res){
  Comic.findOneAndUpdate({ _id: req.params.id }, req.body, function(err, comic) {
    if(err){
      console.log(err);
    }else{
      res.redirect("/user/comics/" + req.params.id)
    }
  })
});

//================================
// add a comic to the user's page
//================================

router.post("/:id", function(req, res){
  var user = User.findOne({email: req.cookies.email}).then(function(user){
    var comic = new Comic(req.body)         
    // console.log(comic);
    comic.save();                                                         
    user.comics.push(comic._id);
    user.save();                                                          //if i don't do this, then it won't be saved in the database and that would be unforunate.
    // console.log(user)                                                  //checking to make sure it's actually in the array                                                     
    res.redirect("/user/")
  })
});

//========
// delete
//========

router.delete("/comics/:id", function(req, res){
  var user = User.findOne({email: req.cookies.email}).then(function(user){      //so this was a little different from what we've been doing. i have a one to many relationship
    var deleteIndex = user.comics.indexOf(req.params.id)                        //with the comics and the users they belong to. so i was originally deleting the comic from the 
    user.comics.splice(deleteIndex, 1)                                         //database and then my ejs file was freaking out bc it was trying to render something that doesn't exist. so instead, i 
    // console.log(user.comics)                                                //need to go old school and splice it from the user's array. nice.
    user.save();                                                               
    res.redirect("/user")                                                                              
  })                                                       
});


module.exports = router;