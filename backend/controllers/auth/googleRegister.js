const {OAuth2Client} = require('google-auth-library');
const validate = require('validate.js');
const Sequelize = require('sequelize');

const {User} = require('../../models/index');
const config = require('../../config');
const getJwt = require('../../utils/getJwt');

const googleAuthClient = new OAuth2Client(config.googleClientId);

module.exports = {
    googleRegisterValidator: async function (req, res, next) {
        const {body} = req;
        //валидация данных
        const constraints = {
            email: {
                presence: {
                    allowEmpty: false,
                    message: 'Емаіл відсутній'
                },
                email: {
                    message: 'Емаіл не відповідає формату'
                }
            },
            firstName: {
                presence: {
                    allowEmpty: false,
                    message: 'Им\'я відсутнє'
                }
            },
            lastName: {
                presence: {
                    allowEmpty: false,
                    message: 'Прізвище відсутнє'
                }
            },
            idToken: {
                presence: {
                    allowEmpty: false,
                    message: 'Токен відсутній'
                },
            },
            userId: {
                presence: {
                    allowEmpty: false,
                    message: 'Id користовача відсутній'
                },
            }
        };
        let errors = validate(body, constraints);
        //проверка есть ли ошибки
        if (errors !== undefined) {
            console.log('Validation errors', errors);
            res.status(400).json({errors});
        }
        //проверка токена
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
            res.status(500).send();
        }
    },

    googleRegister: async function (req, res) {
        const {body} = req;
        //запись в БД
        try {
            let user;
            user = (await User.findOne({ where: { email: body.email } }));

            if (user) {
                let errorText = 'Невідома помилка';
                if (user.password !== null)
                    errorText = 'Ви вже зареєстровані через пошту. Увійдіть через неї.';
                if (user.google_id !== null)
                    errorText = 'Цей акаунт вже використовується.';
                res.status(409).json({errors: {generic: [errorText]}});
                return;
            }

            user = (await User.create({
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
        } catch (error) {
            console.error(e);
            res.status(500).send();
        }
    },
};
