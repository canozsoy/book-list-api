const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    pages: {
        type: Number,
        default: 0
    },
    readInfo: {
        type: Boolean,
        default: false
    },
    summary: {
        type: String,
        default: "No summary"
    }
});

const BookModel = mongoose.model("Book", BookSchema);

module.exports = BookModel;