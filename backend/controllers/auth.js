const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {OAuth2Client} = require('google-auth-library');
const validate = require('validate.js');
const Sequelize = require('sequelize');

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
        const {body} = req;
        // валидация данных
        var constraints = {
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
            password: {
                presence: {
                    allowEmpty: false,
                    message: 'Пароль відсутній'
                },
                length: {
                    minimum: 6,
                    maximum: 30,
                    message: 'Пароль занадто короткий/довгий'
                }
            }
        };
        let errors = validate(body, constraints);

        if (errors !== undefined) {
            console.log('Validation errors', errors);
            res.status(400).json({errors});
        } else {
            next();
        }
    },

    register: async function (req, res) {
        const {body} = req;
        try {
            //запись в БД
            const hashedPassword = await bcrypt.hash(body.password, 8);
            const user = (await User.create({
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                password: hashedPassword
            }));

            res.status(200).json({
                success: true,
                token: getJwt(user.id)
            });
        } catch (error) {
            console.error(error);
            if (error instanceof Sequelize.UniqueConstraintError) {
                res.status(409).json({
                    errors: {
                        email: ['Користувач з таким e-mail вже зареєстрований'],
                    }
                });
                return;
            }
            res.status(500).send();
        }
    },

    googleRegisterValidator: async function (req, res, next) {
        const {body} = req;
        //валидация данных
        var constraints = {
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
        if (errors != undefined) {
            console.log('Validation errors', errors);
            res.status(400).send({errors});
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
            if (error instanceof Sequelize.UniqueConstraintError) {
                let errorText = 'Невідома помилка';
                if (error.get('email')[0] && !error.get('google_id')[0])
                    errorText = 'Ви вже зареєстровані через пошту. Увійдіть через неї.';
                if (error.get('google_id')[0])
                    errorText = 'Цей акаунт вже використовується.';
                res.status(409).json({ errors: { generic: errorText } });
                return;
            }
            console.error(e);
            res.status(500).send();
        }
    },

    loginValidator: function (req, res, next) {
        const {body} = req;
        //валидация данных
        var constraints = {
            email: {
                presence: {
                    allowEmpty: false,
                    message: 'Емаіл відсутній'
                },
                email: {
                    message: 'Емаіл не відповідає формату'
                }
            },
            password: {
                presence: {
                    allowEmpty: false,
                    message: 'Пароль відсутній'
                }
            }
        };
        let errors = validate(body, constraints);
        //проверка наличия ошибок
        if (errors !== undefined) {
            console.log('Validation errors', errors);
            res.status(400).send({ errors });
        }
        else {
            next();
        }
    },

    login: async function (req, res) {
        const {body} = req;
        try {
            const user = await User.findOne({
                where: {
                    email: body.email,
                }
            });

            if (user === null) {
                res.status(400).json({errors: { generic: ['Невірний e-mail або пароль'] } });
                return;
            }

            if (user.password === null) {
                res.status(400).json({errors: { generic: ['Увійдіть через Google+'] } });
                return;
            }

            if (await bcrypt.compare(body.password, user.password))
                res.status(200).json({
                    success: true,
                    token: getJwt(user.id)
                });
            else {
                res.status(400).json({errors: { generic: ['Невірний e-mail або пароль'] } });
                return;
            }
        } catch (e) {
            console.error(e);
            res.status(500).send();
        }
    },

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
