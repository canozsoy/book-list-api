const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    books: [{
        type: Schema.Types.ObjectId,
        ref: "Book"
    }]
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;