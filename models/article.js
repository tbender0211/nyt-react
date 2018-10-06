const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema ({
    title: {type: String, required: true},
    snipped: {type: String, required: true},
    date: {type: Date, required: true},
    url: {type: String, required: true},
    id: {type: String, required: true}
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;