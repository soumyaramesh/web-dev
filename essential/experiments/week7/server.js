var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var mongoose = require('mongoose');

var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/cs5610';

mongoose.connect(connectionString);





var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.use(express.static(__dirname + '/public'));

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

app.put("/book/:id", function (req, res) {
    Book.update({ _id: req.params.id }, { $set: req.body }, function (err, doc) {
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

app.listen(port, ipaddress);