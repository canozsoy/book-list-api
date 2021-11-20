const express = require("express");
const router = express.Router();
const signupController = require("../controllers/signup_controller");

router.route("")
    .get(signupController.signupGet)
    .post(signupController.signupPost);

module.exports = router;