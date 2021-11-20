const jwt = require('jsonwebtoken');

const createJWT = (username) => jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: 86400,
});

const validateJWT = () => {

};

module.exports = {
    createJWT,
    validateJWT,
};
