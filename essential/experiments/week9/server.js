var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var mongoose = require('mongoose');

var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL;

var osconn= mongoose.connect(connectionString);

//var db = mongoose.connect('mongodb://localhost/test');

//var conn = mongoose.createConnection('mongodb://localhost/test');
//var conn2 = mongoose.createConnection('mongodb://localhost/cs5610');


var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
app.use(session({secret : 'this is the secret'}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(__dirname + '/public'));


var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    first: String,
    last: String,
    email: String,
    roles: [String]
});

var UserModel = mongoose.model("UserModel", UserSchema);

//var soumya = new UserModel({
//    username: 'soumya',
//    password: 'soumya',
//    first: 'soumya',
//    last: 'ramesh',
//    email: 'soumya@ccs.neu.edu',
//    roles: ['admin']
//});

//soumya.save()

passport.use(new LocalStrategy(
    function (username, password, done) {
        UserModel.findOne({ username: username, password: password }, function (err, user) {
        if (user)
        {
            return done(null, user);
        }
        return done(null, false, { message: 'Unable to login' });
        });
    }));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

app.post("/login", passport.authenticate('local'), function (req, res) {
    var user = req.user;
    console.log(user);
    res.json(user);
})

app.get('/loggedin', function (req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
})

app.post("/logout", function (req, res) {
    req.logout();
    res.send(200);
})

app.post("/register", function (req, res) {
    var newUser = new UserModel(req.body);
    newUser.roles = ['non-admin'];
    newUser.save(function (err, user) {
        req.login(user, function (err) {
            if (err) {
                return next(err);}
                res.json(user);
            
        });
    });
});










var ChapterSchema = new mongoose.Schema({
    name: String
});

//Schema
var BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    chapters: [ChapterSchema]
}, { collection: "book" });


//Collection
var Book = mongoose.model("book", BookSchema);




//app.delete("/book/:index/chapter/:chapterIndex", function (req, res) {
//    var index = req.params.index;
//    books[index].chapters.splice(req.params.chapterIndex, 1);
//    res.json(books);
//})



app.delete("/book/:id", function (req, res) {
    Book.findById(req.params.id, function (err, data) {
        data.remove();
        Book.find(function (err, data) {
            res.json(data)
        });
    });
});

app.post("/book", function (req, res) {
    var book1 = new Book(req.body);
    book1.save(function (err, doc) {
        Book.find(function (err, data) {
            res.json(data)
        });
    });
});


app.get("/book", function (req, res) {
    Book.find(function (err, data) {
        res.json(data)
    })
})

app.get("/book/:id", function (req, res) {
    Book.findById(req.params.id, function(err,doc) {
        res.json(doc);
    })
})


app.put("/book/:id", function (req, res) {
    Book.update({ _id: req.params.id }, { $set: req.body }, function (err, doc) {
        Book.find(function (err, data) {
            res.json(data)
        });
    });
});

//app.listen(3000);
app.listen(port, ipaddress);