const jwt = require('jsonwebtoken');

const signToken = params => {
    const token = jwt.sign(params, process.env.SECRET);

    return token;
}

const verifyToken = token => {
    const decoded = jwt.verify(token, process.env.SECRET);

    return decoded;
}

module.exports = {
    signToken,
    verifyToken
};