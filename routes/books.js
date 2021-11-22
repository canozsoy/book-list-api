const express = require('express');
const { validateJWT } = require('../controllers/strategies/jwt');
const bookController = require('../controllers/book_controller');

const router = express.Router();
router.use(validateJWT);

router.route('/')
    .get(bookController.bookGet)
    .post(bookController.bookPost);

module.exports = router;
