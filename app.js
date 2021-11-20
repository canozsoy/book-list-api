const express = require('express');
const createError = require("http-errors");
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
const signUpRouter = require("./routes/signup");
const booksRouter = require("./routes/books");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', indexRouter);
app.use("/login", loginRouter);
app.use("/signup", signUpRouter);
app.use("/books", booksRouter);


app.use((req, res, next) => {
    next(createError(404));
});
app.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
})





module.exports = app;
