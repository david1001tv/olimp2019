const config = require('../config');
const jwt = require('jsonwebtoken');

function getJwt(userId) {
    return jwt.sign({userId}, config.secret, {
        expiresIn: '48h',
    });
}

module.exports = getJwt;