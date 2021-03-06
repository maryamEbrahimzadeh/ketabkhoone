var express = require('express');
const book = require("../models/book.js");
const user = require("../models/user.js");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {fail : false});    
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    user.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

// main login page //
router.get('/login', function(req, res){
// check if the user's credentials are saved in a cookie //
    res.render('login', { title: 'Hello - Please Login To Your Account' });
});

router.get('/signup', function(req, res){
// check if the user's credentials are saved in a cookie //
    res.render('signup', { title: 'Hello - Please Login To Your Account' });
});

router.post('/adduser', function(req, res) {

    let u = new user({ username: req.body.user ,name: req.body.name,password : req.body.pass,'islogine':true })
    
    u.save(function (err, todos) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            console.log("user registered");
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

router.post('/auth', function(req, res) {
  
    user.findOne({'username' :req.body.user}, (err, u) => { 
        if (u){
			u.password == req.body.pass ? res.render("main"): res.send("wronge pass");
		}else{
            res.render("login", {fail : true});
            //res.status(400).send(e);    
		}
    })
    
});

router.get('/test', function(req, res) {
    res.render('test');
});


router.post('/addbook', function(req, res) {

    var bookName = req.body.bookName;
    var author = req.body.auther;
    //var image_path = req.files.path;
    var genere = req.body.genere;
   
    let b = new user({ bookname: bookName ,genre: genere ,author : author })
    b.save(function (err, todos) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            console.log("book is registered");
            // And forward to success page
            res.send( bookName + "  book added.");
        }
    });
});


module.exports = router;
