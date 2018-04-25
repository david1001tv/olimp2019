const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {OAuth2Client} = require('google-auth-library');

const {User} = require('../models');
const config = require('../config');

const googleAuthClient = new OAuth2Client(config.googleClientId);

function getJwt(userId) {
    return jwt.sign({userId}, config.secret, {
        expiresIn: '48h',
    });
}

module.exports = {
    registerValidator: function (req, res, next) {
        next();
    },

    register: async function (req, res) {
        const {body} = req;
        try {
            const hashedPassword = await bcrypt.hash(body.password, 8);
            const user = await User.create({
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                password: hashedPassword
            }).dataValues;
            console.log(user);

            res.status(200).json({
                success: true,
                token: getJwt(user.id)
            });
        } catch (e) {
            console.error(e);
            res.status(500).send();
        }
    },

    googleRegisterValidator: function (req, res, next) {

    },

    googleRegister: async function (req, res) {
        const {body} = req;
        try {
            const ticket = await googleAuthClient.verifyIdToken({
                idToken: body.idToken,
                audience: config.googleClientId,
            });
            const payload = ticket.getPayload();
            const userId = payload['sub'];

            const hashedPassword = await bcrypt.hash(body.password, 8);
            const user = await User.create({
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                password: hashedPassword
            }).dataValues;
            console.log(user);

            res.status(200).json({
                success: true,
                token: getJwt(user.id)
            });
        } catch (e) {
            console.error(e);
            res.status(500).send();
        }
    },

    loginValidator: function (req, res, next) {

    },

    login: function (req, res) {

    }
};
