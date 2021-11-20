const express = require('express');

const connectDB = require('./models/config');
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const signUpRouter = require('./routes/signup');
const booksRouter = require('./routes/books');
const notFoundRouter = require('./routes/not_found');
const errorHandler = require('./controllers/error_handler');

const app = express();

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/signup', signUpRouter);
app.use('/books', booksRouter);
app.use('*', notFoundRouter);
app.use(errorHandler);

app.listen(process.env.PORT || 3000);
