var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');
mongoose.connect('mongodb://localhost/project');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
app.use(session({ secret: 'this is the secret' }));
app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session());

var public_path = __dirname + '/public/'


app.use(express.static(__dirname + '/public'));

var commentServer=require('./public/models/commentServer.js');
var postServer=require('./public/models/postServer.js');
var tagServer=require('./public/models/tagServer.js');
var userServer=require('./public/models/userServer.js');
//require('./public/passportconfig/passportServer.js');




userServer.load(app, public_path);
commentServer.load(app, public_path);
postServer.load(app, public_path);
tagServer.load(app, public_path);

var UserModel=mongoose.model('UserModel');
var PostModel = mongoose.model('PostModel');
var TagModel = mongoose.model('TagModel');
var CommentModel = mongoose.model('CommentModel');

passport.use(new LocalStrategy(
function (username, password, done) {
    UserModel.findOne({ username: username, password: password }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user);
    })
}));



passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});




app.post("/login", passport.authenticate('local'), function (req, res) {
    var user = req.user;
    //console.log(user);
    res.json(user);
});

app.get('/loggedin', function (req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
});

app.post('/logout', function (req, res) {
    req.logOut();
    res.send(200);
});

app.post('/register', function (req, res) {
    var newUser = req.body;
    newUser.roles = ['student'];
    UserModel.findOne({ username: newUser.username }, function (err, user) {
        if (err) { return next(err); }
        if (user) {
            res.json(null);
            return;
        }
        var newUser = new UserModel(req.body);
        newUser.save(function (err, user) {
            req.login(user, function (err) {
                if (err) { return next(err); }
                res.json(user);
            });
        });
    });
});







var auth = function (req, res, next) {
    if (!req.isAuthenticated())
        res.send(401);
    else
        next();
};




app.put('/rest/posts/:postid/uvote', auth, function (req, res) {
    return PostModel.findById(req.params.postid, function (err, post) {
        post.upvotes += 1;
        return post.save(function (err) {           
            if(err) {
                console.log(err);
            }
            return res.send(post);
        });
    });
});

app.put('/rest/posts/:postid/dvote', auth, function (req, res) {
    return PostModel.findById(req.params.postid, function (err, post) {
        post.upvotes -= 1;
        return post.save(function (err) {
            if(err) {
                console.log(err);
            }
            return res.send(post);
        })
    });
});

app.put('/comment/:commentid/uvote', auth, function (req, res) {
    return CommentModel.findById(req.params.commentid, function (err, comment) {
        comment.upvotes += 1;
        return comment.save(function (err) {
            if (err) {
                console.log(err);
            }
            return res.send(comment);
        });
    });
});

app.put('/comment/:commentid/dvote', auth, function (req, res) {
    return CommentModel.findById(req.params.commentid, function (err, comment) {
        comment.upvotes -= 1;
        return comment.save(function (err) {
            if (err) {
                console.log(err);
            }
            return res.send(comment);
        })
    });
});

app.post("/rest/post", auth, function (req, res) {
    var postauthor = req.user._id;
    console.log(postauthor);
    var tagobj = TagModel.findOne({ tag: req.body.tagname }, function (err, tagobj) {
        if (tagobj == null) {
            var newtagobj = new TagModel({ tag: req.body.tagname });
            newtagobj.save(function (err, savedtag) {
                var newpost = new PostModel({ title: req.body.title, content: req.body.content, author: postauthor, tag: savedtag._id});
                newpost.save(function (err, doc) {
                    PostModel.find(function (err,posts) {
                        res.json(posts)
                    });
                });
            });
        }
        else {
            var newpost = new PostModel({ title: req.body.title, content: req.body.content, author: postauthor, tag: tagobj._id });
            newpost.save(function (err, doc) {
                PostModel.find(function (err, posts) {
                    res.json(posts)
                });
            });

        }

    });
});


app.post("/rest/post/:postid/comment", function(req, res) {
    var commentauthor = req.user._id;
    var newcomment = new CommentModel({ commentbody: req.body.commentbody, author: commentauthor, post: req.params.postid });
    console.log(newcomment);
    newcomment.save(function (err, doc) {
        PostModel.findById(req.params.postid, (function (err, post) {
            res.json(post);
        }));
    });

});
    
    


app.post("/rest/user", auth, function (req, res) {
    UserModel.findOne({ username: req.body.username }, function (err, user) {
        if (user == null) {
            user = new UserModel(req.body);
            user.save(function (err, user) {
                UserModel.find(function (err, users) {
                    res.json(users);
                });
            });
        }
        else {
            UserModel.find(function (err, users) {
                res.json(users);
            });
        }
    });
});



   

app.listen(3000);