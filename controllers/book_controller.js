const User = require('../models/user');
const Book = require('../models/book');
const { extractUsernameFromJWT } = require('./helpers/jwt_operations');

const bookGet = async (req, res, next) => {
    const username = extractUsernameFromJWT(req);
    let userBooks;
    try {
        userBooks = await User.findOne({ username }, 'books')
            .populate('books')
            .exec();
    } catch (err) {
        next(err);
    }

    return res.json(userBooks);
};

const bookPost = (req, res) => {

};

module.exports = {
    bookGet,
    bookPost,
};
