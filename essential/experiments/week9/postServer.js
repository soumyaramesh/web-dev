var mongoose = require('mongoose');


var PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    upvotes: { type: Number, default: 0 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
    tag: { type: mongoose.Schema.Types.ObjectId, ref: 'TagModel' },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CommentModel' }],
});

var PostModel = mongoose.model('PostModel', PostSchema);

//var post1 = new PostModel({ title: "post1", content: "post1content", upvotes: "3", author: "55160ee359218c9020773463", tag: "tag1" });
//post1.save();

//var post2 = new PostModel({ title: "post2", content: "post2content", upvotes: "0", author:"55160ee359218c9020773463" , tag: "tag2" });
//post2.save();

//var post3 = new PostModel({ title: "post3", content: "post3content", upvotes: "1", author: "55160ee359218c9020773465", tag: "tag2" });
//post3.save();

//var post4 = new PostModel({ title: "post4", content: "post4content", upvotes: "2", author: "55160ee359218c9020773466", tag: "tag3" });
//post4.save();

exports.load = function (app, public_path) {
    app.get("/rest/posts", function (req, res) {
        PostModel.find().populate('author').populate('tag').populate('comments').exec(function (err, posts) {
            res.json(posts);
        });
    });

    app.get("/:content", function (req, res) {
        PostModel.find({ content: req.params.content }, function (err, post) {
            res.json(post);
        });
    });

    app.get("/:content/comments", function (req, res) {
        PostModel.find({ content: req.params.content }, function (err, post) {
            res.json(post);
        })
    })


    

   

    
}
