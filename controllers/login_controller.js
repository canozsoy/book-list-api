const bcrypt = require('bcrypt');
const userValidationSchema = require('./validations/user_validation');
const User = require('../models/user');
const { createJWT } = require('./strategies/jwt');

const loginGet = (req, res) => {
    res.sendStatus(200);
};

const loginPost = async (req, res, next) => {
    const result = userValidationSchema.validate(req.body, { abortEarly: false });
    if (result.error) {
        return res.json({
            error: result.error,
        });
    }
    const { username, password } = req.body;
    let user;
    try {
        user = await User.findOne({ username }, '-books').exec();
    } catch (err) {
        next(err);
    }

    const message = 'Incorrect Username or Password';
    if (!user) {
        return res.json({
            error: message,
        });
    }
    let passwordMatch;

    try {
        passwordMatch = await bcrypt.compare(password, user.password);
    } catch (err) {
        next(err);
    }

    if (!passwordMatch) {
        return res.json({
            error: message,
        });
    }

    const token = createJWT(username);
    return res.json({
        message: 'Successful Login',
        user: {
            _id: user.id,
            username: user.username,
            jwt: token,
        },
    });
};

module.exports = {
    loginGet,
    loginPost,
};
