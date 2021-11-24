const User = require('../models/user');
const Book = require('../models/book');
const { extractUsernameFromJWT } = require('./helpers/jwt_operations');
const bookValidationSchema = require('./validations/book_validation');

const usernameExtractRouteGlobal = (req, res, next) => {
    req.locals = {
        username: extractUsernameFromJWT(req),
    };
    next();
};

const bookGet = async (req, res, next) => {
    let userBooks;
    try {
        userBooks = await User.findOne({ username: req.locals.username }, 'books')
            .populate('books')
            .exec();
    } catch (err) {
        return next(err);
    }

    return res.json(userBooks);
};

const bookPost = async (req, res, next) => {
    const validationResult = bookValidationSchema
        .postBookValidationSchema
        .validate(req.body, { abortEarly: false });
    if (validationResult.error) {
        return next(validationResult.error);
    }
    const book = new Book(req.body);
    let createdBook;
    try {
        createdBook = await book.save();
    } catch (err) {
        return next(err);
    }
    try {
        await User.findOneAndUpdate(
            { username: req.locals.username },
            { $push: { books: createdBook.id } },
        ).exec();
    } catch (err) {
        return next(err);
    }
    return res.json({
        message: 'Successfully Created',
        document: createdBook,
    });
};

const documentGet = async (req, res, next) => {
    const { id } = req.params;
    let userBooks;
    try {
        userBooks = (await User.findOne({ username: req.locals.username }, 'books')
            .populate('books')).books;
    } catch (err) {
        return next(err);
    }

    userBooks = userBooks.find((x) => x.id === id);
    if (!userBooks) {
        return res.sendStatus(404);
    }
    return res.json(userBooks);
};

const documentPut = async (req, res, next) => {
    const validationResult = bookValidationSchema
        .putBookValidationSchema
        .validate(req.body, { abortEarly: false });
    if (validationResult.error) {
        return next(validationResult.error);
    }
    const { id } = req.params;
    let updatedDocument;
    try {
        updatedDocument = await Book.findByIdAndUpdate(id, req.body, { new: true });
    } catch (err) {
        return next(err);
    }
    return res.json({
        message: 'Successfully Changed',
        document: updatedDocument,
    });
};

const documentDelete = async (req, res, next) => {
    const { id } = req.params;
    try {
        await Promise.all([
            Book.findByIdAndDelete(id).exec(),
            User.findOneAndUpdate(
                { username: req.locals.username },
                { $pull: { books: id } },
            ).exec(),
        ]);
    } catch (err) {
        return next(err);
    }

    return res.json({
        message: 'Successfully Deleted',
    });
};

module.exports = {
    usernameExtractRouteGlobal,
    bookGet,
    bookPost,
    documentGet,
    documentPut,
    documentDelete,
};
