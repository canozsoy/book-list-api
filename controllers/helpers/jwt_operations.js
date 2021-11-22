const jwt = require('jsonwebtoken');

const extractJWTFromBearerToken = (req) => {
    const bearerToken = req.headers.authorization;
    if (!bearerToken || !bearerToken.includes('Bearer ')) {
        return null;
    }
    return bearerToken.replace('Bearer ', '');
};

const extractUsernameFromJWT = (req) => {
    const token = extractJWTFromBearerToken(req);
    const { username } = jwt.decode(token);
    return username;
};

module.exports = {
    extractJWTFromBearerToken,
    extractUsernameFromJWT,
};
