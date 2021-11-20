const express = require('express');
const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
const signUpRouter = require("./routes/signup");
const booksRouter = require("./routes/books");
const notFoundRouter = require("./routes/not_found");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);
app.use("/login", loginRouter);
app.use("/signup", signUpRouter);
app.use("/books", booksRouter);
app.use("*", notFoundRouter);

app.listen(process.env.PORT || 3000);

module.exports = app;
