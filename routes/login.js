const express = require('express');

const router = express.Router();
const loginController = require('../controllers/login_controller');

router.route('/')
    .get(loginController.loginGet)
    .post(loginController.loginPost);

module.exports = router;
