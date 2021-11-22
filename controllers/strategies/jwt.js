const jwt = require('jsonwebtoken');
const { extractJWTFromBearerToken } = require('../helpers/jwt_operations');

const createJWT = (username) => jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: 86400,
});

const validateJWT = async (req, res, next) => {
    const token = extractJWTFromBearerToken(req);

    try {
        await jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.sendStatus(401);
    }

    return next();
};

module.exports = {
    createJWT,
    validateJWT,
};
