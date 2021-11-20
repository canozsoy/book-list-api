const bcrypt = require('bcrypt');
const { createJWT } = require('./strategies/jwt');
const User = require('../models/user');
const userValidationSchema = require('./validations/user_validation');

const signupGet = (req, res) => {
    res.sendStatus(200);
};

const signupPost = async (req, res) => {
    const result = userValidationSchema.validate(req.body, { abortEarly: false });
    if (result.error) {
        return res.json({
            error: result.error,
        });
    }
    const { username, password } = req.body;
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, +process.env.SALT);
    } catch (err) {
        console.error(err);
    }
    const user = new User({
        username,
        password: hashedPassword,
    });
    let createdUser;
    try {
        createdUser = await user.save();
    } catch (err) {
        return res.json({
            error: err,
        });
    }
    const token = createJWT(username);
    return res.json({
        message: 'Operation Successful!',
        user: createdUser,
        jwt: token,
    });
};

module.exports = {
    signupGet,
    signupPost,
};
