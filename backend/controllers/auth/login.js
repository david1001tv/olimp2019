const bcrypt = require('bcrypt');
const validate = require('validate.js');

const {User} = require('../../models/index');
const getJwt = require('../../utils/getJwt');

module.exports = {
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
};
