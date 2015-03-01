var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.use(express.static(__dirname + '/public'));

var books =
[{ title: "Harry Potter", author: "J K Rowling", chapters: [{ name: "Book1,1" }, { name: "Book1,2" }, { name: "Book1,3" }] },
{ title: "LOTR", author: "J R R Tolkien", chapters: [{ name: "Book2,1" }, { name: "Book2,2" }, { name: "Book3,3" }] },
{ title: "Game of Thrones", author: "George R R Martin", chapters: [{ name: "Book3,1" }, { name: "Book3,2" }] },
{ title: "The Girl On the Train", author: "Paula Hawkins", chapters: [] },
];

app.delete("/book/:index/chapter/:chapterIndex", function (req, res) {
    var index = req.params.index;
    books[index].chapters.splice(req.params.chapterIndex, 1);
    res.json(books);
})

app.delete("/book/:id", function (req, res) {
    var index = req.params.id;
    books.splice(index, 1);
    res.json(books);
});

app.post("/book", function (req, res) {
    var obj = req.body;//{ title: "Title", author: "Author" };
    books.push(obj);
    res.json(books);
});

app.put("/book/:id", function (req, res) {
    var index = req.params.id;
    var obj = req.body;
    books[index] = obj;
    res.json(books);
});

app.get("/book", function (req, res) {
    res.json(books);
})

app.get("/book/:index", function (req, res) {
    var ind = req.params.index;
    res.json(books[ind]);
})

app.listen(port, ipaddress);