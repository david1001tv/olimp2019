const jwt = require('jsonwebtoken');
const app = require('./main');

module.exports = {
    auth(req, res, next) {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, app.get('secret'), (err, decoded) => {
                if (err) {
                    return res.status(403).json({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
                }
                // if everything is good, save to request for use in other routes
                req.decodedToken = decoded;
                next();
            });
        } else {
            // if there is no token
            // return an error
            return res.status(403).json({
                success: false,
                message: 'No token provided.',
            });
        }
    },
};
