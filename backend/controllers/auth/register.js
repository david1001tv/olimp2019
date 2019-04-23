const bcrypt = require('bcrypt');
const validate = require('validate.js');
const Sequelize = require('sequelize');

const getJwt = require('../../utils/getJwt');
const {User} = require('../../models/index');

module.exports = {
    registerValidator: function (req, res, next) {
        const {body} = req;
        // валидация данных
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
};
