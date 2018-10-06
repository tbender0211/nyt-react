const express = require("express");
const Article = require("../models/article");
const app = express();


//Get routes
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/api", function(req, res) {
    Article.find({}).sort([
        ["date", "descending"]
    ]).limit(5).exec(function(err, doc) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(doc);
        }
    });
});


//Post routes
app.post("/api", function (req, res) {

    console.log("Body: " + req.body._id);

    Article.create({
        title: req.body.title,
        url: req.body.url,
        date: req.body.date
    }), function(err) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("Search saved");
        }
    }
});

app.post("/api/delete", function (req, res) {

    console.log(req.body);

    Article.remove({_id: req.body._id}, function(err) {
        if(err) {
            console.log(err);
        }
        else {
            res.send("Article deleted!");
        }
    });
});

module.exports = app;