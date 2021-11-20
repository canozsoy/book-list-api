const jwt = require('jsonwebtoken');

function extractJWTFromBearerToken(req) {
    const bearerToken = req.headers.authorization;
    if (!bearerToken || !bearerToken.includes('Bearer ')) {
        return null;
    }
    return bearerToken.replace('Bearer ', '');
}

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
