const express = require('express');
const { validateJWT } = require('../controllers/strategies/jwt');
const bookController = require('../controllers/book_controller');

const router = express.Router();
router.use(validateJWT);
router.use(bookController.usernameExtractRouteGlobal);

router.route('/')
    .get(bookController.bookGet)
    .post(bookController.bookPost);

router.route('/:id')
    .get(bookController.documentGet)
    .put(bookController.documentPut)
    .delete(bookController.documentDelete);

module.exports = router;
