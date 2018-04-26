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
        // todo: Сделать валидацию полей req.body
        next();
    },

    register: async function (req, res) {
        const {body} = req;
        try {
            const hashedPassword = await bcrypt.hash(body.password, 8);
            const user = (await User.create({
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                password: hashedPassword
            })).dataValues;

            res.status(200).json({
                success: true,
                token: getJwt(user.id)
            });
        } catch (e) {
            console.error(e);
            res.status(500).send();
        }
    },

    googleRegisterValidator: async function (req, res, next) {
        const {body} = req;
        // todo: Сделать валидацию полей req.body
        try {
            const ticket = await googleAuthClient.verifyIdToken({
                idToken: body.idToken,
                audience: config.googleClientId,
            });
            if (ticket === null) {
                res.status(400).send('Could not verify idToken');
            }
            const payload = ticket.getPayload();
            const userId = payload['sub'];

            if (body.userId === userId && Math.round(Date.now() / 1000) < payload.exp) {
                next();
            } else {
                res.status(400).send('Invalid token');
            }
        } catch(e) {
            res.status(500).send();
        }
    },

    googleRegister: async function (req, res) {
        const {body} = req;
        try {
            const user = (await User.create({
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                google_id: body.userId,
            })).dataValues;
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
        // todo: Сделать валидацию полей req.body
        next();
    },

    login: async function (req, res) {
        const {body} = req;
        try {
            const user = await User.findOne({
                where: {
                    email: body.email,
                }
            });

            if (user === null)
                res.status(400).send();

            if (user.dataValues.password === null)
                res.status(400).json({error: 'Войдите через Google+'});

            if (await bcrypt.compare(body.password, user.dataValues.password))
                res.status(200).json({
                    success: true,
                    token: getJwt(user.id)
                });
            else
                res.status(400).send();
        } catch (e) {
            console.error(e);
            res.status(500).send();
        }
    },
    
    googleLoginValidator: async function (req, res, next) {
        const {body} = req;
        // todo: Сделать валидацию полей req.body
        try {
            const ticket = await googleAuthClient.verifyIdToken({
                idToken: body.idToken,
                audience: config.googleClientId,
            });
            if (ticket === null) {
                res.status(400).send('Could not verify idToken');
            }
            const payload = ticket.getPayload();
            const userId = payload['sub'];

            if (body.userId === userId && Math.round(Date.now() / 1000) < payload.exp) {
                next();
            } else {
                res.status(400).send('Invalid token');
            }
        } catch(e) {
            console.error(e);
            res.status(500).send();
        }
    },
    
    googleLogin: async function(req, res) {
        const {body} = req;
        try {
            const user = await User.findOne({
                where: {
                    google_id: body.userId
                }
            });

            if (user === null) {
                res.status(400).send();
            }
            else {
                res.status(200).json({
                    success: true,
                    token: getJwt(user.id)
                });
            }
        } catch (e) {
            console.error(e);
            res.status(500).send();
        }
    }
};
