const {OAuth2Client} = require('google-auth-library');
const validate = require('validate.js');

const {User} = require('../../models/index');
const config = require('../../config');
const getJwt = require('../../utils/getJwt');

const googleAuthClient = new OAuth2Client(config.googleClientId);

module.exports = {
    googleLoginValidator: async function (req, res, next) {
        const {body} = req;
        //валидация данных
        var constraints = {
            idToken: {
                presence: {
                    allowEmpty: false
                }
            },
            userId: {
                presence: {
                    allowEmpty: false
                }
            }
        };
        let errors = validate(body, constraints);
        //проверка на наличие ошибок
        if (errors !== undefined) {
            console.log('Validation errors', errors);
            res.status(400).send({errors});
        }

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
        } catch (e) {
            console.error(e);
            res.status(500).send();
        }
    },

    googleLogin: async function (req, res) {
        const {body} = req;
        try {
            const user = await User.findOne({
                where: {
                    google_id: body.userId
                }
            });

            if (user === null) {
                res.status(400).send({ errors: { generic: ['Акаунт не знайдено'] } });
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
